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
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import runCompletion, { updateUserAcceptance } from '../../utilities/runCompletion';
import { createMockTextDocument } from '../mocks/vscode.mock';
import * as statusBar from '../../statusBar/statusBar';
import * as extensionContext from '../../globals/extensionContext';
import * as selectModel from '../../commands/selectModel';
import * as common from '../../services/common';
import { PromptType } from '../../globals/consts';

/**
 * Test Suite for runCompletion functionality
 *
 * This test suite validates the promptId reset behavior introduced in 
 * https://github.com/Qiskit/qiskit-code-assistant-vscode/pull/144. 
 * The fix ensures that promptId is reset to undefined at the start 
 * of each new completion attempt, preventing stale promptIds from 
 * being used in telemetry.
 * 
 */
suite('runCompletion Test Suite', () => {
  let sandbox: sinon.SinonSandbox;
  let showInformationMessageStub: sinon.SinonStub;
  let setLoadingStatusStub: sinon.SinonStub;
  let setDefaultStatusStub: sinon.SinonStub;
  let getExtensionContextStub: sinon.SinonStub;
  let getServiceApiStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();
    showInformationMessageStub = sandbox.stub(vscode.window, 'showInformationMessage');
    setLoadingStatusStub = sandbox.stub(statusBar, 'setLoadingStatus');
    setDefaultStatusStub = sandbox.stub(statusBar, 'setDefaultStatus');
    getExtensionContextStub = sandbox.stub(extensionContext, 'getExtensionContext');
    getServiceApiStub = sandbox.stub(common, 'getServiceApi');

    // Provide a valid context by default
    getExtensionContextStub.returns({
      subscriptions: [],
      workspaceState: {},
      globalState: {},
    });
  });

  teardown(() => {
    sandbox.restore();
  });

  /**
   * Helper function to create a mock model with default values
   * @param overrides - Optional overrides for model properties
   * @returns A mock model object
   */
  function createMockModel(overrides: Partial<any> = {}) {
    return {
      _id: 'test-model',
      prompt_type: PromptType.PredictNext,
      disclaimer: { accepted: true },
      ...overrides
    };
  }

  /**
   * Helper function to create a mock document with default values
   * @param textContent - The text content for the document (default: 'def test')
   * @param offset - The offset value (default: 8)
   * @returns A mock TextDocument
   */
  function createTestDocument(textContent = 'def test', offset = 8) {
    const mockDocument = createMockTextDocument({
      languageId: 'python',
      getText: sandbox.stub().returns(textContent),
    });
    mockDocument.offsetAt = sandbox.stub().returns(offset);
    mockDocument.positionAt = sandbox.stub().returns(new vscode.Position(0, offset));
    return mockDocument;
  }

  /**
   * Helper function to create a mock API service
   * @returns A mock API service object with stubs
   */
  function createMockApiService() {
    return {
      postModelPrompt: sandbox.stub(),
      postPromptAcceptance: sandbox.stub().resolves({ success: true })
    };
  }

  /**
   * Helper function to create an async generator that yields completion results
   * @param promptId - The prompt ID to include in the result
   * @param text - The generated text
   * @returns An async generator
   */
  function createCompletionGenerator(promptId: string, text: string) {
    return (async function* () {
      yield {
        prompt_id: promptId,
        generated_text: text
      };
    })();
  }

  /**
   * Helper function to create an async generator that throws an error
   * @param errorMessage - The error message to throw
   * @returns An async generator that throws
   */
  function createErrorGenerator(errorMessage: string) {
    return (async function* () {
      throw new Error(errorMessage);
    })();
  }

  /**
   * Test suite for promptId reset behavior
   *
   * These tests verify that promptId is properly reset between completion attempts,
   * which is the core fix for the telemetry bug where old promptIds were being used.
   */
  suite('promptId reset behavior', () => {
    test('should reset promptId at the start of a new completion attempt', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      mockApiService.postModelPrompt.onFirstCall().returns(createCompletionGenerator('prompt-1', 'completion text 1'));
      mockApiService.postModelPrompt.onSecondCall().returns(createCompletionGenerator('prompt-2', 'completion text 2'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // First completion
      const generator1 = runCompletion(mockDocument, position);
      const result1 = await generator1.next();
      expect(result1.value).to.not.be.null;
      expect(result1.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-1');

      // At this point, the internal promptId is set to "prompt-1"
      // Now we'll verify that calling updateUserAcceptance uses this promptId
      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-1', true)).to.be.true;

      // Second completion - this should reset the promptId before making the API call
      const generator2 = runCompletion(mockDocument, position);
      const result2 = await generator2.next();
      expect(result2.value).to.not.be.null;
      expect(result2.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-2');

      // Verify that the promptId was reset and is now "prompt-2"
      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-2', true)).to.be.true;
    });

    test('should reset promptId when error occurs before API call', async () => {
      const mockModel = createMockModel({ disclaimer: { accepted: false } });
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      getServiceApiStub.resolves(mockApiService);

      // Mock acceptDisclaimer handler
      const acceptDisclaimerStub = sandbox.stub();
      const acceptDisclaimerModule = require('../../commands/acceptDisclaimer');
      sandbox.stub(acceptDisclaimerModule, 'default').value({ handler: acceptDisclaimerStub });

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // First attempt - should fail due to disclaimer not accepted
      const generator1 = runCompletion(mockDocument, position);
      const result1 = await generator1.next();
      expect(result1.value).to.be.null;
      expect(acceptDisclaimerStub.calledOnce).to.be.true;

      // Try to call updateUserAcceptance - should not post anything since promptId should be undefined
      const initialCallCount = mockApiService.postPromptAcceptance.callCount;
      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.callCount).to.equal(initialCallCount);
    });

    test('should not send telemetry with old promptId after error in previous completion', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      mockApiService.postModelPrompt.onFirstCall().returns(createCompletionGenerator('prompt-old', 'old completion'));
      mockApiService.postModelPrompt.onSecondCall().returns(createErrorGenerator('API Error'));
      mockApiService.postModelPrompt.onThirdCall().returns(createCompletionGenerator('prompt-new', 'new completion'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // First completion - succeeds
      const generator1 = runCompletion(mockDocument, position);
      const result1 = await generator1.next();
      expect(result1.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-old');

      // Second completion - fails with error
      const generator2 = runCompletion(mockDocument, position);
      const result2 = await generator2.next();
      expect(result2.value).to.be.null;
      expect(showInformationMessageStub.calledWith('API Error')).to.be.true;

      // At this point, without the fix, promptId would still be "prompt-old"
      // With the fix, promptId should be reset to undefined at the start of the next attempt

      // Third completion - succeeds
      const generator3 = runCompletion(mockDocument, position);
      const result3 = await generator3.next();
      expect(result3.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-new');

      // Verify that telemetry uses the NEW promptId, not the old one
      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-new', true)).to.be.true;
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-old', true)).to.be.false;
    });

    test('should handle completion cancellation and reset promptId on next attempt', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();

      // First completion that will be cancelled
      const asyncGenerator1 = (async function* () {
        yield {
          prompt_id: 'prompt-cancelled',
          generated_text: 'partial completion'
        };
        // Simulate more chunks that won't be consumed
        await new Promise(resolve => setTimeout(resolve, 100));
        yield {
          prompt_id: 'prompt-cancelled',
          generated_text: 'more text'
        };
      })();
      mockApiService.postModelPrompt.onFirstCall().returns(asyncGenerator1);
      mockApiService.postModelPrompt.onSecondCall().returns(createCompletionGenerator('prompt-after-cancel', 'new completion'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // First completion - start but don't complete
      const generator1 = runCompletion(mockDocument, position);
      const result1 = await generator1.next();
      expect(result1.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-cancelled');

      // Immediately start second completion (this simulates user typing which cancels the first)
      // This should cancel the first completion and start a new one with reset promptId
      const generator2 = runCompletion(mockDocument, position);
      const result2 = await generator2.next();
      expect(result2.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-after-cancel');

      // Verify telemetry uses the correct promptId
      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-after-cancel', true)).to.be.true;
    });

    test('should reset promptId in FillInMiddle mode', async () => {
      const mockModel = createMockModel({
        prompt_type: PromptType.FillInMiddle,
        delimiting_tokens: {
          start_token: '<|fim_prefix|>',
          middle_token: '<|fim_middle|>',
          end_token: '<|fim_suffix|>'
        }
      });
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      mockApiService.postModelPrompt.onFirstCall().returns(createCompletionGenerator('prompt-fim-1', 'fim completion 1'));
      mockApiService.postModelPrompt.onSecondCall().returns(createCompletionGenerator('prompt-fim-2', 'fim completion 2'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // First FIM completion
      const generator1 = runCompletion(mockDocument, position);
      const result1 = await generator1.next();
      expect(result1.value).to.not.be.null;
      expect(result1.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-fim-1');

      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-fim-1', true)).to.be.true;

      // Second FIM completion - should have reset promptId
      const generator2 = runCompletion(mockDocument, position);
      const result2 = await generator2.next();
      expect(result2.value).to.not.be.null;
      expect(result2.value?.results[0].completion_metadata?.prompt_id).to.equal('prompt-fim-2');

      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-fim-2', true)).to.be.true;
    });
  });

  /**
   * Test suite for updateUserAcceptance function
   *
   * These tests verify that the updateUserAcceptance function correctly handles
   * telemetry posting and promptId management.
   */
  suite('updateUserAcceptance', () => {
    test('should not post telemetry when promptId is undefined', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      getServiceApiStub.resolves(mockApiService);

      // Call updateUserAcceptance without running any completion first
      await updateUserAcceptance(true);

      // Should not call postPromptAcceptance since promptId is undefined
      expect(mockApiService.postPromptAcceptance.called).to.be.false;
    });

    test('should show message when no model is selected', async () => {
      sandbox.stub(selectModel, 'currentModel').get(() => null);

      await updateUserAcceptance(true);

      expect(showInformationMessageStub.calledWith('Please select a model (in the status bar)')).to.be.true;
    });

    test('should reset promptId after successful telemetry post', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      mockApiService.postModelPrompt.returns(createCompletionGenerator('prompt-123', 'test completion'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // Run completion to set promptId
      const generator = runCompletion(mockDocument, position);
      await generator.next();

      // First acceptance
      await updateUserAcceptance(true);
      expect(mockApiService.postPromptAcceptance.calledWith('prompt-123', true)).to.be.true;

      // Second acceptance should not post since promptId was reset
      const callCount = mockApiService.postPromptAcceptance.callCount;
      await updateUserAcceptance(false);
      expect(mockApiService.postPromptAcceptance.callCount).to.equal(callCount);
    });
  });

  /**
   * Test suite for error handling
   *
   * These tests verify that errors are properly handled and displayed to the user.
   */
  suite('error handling', () => {
    test('should show error message when API call fails', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      mockApiService.postModelPrompt.returns(createErrorGenerator('Network error'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // Run completion
      const generator = runCompletion(mockDocument, position);
      const result = await generator.next();

      expect(result.value).to.be.null;
      expect(showInformationMessageStub.calledWith('Network error')).to.be.true;
    });

    test('should handle error objects without message property', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      const errorGenerator = (async function* () {
        yield { error: 'Custom error from API' };
      })();
      mockApiService.postModelPrompt.returns(errorGenerator);
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      // Run completion
      const generator = runCompletion(mockDocument, position);
      const result = await generator.next();

      expect(result.value).to.be.null;
      expect(showInformationMessageStub.calledWith('Custom error from API')).to.be.true;
    });
  });

  /**
   * Test suite for basic functionality
   *
   * These tests verify the basic behavior of runCompletion function including
   * edge cases and status bar updates.
   */
  suite('basic functionality', () => {
    test('should return null when no model is selected', async () => {
      sandbox.stub(selectModel, 'currentModel').get(() => null);

      const mockDocument = createMockTextDocument();
      const position = new vscode.Position(0, 0);

      const generator = runCompletion(mockDocument, position);
      const result = await generator.next();

      expect(result.value).to.be.null;
      expect(showInformationMessageStub.calledWith('Please select a model (in the status bar) before auto-completing code.')).to.be.true;
    });

    test('should return when context is not available', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);
      getExtensionContextStub.returns(undefined);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      const generator = runCompletion(mockDocument, position);
      const result = await generator.next();

      expect(result.value).to.be.undefined;
    });

    test('should return null when input is empty', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockDocument = createTestDocument('', 0);
      const position = new vscode.Position(0, 0);

      const generator = runCompletion(mockDocument, position);
      const result = await generator.next();

      expect(result.value).to.be.null;
      expect(showInformationMessageStub.calledWith('No input available for model to complete.')).to.be.true;
    });

    test('should set loading and default status during completion', async () => {
      const mockModel = createMockModel();
      sandbox.stub(selectModel, 'currentModel').get(() => mockModel);

      const mockApiService = createMockApiService();
      mockApiService.postModelPrompt.returns(createCompletionGenerator('test-prompt', 'test completion'));
      getServiceApiStub.resolves(mockApiService);

      const mockDocument = createTestDocument();
      const position = new vscode.Position(0, 8);

      const generator = runCompletion(mockDocument, position);

      // Get the completion - this starts execution
      const result = await generator.next();

      expect(result.value).to.not.be.null;
      // Check that loading status was set during processing
      expect(setLoadingStatusStub.called).to.be.true;

      // Complete the generator to trigger the finally block
      await generator.next();

      // Check that default status was set in the finally block
      expect(setDefaultStatusStub.called).to.be.true;
    });
  });
});
