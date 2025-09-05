export const BRAND_NAME = "BAM Code";
export const STATUS_NAME = "qiskitCodeAssistant";
export const CHAR_LIMIT = 4_000;

export const DEFAULT_MODEL_PARAMETERS: ModelParameters = {
  temperature: 0.2,
  max_new_tokens: 60
}

export enum PromptType {
  FillInMiddle,
  PredictNext,
}

export const PROVIDE_FEEDBACK = "Provide feedback"
export const DISMISS = "Dismiss"
export const FEEDBACK_RESPONSE_MSG = "Thank you for sharing your feedback with the Qiskit Code Assistant team.";
export const MIGRATION_FEEDBACK_MSG = "Please share any detailed feedback you have about the Qiskit Code Assistant Migration. The details of your migration as well as this message will be sent to the Qiskit Code Assistant team in order to improve the service.";
