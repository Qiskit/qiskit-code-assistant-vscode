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
import { promises as fs } from 'fs';
import { createMockExtensionContext, createMockConfiguration } from '../mocks/vscode.mock';

/**
 * Test Suite: Select Credential
 *
 * This test suite validates the credential selection functionality that allows
 * users to choose which credential to use when multiple entries exist in qiskit-ibm.json.
 *
 * Why this is needed:
 * Users may have multiple IBM Quantum credentials configured in their qiskit-ibm.json file
 * (e.g., production, development, different teams). Without credential selection, the extension
 * would only use one based on a hardcoded priority order, providing poor UX.
 *
 * The credential selection feature:
 * 1. Discovers all credentials in qiskit-ibm.json (with any arbitrary names)
 * 2. Presents a UI for users to select their preferred credential
 * 3. Persists the selection in VSCode settings
 * 4. Uses the selected credential for authentication
 * 5. Falls back to priority order if no selection is made
 */
suite('Select Credential Test Suite', () => {
  let sandbox: sinon.SinonSandbox;
  let readFileStub: sinon.SinonStub;
  let mockContext: vscode.ExtensionContext;
  let getConfigurationStub: sinon.SinonStub;
  let executeCommandStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();
    readFileStub = sandbox.stub(fs, 'readFile');
    mockContext = createMockExtensionContext();
    getConfigurationStub = sandbox.stub(vscode.workspace, 'getConfiguration');
    executeCommandStub = sandbox.stub(vscode.commands, 'executeCommand').resolves();

    // Clear module cache to get fresh imports
    delete require.cache[require.resolve('../../commands/setApiToken')];
    delete require.cache[require.resolve('../../globals/extensionContext')];
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('getAllCredentials', () => {
    let getAllCredentials: any;

    setup(() => {
      const setApiTokenModule = require('../../commands/setApiToken');
      getAllCredentials = setApiTokenModule.getAllCredentials;
    });

    test('should return empty array when file does not exist', async () => {
      readFileStub.rejects({ code: 'ENOENT' });

      const credentials = await getAllCredentials();

      expect(credentials).to.be.an('array').that.is.empty;
    });

    test('should return empty array when file contains invalid JSON', async () => {
      readFileStub.resolves(Buffer.from('invalid json'));

      const credentials = await getAllCredentials();

      expect(credentials).to.be.an('array').that.is.empty;
    });

    test('should parse credentials with arbitrary names', async () => {
      const mockData = {
        'my-production-account': { token: 'prod-token-123' },
        'my-dev-account': { token: 'dev-token-456' },
        'team-shared': { token: 'shared-token-789' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const credentials = await getAllCredentials();

      expect(credentials).to.have.lengthOf(3);
      expect(credentials[0]).to.deep.include({
        name: 'my-production-account',
        token: 'prod-token-123',
        displayName: 'my-production-account'
      });
      expect(credentials[1]).to.deep.include({
        name: 'my-dev-account',
        token: 'dev-token-456',
        displayName: 'my-dev-account'
      });
      expect(credentials[2]).to.deep.include({
        name: 'team-shared',
        token: 'shared-token-789',
        displayName: 'team-shared'
      });
    });

    test('should parse standard credential names', async () => {
      const mockData = {
        'qiskit-code-assistant': { token: 'qca-token' },
        'default-ibm-quantum-platform': { token: 'platform-token' },
        'default-ibm-quantum': { token: 'quantum-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const credentials = await getAllCredentials();

      expect(credentials).to.have.lengthOf(3);
      expect(credentials.map((c: any) => c.name)).to.include.members([
        'qiskit-code-assistant',
        'default-ibm-quantum-platform',
        'default-ibm-quantum'
      ]);
    });

    test('should skip entries without tokens', async () => {
      const mockData = {
        'valid-account': { token: 'valid-token' },
        'invalid-account': {},
        'another-invalid': { token: undefined }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const credentials = await getAllCredentials();

      expect(credentials).to.have.lengthOf(1);
      expect(credentials[0].name).to.equal('valid-account');
    });

    test('should use raw credential names as display names', async () => {
      const mockData = {
        'kebab-case-name': { token: 'token1' },
        'snake_case_name': { token: 'token2' },
        'mixedCase_with-both': { token: 'token3' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const credentials = await getAllCredentials();

      expect(credentials[0].displayName).to.equal('kebab-case-name');
      expect(credentials[1].displayName).to.equal('snake_case_name');
      expect(credentials[2].displayName).to.equal('mixedCase_with-both');
    });

    test('should handle empty JSON object', async () => {
      readFileStub.resolves(Buffer.from('{}'));

      const credentials = await getAllCredentials();

      expect(credentials).to.be.an('array').that.is.empty;
    });
  });

  suite('getTokenFromJson (via initApiToken)', () => {
    let initApiToken: any;

    setup(() => {
      const setApiTokenModule = require('../../commands/setApiToken');
      initApiToken = setApiTokenModule.initApiToken;

      // Mock environment to not have QISKIT_IBM_TOKEN
      delete process.env['QISKIT_IBM_TOKEN'];
    });

    test('should return undefined when no credentials exist', async () => {
      readFileStub.rejects({ code: 'ENOENT' });

      const token = await initApiToken(mockContext);

      expect(token).to.be.undefined;
    });

    test('should use selected credential when configured', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' },
        'account-c': { token: 'token-c' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: 'account-b' });
      getConfigurationStub.returns(mockConfig);

      const token = await initApiToken(mockContext);

      expect(token).to.equal('token-b');
    });

    test('should fall back to priority order when no selection', async () => {
      const mockData = {
        'random-account': { token: 'random-token' },
        'default-ibm-quantum-platform': { token: 'platform-token' },
        'another-account': { token: 'another-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const token = await initApiToken(mockContext);

      expect(token).to.equal('platform-token');
    });

    test('should prioritize qiskit-code-assistant over others', async () => {
      const mockData = {
        'qiskit-code-assistant': { token: 'qca-token' },
        'default-ibm-quantum-platform': { token: 'platform-token' },
        'default-ibm-quantum': { token: 'quantum-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const token = await initApiToken(mockContext);

      expect(token).to.equal('qca-token');
    });

    test('should return first credential if no priority matches', async () => {
      const mockData = {
        'custom-account-1': { token: 'token-1' },
        'custom-account-2': { token: 'token-2' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const token = await initApiToken(mockContext);

      // Object.entries() order should be insertion order
      expect(token).to.equal('token-1');
    });

    test('should store token in secrets when context is provided', async () => {
      const mockData = {
        'test-account': { token: 'test-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      await initApiToken(mockContext);

      expect((mockContext.secrets.store as sinon.SinonStub).calledOnce).to.be.true;
      expect((mockContext.secrets.store as sinon.SinonStub).calledWith('apiToken', 'test-token')).to.be.true;
    });

    test('should prefer QISKIT_IBM_TOKEN env var over file', async () => {
      process.env['QISKIT_IBM_TOKEN'] = 'env-token';

      const mockData = {
        'qiskit-code-assistant': { token: 'file-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const token = await initApiToken(mockContext);

      expect(token).to.equal('env-token');

      delete process.env['QISKIT_IBM_TOKEN'];
    });
  });

  suite('selectCredentialCommand handler', () => {
    let selectCredentialHandler: any;
    let showQuickPickStub: sinon.SinonStub;
    let showWarningMessageStub: sinon.SinonStub;
    let showInformationMessageStub: sinon.SinonStub;

    setup(() => {
      // Set up extension context mock
      const extensionContextModule = require('../../globals/extensionContext');
      sandbox.stub(extensionContextModule, 'getExtensionContext').returns(mockContext);

      // Stub selectModel functions (needed for credential validation)
      const selectModelModule = require('../../commands/selectModel');
      sandbox.stub(selectModelModule, 'invalidateCurrentModel');
      sandbox.stub(selectModelModule, 'initModels').resolves();

      const setApiTokenModule = require('../../commands/setApiToken');
      selectCredentialHandler = setApiTokenModule.selectCredentialCommand.handler;

      showQuickPickStub = sandbox.stub(vscode.window, 'showQuickPick');
      showWarningMessageStub = sandbox.stub(vscode.window, 'showWarningMessage');
      showInformationMessageStub = sandbox.stub(vscode.window, 'showInformationMessage');
    });

    test('should show warning when no credentials found', async () => {
      readFileStub.rejects({ code: 'ENOENT' });

      await selectCredentialHandler();

      expect(showWarningMessageStub.calledOnce).to.be.true;
      expect(showWarningMessageStub.firstCall.args[0]).to.include('No credentials found');
    });

    test('should show info message when only one credential exists', async () => {
      const mockData = {
        'single-account': { token: 'single-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      await selectCredentialHandler();

      expect(showInformationMessageStub.calledOnce).to.be.true;
      expect(showInformationMessageStub.firstCall.args[0]).to.include('Only one credential');
    });

    test('should display quick pick with multiple credentials', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      showQuickPickStub.resolves(undefined); // User cancels

      await selectCredentialHandler();

      expect(showQuickPickStub.calledOnce).to.be.true;
      const quickPickItems = showQuickPickStub.firstCall.args[0];
      expect(quickPickItems).to.have.lengthOf(2);
    });

    test('should mark currently selected credential', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: 'account-b' });
      getConfigurationStub.returns(mockConfig);

      showQuickPickStub.resolves(undefined);

      await selectCredentialHandler();

      const quickPickItems = showQuickPickStub.firstCall.args[0];
      const selectedItem = quickPickItems.find((item: any) => item.credentialName === 'account-b');

      expect(selectedItem.description).to.include('Currently selected');
    });

    test('should update configuration and secrets when credential selected', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      showQuickPickStub.resolves({
        label: 'Account B',
        credentialName: 'account-b',
        token: 'token-b'
      } as any);

      await selectCredentialHandler();

      expect((mockConfig.update as sinon.SinonStub).calledOnce).to.be.true;
      expect((mockConfig.update as sinon.SinonStub).calledWith(
        'selectedCredential',
        'account-b',
        vscode.ConfigurationTarget.Global
      )).to.be.true;

      expect((mockContext.secrets.store as sinon.SinonStub).calledWith('apiToken', 'token-b')).to.be.true;
    });

    test('should show success message after selection', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      showQuickPickStub.resolves({
        label: 'Account B',
        credentialName: 'account-b',
        token: 'token-b'
      } as any);

      await selectCredentialHandler();

      expect(showInformationMessageStub.calledOnce).to.be.true;
      expect(showInformationMessageStub.firstCall.args[0]).to.include('Credential switched');
    });

    test('should set api-token-set context after selection', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      showQuickPickStub.resolves({
        label: 'Account B',
        credentialName: 'account-b',
        token: 'token-b'
      } as any);

      await selectCredentialHandler();

      expect(executeCommandStub.calledWith('setContext', 'qiskit-vscode.api-token-set', true)).to.be.true;
    });

    test('should do nothing when user cancels selection', async () => {
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      showQuickPickStub.resolves(undefined); // User cancels

      await selectCredentialHandler();

      expect((mockConfig.update as sinon.SinonStub).called).to.be.false;
      expect((mockContext.secrets.store as sinon.SinonStub).called).to.be.false;
    });
  });

  suite('integration tests', () => {
    test('should handle complete flow: file read → selection → persistence', async () => {
      // Setup
      const mockData = {
        'prod-account': { token: 'prod-token' },
        'dev-account': { token: 'dev-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const showQuickPickStub = sandbox.stub(vscode.window, 'showQuickPick');
      showQuickPickStub.resolves({
        label: 'Dev Account',
        credentialName: 'dev-account',
        token: 'dev-token'
      } as any);

      const extensionContextModule = require('../../globals/extensionContext');
      sandbox.stub(extensionContextModule, 'getExtensionContext').returns(mockContext);

      const setApiTokenModule = require('../../commands/setApiToken');
      const selectCredentialHandler = setApiTokenModule.selectCredentialCommand.handler;

      // Execute
      await selectCredentialHandler();

      // Verify complete flow
      expect(readFileStub.calledOnce).to.be.true;
      expect(showQuickPickStub.calledOnce).to.be.true;
      expect((mockConfig.update as sinon.SinonStub).calledWith(
        'selectedCredential',
        'dev-account',
        vscode.ConfigurationTarget.Global
      )).to.be.true;
      expect((mockContext.secrets.store as sinon.SinonStub).calledWith('apiToken', 'dev-token')).to.be.true;
    });

    test('should respect user selection in subsequent authentication calls', async () => {
      // First, select a credential
      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: 'account-b' });
      getConfigurationStub.returns(mockConfig);

      const setApiTokenModule = require('../../commands/setApiToken');
      const initApiToken = setApiTokenModule.initApiToken;

      // Execute
      const token = await initApiToken(mockContext);

      // Verify that the selected credential is used
      expect(token).to.equal('token-b');
    });
  });

  suite('backward compatibility', () => {
    test('should maintain default priority order when no selection', async () => {
      const mockData = {
        'random-account': { token: 'random' },
        'default-ibm-quantum': { token: 'quantum' },
        'qiskit-code-assistant': { token: 'qca' },
        'default-ibm-quantum-platform': { token: 'platform' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const setApiTokenModule = require('../../commands/setApiToken');
      const initApiToken = setApiTokenModule.initApiToken;

      const token = await initApiToken(mockContext);

      // Should pick qiskit-code-assistant (highest priority)
      expect(token).to.equal('qca');
    });

    test('should work with legacy single-credential setup', async () => {
      const mockData = {
        'qiskit-code-assistant': { token: 'legacy-token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const setApiTokenModule = require('../../commands/setApiToken');
      const initApiToken = setApiTokenModule.initApiToken;

      const token = await initApiToken(mockContext);

      expect(token).to.equal('legacy-token');
    });
  });

  suite('proactive credential selection prompt', () => {
    let promptCredentialSelectionIfNeeded: any;
    let showInformationMessageStub: sinon.SinonStub;

    setup(() => {
      const setApiTokenModule = require('../../commands/setApiToken');
      promptCredentialSelectionIfNeeded = setApiTokenModule.promptCredentialSelectionIfNeeded;
      showInformationMessageStub = sandbox.stub(vscode.window, 'showInformationMessage');
    });

    test('should not prompt if user chose "Don\'t Ask Again"', async () => {
      (mockContext.globalState.get as sinon.SinonStub).withArgs('qiskit.neverPromptCredentialSelection', false).returns(true);

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(showInformationMessageStub.called).to.be.false;
    });

    test('should not prompt if already prompted in this workspace', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).withArgs('qiskit.hasPromptedCredentialSelection', false).returns(true);

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(showInformationMessageStub.called).to.be.false;
    });

    test('should not prompt if user already has a selection', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: 'my-account' });
      getConfigurationStub.returns(mockConfig);

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(showInformationMessageStub.called).to.be.false;
    });

    test('should not prompt if only one credential exists', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const mockData = {
        'single-account': { token: 'token' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(showInformationMessageStub.called).to.be.false;
    });

    test('should not prompt if no credentials exist', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      readFileStub.rejects({ code: 'ENOENT' });

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(showInformationMessageStub.called).to.be.false;
    });

    test('should prompt when multiple credentials exist and no selection', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      showInformationMessageStub.resolves('Use Default');

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(showInformationMessageStub.calledOnce).to.be.true;
      expect(showInformationMessageStub.firstCall.args[0]).to.include('found 2 IBM Quantum credentials');
    });

    test('should call select-credential command when user chooses "Select Credential"', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      showInformationMessageStub.resolves('Select Credential');

      await promptCredentialSelectionIfNeeded(mockContext);

      expect(executeCommandStub.calledWith('qiskit-vscode.select-credential')).to.be.true;
    });

    test('should update global state when user chooses "Don\'t Ask Again"', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      showInformationMessageStub.resolves("Don't Ask Again");

      await promptCredentialSelectionIfNeeded(mockContext);

      expect((mockContext.globalState.update as sinon.SinonStub).calledWith(
        'qiskit.neverPromptCredentialSelection',
        true
      )).to.be.true;
    });

    test('should mark workspace as prompted before showing UI', async () => {
      (mockContext.globalState.get as sinon.SinonStub).returns(false);
      (mockContext.workspaceState.get as sinon.SinonStub).returns(false);

      const mockConfig = createMockConfiguration({ selectedCredential: '' });
      getConfigurationStub.returns(mockConfig);

      const mockData = {
        'account-a': { token: 'token-a' },
        'account-b': { token: 'token-b' }
      };
      readFileStub.resolves(Buffer.from(JSON.stringify(mockData)));

      showInformationMessageStub.resolves('Use Default');

      await promptCredentialSelectionIfNeeded(mockContext);

      expect((mockContext.workspaceState.update as sinon.SinonStub).calledWith(
        'qiskit.hasPromptedCredentialSelection',
        true
      )).to.be.true;
    });

    test('should not throw on errors and fail silently', async () => {
      (mockContext.globalState.get as sinon.SinonStub).throws(new Error('Test error'));

      // Should not throw
      await promptCredentialSelectionIfNeeded(mockContext);

      // Should complete without error
      expect(true).to.be.true;
    });
  });
});
