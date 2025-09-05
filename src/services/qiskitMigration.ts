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

export async function migrateCode(
  code: string,
  fromVersion?: string,
  toVersion?: string
): Promise<MigrationResult> {
  // POST /migrate
  setLoadingStatus('streaming');
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
    // Handle streaming response - similar to how completions work
    const response = ServiceAPI.runFetchStreaming(endpoint, options);
    let migratedCode = '';
    let migrationId: string | undefined;
    let promptId: string | undefined;
    const STREAM_DATA_PREFIX = 'data: ';
    
    try {
      for await (let chunk of response) {
        setLoadingStatus('streaming');
        const lines = chunk.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith(STREAM_DATA_PREFIX)) {
            try {
              // remove 'data: ' prefix and parse remaining string
              const jsonChunk = JSON.parse(line.substring(STREAM_DATA_PREFIX.length)) as { 
                migrated_code?: string,
                generated_text?: string, // Some models might use this field
                migration_id?: string, 
                prompt_id?: string,
                delta?: string, // for incremental streaming chunks
                results?: Array<{ generated_text?: string }> // Alternative response format
              };
              
              console.log("Migration stream chunk:", jsonChunk);
              
              // Handle different response formats
              if (jsonChunk.migrated_code) {
                migratedCode = jsonChunk.migrated_code;
              } else if (jsonChunk.generated_text) {
                migratedCode = jsonChunk.generated_text;
              } else if (jsonChunk.results?.[0]?.generated_text) {
                migratedCode = jsonChunk.results[0].generated_text;
              } else if (jsonChunk.delta) {
                migratedCode += jsonChunk.delta;
              }
              
              if (jsonChunk.migration_id) {
                migrationId = jsonChunk.migration_id;
              }
              if (jsonChunk.prompt_id) {
                promptId = jsonChunk.prompt_id;
              }
            } catch (error) {
              // JSON parsing errors
              console.error(`Error parsing migration stream JSON: ${error}`);
              console.log("Problematic line:", line);
            }
          }
        }
      }
      
      setLoadingStatus('processing');
      return {
        migratedCode: migratedCode || '', // Ensure we don't return undefined
        migrationId: migrationId || promptId,
        originalCode: code
      };
    } catch (streamError) {
      console.error("Migration streaming error:", streamError);
      // Fall back to non-streaming if streaming fails
      console.log("Falling back to non-streaming migration...");
    }
  }
  
  // Handle regular non-streaming response (either when streaming is disabled or fallback)
  const response = await ServiceAPI.runFetch(endpoint, options);

  if (response.ok) {
    setLoadingStatus('processing');
    const result = await response.json() as { migrated_code: string, migration_id?: string, prompt_id?: string };
    return {
      migratedCode: result.migrated_code,
      migrationId: result.migration_id || result.prompt_id, // fallback to prompt_id if migration_id not available
      originalCode: code
    };
  } else {
    console.error("Error migrating code", response.status, response.statusText);
    throw Error(await getErrorMessage(response));
  }
}
