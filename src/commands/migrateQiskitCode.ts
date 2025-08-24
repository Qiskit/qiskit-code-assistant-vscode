import vscode from "vscode";
import { migrateCode, MigrationResult } from "../services/qiskitMigration";
import { setDefaultStatus, setLoadingStatus, setErrorStatus } from "../statusBar/statusBar";
import { currentModel } from "./selectModel";
import { getServiceApi } from "../services/common";

let isRunning = false;

async function showMigrationFeedback(migrationResult: MigrationResult): Promise<void> {
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

  // Show feedback even without migration ID - we can still collect general feedback
  console.log("Showing migration feedback dialog");

  // Show feedback options after a short delay to let user see the result
  setTimeout(async () => {
    const feedbackChoice = await vscode.window.showInformationMessage(
      "How was the migration result?",
      "Helpful",
      "Not helpful",
      "Provide detailed feedback",
      "✕ Dismiss"
    );

    if (feedbackChoice === "✕ Dismiss") {
      return;
    }

    let positiveFeedback: boolean | undefined = undefined;
    let comment: string | undefined = undefined;

    if (feedbackChoice === "Helpful") {
      positiveFeedback = true;
    } else if (feedbackChoice === "Not helpful") {
      positiveFeedback = false;
    }

    if (feedbackChoice === "Provide detailed feedback" || positiveFeedback !== undefined) {
      const promptMessage = positiveFeedback === undefined 
        ? "Please share your feedback about the migration result:"
        : `Thank you for your ${positiveFeedback ? 'positive' : 'negative'} feedback! Would you like to provide additional details?`;
      
      comment = await vscode.window.showInputBox({
        prompt: promptMessage,
        placeHolder: "Your feedback helps improve the migration service..."
      });

      // If user cancelled the input but had given thumbs up/down, still send that feedback
      if (!comment && positiveFeedback === undefined) {
        return;
      }
    }

    try {
      // Show progress while submitting feedback
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Submitting feedback...",
        cancellable: false
      }, async (progress) => {
        progress.report({ increment: 0, message: "Sending feedback to Qiskit Code Assistant service" });
        
        await serviceApi.postFeedback(
          currentModel!._id, // We already checked for null above
          migrationResult.migrationId || undefined, // Allow undefined migration ID
          positiveFeedback,
          comment,
          migrationResult.originalCode,
          migrationResult.migratedCode
        );
        
        progress.report({ increment: 100, message: "Feedback submitted successfully" });
      });

      vscode.window.showInformationMessage("Thank you for your feedback!");
    } catch (error) {
      console.error("Failed to submit migration feedback:", error);
      
      // Provide more detailed error information to user
      let errorMessage = "Failed to submit feedback. ";
      if (error instanceof Error) {
        console.log("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        
        if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage += "Please check your internet connection and try again.";
        } else if (error.message.includes("401") || error.message.includes("403")) {
          errorMessage += "Authentication failed. Please check your API token.";
        } else if (error.message.includes("404")) {
          errorMessage += "Feedback service not found. Please try again later.";
        } else if (error.message.includes("429")) {
          errorMessage += "Too many requests. Please wait a moment and try again.";
        } else if (error.message.includes("500") || error.message.includes("Internal Server Error")) {
          errorMessage += "Server error. The service may be temporarily unavailable.";
        } else if (error.message.includes("API Token")) {
          errorMessage += "Please check your API token configuration.";
        } else {
          errorMessage += `Error: ${error.message}`;
        }
      } else {
        errorMessage += "An unexpected error occurred. Please try again later.";
      }
      
      vscode.window.showErrorMessage(errorMessage, "Retry", "Cancel").then(async (selection) => {
        if (selection === "Retry") {
          // Retry the feedback submission
          setTimeout(() => showMigrationFeedback(migrationResult), 500);
        }
      });
    }
  }, 1000); // 1 second delay
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
      await showMigrationFeedback(migrationResult);
    } catch (feedbackError) {
      console.error("Error showing migration feedback:", feedbackError);
      // don't throw the error, just log it so migration success isn't affected
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
