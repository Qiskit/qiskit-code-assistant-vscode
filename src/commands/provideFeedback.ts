import vscode from "vscode";
import { getServiceApi } from "../services/common";

const PROMPT_FEEDBACK_MSG = "Please share any detailed feedback you have about the Qiskit Code Assistant. The details of your completions as well as this message will be sent to the Qiskit Code Assistant team in order to improve the service.";
const DEFAULT_FEEDBACK_MSG = "$(feedback) Provide feedback";
const FEEDBACK_RESPONSE_MSG = "Thank you for sharing your feedback with the Qiskit Code Assistant team.";

async function handler(
  modelId: string,
  promptId: undefined|string,
  positiveFeedback: undefined|boolean,
  callback: (() => void)|undefined,
): Promise<void> {
  console.log(`providing feedback with ${modelId}, ${promptId}, ${positiveFeedback}`);

  let comment;
  if (positiveFeedback === undefined) {
    comment = await vscode.window.showInputBox({
      prompt: promptId ? PROMPT_FEEDBACK_MSG : DEFAULT_FEEDBACK_MSG
    });
  }

  const serviceApi = await getServiceApi();
  const response = await serviceApi.postFeedback(modelId, promptId, positiveFeedback, comment);

  if (response.message) {
    if (callback) {
      callback();
    }
    vscode.window.showInformationMessage(FEEDBACK_RESPONSE_MSG);
  }
}

const command: CommandModule = {
  identifier: "qiskit-vscode.provide-feedback",
  handler,
};

export default command;
