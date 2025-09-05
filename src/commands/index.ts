import acceptDisclaimer from "./acceptDisclaimer";
import { acceptSuggestionCommand, dismissSuggestionCommand} from "./acceptSuggestion";
import selectModel from "./selectModel";
import handleGetCompletion from "./handleGetCompletion";
import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "./handleStatusBar";
import { handleProvideFeedback, handleClearCodelens} from "./handleFeedback";
import setApiToken from "./setApiToken";
import migrateQiskitCode from "./migrateQiskitCode";
import migrationFeedback from "./migrationFeedback";
import debugStreaming from "./debugStreaming";

const commands: CommandModule[] = [
  acceptDisclaimer,
  acceptSuggestionCommand,
  debugStreaming,
  dismissSuggestionCommand,
  handleChangeModelStatusBar,
  handleClearCodelens,
  handleGetCompletion,
  migrateQiskitCode,
  migrationFeedback,
  handleProvideFeedbackStatusBar,
  handleProvideFeedback,
  selectModel,
  setApiToken,
];

export default commands.map((command) => ({
  ...command,
}));
