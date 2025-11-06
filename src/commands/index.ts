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

import acceptDisclaimer, { migrationDisclaimerAcceptance } from "./acceptDisclaimer";
import { acceptSuggestionCommand, dismissSuggestionCommand} from "./acceptSuggestion";
import selectModel from "./selectModel";
import handleGetCompletion from "./handleGetCompletion";
import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "./handleStatusBar";
import { handleProvideFeedback, handleClearCodelens} from "./handleFeedback";
import setApiToken, { selectCredentialCommand, resetCredentialSelectionCommand } from "./setApiToken";
import migrateQiskitCode from "./migrateQiskitCode";

const commands: CommandModule[] = [
  acceptDisclaimer,
  acceptSuggestionCommand,
  dismissSuggestionCommand,
  handleChangeModelStatusBar,
  handleClearCodelens,
  handleGetCompletion,
  migrateQiskitCode,
  migrationDisclaimerAcceptance,
  handleProvideFeedbackStatusBar,
  handleProvideFeedback,
  selectModel,
  setApiToken,
  selectCredentialCommand,
  resetCredentialSelectionCommand,
];

export default commands.map((command) => ({
  ...command,
}));
