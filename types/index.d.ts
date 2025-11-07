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

type CompletionType = "normal" | "snippet";

interface CommandModule {
  identifier: string,
  handler: (...args: any[]) => any
}

interface ServiceInfo {
  name: string,
  openapi: string,
  docs: string,
  message?: string
}

interface ModelInfo {
  _id: string,
  delimiting_tokens?: ModelSpecialTokens,
  disclaimer?: { accepted?: boolean },
  display_name: string,
  doc_link: string,
  endpoints?: ModelEndpoints,
  license: { name: string, link: string }
  model_id: string,
  moderations?: ModelModerations,
  parameters?: ModelParameters,
  prompt_type?: number,
  token_limit?: number,
}

interface ModelsList {
  models: ModelInfo[];
}

interface ModelDisclaimerAcceptance {
  model?: string,
  accepted: boolean
}

interface ModelPromptAcceptance {
  accepted: boolean
}

interface ModelDisclaimer extends ModelDisclaimerAcceptance {
  _id: string,
  version: string,
  title: string,
  body: string,
}

interface ModelPrompt {
  input: string,
  parameters?: ModelParameters,
  moderations?: ModelModerations
}

interface ModelPromptResults {
  generated_text?: string,
  generated_token_count?: number,
  input_token_count?: number,
  stop_reason?: number
}

interface ModelPromptResponse {
  results: ModelPromptResults[],
  prompt_id: string,
  created_at?: string
}

interface MigrationResponse {
  model_id: string,
  migration_id: string,
  migrated_code: string,
  plan_steps?: string[],
  final_thoughts?: string,
  context?: any,
  created_at: string
}

interface ResponseMessage {
  success?: boolean
  message?: string
}

interface ModelEndpoints {
  generation_endpoint?: string,
  moderation_endpoint?: string
}

interface ModelParameters {
  temperature?: number,
  max_new_tokens?: number
}

interface ModelModerations {
  hap?: number,
  implicit_hate?: number,
  stigma?: number
}

interface ModelSpecialTokens {
  start_token: string,
  middle_token: string,
  end_token: string
}

interface QiskitAccountJson {
  [key: string]: {
    token?: string
  }
}
