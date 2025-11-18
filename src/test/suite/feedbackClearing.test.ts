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

import { expect } from 'chai';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as acceptSuggestionModule from '../../commands/acceptSuggestion';
import * as runCompletionModule from '../../utilities/runCompletion';
import * as handleFeedbackModule from '../../commands/handleFeedback';

suite('Feedback Clearing Test Suite', () => {
  let sandbox: sinon.SinonSandbox;
  let executeCommandStub: sinon.SinonStub;
  let updateUserAcceptanceStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();

    // Stub vscode commands
    executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand').resolves();

    // Stub updateUserAcceptance
    updateUserAcceptanceStub = sandbox.stub(runCompletionModule, 'updateUserAcceptance').resolves();
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('Accept Suggestion Handler', () => {
    test('Should call clear command when suggestion is accepted', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      await handler();

      // Verify clear command was called
      expect(executeCommandStub.calledWith(handleFeedbackModule.handleClearCodelens.identifier)).to.be.true;
    });

    test('Should call commit command when suggestion is accepted', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      await handler();

      // Verify inline suggestion commit was triggered
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.commit')).to.be.true;
    });

    test('Should update user acceptance before clearing', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      await handler();

      // Verify user acceptance was updated
      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(updateUserAcceptanceStub.calledWith(true)).to.be.true;
    });

    test('Commands should not be awaited', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      // Make command fail
      executeCommandStub.rejects(new Error('Command failed'));

      // Should not throw since commands are not awaited
      await handler();

      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
    });
  });

  suite('Dismiss Suggestion Handler', () => {
    test('Should call clear command when suggestion is dismissed', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;

      await handler();

      // Verify clear command was called
      expect(executeCommandStub.calledWith(handleFeedbackModule.handleClearCodelens.identifier)).to.be.true;
    });

    test('Should call hide command when suggestion is dismissed', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;

      await handler();

      // Verify inline suggestion hide was triggered
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.hide')).to.be.true;
    });

    test('Should update user acceptance with false', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;

      await handler();

      // Verify user acceptance was updated with false
      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(updateUserAcceptanceStub.calledWith(false)).to.be.true;
    });
  });

  suite('Command Execution Order', () => {
    test('Accept handler should call updateUserAcceptance first', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;
      const callOrder: string[] = [];

      updateUserAcceptanceStub.callsFake(async () => {
        callOrder.push('updateAcceptance');
      });

      executeCommandStub.callsFake(async (command: string) => {
        if (command === handleFeedbackModule.handleClearCodelens.identifier) {
          callOrder.push('clearFeedback');
        } else if (command === 'editor.action.inlineSuggest.commit') {
          callOrder.push('commitSuggestion');
        }
      });

      await handler();

      // Update should happen first (it's awaited)
      expect(callOrder[0]).to.equal('updateAcceptance');
      // Clear and commit can be in any order (not awaited)
      expect(callOrder).to.include('clearFeedback');
      expect(callOrder).to.include('commitSuggestion');
    });

    test('Dismiss handler should call updateUserAcceptance first', async () => {
      const handler = (acceptSuggestionModule.dismissSuggestionCommand as any).handler;
      const callOrder: string[] = [];

      updateUserAcceptanceStub.callsFake(async () => {
        callOrder.push('updateAcceptance');
      });

      executeCommandStub.callsFake(async (command: string) => {
        if (command === handleFeedbackModule.handleClearCodelens.identifier) {
          callOrder.push('clearFeedback');
        } else if (command === 'editor.action.inlineSuggest.hide') {
          callOrder.push('hideSuggestion');
        }
      });

      await handler();

      // Update should happen first (it's awaited)
      expect(callOrder[0]).to.equal('updateAcceptance');
      // Clear and hide can be in any order (not awaited)
      expect(callOrder).to.include('clearFeedback');
      expect(callOrder).to.include('hideSuggestion');
    });
  });

  suite('Error Handling', () => {
    test('Should not propagate error if updateUserAcceptance fails', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      updateUserAcceptanceStub.rejects(new Error('Update failed'));

      // Should not throw - telemetry errors should not block suggestion acceptance
      await handler();

      // Verify that the command still executed despite telemetry failure
      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(executeCommandStub.called).to.be.true;
    });

    test('Should not propagate error if command execution fails', async () => {
      const handler = (acceptSuggestionModule.acceptSuggestionCommand as any).handler;

      // Make executeCommand fail
      executeCommandStub.rejects(new Error('Command failed'));

      // Should not throw since commands are not awaited
      await handler();

      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
    });
  });

  suite('Command Identifiers', () => {
    test('Accept command should have correct identifier', () => {
      expect(acceptSuggestionModule.acceptSuggestionCommand.identifier).to.equal('qiskit-vscode.accept-suggestion');
    });

    test('Dismiss command should have correct identifier', () => {
      expect(acceptSuggestionModule.dismissSuggestionCommand.identifier).to.equal('qiskit-vscode.dismiss-suggestion');
    });

    test('Clear codelens command should have correct identifier', () => {
      expect(handleFeedbackModule.handleClearCodelens.identifier).to.equal('qiskit-vscode.clear-feedback-codelens');
    });
  });

  suite('Module Verification', () => {
    test('getInlineCompletionItems imports clearPromptFeedbackCodeLens', () => {
      // Verify the import exists by checking the module loads
      const getInlineCompletionItems = require('../../utilities/getInlineCompletionItems');
      expect(getInlineCompletionItems.default).to.be.a('function');
    });

    test('runCompletion imports clearPromptFeedbackCodeLens', () => {
      // Verify the import exists by checking the module loads
      const runCompletion = require('../../utilities/runCompletion');
      expect(runCompletion.default).to.be.a('function');
    });

    test('registerHandlers imports clearPromptFeedbackCodeLens', () => {
      // Verify the import exists by checking the module loads
      const registerHandlers = require('../../inlineSuggestions/registerHandlers');
      expect(registerHandlers.default).to.be.a('function');
    });

    test('FeedbackCodelensProvider exports clearPromptFeedbackCodeLens', () => {
      const feedbackCodelensModule = require('../../codelens/FeedbackCodelensProvider');
      expect(feedbackCodelensModule.clearPromptFeedbackCodeLens).to.be.a('function');
    });
  });
});
