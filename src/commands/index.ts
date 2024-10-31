import acceptDisclaimer from "./acceptDisclaimer";
import { acceptSuggestionCommand, dismissSuggestionCommand} from "./acceptSuggestion";
import selectModel from "./selectModel";
import handleGetCompletion from "./handleGetCompletion";
import { handleChangeModelStatusBar, handleProvideFeedbackStatusBar } from "./handleStatusBar";
import provideFeedback from "./provideFeedback";
import setApiToken from "./setApiToken";

const commands: CommandModule[] = [
  acceptDisclaimer,
  acceptSuggestionCommand,
  dismissSuggestionCommand,
  handleChangeModelStatusBar,
  handleGetCompletion,
  handleProvideFeedbackStatusBar,
  provideFeedback,
  selectModel,
  setApiToken,
];

export default commands.map((command) => ({
  ...command,
}));
