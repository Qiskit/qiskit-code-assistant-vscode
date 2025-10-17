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
export const DISCLAIMER_ERROR_MSG = "Disclaimer has not yet been accepted"
