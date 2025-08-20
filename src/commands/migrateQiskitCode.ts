import vscode from "vscode";
import { migrateCode } from "../services/qiskitMigration";
import { setDefaultStatus, setLoadingStatus } from "../statusBar/statusBar";

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
    const notificationTitle = `Reviewing and migrating the ${selection.isEmpty ? "document" : "selected"} code. Please wait...` 
    const migratedText = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      cancellable: false,
      title: notificationTitle
    }, async (progress):Promise<string> => {
      
      progress.report({  increment: 25 });

      let t = await migrateCode(text);

      if (text.trim() == t.trim()) {
        t = ""
      }

      progress.report({ increment: 100 });
      return t;
    });

    const infoMsg = migrationCompletionMsg(migratedText, fullDocMigration)
    if (!migratedText) {
      vscode.window.showInformationMessage(infoMsg);
      return;
    }

    editor.edit(editBuilder => {
      editBuilder.replace(textRange, migratedText);
    });
    const migratedLines = migratedText.split("\n");
    const newLastLine = firstLine.lineNumber + migratedLines.length - 1;
    const lastChar = migratedLines[migratedLines.length - 1].length + 1;
    const lastPosition = new vscode.Position(newLastLine, lastChar);
    
    editor.selection = new vscode.Selection(firstLine.range.start, lastPosition);
    vscode.window.showInformationMessage(infoMsg);
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
