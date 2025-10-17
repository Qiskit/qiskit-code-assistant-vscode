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

import * as semver from "semver";
import codeAssistantExtensionProperties from "./extensionProperties";

const INLINE_API_PROPOSED_VERSION = "1.58.0";
const INLINE_API_RELEASE_VERSION = "1.68.0";

export function isInlineSuggestionProposedApiSupported(): boolean {
  return semver.gte(
    codeAssistantExtensionProperties.vscodeVersion,
    INLINE_API_PROPOSED_VERSION
  );
}
export function isInlineSuggestionReleasedApiSupported(): boolean {
  return semver.gte(
    codeAssistantExtensionProperties.vscodeVersion,
    INLINE_API_RELEASE_VERSION
  );
}
