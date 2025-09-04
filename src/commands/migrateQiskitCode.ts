import vscode from "vscode";
import { migrateCode } from "../services/qiskitMigration";
import { setDefaultStatus, setLoadingStatus } from "../statusBar/statusBar";
import { getServiceApi } from "../services/common";
import { DISMISS, FEEDBACK_RESPONSE_MSG, PROVIDE_FEEDBACK } from "../globals/consts";

const MIGRATION_FEEDBACK_MSG = "Please share any detailed feedback you have about the Qiskit Code Assistant Migration. The details of your migration as well as this message will be sent to the Qiskit Code Assistant team in order to improve the service.";

let isRunning = false;

function migrationCompletionMsg(outputText: string, isFullDoc: boolean) {
  if (!outputText) {
    return isFullDoc ? "No code was found in the document that needed to be migrated" : "No code was found in the selected lines that needed to be migrataed"
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
  setLoadingStatus();

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
    const notificationTitle = `Migrating the ${selection.isEmpty ? "document" : "selected"} code`;

    let end = lastLine.range.end;
    let migrationResult = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      cancellable: false,
      title: notificationTitle
    }, async (progress):Promise<any> => {
      
      progress.report({  increment: 10, message: "Please wait..." });

      let t = "", g = "", m = ""
      let responseData = migrateCode(text);
      let step = 0;
      for await (let chunk of responseData) {
        if ((chunk as unknown as {error: string})?.error) {
          throw Error((chunk as unknown as {error: string})?.error)
        }

        if (!m) {
          m = chunk.model_id
        }
        if (!g) {
          g = chunk.migration_id
        }

        // update notidication message based on streaming data progress
        if (chunk.plan_steps && step < 1) {
          progress.report({  message: "Planning migration...", increment: 25 });
          step = 1;
        }
        if (chunk.final_thoughts && step < 2) {
          progress.report({  message: "Reviewing migration...", increment: 25 });
          step = 2;
        }
        if (chunk.migrated_code && step < 3) {
          progress.report({  message: "Returning response...", increment: 25 });
          step = 3;
        }

        if (step == 3) {
          t += chunk.migrated_code

          // calculate the new text range for the additional
          // streaming data to be inserted into document
          const migratedLines = t.split("\n");
          const newLastLine = firstLine.lineNumber + migratedLines.length - 1;
          const lastChar = migratedLines[migratedLines.length - 1].length + 1;
          const lastPosition = new vscode.Position(newLastLine, lastChar);
          const textRange = new vscode.Range(firstLine.range.start, end);

          end = lastPosition;

          editor.edit(editBuilder => {
            editBuilder.replace(textRange, t);
          });
        }
      }

      progress.report({ increment: 100 });
      return {
        input: text,
        migrated_code: t,
        migration_id: g,
        model_id: m
      }
    });

    if (text.trim() == migrationResult.migrated_code.trim()) {
      migrationResult.migrated_code = ""
    } else {
      editor.selection = new vscode.Selection(firstLine.range.start, end);
    }

    const infoMsg = migrationCompletionMsg(migrationResult.migrated_code, fullDocMigration)
    const hasFeedback = await vscode.window.showInformationMessage(
      infoMsg,
      PROVIDE_FEEDBACK,
      DISMISS
    );

    if (hasFeedback != DISMISS) {
      const comment = await vscode.window.showInputBox({
        prompt: MIGRATION_FEEDBACK_MSG
      });

      if (comment) {
        const serviceApi = await getServiceApi();
        await serviceApi.postFeedback({
          ...migrationResult,
          comment
        });

        vscode.window.showInformationMessage(FEEDBACK_RESPONSE_MSG)
      }
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
