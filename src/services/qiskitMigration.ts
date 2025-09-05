import vscode from "vscode";
import { getExtensionContext } from "../globals/extensionContext";
import { currentModel } from "../commands/selectModel";
import ServiceAPI from "./serviceApi";
import { setLoadingStatus } from "../statusBar/statusBar";

async function getErrorMessage(response: Response) {
  let msg = "An unknown error has occurred";
  if (!response.ok) {
    try {
      const jsonMsg = await response.json() as {detail: string};
      msg = jsonMsg?.detail || response.statusText;
      console.log(response.status, msg)
    } catch (err) {
      msg = await response.text();
    }
  }
  return msg;
}

async function getApiToken() {
  const context = getExtensionContext();
  const apiToken = await context?.secrets.get("apiToken");

  if (!apiToken) {
    throw Error("Missing API Token");
  }

  return apiToken;
}

export interface MigrationResult {
  migratedCode: string;
  migrationId?: string;
  originalCode: string;
}

export async function* migrateCodeStream(
  code: string,
  fromVersion?: string,
  toVersion?: string
): AsyncGenerator<{migrated_code?: string, generated_text?: string, delta?: string, migration_id?: string, prompt_id?: string}> {
  const endpoint = `/model/${currentModel?._id}/migrate`;
  const apiToken = await getApiToken();
  
  // Check if streaming is enabled
  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const streamingEnabled = config.get<boolean>("enableStreaming") as boolean;
  
  const options = {
    'method': 'POST',
    'headers': ServiceAPI.getHeaders(apiToken),
    'body': JSON.stringify({
      code,
      version_from: fromVersion,
      version_to: toVersion,
      stream: streamingEnabled
    })
  };

  if (streamingEnabled) {
    console.log("Starting streaming migration for model:", currentModel?._id);
    const response = ServiceAPI.runFetchStreaming(endpoint, options);
    const STREAM_DATA_PREFIX = 'data: ';
    
    try {
      for await (let chunk of response) {
        const lines = chunk.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith(STREAM_DATA_PREFIX)) {
            try {
              const jsonStr = line.substring(STREAM_DATA_PREFIX.length);
              const jsonChunk = JSON.parse(jsonStr);
              console.log("Migration stream chunk:", jsonChunk);
              yield jsonChunk;
            } catch (error) {
              console.error(`Error parsing migration stream JSON: ${error}`);
              console.log("Problematic migration line:", line);
            }
          } else if (line.trim() === '') {
            continue;
          } else if (line.startsWith('[DONE]') || line === 'data: [DONE]') {
            console.log("Migration stream finished");
            break;
          } else {
            console.log("Non-data migration line:", line);
          }
        }
      }
    } catch (streamError) {
      console.error("Migration streaming error:", streamError);
      throw streamError;
    }
  } else {
    console.log("Using non-streaming migration");
    const response = await ServiceAPI.runFetch(endpoint, options);
    if (response.ok) {
      const result = await response.json() as { migrated_code?: string, migration_id?: string, prompt_id?: string };
      console.log("Non-streaming migration response:", result);
      yield result;
    } else {
      console.error("Error migrating code", response.status, response.statusText);
      throw Error(await getErrorMessage(response));
    }
  }
}

export async function migrateCode(
  code: string,
  fromVersion?: string,
  toVersion?: string
): Promise<MigrationResult> {
  // Set accurate loading status based on streaming setting
  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const streamingEnabled = config.get<boolean>("enableStreaming") as boolean;
  setLoadingStatus(streamingEnabled ? 'streaming' : 'generating');

  let migratedCode = '';
  let migrationId: string | undefined;

  try {
    for await (let chunk of migrateCodeStream(code, fromVersion, toVersion)) {
      setLoadingStatus('processing');
      
      // Use the same logic as runCompletion.ts
      if (chunk.delta) {
        // Streaming response: accumulate delta chunks
        migratedCode += chunk.delta;
      } else {
        // Non-streaming or complete response: use the complete text
        if (chunk.migrated_code) {
          migratedCode = chunk.migrated_code;
        } else if (chunk.generated_text) {
          migratedCode = chunk.generated_text;
        }
      }

      if (chunk.migration_id) {
        migrationId = chunk.migration_id;
      }
      if (chunk.prompt_id) {
        migrationId = chunk.prompt_id;
      }
    }

    setLoadingStatus('processing');
    return {
      migratedCode: migratedCode || '',
      migrationId: migrationId,
      originalCode: code
    };
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
}
