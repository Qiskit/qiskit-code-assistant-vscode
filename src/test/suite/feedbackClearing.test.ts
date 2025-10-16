import { expect } from 'chai';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as acceptSuggestionModule from '../../commands/acceptSuggestion';
import * as runCompletionModule from '../../utilities/runCompletion';
import * as feedbackCodelensModule from '../../codelens/FeedbackCodelensProvider';
import * as handleFeedbackModule from '../../commands/handleFeedback';

suite('Feedback Clearing Test Suite', () => {
  let sandbox: sinon.SinonSandbox;
  let clearPromptFeedbackCodeLensStub: sinon.SinonStub;
  let executeCommandStub: sinon.SinonStub;
  let updateUserAcceptanceStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();

    // Stub the feedback clearing function
    clearPromptFeedbackCodeLensStub = sandbox.stub(feedbackCodelensModule, 'clearPromptFeedbackCodeLens').resolves();

    // Stub vscode commands
    executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand').resolves();

    // Stub updateUserAcceptance
    updateUserAcceptanceStub = sandbox.stub(runCompletionModule, 'updateUserAcceptance').resolves();
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('Accept Suggestion Handler', () => {
    test('Should clear feedback when suggestion is accepted', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      await handler();

      // Verify feedback was cleared
      expect(clearPromptFeedbackCodeLensStub.callCount).to.be.greaterThan(0);

      // Verify user acceptance was updated
      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(updateUserAcceptanceStub.calledWith(true)).to.be.true;

      // Verify inline suggestion commit was triggered
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.commit')).to.be.true;
    });

    test('Should call clearPromptFeedbackCodeLens via command', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      await handler();

      // Verify the clear codelens command was called
      expect(executeCommandStub.calledWith(handleFeedbackModule.handleClearCodelens.identifier)).to.be.true;
    });

    test('Should not await feedback clearing, allowing errors to be handled asynchronously', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      // Make clearPromptFeedbackCodeLens throw an error
      clearPromptFeedbackCodeLensStub.rejects(new Error('Clear failed'));

      // Handler doesn't await the executeCommand for clearing, so it won't throw
      // The error would be caught by VSCode's command infrastructure
      await handler();

      // Verify the handler completed despite the clear command potentially failing
      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.commit')).to.be.true;
    });
  });

  suite('Dismiss Suggestion Handler', () => {
    test('Should clear feedback when suggestion is dismissed', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;

      await handler();

      // Verify feedback was cleared
      expect(clearPromptFeedbackCodeLensStub.callCount).to.be.greaterThan(0);

      // Verify user acceptance was updated with false
      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(updateUserAcceptanceStub.calledWith(false)).to.be.true;

      // Verify inline suggestion hide was triggered
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.hide')).to.be.true;
    });

    test('Should clear feedback before hiding suggestion', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;
      const callOrder: string[] = [];

      clearPromptFeedbackCodeLensStub.callsFake(async () => {
        callOrder.push('clearFeedback');
      });

      executeCommandStub.callsFake(async (command: string) => {
        if (command === 'editor.action.inlineSuggest.hide') {
          callOrder.push('hideSuggestion');
        }
        if (command === handleFeedbackModule.handleClearCodelens.identifier) {
          callOrder.push('clearCodelens');
        }
      });

      await handler();

      // Verify clear was called before hide
      const clearIndex = callOrder.indexOf('clearCodelens');
      const hideIndex = callOrder.indexOf('hideSuggestion');

      expect(clearIndex).to.be.lessThan(hideIndex,
        'Feedback should be cleared before hiding suggestion');
    });
  });

  suite('Feedback Persistence Prevention', () => {
    test('Should prevent feedback from persisting after accept', async () => {
      const acceptHandler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      // Simulate accepting a suggestion
      await acceptHandler();

      // Verify clearPromptFeedbackCodeLens was called
      expect(clearPromptFeedbackCodeLensStub.called).to.be.true;

      // Verify the clearing happened through the command system
      expect(executeCommandStub.calledWith(handleFeedbackModule.handleClearCodelens.identifier)).to.be.true;
    });

    test('Should prevent feedback from persisting after dismiss', async () => {
      const dismissHandler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;

      // Simulate dismissing a suggestion
      await dismissHandler();

      // Verify clearPromptFeedbackCodeLens was called
      expect(clearPromptFeedbackCodeLensStub.called).to.be.true;
    });

    test('Accept and dismiss should both clear feedback consistently', async () => {
      const acceptHandler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;
      const dismissHandler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;

      // Test accept
      await acceptHandler();
      const acceptClearCount = clearPromptFeedbackCodeLensStub.callCount;

      clearPromptFeedbackCodeLensStub.resetHistory();

      // Test dismiss
      await dismissHandler();
      const dismissClearCount = clearPromptFeedbackCodeLensStub.callCount;

      // Both should clear feedback at least once
      expect(acceptClearCount).to.be.greaterThan(0, 'Accept should clear feedback');
      expect(dismissClearCount).to.be.greaterThan(0, 'Dismiss should clear feedback');
    });
  });

  suite('Command Execution Order', () => {
    test('Accept handler should execute commands in correct order', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;
      const executionOrder: string[] = [];

      updateUserAcceptanceStub.callsFake(async () => {
        executionOrder.push('updateAcceptance');
      });

      executeCommandStub.callsFake(async (command: string) => {
        if (command === handleFeedbackModule.handleClearCodelens.identifier) {
          executionOrder.push('clearFeedback');
        } else if (command === 'editor.action.inlineSuggest.commit') {
          executionOrder.push('commitSuggestion');
        }
      });

      await handler();

      // Verify order: update -> clear -> commit
      expect(executionOrder).to.deep.equal([
        'updateAcceptance',
        'clearFeedback',
        'commitSuggestion'
      ]);
    });

    test('Dismiss handler should execute commands in correct order', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;
      const executionOrder: string[] = [];

      updateUserAcceptanceStub.callsFake(async () => {
        executionOrder.push('updateAcceptance');
      });

      executeCommandStub.callsFake(async (command: string) => {
        if (command === handleFeedbackModule.handleClearCodelens.identifier) {
          executionOrder.push('clearFeedback');
        } else if (command === 'editor.action.inlineSuggest.hide') {
          executionOrder.push('hideSuggestion');
        }
      });

      await handler();

      // Verify order: update -> clear -> hide
      expect(executionOrder).to.deep.equal([
        'updateAcceptance',
        'clearFeedback',
        'hideSuggestion'
      ]);
    });
  });

  suite('Error Handling', () => {
    test('Should propagate error if updateUserAcceptance fails', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      updateUserAcceptanceStub.rejects(new Error('Update failed'));

      // Should throw since updateUserAcceptance is awaited
      try {
        await handler();
        expect.fail('Should have thrown error from updateUserAcceptance');
      } catch (error) {
        expect((error as Error).message).to.equal('Update failed');
      }
    });

    test('Should propagate error if command execution fails', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      // Make executeCommand fail (but not the clear command)
      executeCommandStub.withArgs('editor.action.inlineSuggest.commit').rejects(new Error('Command failed'));

      // Should throw since executeCommand is awaited for the commit
      try {
        await handler();
        expect.fail('Should have thrown error from executeCommand');
      } catch (error) {
        expect((error as Error).message).to.equal('Command failed');
      }
    });
  });

  suite('Integration with Handle Feedback', () => {
    test('handleClearCodelens should call clearPromptFeedbackCodeLens', async () => {
      const handler = (handleFeedbackModule.handleClearCodelens as any).handler;

      await handler();

      expect(clearPromptFeedbackCodeLensStub.calledOnce).to.be.true;
    });

    test('provideFeedback with positive feedback should clear codelens', async () => {
      const handler = (handleFeedbackModule.handleProvideFeedback as any).handler;

      // Call with positive feedback
      await handler('model-123', 'prompt-123', true, 'input', 'output', clearPromptFeedbackCodeLensStub);

      // Verify accept command was executed (which clears feedback)
      expect(executeCommandStub.calledWith(acceptSuggestionModule.acceptSuggestionCommand.identifier)).to.be.true;
    });

    test('provideFeedback with negative feedback should clear codelens', async () => {
      const handler = (handleFeedbackModule.handleProvideFeedback as any).handler;

      // Call with negative feedback
      await handler('model-123', 'prompt-123', false, 'input', 'output', clearPromptFeedbackCodeLensStub);

      // Verify dismiss command was executed (which clears feedback)
      expect(executeCommandStub.calledWith(acceptSuggestionModule.dismissSuggestionCommand.identifier)).to.be.true;
    });
  });
});
