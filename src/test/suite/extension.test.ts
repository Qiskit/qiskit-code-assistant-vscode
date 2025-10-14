import * as assert from 'assert';
import { expect } from 'chai';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

suite('Extension Integration Test Suite', () => {
  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
  });

  teardown(() => {
    sandbox.restore();
  });

  test('Extension should be present', () => {
    const extension = vscode.extensions.getExtension('Qiskit.qiskit-vscode');
    assert.ok(extension, 'Extension should be installed');
  });

  test('Extension should activate', async function() {
    this.timeout(10000); // Extension activation might take time

    const extension = vscode.extensions.getExtension('Qiskit.qiskit-vscode');
    assert.ok(extension, 'Extension should be present');

    if (!extension.isActive) {
      await extension.activate();
    }

    assert.ok(extension.isActive, 'Extension should be active');
  });

  test('Commands should be registered', async function() {
    this.timeout(10000);

    const extension = vscode.extensions.getExtension('Qiskit.qiskit-vscode');
    if (extension && !extension.isActive) {
      await extension.activate();
    }

    const commands = await vscode.commands.getCommands(true);

    const expectedCommands = [
      'qiskit-vscode.api-token',
      'qiskit-vscode.migrate-code',
      'qiskit-vscode.accept-suggestion',
      'qiskit-vscode.dismiss-suggestion',
      'qiskit-vscode.handle-get-completion'
    ];

    for (const cmd of expectedCommands) {
      expect(commands).to.include(cmd, `Command ${cmd} should be registered`);
    }
  });

  test('Configuration should have expected properties', () => {
    const config = vscode.workspace.getConfiguration('qiskitCodeAssistant');

    // Check that config properties exist
    assert.ok(config.has('url'), 'Should have url configuration');
    assert.ok(config.has('enableTelemetry'), 'Should have enableTelemetry configuration');
    assert.ok(config.has('enableStreaming'), 'Should have enableStreaming configuration');
  });

  test('Configuration should have correct default values', () => {
    const config = vscode.workspace.getConfiguration('qiskitCodeAssistant');

    const url = config.inspect('url')?.defaultValue;
    const enableTelemetry = config.inspect('enableTelemetry')?.defaultValue;
    const enableStreaming = config.inspect('enableStreaming')?.defaultValue;

    expect(url).to.equal('https://qiskit-code-assistant.quantum.ibm.com');
    expect(enableTelemetry).to.be.true;
    expect(enableStreaming).to.be.false;
  });

  test('Extension should work in Test mode', async function() {
    this.timeout(10000);

    const extension = vscode.extensions.getExtension('Qiskit.qiskit-vscode');

    if (extension && !extension.isActive) {
      await extension.activate();
    }

    // Extension should activate successfully in test mode
    // handlePluginInstalled should not run in test mode
    assert.ok(extension?.isActive);
  });
});
