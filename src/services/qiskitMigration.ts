/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http:*www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import * as vscode from "vscode";

import { getExtensionContext } from "../globals/extensionContext";
import ServiceAPI from "./serviceApi";
import { DISCLAIMER_ERROR_MSG } from "../globals/consts";
import { migrationDisclaimerAcceptance } from "../commands/acceptDisclaimer";

const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");

const STREAM_DATA_PREFIX = 'data: ';

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
  const endpoint = `/migrate`;
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

  try {
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
  } catch (err) {
    // migration errors
    const msg = (err as Error).message;
    if (msg.includes(DISCLAIMER_ERROR_MSG)) {
      await migrationDisclaimerAcceptance.handler();
    }
    throw err
  }
}

export async function getMigrationDisclaimer(): Promise<ModelDisclaimer> {
  // GET /migrate/disclaimer
  const endpoint = "/migrate/disclaimer";
  const apiToken = await getApiToken()
  const options = {
    "method": "GET",
    "headers": ServiceAPI.getHeaders(apiToken)
  };

  const response = await ServiceAPI.runFetch(endpoint, options);
  const disclaimerData = (await response.json()) as ModelDisclaimer;

  return disclaimerData;
}

export async function postMigrationDisclaimerAcceptance(
  accepted: boolean
): Promise<ResponseMessage> {
  // POST /migrate/disclaimer/acceptance
  const endpoint = "/migrate/disclaimer/acceptance";
  const apiToken = await getApiToken()
  const options = {
    "method": "POST",
    "headers": ServiceAPI.getHeaders(apiToken),
    "body": JSON.stringify({
      accepted
    })
  };

  const response = await ServiceAPI.runFetch(endpoint, options);
  const disclaimerData = (await response.json()) as ResponseMessage;

  return disclaimerData;
}

