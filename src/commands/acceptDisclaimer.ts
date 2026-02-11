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
import { getServiceApi } from "../services/common";
import { setDefaultStatus, setLoadingStatus } from "../statusBar/statusBar";
import { migrationDisclaimerHTML, modelDisclaimerHTML } from "../utilities/disclaimer";
import { setAsCurrentModel } from "./selectModel";
import { getMigrationDisclaimer, postMigrationDisclaimerAcceptance } from "../services/qiskitMigration";

export interface DisclaimerState {
  panel: vscode.WebviewPanel | undefined;
  model: ModelInfo | undefined;
  acceptFlag: boolean;
}

interface InternalDisclaimerState extends DisclaimerState {
  isLoading: boolean;
}

// Separate state for model and migration disclaimers to prevent corruption
const modelDisclaimerState: InternalDisclaimerState = {
  panel: undefined,
  model: undefined,
  acceptFlag: false,
  isLoading: false
};

const migrationDisclaimerState: InternalDisclaimerState = {
  panel: undefined,
  model: undefined,  // Always undefined for migration, but kept for interface consistency
  acceptFlag: false,
  isLoading: false
};

// Exported for testing purposes only - provides read-only access to model disclaimer state
// WARNING: Do not mutate this object directly
export const disclaimerState: DisclaimerState = modelDisclaimerState;

async function handler(model: ModelInfo): Promise<void> {
  const context = getExtensionContext();
  if (!context) return;

  // Early validation before touching state
  if (!model || model.disclaimer?.accepted) return;

  // Prevent concurrent executions
  if (modelDisclaimerState.isLoading) {
    console.warn('Model disclaimer handler already in progress');
    return;
  }

  modelDisclaimerState.isLoading = true;

  try {
    // Dispose existing panel if any
    if (modelDisclaimerState.panel) {
      modelDisclaimerState.panel.dispose();
    }

    // Fetch disclaimer first, before setting state
    const apiService = await getServiceApi();
    let disclaimer = null;
    try {
      setLoadingStatus();
      disclaimer = await apiService.getModelDisclaimer(model._id);
    } catch (err) {
      vscode.window.showErrorMessage((err as Error).message);
      return;
    } finally {
      setDefaultStatus();
    }

    if (disclaimer.accepted) {
      // disclaimer has already been accepted
      modelDisclaimerState.panel = undefined;
      modelDisclaimerState.model = undefined;
      modelDisclaimerState.acceptFlag = false;
      model.disclaimer!.accepted = true;
    } else {
      // Now set state only when we're sure we'll create the panel
      modelDisclaimerState.acceptFlag = false;
      modelDisclaimerState.model = model;

      modelDisclaimerState.panel = vscode.window.createWebviewPanel(
        'modelDisclaimer',
        'Qiskit Code Assistant Model Disclaimer for ' + model.display_name,
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: false
        }
      );

      modelDisclaimerState.panel.webview.html = modelDisclaimerHTML(model, disclaimer);
      modelDisclaimerState.panel.webview.onDidReceiveMessage(async (m) => {
        switch (m.command) {
          case "accept":
            await apiService.postDisclaimerAcceptance(model._id, disclaimer.id, true);
            modelDisclaimerState.acceptFlag = true;
            model.disclaimer!.accepted = true;
            setAsCurrentModel(model);
            modelDisclaimerState.panel?.dispose();
            return;
          default:
            console.log("Unknown disclaimer webview message: ", m);
        }
      });
        modelDisclaimerState.panel.onDidDispose(() => {
          modelDisclaimerState.panel = undefined;
          modelDisclaimerState.model = undefined;
          modelDisclaimerState.acceptFlag = false;
        }, null, context.subscriptions);

        modelDisclaimerState.panel.reveal();
      }
  } finally {
    modelDisclaimerState.isLoading = false;
  }
}

async function migrationDisclaimerHandler(): Promise<void> {
  const context = getExtensionContext();
  if (!context) return;

  // Prevent concurrent executions
  if (migrationDisclaimerState.isLoading) {
    console.warn('Migration disclaimer handler already in progress');
    return;
  }

  migrationDisclaimerState.isLoading = true;

  try {
    // Dispose existing panel if any
    if (migrationDisclaimerState.panel) {
      migrationDisclaimerState.panel.dispose();
    }

    // Fetch disclaimer first
    let disclaimer = null;
    try {
      setLoadingStatus();
      disclaimer = await getMigrationDisclaimer();
    } catch (err) {
      vscode.window.showErrorMessage((err as Error).message);
      return;
    } finally {
      setDefaultStatus();
    }

    // Set state only when we're sure we'll create the panel
    migrationDisclaimerState.acceptFlag = false;

  migrationDisclaimerState.panel = vscode.window.createWebviewPanel(
    'migrationDisclaimer',
    'Qiskit Code Assistant Migration Disclaimer',
    vscode.ViewColumn.Two,
    {
      enableScripts: true,
      retainContextWhenHidden: false
    }
  );

  migrationDisclaimerState.panel.webview.html = migrationDisclaimerHTML(disclaimer);
  migrationDisclaimerState.panel.webview.onDidReceiveMessage(async (m) => {
    switch (m.command) {
      case "accept":
        await postMigrationDisclaimerAcceptance(true);
        migrationDisclaimerState.panel?.dispose();
        return;
      default:
        console.log("Unknown disclaimer webview message: ", m);
    }
  });
    migrationDisclaimerState.panel.onDidDispose(() => {
      migrationDisclaimerState.panel = undefined;
      migrationDisclaimerState.model = undefined;
      migrationDisclaimerState.acceptFlag = false;
    }, null, context.subscriptions);

    migrationDisclaimerState.panel.reveal();
  } finally {
    migrationDisclaimerState.isLoading = false;
  }
}

const disclaimerAcceptance: CommandModule = {
  identifier: "qiskit-vscode.disclaimer-acceptance",
  handler,
};

export const migrationDisclaimerAcceptance: CommandModule = {
  identifier: "qiskit-vscode.migration-disclaimer-acceptance",
  handler: migrationDisclaimerHandler,
};

export default disclaimerAcceptance;
