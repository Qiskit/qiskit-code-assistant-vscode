import vscode from "vscode";
import { currentModel } from "./selectModel";
import { getServiceApi } from "../services/common";

async function migrationFeedbackHandler(): Promise<void> {
  console.log("qiskit-vscode.migration-feedback::handler");

  if (!currentModel) {
    vscode.window.showErrorMessage("Please select a model before providing migration feedback.");
    return;
  }

  const serviceApi = await getServiceApi();
  if (!serviceApi.enableFeedback) {
    vscode.window.showInformationMessage("Feedback is not enabled for this service.");
    return;
  }

  // Ask for general migration feedback when user manually triggers it
  const comment = await vscode.window.showInputBox({
    prompt: "Share your feedback about the Qiskit Code Assistant migration feature:",
    placeHolder: "Your feedback helps improve the migration service..."
  });

  if (!comment) {
    return; // User cancelled
  }

  try {
    await serviceApi.postFeedback(
      currentModel._id,
      undefined, // No specific migration ID for general feedback
      undefined, // No positive/negative classification for general feedback
      comment,
      undefined, // No specific input
      undefined  // No specific output
    );

    vscode.window.showInformationMessage("Thank you for your feedback about the migration feature!");
  } catch (error) {
    console.error("Failed to submit migration feedback:", error);
    vscode.window.showErrorMessage("Failed to submit feedback. Please try again later.");
  }
}

const command: CommandModule = {
  identifier: "qiskit-vscode.migration-feedback",
  handler: migrationFeedbackHandler,
};

export default command;
