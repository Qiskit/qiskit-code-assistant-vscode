import vscode from "vscode";
import { getServiceApi } from "../services/common";
import { clearPromptFeedbackCodeLens } from "../codelens/FeedbackCodelensProvider";
import { acceptSuggestionCommand, dismissSuggestionCommand } from "./acceptSuggestion";

const PROMPT_FEEDBACK_MSG = "Please share any detailed feedback you have about the Qiskit Code Assistant. The details of your completions as well as this message will be sent to the Qiskit Code Assistant team in order to improve the service.";
const DEFAULT_FEEDBACK_MSG = "$(feedback) Provide feedback";
const FEEDBACK_RESPONSE_MSG = "Thank you for sharing your feedback with the Qiskit Code Assistant team.";


async function provideFeedbackHandler(
  modelId: string,
  promptId: undefined|string,
  positiveFeedback: undefined|boolean,
  callback: (() => void)|undefined,
): Promise<void> {
  console.log(`providing feedback with ${modelId}, ${promptId}, ${positiveFeedback}`);

  let moreFeedback;
  if (positiveFeedback != undefined) {
    const identifier = (positiveFeedback ? acceptSuggestionCommand : dismissSuggestionCommand).identifier;
    await vscode.commands.executeCommand(identifier);
    await clearFeedbackCodelensHandler();

    moreFeedback = await vscode.window.showInformationMessage(
      FEEDBACK_RESPONSE_MSG,
      "Provide feedback",
      "Dismiss"
    );
  }

  let comment;
  if (moreFeedback != "Dismiss") {
    comment = await vscode.window.showInputBox({
      prompt: promptId ? PROMPT_FEEDBACK_MSG : DEFAULT_FEEDBACK_MSG
    });
  }

  const serviceApi = await getServiceApi();
  const response = await serviceApi.postFeedback(modelId, promptId, positiveFeedback, comment);

  if (response.message && callback) {
    callback();
  }

  if (comment && positiveFeedback === undefined) {
    vscode.window.showInformationMessage(FEEDBACK_RESPONSE_MSG)
  }
}

async function clearFeedbackCodelensHandler(): Promise<void> {
  await clearPromptFeedbackCodeLens()
}

export const handleProvideFeedback: CommandModule = {
  identifier: "qiskit-vscode.provide-feedback",
  handler: provideFeedbackHandler,
};

export const handleClearCodelens: CommandModule = {
  identifier: "qiskit-vscode.clear-feedback-codelens",
  handler: clearFeedbackCodelensHandler,
};
