import vscode from "vscode";
import { migrateCode, MigrationResult } from "../services/qiskitMigration";
import { setDefaultStatus, setLoadingStatus } from "../statusBar/statusBar";
import { currentModel } from "./selectModel";
import { getServiceApi } from "../services/common";
import { addPromptFeedbackCodeLens } from "../codelens/FeedbackCodelensProvider";

let isRunning = false;

async function showMigrationFeedback(migrationResult: MigrationResult, migrationStartPosition: vscode.Position): Promise<void> {
  console.log("showMigrationFeedback called with:", {
    hasCurrentModel: !!currentModel,
    migrationId: migrationResult.migrationId,
    hasOriginalCode: !!migrationResult.originalCode,
    hasMigratedCode: !!migrationResult.migratedCode
  });

  if (!currentModel) {
    console.log("No current model selected, skipping feedback");
    return; // Can't provide feedback without model
  }

  const serviceApi = await getServiceApi();
  console.log("Service API feedback enabled:", serviceApi.enableFeedback);
  
  if (!serviceApi.enableFeedback) {
    console.log("Feedback not enabled for this service, skipping feedback");
    return; // Feedback not enabled for this service
  }

  // Use the same CodeLens feedback system as normal completions
  console.log("Adding migration feedback CodeLens");

  // Add CodeLens with thumbs up/down icons above the migrated code
  await addPromptFeedbackCodeLens(
    currentModel!._id,
    migrationResult.migrationId, // Use migration_id as prompt_id equivalent  
    migrationStartPosition, // Position where the migration started
    migrationResult.originalCode, // input
    migrationResult.migratedCode  // output
  );

  // Trigger CodeLens refresh to show the feedback icons
  vscode.commands.executeCommand('vscode.executeCodeLensProvider');
}

function migrationCompletionMsg(migrationResult: MigrationResult | null, isFullDoc: boolean) {
  if (!migrationResult || !migrationResult.migratedCode) {
    return isFullDoc ? "No code was found in the document that needed to be migrated" : "No code was found in the selected lines that needed to be migrated"
  } else {
    return isFullDoc ? "Document successfully migrated" : "Selected code successfully migrated";
  }
}

async function handler(): Promise<void> {
  console.log("qiskit-vscode.migrate-code::handler");

  const editor = vscode.window.activeTextEditor;
  if (!editor || isRunning) {
    return; // No open text editor or already running
  }

  isRunning = true;
  setLoadingStatus('connecting');

  const selection = editor.selection;
  let firstLine: vscode.TextLine;
  let lastLine: vscode.TextLine;
  let fullDocMigration: boolean;

  if (selection.isEmpty) {
    firstLine = editor.document.lineAt(0);
    lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    fullDocMigration = true;
  } else {
    firstLine = editor.document.lineAt(selection.start.line);
    lastLine = editor.document.lineAt(selection.end.line);
    fullDocMigration = false;
  }

  const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
  const text = editor.document.getText(textRange);

  const message = selection.isEmpty ? "Do you want to migrate the entire document?" : "Do you want to migrate the selected lines of text?";
  const runMigrate = await vscode.window.showInformationMessage(message, "Yes", "No");

  if (runMigrate === "No") {
    setDefaultStatus();
    isRunning = false;
    return;
  }

  try {
    setLoadingStatus('connecting');
    
    const migrationResult = await (async (): Promise<MigrationResult | null> => {
      setLoadingStatus('generating');
      
      let result = await migrateCode(text);

      setLoadingStatus('processing');

      if (text.trim() === result.migratedCode.trim()) {
        return null; 

      }

      return result;
    })();

    const infoMsg = migrationCompletionMsg(migrationResult, fullDocMigration)
    if (!migrationResult || !migrationResult.migratedCode) {
      vscode.window.showInformationMessage(infoMsg);
      return;
    }

    editor.edit(editBuilder => {
      editBuilder.replace(textRange, migrationResult.migratedCode);
    });
    const migratedLines = migrationResult.migratedCode.split("\n");
    const newLastLine = firstLine.lineNumber + migratedLines.length - 1;
    const lastChar = migratedLines[migratedLines.length - 1].length + 1;
    const lastPosition = new vscode.Position(newLastLine, lastChar);
    
    editor.selection = new vscode.Selection(firstLine.range.start, lastPosition);
    vscode.window.showInformationMessage(infoMsg);

    // Show feedback options after successful migration
    try {
      await showMigrationFeedback(migrationResult, firstLine.range.start);
    } catch (feedbackError) {
      console.error("Error showing migration feedback:", feedbackError);
      // Don't throw the error, just log it so migration success isn't affected
    }
  } catch(error) {
    throw error;
  } finally {
    setDefaultStatus();
    isRunning = false;
  }
}

const command: CommandModule = {
  identifier: "qiskit-vscode.migrate-code",
  handler,
};

export default command;
