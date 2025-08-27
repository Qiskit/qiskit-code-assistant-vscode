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
  const apiToken = await getApiToken()
  const options = {
    'method': 'POST',
    'headers': ServiceAPI.getHeaders(apiToken),
    
    'body': JSON.stringify({
      code,
      version_from: fromVersion,
      version_to: toVersion
    })
  };

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
