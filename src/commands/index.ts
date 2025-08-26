import acceptDisclaimer from "./acceptDisclaimer";
import { acceptSuggestionCommand, dismissSuggestionCommand} from "./acceptSuggestion";
import selectModel from "./selectModel";
import handleGetCompletion from "./handleGetCompletion";
import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "./handleStatusBar";
import { handleProvideFeedback, handleClearCodelens} from "./handleFeedback";
import setApiToken from "./setApiToken";
import migrateQiskitCode from "./migrateQiskitCode";

const commands: CommandModule[] = [
  acceptDisclaimer,
  acceptSuggestionCommand,
  dismissSuggestionCommand,
  handleChangeModelStatusBar,
  handleClearCodelens,
  handleGetCompletion,
  migrateQiskitCode,
  handleProvideFeedbackStatusBar,
  handleProvideFeedback,
  selectModel,
  setApiToken,
];

export default commands.map((command) => ({
  ...command,
}));
