/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http://www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { acceptSuggestionCommand, dismissSuggestionCommand } from '../../commands/acceptSuggestion';
import * as runCompletion from '../../utilities/runCompletion';

/**
 * Test Suite for acceptSuggestion and dismissSuggestion commands
 *
 * These tests verify that suggestion acceptance/dismissal properly handles:
 * - Telemetry tracking
 * - Stream cancellation
 * - CodeLens clearing
 * - VSCode command execution
 */
suite('Accept/Dismiss Suggestion Commands', () => {
  let sandbox: sinon.SinonSandbox;
  let executeCommandStub: sinon.SinonStub;
  let updateUserAcceptanceStub: sinon.SinonStub;
  let cancelCurrentCompletionStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();
    executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand');
    updateUserAcceptanceStub = sandbox.stub(runCompletion, 'updateUserAcceptance').resolves();
    cancelCurrentCompletionStub = sandbox.stub(runCompletion, 'cancelCurrentCompletion');
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('acceptSuggestionCommand', () => {
    test('should have correct identifier', () => {
      expect(acceptSuggestionCommand.identifier).to.equal('qiskit-vscode.accept-suggestion');
    });

    test('should call updateUserAcceptance with true', async () => {
      await acceptSuggestionCommand.handler();

      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(updateUserAcceptanceStub.calledWith(true)).to.be.true;
    });

    test('should execute clear codelens command', async () => {
      await acceptSuggestionCommand.handler();

      expect(executeCommandStub.calledWith('qiskit-vscode.clear-feedback-codelens')).to.be.true;
    });

    test('should execute inline suggestion commit command', async () => {
      await acceptSuggestionCommand.handler();

      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.commit')).to.be.true;
    });

    test('should execute commands in correct order', async () => {
      await acceptSuggestionCommand.handler();

      // Should call updateUserAcceptance before commands
      expect(updateUserAcceptanceStub.calledBefore(executeCommandStub)).to.be.true;
    });

    test('should cancel current completion to stop streaming', async () => {
      await acceptSuggestionCommand.handler();

      // Accept should cancel streaming to prevent continued output after acceptance
      expect(cancelCurrentCompletionStub.calledOnce).to.be.true;
    });

    test('should cancel streaming before committing suggestion', async () => {
      await acceptSuggestionCommand.handler();

      // Cancel should happen first to stop streaming before document changes
      expect(cancelCurrentCompletionStub.calledBefore(executeCommandStub)).to.be.true;
    });
  });

  suite('dismissSuggestionCommand', () => {
    test('should have correct identifier', () => {
      expect(dismissSuggestionCommand.identifier).to.equal('qiskit-vscode.dismiss-suggestion');
    });

    test('should cancel current completion immediately', async () => {
      await dismissSuggestionCommand.handler();

      expect(cancelCurrentCompletionStub.calledOnce).to.be.true;
    });

    test('should call cancelCurrentCompletion before other operations', async () => {
      await dismissSuggestionCommand.handler();

      // Cancel should be called first, before telemetry or UI updates
      expect(cancelCurrentCompletionStub.calledBefore(updateUserAcceptanceStub)).to.be.true;
      expect(cancelCurrentCompletionStub.calledBefore(executeCommandStub)).to.be.true;
    });

    test('should call updateUserAcceptance with false', async () => {
      await dismissSuggestionCommand.handler();

      expect(updateUserAcceptanceStub.calledOnce).to.be.true;
      expect(updateUserAcceptanceStub.calledWith(false)).to.be.true;
    });

    test('should execute clear codelens command', async () => {
      await dismissSuggestionCommand.handler();

      expect(executeCommandStub.calledWith('qiskit-vscode.clear-feedback-codelens')).to.be.true;
    });

    test('should execute inline suggestion hide command', async () => {
      await dismissSuggestionCommand.handler();

      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.hide')).to.be.true;
    });

    test('should complete successfully even if cancellation has no active completion', async () => {
      // Test that dismissing when no completion is active doesn't throw
      cancelCurrentCompletionStub.restore(); // Remove stub to test real implementation
      sandbox.stub(runCompletion, 'cancelCurrentCompletion').callsFake(() => {
        // No-op when no completion active
      });

      await dismissSuggestionCommand.handler();

      expect(updateUserAcceptanceStub.called).to.be.true;
      expect(executeCommandStub.called).to.be.true;
    });

    test('should handle errors in updateUserAcceptance gracefully', async () => {
      updateUserAcceptanceStub.rejects(new Error('Telemetry error'));

      // Should not throw - telemetry errors are caught and logged
      await dismissSuggestionCommand.handler();

      // All operations should still complete
      expect(cancelCurrentCompletionStub.called).to.be.true;
      expect(updateUserAcceptanceStub.called).to.be.true;
      expect(executeCommandStub.called).to.be.true;
    });
  });

  suite('Escape key behavior (dismissSuggestion)', () => {
    test('should cancel streaming on first Escape press', async () => {
      // Simulate user pressing Escape during streaming
      await dismissSuggestionCommand.handler();

      // Should cancel the stream immediately
      expect(cancelCurrentCompletionStub.calledOnce).to.be.true;

      // Should hide the suggestion
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.hide')).to.be.true;

      // Should record dismissal
      expect(updateUserAcceptanceStub.calledWith(false)).to.be.true;
    });

    test('should stop spinner when dismissing streaming completion', async () => {
      // When user presses Escape during streaming, the spinner should stop
      // This is verified by ensuring cancelCurrentCompletion is called,
      // which aborts the AbortController and triggers the finally block
      // in runCompletion that calls setDefaultStatus()

      await dismissSuggestionCommand.handler();

      expect(cancelCurrentCompletionStub.calledOnce).to.be.true;
    });

    test('should work on first keypress without requiring multiple presses', async () => {
      // This test verifies the fix for the issue where Escape needed
      // to be pressed multiple times to cancel streaming

      // First press
      await dismissSuggestionCommand.handler();
      expect(cancelCurrentCompletionStub.callCount).to.equal(1);

      // Should not need a second press - verification that first press works
      expect(cancelCurrentCompletionStub.calledOnce).to.be.true;
    });
  });

  suite('Integration behavior', () => {
    test('accept and dismiss should have different telemetry values', async () => {
      await acceptSuggestionCommand.handler();
      await dismissSuggestionCommand.handler();

      expect(updateUserAcceptanceStub.callCount).to.equal(2);
      expect(updateUserAcceptanceStub.firstCall.calledWith(true)).to.be.true;
      expect(updateUserAcceptanceStub.secondCall.calledWith(false)).to.be.true;
    });

    test('both accept and dismiss should cancel streaming', async () => {
      await acceptSuggestionCommand.handler();
      expect(cancelCurrentCompletionStub.calledOnce).to.be.true;

      await dismissSuggestionCommand.handler();
      expect(cancelCurrentCompletionStub.callCount).to.equal(2);
    });

    test('both commands should clear codelens', async () => {
      await acceptSuggestionCommand.handler();
      await dismissSuggestionCommand.handler();

      expect(executeCommandStub.calledWith('qiskit-vscode.clear-feedback-codelens')).to.be.true;
      expect(executeCommandStub.withArgs('qiskit-vscode.clear-feedback-codelens').callCount).to.equal(2);
    });

    test('commands should use different VSCode inline suggestion commands', async () => {
      await acceptSuggestionCommand.handler();
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.commit')).to.be.true;

      executeCommandStub.resetHistory();

      await dismissSuggestionCommand.handler();
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.hide')).to.be.true;
      expect(executeCommandStub.calledWith('editor.action.inlineSuggest.commit')).to.be.false;
    });
  });
});
