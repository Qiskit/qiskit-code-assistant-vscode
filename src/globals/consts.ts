export const BRAND_NAME = "BAM Code";
export const STATUS_NAME = "qiskitCodeAssistant";
export const CHAR_LIMIT = 4_000;

export const CHOOSE_FEEDBACK_COMMAND = "aiautocomplete.send-feedback";
export const FEEDBACK_SET_API_KEY_COMMAND = "aiautocomplete.set-feedback-key";
export const FEEDBACK_API_KEY_STORAGE_NAME = "aiautocomplete.feedback-api-key";

export const DEFAULT_MODEL_PARAMETERS: ModelParameters = {
  temperature: 0.2,
  max_new_tokens: 60
}

export enum PromptType {
  FillInMiddle,
  PredictNext,
}
