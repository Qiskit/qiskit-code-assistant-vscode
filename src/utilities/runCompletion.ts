import { Position, Range, TextDocument, window } from "vscode";

import { AutocompleteResult, CompletionMetadata, ResultEntry } from "../binary/requests/requests";
import { CHAR_LIMIT, PromptType } from "../globals/consts";
import languages from "../globals/languages";
import { setDefaultStatus, setLoadingStatus, setErrorStatus } from "../statusBar/statusBar";
import { getExtensionContext } from "../globals/extensionContext";
import { currentModel } from "../commands/selectModel";
import { sleep } from "./utils";
import acceptDisclaimer from "../commands/acceptDisclaimer";
import { getServiceApi } from "../services/common";

let cancelCompletion: AbortController | null = null;
let promptId: string | undefined = undefined;

export default async function* runCompletion(
  document: TextDocument,
  position: Position,
  timeout?: number,
  currentSuggestionText = ""
): AsyncGenerator<AutocompleteResult | null | undefined> {
  if (!currentModel) {
    window.showInformationMessage("Please select a model (in the status bar) before auto-completing code.");
    return null;
  }

  if (cancelCompletion) {
    cancelCompletion.abort();
    cancelCompletion = null;
  }

  // This lets the js event loop turn once, processing the cancelCompletion.abort()
  // which resets the loading status, before we start a new request.
  await sleep(0);

  try {
    setLoadingStatus('connecting');
    cancelCompletion = new AbortController();

    const offset = document.offsetAt(position);
    const beforeStartOffset = Math.max(0, offset - CHAR_LIMIT);
    const afterEndOffset = offset + CHAR_LIMIT;
    const beforeStart = document.positionAt(beforeStartOffset);
    const afterEnd = document.positionAt(afterEndOffset);
    const prefix = document.getText(new Range(beforeStart, position)) + currentSuggestionText;
    const suffix = document.getText(new Range(position, afterEnd));
    const context = getExtensionContext();

    if (!context) return;

    setLoadingStatus('generating');
    const apiService = await getServiceApi();

    if (!currentModel.disclaimer?.accepted) {
      acceptDisclaimer.handler(currentModel);
      setDefaultStatus();
      return null;
    }

    var inputs: string;
    switch (currentModel.prompt_type) {
      case PromptType.FillInMiddle:
        // use FIM (fill-in-middle) mode if suffix is available
        inputs = suffix.trim() ? `${currentModel.delimiting_tokens?.start_token}${prefix}${currentModel.delimiting_tokens?.end_token}${suffix}${currentModel.delimiting_tokens?.middle_token}` : prefix;
        break;
      case PromptType.PredictNext:
        inputs = prefix;
        break;
      default:
        inputs = prefix;
    }

    if (inputs == "") {
      window.showInformationMessage("No input available for model to complete.");
      setDefaultStatus();
      return null;
    }

    let responseData = null;
    try {
      setLoadingStatus('streaming');
      responseData = apiService.postModelPrompt(currentModel._id, inputs);
      for await (let chunk of responseData) {
        setLoadingStatus('processing');
        if ((chunk as unknown as {error: string})?.error) {
          throw Error((chunk as unknown as {error: string})?.error)
        }
        const generatedTextRaw = getGeneratedText(chunk);

        promptId = chunk.prompt_id

        let generatedText = generatedTextRaw;
        if (generatedText.slice(0, inputs.length) === inputs) {
          generatedText = generatedText.slice(inputs.length);
        }

        // Only log empty completions to console, don't show user notification
        if (generatedText == "") {
          console.warn("The model returned an empty completion");
        }

        const completionMetadata: CompletionMetadata = {
          model_id: currentModel._id,
          prompt_id: promptId,
          input: inputs,
          output: generatedText
        }

        const resultEntry: ResultEntry = {
          new_prefix: generatedText,
          old_suffix: "",
          new_suffix: "",
          completion_metadata: completionMetadata
        }

        const result: AutocompleteResult = {
          results: [resultEntry],
          old_prefix: "",
          user_message: [],
          is_locked: false,
        }

        if (cancelCompletion.signal.aborted) {
          setDefaultStatus();
          return null;
        }

        yield result;
      }
    } catch (err) {
      const msg = (err as Error).message || "Error sending the prompt";
      // Only show error messages for actual API errors, not for normal completion flow
      console.error("API Error:", msg);
      setErrorStatus("Error: " + msg);
      
      if (cancelCompletion) {
        cancelCompletion.abort();
      }
      setDefaultStatus();
      return null;
    }
  } finally {
    cancelCompletion = null;
    setDefaultStatus();
  }
}

function getGeneratedText(json: any): string {
  return json?.generated_text ?? json?.results[0].generated_text ?? "";
}

export type KnownLanguageType = keyof typeof languages;

export function getLanguageFileExtension(
  languageId: string
): string | undefined {
  return languages[languageId as KnownLanguageType];
}

export function getFileNameWithExtension(document: TextDocument): string {
  const { languageId, fileName } = document;
  if (!document.isUntitled) {
    return fileName;
  }
  const extension = getLanguageFileExtension(languageId);
  if (extension) {
    return fileName.concat(extension);
  }
  return fileName;
}

export async function updateUserAcceptance(accepted: boolean) {
  // check for current model
  if (!currentModel) {
    window.showInformationMessage("Please select a model (in the status bar)");
    return;
  }

  if (promptId) {
    const apiService = await getServiceApi();
    await apiService.postPromptAcceptance(promptId, accepted);
    // reset prompt_id
    promptId = undefined
  }
}
