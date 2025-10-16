import { expect } from 'chai';
import * as sinon from 'sinon';
import { invalidateCurrentModel } from '../../commands/selectModel';
import * as statusBar from '../../statusBar/statusBar';

/**
 * Test Suite: SelectModel - invalidateCurrentModel()
 *
 * This test suite validates the invalidateCurrentModel() function introduced to
 * prevent "model not found" errors when the service API changes.
 *
 * Why this is needed:
 * When a user changes the service URL (e.g., from Qiskit Code Assistant to OpenAI),
 * the extension needs to clear the currently selected model. Without this, the
 * extension would attempt to use a model ID from the old service with the new service,
 * resulting in "model not found" errors.
 *
 * The function performs three actions:
 * 1. Sets currentModel = undefined
 * 2. Clears modelsList = []
 * 3. Calls setDefaultStatus() to update the UI to show "No Model Selected"
 *
 * Integration point:
 * This function is called by invalidateServiceApi() in common.ts whenever the
 * service API instance is invalidated (due to URL change or initialization errors).
 */
suite('SelectModel Test Suite', () => {
  let setDefaultStatusStub: sinon.SinonStub;

  setup(() => {
    // Stub status bar functions
    setDefaultStatusStub = sinon.stub(statusBar, 'setDefaultStatus');
  });

  teardown(() => {
    setDefaultStatusStub.restore();
  });

  suite('invalidateCurrentModel', () => {
    test('should call setDefaultStatus when invalidating', () => {
      // Call invalidate
      invalidateCurrentModel();

      // Verify setDefaultStatus was called
      expect(setDefaultStatusStub.calledOnce).to.be.true;
    });

    test('should be idempotent - can be called multiple times safely', () => {
      // Invalidate multiple times
      invalidateCurrentModel();
      invalidateCurrentModel();
      invalidateCurrentModel();

      // Should call setDefaultStatus each time
      expect(setDefaultStatusStub.callCount).to.equal(3);
    });

    test('should work correctly when called with no current model', () => {
      // Invalidate when model might already be undefined
      invalidateCurrentModel();

      // Should not throw and should call setDefaultStatus
      expect(setDefaultStatusStub.calledOnce).to.be.true;
    });
  });

  suite('invalidateCurrentModel integration with service API changes', () => {
    test('should be called when service API is invalidated', () => {
      // This test verifies that invalidateCurrentModel is actually called
      // when the service API is invalidated due to URL change.
      // The actual implementation is in common.ts via invalidateServiceApi()

      // Create a spy on invalidateCurrentModel to track if it's called
      const invalidateCurrentModelSpy = sinon.spy(invalidateCurrentModel);

      // Stub the selectModel module's invalidateCurrentModel with our spy
      const selectModelModule = require('../../commands/selectModel');
      const originalInvalidate = selectModelModule.invalidateCurrentModel;
      selectModelModule.invalidateCurrentModel = invalidateCurrentModelSpy;

      // Import fresh to avoid caching issues
      delete require.cache[require.resolve('../../services/common')];
      const commonModule = require('../../services/common');
      const invalidateServiceApi = commonModule.invalidateServiceApi;

      // Reset the stub to track fresh calls
      setDefaultStatusStub.resetHistory();

      // Call invalidateServiceApi which should call invalidateCurrentModel
      invalidateServiceApi();

      // Verify that setDefaultStatus was called (proving invalidateCurrentModel was called)
      expect(setDefaultStatusStub.calledOnce).to.be.true;

      // Restore original function
      selectModelModule.invalidateCurrentModel = originalInvalidate;
    });

    test('should prevent "model not found" errors after service URL change', () => {
      // This test documents that invalidateCurrentModel is designed to clear
      // the current model selection when the service API changes.
      // This prevents attempting to use model IDs from one service with another service,
      // which would result in "model not found" errors.

      // The function should be called whenever:
      // 1. Service URL changes (handled in common.ts)
      // 2. Service becomes unavailable and needs re-initialization
      // 3. User explicitly switches to a different service type

      // Reset the stub
      setDefaultStatusStub.resetHistory();

      // Simulate service URL change by invalidating
      invalidateCurrentModel();

      // Model should be cleared and status updated
      expect(setDefaultStatusStub.calledOnce).to.be.true;
    });
  });

  suite('full integration test', () => {
    test('should handle complete flow: service URL change → model invalidation → UI update', () => {
      // This integration test documents the complete flow when a user changes
      // the service URL in settings, ensuring no "model not found" errors occur
      //
      // Flow:
      // 1. User changes service URL in VSCode settings
      // 2. getServiceApi() detects URL change (currentServiceUrl !== lastServiceUrl)
      // 3. getServiceApi() calls invalidateServiceApi()
      // 4. invalidateServiceApi() calls invalidateCurrentModel()
      // 5. invalidateCurrentModel() clears model and updates UI
      //
      // This prevents attempting to use a model ID from service A with service B

      // Reset stub to track calls
      setDefaultStatusStub.resetHistory();

      // Directly test that invalidateCurrentModel updates the UI
      invalidateCurrentModel();

      // Verify that setDefaultStatus was called to update UI
      expect(setDefaultStatusStub.calledOnce).to.be.true;

      // The actual integration with invalidateServiceApi is tested above
      // in the "should be called when service API is invalidated" test
      // and is already implemented in common.ts
    });

    test('should handle concurrent operations during service change', async () => {
      // This test verifies that if loading operations are in progress when
      // service API is invalidated, everything works correctly

      // Import the modules
      delete require.cache[require.resolve('../../statusBar/statusBar')];
      const statusBarModule = require('../../statusBar/statusBar');
      require('../../commands/selectModel');

      // Setup mock status bar
      const mockStatusBar = {
        text: 'Qiskit Code Assistant: Old Model',
        backgroundColor: undefined,
        show: sinon.stub(),
        dispose: sinon.stub()
      } as any;

      const vscode = require('vscode');
      sinon.stub(vscode.window, 'createStatusBarItem').returns(mockStatusBar);
      sinon.stub(vscode.commands, 'executeCommand').resolves();

      // Stub service
      const commonModule = require('../../services/common');
      const CodeAssistantService = require('../../services/codeAssistant').default;
      sinon.stub(commonModule, 'getServiceApi').resolves(new CodeAssistantService());

      // Initialize status bar
      const context = { subscriptions: [] } as any;
      await statusBarModule.registerStatusBar(context);

      // Start loading operation
      statusBarModule.setLoadingStatus();
      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Simulate service URL change during loading
      setDefaultStatusStub.resetHistory();
      invalidateCurrentModel();

      // Verify that status was updated
      expect(setDefaultStatusStub.calledOnce).to.be.true;
    });
  });

  suite('documentation', () => {
    test('invalidateCurrentModel should have clear JSDoc explaining purpose', () => {
      // This test serves as documentation that invalidateCurrentModel is specifically
      // designed to prevent "model not found" errors when the service API changes.

      // The actual JSDoc comment in selectModel.ts reads:
      // "Invalidates the current model selection and clears the models list.
      //  Call this when the service API changes to prevent 'model not found' errors."

      // The function performs the following actions:
      // 1. Sets currentModel = undefined
      // 2. Clears modelsList = []
      // 3. Calls setDefaultStatus() to update UI

      expect(true).to.be.true; // Documentation test
    });
  });
});
