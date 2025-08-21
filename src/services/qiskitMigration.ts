import vscode from "vscode";

import { getExtensionContext } from "../globals/extensionContext";
import { currentModel } from "../commands/selectModel";
import ServiceAPI from "./serviceApi";

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");

const STREAM_DATA_PREFIX = 'data: ';

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

export async function *migrateCode(
  code: string,
  fromVersion?: string,
  toVersion?: string
): AsyncGenerator<MigrationResponse> {
  // POST /migrate
  const streamingEnabled = config.get<boolean>("enableStreaming") as boolean;
  const endpoint = `/model/${currentModel?._id}/migrate`;
  const apiToken = await getApiToken()
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
    const response = ServiceAPI.runFetchStreaming(endpoint, options);

    for await(let chunk of response) {
        // parse & transform the streaming data chunk
        const lines = chunk.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith(STREAM_DATA_PREFIX)) {
            try {
              // remove 'data: ' prefix and parse remaining string
              const jsonChunk = JSON.parse(line.substring(STREAM_DATA_PREFIX.length)) as MigrationResponse;
              yield jsonChunk;
            } catch (error) {
              // JSON parsing errors
              console.error(`Error parsing JSON: ${error}`);
              console.log(line)
            }
          }
        }
      }
  } else {
    const response = await ServiceAPI.runFetch(endpoint, options);
    const migrationResponse = await response.json() as MigrationResponse;
    yield migrationResponse;
  }
}
