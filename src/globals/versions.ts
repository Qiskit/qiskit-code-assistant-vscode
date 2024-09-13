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
