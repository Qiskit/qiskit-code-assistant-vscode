import * as vscode from "vscode";
import type { ExtensionContext } from "vscode";

import { getExtensionContext } from "../globals/extensionContext";
import { getServiceApi } from "../services/common";
import { setDefaultStatus, setLoadingStatus } from "../statusBar/statusBar";

let modelsList: ModelInfo[] = [];

export let currentModel: ModelInfo | undefined = undefined;

export function setAsCurrentModel(model: ModelInfo): void {
  currentModel = model;
  if (modelsList?.length > 0) {
    const index = modelsList.findIndex((m) => m._id == model._id);
    if (index > -1) modelsList[index] = model;
  }
}

/**
 * Invalidates the current model selection and clears the models list.
 * Call this when the service API changes to prevent "model not found" errors.
 */
export function invalidateCurrentModel(): void {
  currentModel = undefined;
  modelsList = [];
  setDefaultStatus();
}

export async function initModels(context: ExtensionContext | null): Promise<void> {
  if (!context) return;

  const apiService = await getServiceApi();

  if (!modelsList || modelsList.length == 0) {
    try {
      setLoadingStatus();
      modelsList = await apiService.getModels();
    } catch (err) {
      vscode.window.showErrorMessage((err as Error).message);
      currentModel = undefined;
      setDefaultStatus();
      return;
    }
  }

  if (modelsList?.length == 1) {
    setAsCurrentModel(modelsList[0]);
  }

  setDefaultStatus();
}

async function handler(): Promise<ModelInfo | undefined> {
  const context = getExtensionContext();
  await initModels(context);

  const modelNames = [...modelsList.map((m) => m.display_name)];
  const result = await vscode.window.showQuickPick(modelNames, { title: "Select Model" });
  if (result) {
    const selectedModel = modelsList.find((m) => m.display_name == result);
    if (selectedModel) {
      if (selectedModel.disclaimer?.accepted) {
        currentModel = selectedModel;
        setDefaultStatus();
      } else {
        currentModel = undefined;
        try {
          setLoadingStatus();
          const apiService = await getServiceApi();
          currentModel = await apiService.getModel(selectedModel._id);
        } catch (err) {
          vscode.window.showErrorMessage((err as Error).message);
          return;
        } finally {
          setDefaultStatus();
        }

        return currentModel;
      }
    } else {
      vscode.window.showInformationMessage("No model selected");
      currentModel = undefined;
      setDefaultStatus();
    }
  }

  return;
}

const command: CommandModule = {
  identifier: "qiskit-vscode.select-model",
  handler,
};

export default command;
