import { expect } from 'chai';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { disclaimerState } from '../../commands/acceptDisclaimer';
import * as acceptDisclaimerModule from '../../commands/acceptDisclaimer';
import * as extensionContext from '../../globals/extensionContext';
import * as serviceCommon from '../../services/common';
import * as qiskitMigration from '../../services/qiskitMigration';
import * as statusBar from '../../statusBar/statusBar';

// Helper function to create a complete ModelInfo object
function createMockModel(id: string, displayName: string, disclaimerAccepted: boolean = false): ModelInfo {
  return {
    _id: id,
    display_name: displayName,
    doc_link: 'https://example.com/docs',
    license: { name: 'Apache 2.0', link: 'https://example.com/license' },
    model_id: 'test-model-id',
    disclaimer: { accepted: disclaimerAccepted }
  };
}

suite('Disclaimer State Isolation Test Suite', () => {
  let sandbox: sinon.SinonSandbox;
  let mockContext: vscode.ExtensionContext;
  let mockApiService: any;
  let mockPanel: any;
  let createWebviewPanelStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();

    // Create mock context
    mockContext = {
      subscriptions: [],
      workspaceState: {} as vscode.Memento,
      globalState: {} as vscode.Memento & { setKeysForSync(keys: readonly string[]): void },
      extensionPath: '/test/path',
      extensionUri: vscode.Uri.file('/test/path'),
      environmentVariableCollection: {} as any,
      extensionMode: vscode.ExtensionMode.Test,
      storageUri: undefined,
      storagePath: undefined,
      globalStorageUri: vscode.Uri.file('/test/global'),
      globalStoragePath: '/test/global',
      logUri: vscode.Uri.file('/test/log'),
      logPath: '/test/log',
      secrets: {} as any,
      extension: {} as any,
      languageModelAccessInformation: {} as any,
      asAbsolutePath: (relativePath: string) => `/test/path/${relativePath}`
    };

    // Stub extension context
    sandbox.stub(extensionContext, 'getExtensionContext').returns(mockContext);

    // Create mock API service
    mockApiService = {
      getModelDisclaimer: sandbox.stub().resolves({
        _id: 'disclaimer-123',
        version: '1.0',
        title: 'Test Disclaimer',
        body: 'Test disclaimer content',
        accepted: false
      }),
      postDisclaimerAcceptance: sandbox.stub().resolves({ success: true })
    };
    sandbox.stub(serviceCommon, 'getServiceApi').resolves(mockApiService);

    // Stub migration service
    sandbox.stub(qiskitMigration, 'getMigrationDisclaimer').resolves({
      _id: 'migration-disclaimer-123',
      version: '1.0',
      title: 'Migration Disclaimer',
      body: 'Migration disclaimer content',
      accepted: false
    });
    sandbox.stub(qiskitMigration, 'postMigrationDisclaimerAcceptance').resolves({ success: true });

    // Stub status bar functions
    sandbox.stub(statusBar, 'setLoadingStatus');
    sandbox.stub(statusBar, 'setDefaultStatus');

    // Create mock webview panel
    mockPanel = {
      webview: {
        html: '',
        onDidReceiveMessage: sandbox.stub()
      },
      reveal: sandbox.stub(),
      dispose: sandbox.stub(),
      onDidDispose: sandbox.stub()
    };

    createWebviewPanelStub = sandbox.stub(vscode.window, 'createWebviewPanel').returns(mockPanel as any);
  });

  teardown(() => {
    sandbox.restore();

    // Clean up disclaimer state between tests
    // Since disclaimerState is a reference to the internal state, we need to reset it
    if (disclaimerState.panel) {
      disclaimerState.panel = undefined;
    }
    disclaimerState.model = undefined;
    disclaimerState.acceptFlag = false;
    // Reset isLoading flag if it exists on the internal state
    (disclaimerState as any).isLoading = false;
  });

  suite('Model Disclaimer State Management', () => {
    test('Should not create panel if model is undefined', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;

      await handler(undefined);

      expect(createWebviewPanelStub.called).to.be.false;
      expect(disclaimerState.panel).to.be.undefined;
      expect(disclaimerState.model).to.be.undefined;
    });

    test('Should not create panel if model disclaimer is already accepted', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model', true);

      await handler(model);

      expect(createWebviewPanelStub.called).to.be.false;
      expect(disclaimerState.panel).to.be.undefined;
    });

    test('Should dispose existing panel before creating new one', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model1 = createMockModel('model-1', 'Test Model 1');
      const model2 = createMockModel('model-2', 'Test Model 2');

      // Create first panel
      await handler(model1);
      const firstPanel = mockPanel;

      // Verify first panel was created
      expect(createWebviewPanelStub.calledOnce).to.be.true;
      expect(disclaimerState.model).to.equal(model1);

      // Create second panel (should dispose first)
      await handler(model2);

      // Verify first panel was disposed and second was created
      expect(firstPanel.dispose.calledOnce).to.be.true;
      expect(createWebviewPanelStub.calledTwice).to.be.true;
      expect(disclaimerState.model).to.equal(model2);
    });

    test('Should set state only after fetching disclaimer successfully', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      await handler(model);

      // Verify disclaimer was fetched
      expect(mockApiService.getModelDisclaimer.calledOnce).to.be.true;
      expect(mockApiService.getModelDisclaimer.calledWith('model-123')).to.be.true;

      // Verify state was set after fetch
      expect(disclaimerState.model).to.equal(model);
      expect(disclaimerState.acceptFlag).to.be.false;
      expect(disclaimerState.panel).to.not.be.undefined;
    });

    test('Should not set state if disclaimer fetch fails', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      // Make disclaimer fetch fail
      mockApiService.getModelDisclaimer.rejects(new Error('API Error'));
      const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');

      await handler(model);

      // Verify error was shown
      expect(showErrorStub.calledOnce).to.be.true;

      // Verify state was not set
      expect(disclaimerState.panel).to.be.undefined;
      expect(disclaimerState.model).to.be.undefined;
      expect(createWebviewPanelStub.called).to.be.false;
    });

    test('Should reset state when panel is disposed', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      await handler(model);

      // Get the onDidDispose callback
      const onDidDisposeCallback = mockPanel.onDidDispose.getCall(0).args[0];

      // Trigger dispose
      onDidDisposeCallback();

      // Verify state was reset
      expect(disclaimerState.panel).to.be.undefined;
      expect(disclaimerState.model).to.be.undefined;
      expect(disclaimerState.acceptFlag).to.be.false;
    });

    test('Should create panel with correct properties', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      await handler(model);

      // Verify panel was created with correct parameters
      expect(createWebviewPanelStub.calledOnce).to.be.true;
      const [viewType, title, showOptions, options] = createWebviewPanelStub.getCall(0).args;

      expect(viewType).to.equal('modelDisclaimer');
      expect(title).to.equal('Qiskit Code Assistant Model Disclaimer for Test Model');
      expect(showOptions).to.equal(vscode.ViewColumn.Two);
      expect(options.enableScripts).to.be.true;
      expect(options.retainContextWhenHidden).to.be.false;
    });

    test('Should prevent concurrent handler executions', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      // Track API call count
      let apiCallCount = 0;
      let resolveDisclaimer: any;
      mockApiService.getModelDisclaimer.callsFake(() => {
        apiCallCount++;
        return new Promise((resolve) => {
          resolveDisclaimer = resolve;
        });
      });

      // Start first call (will be waiting on API)
      const firstCall = handler(model);

      // Give first call a moment to start and set isLoading flag
      await new Promise(resolve => setImmediate(resolve));

      // Try second call while first is still loading
      const secondCall = handler(model);
      await secondCall;

      // Second call should have been rejected immediately without calling API again
      expect(apiCallCount).to.equal(1); // Only first call should have reached API
      expect(createWebviewPanelStub.called).to.be.false; // No panel created yet

      // Complete first call
      resolveDisclaimer({
        _id: 'disclaimer-123',
        version: '1.0',
        title: 'Test Disclaimer',
        body: 'Test disclaimer content',
        accepted: false
      });
      await firstCall;

      // Verify first call succeeded
      expect(createWebviewPanelStub.calledOnce).to.be.true;
      expect(apiCallCount).to.equal(1); // Still only one API call
    });

    test('Should reset isLoading flag after error', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      // Make first call fail
      mockApiService.getModelDisclaimer.rejects(new Error('API Error'));
      sandbox.stub(vscode.window, 'showErrorMessage');

      await handler(model);

      // Verify isLoading was reset
      expect((disclaimerState as any).isLoading).to.be.false;

      // Now try again with success - should work
      mockApiService.getModelDisclaimer.resolves({
        _id: 'disclaimer-123',
        version: '1.0',
        title: 'Test Disclaimer',
        body: 'Test disclaimer content',
        accepted: false
      });

      await handler(model);

      // Verify second call succeeded
      expect(disclaimerState.panel).to.not.be.undefined;
    });
  });

  suite('Migration Disclaimer State Management', () => {
    test('Should dispose existing migration panel before creating new one', async () => {
      const handler = (acceptDisclaimerModule as any).migrationDisclaimerAcceptance.handler;

      // Create first panel
      await handler();
      const firstPanel = mockPanel;

      // Verify first panel was created
      expect(createWebviewPanelStub.calledOnce).to.be.true;

      // Create second panel (should dispose first)
      await handler();

      // Verify first panel was disposed and second was created
      expect(firstPanel.dispose.calledOnce).to.be.true;
      expect(createWebviewPanelStub.calledTwice).to.be.true;
    });

    test('Should not set state if migration disclaimer fetch fails', async () => {
      const handler = (acceptDisclaimerModule as any).migrationDisclaimerAcceptance.handler;

      // Make disclaimer fetch fail
      (qiskitMigration.getMigrationDisclaimer as sinon.SinonStub).rejects(new Error('API Error'));
      const showErrorStub = sandbox.stub(vscode.window, 'showErrorMessage');

      await handler();

      // Verify error was shown
      expect(showErrorStub.calledOnce).to.be.true;

      // Verify panel was not created
      expect(createWebviewPanelStub.called).to.be.false;
    });

    test('Should create migration panel with correct properties', async () => {
      const handler = (acceptDisclaimerModule as any).migrationDisclaimerAcceptance.handler;

      await handler();

      // Verify panel was created with correct parameters
      expect(createWebviewPanelStub.calledOnce).to.be.true;
      const [viewType, title, showOptions, options] = createWebviewPanelStub.getCall(0).args;

      expect(viewType).to.equal('migrationDisclaimer');
      expect(title).to.equal('Qiskit Code Assistant Migration Disclaimer');
      expect(showOptions).to.equal(vscode.ViewColumn.Two);
      expect(options.enableScripts).to.be.true;
      expect(options.retainContextWhenHidden).to.be.false;
    });
  });

  suite('State Isolation Between Model and Migration Disclaimers', () => {
    test('Model and migration disclaimers should not interfere with each other', async () => {
      const modelHandler = (acceptDisclaimerModule as any).default.handler;
      const migrationHandler = (acceptDisclaimerModule as any).migrationDisclaimerAcceptance.handler;

      const model = createMockModel('model-123', 'Test Model');

      // Create model disclaimer panel
      await modelHandler(model);
      const modelPanel = mockPanel;

      // Verify model state
      expect(disclaimerState.model).to.equal(model);
      expect(disclaimerState.panel).to.not.be.undefined;

      // Create a new mock panel for migration
      const migrationMockPanel = {
        webview: {
          html: '',
          onDidReceiveMessage: sandbox.stub()
        },
        reveal: sandbox.stub(),
        dispose: sandbox.stub(),
        onDidDispose: sandbox.stub()
      };
      createWebviewPanelStub.returns(migrationMockPanel as any);

      // Create migration disclaimer panel
      await migrationHandler();

      // Verify both panels exist and model state is preserved
      expect(createWebviewPanelStub.calledTwice).to.be.true;
      expect(modelPanel.dispose.called).to.be.false; // Model panel should NOT be disposed
      expect(disclaimerState.model).to.equal(model); // Model state should be preserved
    });

    test('Opening migration disclaimer should not clear model disclaimer state', async () => {
      const modelHandler = (acceptDisclaimerModule as any).default.handler;
      const migrationHandler = (acceptDisclaimerModule as any).migrationDisclaimerAcceptance.handler;

      const model = createMockModel('model-123', 'Test Model');

      // Create model disclaimer
      await modelHandler(model);
      expect(disclaimerState.model).to.equal(model);
      expect(disclaimerState.acceptFlag).to.be.false;

      // Create migration disclaimer
      const migrationMockPanel = {
        webview: {
          html: '',
          onDidReceiveMessage: sandbox.stub()
        },
        reveal: sandbox.stub(),
        dispose: sandbox.stub(),
        onDidDispose: sandbox.stub()
      };
      createWebviewPanelStub.returns(migrationMockPanel as any);
      await migrationHandler();

      // Verify model state is still intact
      expect(disclaimerState.model).to.equal(model);
      expect(disclaimerState.acceptFlag).to.be.false;
    });

    test('Concurrent disclaimer operations should maintain separate state', async () => {
      const modelHandler = (acceptDisclaimerModule as any).default.handler;
      const migrationHandler = (acceptDisclaimerModule as any).migrationDisclaimerAcceptance.handler;

      const model1 = createMockModel('model-1', 'Test Model 1');
      const model2 = createMockModel('model-2', 'Test Model 2');

      // Create different panels for each call
      let callCount = 0;
      createWebviewPanelStub.callsFake(() => {
        callCount++;
        return {
          webview: {
            html: '',
            onDidReceiveMessage: sandbox.stub()
          },
          reveal: sandbox.stub(),
          dispose: sandbox.stub(),
          onDidDispose: sandbox.stub()
        } as any;
      });

      // Create first model disclaimer
      await modelHandler(model1);
      expect(disclaimerState.model).to.equal(model1);

      // Create migration disclaimer
      await migrationHandler();
      expect(disclaimerState.model).to.equal(model1); // Should still be model1

      // Create second model disclaimer
      await modelHandler(model2);
      expect(disclaimerState.model).to.equal(model2); // Should now be model2

      // Verify panels were created with correct view types
      const calls = createWebviewPanelStub.getCalls();
      expect(calls[0].args[0]).to.equal('modelDisclaimer');
      expect(calls[1].args[0]).to.equal('migrationDisclaimer');
      expect(calls[2].args[0]).to.equal('modelDisclaimer');
    });
  });

  suite('Backward Compatibility', () => {
    test('Exported disclaimerState should reference model disclaimer state', async () => {
      const handler = (acceptDisclaimerModule as any).default.handler;
      const model = createMockModel('model-123', 'Test Model');

      await handler(model);

      // Verify exported state reflects model disclaimer
      expect(disclaimerState.model).to.equal(model);
      expect(disclaimerState.panel).to.not.be.undefined;
      expect(disclaimerState.acceptFlag).to.be.false;
    });
  });
});
