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
import { createMockExtensionContext } from '../mocks/vscode.mock';

/**
 * Test Suite: StatusBar Loading Counter
 *
 * This test suite validates the loading counter mechanism introduced to prevent
 * multiple spinners from appearing in the status bar when concurrent operations occur.
 *
 * The loadingCount mechanism works as follows:
 * - setLoadingStatus() increments a counter and adds spinner if not present
 * - setDefaultStatus() decrements the counter
 * - Spinner is only removed when counter reaches 0 (all operations complete)
 * - This ensures the spinner stays visible until ALL concurrent operations finish
 *
 * Example scenario:
 *   Operation A starts: setLoadingStatus() → counter = 1, spinner added
 *   Operation B starts: setLoadingStatus() → counter = 2, spinner already present
 *   Operation A completes: setDefaultStatus() → counter = 1, spinner remains
 *   Operation B completes: setDefaultStatus() → counter = 0, spinner removed
 */
suite('StatusBar Loading Counter Test Suite', () => {
  let statusBarModule: any;
  let commonModule: any;
  let mockStatusBar: vscode.StatusBarItem;
  let mockFeedbackStatusBar: vscode.StatusBarItem;

  setup(() => {
    // Import modules fresh for each test
    delete require.cache[require.resolve('../../statusBar/statusBar')];
    delete require.cache[require.resolve('../../commands/selectModel')];
    delete require.cache[require.resolve('../../services/common')];

    // Create mock status bar items
    mockStatusBar = {
      text: '',
      backgroundColor: undefined,
      command: undefined,
      show: sinon.stub(),
      hide: sinon.stub(),
      dispose: sinon.stub(),
      name: 'test-status-bar',
      tooltip: '',
      alignment: vscode.StatusBarAlignment.Left,
      priority: 0
    } as any;

    mockFeedbackStatusBar = {
      text: '$(feedback)',
      command: undefined,
      show: sinon.stub(),
      hide: sinon.stub(),
      dispose: sinon.stub(),
      name: 'test-feedback-status-bar',
      tooltip: '',
      alignment: vscode.StatusBarAlignment.Left,
      priority: 0
    } as any;

    // Stub window.createStatusBarItem to return our mocks
    let statusBarCallCount = 0;
    sinon.stub(vscode.window, 'createStatusBarItem').callsFake(() => {
      statusBarCallCount++;
      // Return feedback bar first (if service supports it), then main bar
      return statusBarCallCount === 1 ? mockFeedbackStatusBar : mockStatusBar;
    });

    // Stub commands.executeCommand
    sinon.stub(vscode.commands, 'executeCommand').resolves();

    // Load modules after stubs are in place
    statusBarModule = require('../../statusBar/statusBar');
    require('../../commands/selectModel');
    commonModule = require('../../services/common');

    // Stub getServiceApi
    const CodeAssistantService = require('../../services/codeAssistant').default;
    sinon.stub(commonModule, 'getServiceApi').resolves(new CodeAssistantService());
  });

  teardown(() => {
    sinon.restore();
  });

  suite('loading counter prevents multiple spinners', () => {
    test('should not add multiple spinners on concurrent setLoadingStatus calls', async () => {
      const context = createMockExtensionContext();
      await statusBarModule.registerStatusBar(context);

      mockStatusBar.text = 'Qiskit Code Assistant: Test Model';

      // Multiple concurrent loading calls
      statusBarModule.setLoadingStatus();
      statusBarModule.setLoadingStatus();
      statusBarModule.setLoadingStatus();

      // Should only have one spinner
      const spinnerCount = (mockStatusBar.text.match(/\$\(sync~spin\)/g) || []).length;
      expect(spinnerCount).to.equal(1);
    });

    test('should keep spinner until all loading operations complete', async () => {
      const context = createMockExtensionContext();
      await statusBarModule.registerStatusBar(context);

      mockStatusBar.text = 'Qiskit Code Assistant: Test Model';

      // Start 3 loading operations
      statusBarModule.setLoadingStatus();
      statusBarModule.setLoadingStatus();
      statusBarModule.setLoadingStatus();

      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Complete first operation - spinner should remain
      statusBarModule.setDefaultStatus();
      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Complete second operation - spinner should remain
      statusBarModule.setDefaultStatus();
      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Complete third operation - spinner should be removed
      statusBarModule.setDefaultStatus();
      expect(mockStatusBar.text).to.not.include('$(sync~spin)');
    });

    test('should handle interleaved loading and completion operations', async () => {
      const context = createMockExtensionContext();
      await statusBarModule.registerStatusBar(context);

      mockStatusBar.text = 'Qiskit Code Assistant: Test Model';

      // Operation 1 starts
      statusBarModule.setLoadingStatus(); // Counter: 1
      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Operation 2 starts
      statusBarModule.setLoadingStatus(); // Counter: 2

      // Operation 1 completes
      statusBarModule.setDefaultStatus(); // Counter: 1
      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Operation 3 starts
      statusBarModule.setLoadingStatus(); // Counter: 2

      // Operation 2 completes
      statusBarModule.setDefaultStatus(); // Counter: 1
      expect(mockStatusBar.text).to.include('$(sync~spin)');

      // Operation 3 completes
      statusBarModule.setDefaultStatus(); // Counter: 0
      expect(mockStatusBar.text).to.not.include('$(sync~spin)');
    });

    test('should restore original text with model name after all operations complete', async () => {
      const context = createMockExtensionContext();
      await statusBarModule.registerStatusBar(context);

      // Import and stub the currentModel
      const selectModelModule = require('../../commands/selectModel');
      const mockModel = { _id: 'test-id', display_name: 'GPT-4' } as ModelInfo;
      sinon.stub(selectModelModule, 'currentModel').value(mockModel);

      // Set initial status (simulates model being selected)
      mockStatusBar.text = 'Qiskit Code Assistant: GPT-4';

      // Multiple loading cycles
      statusBarModule.setLoadingStatus();
      statusBarModule.setLoadingStatus();
      expect(mockStatusBar.text).to.include('$(sync~spin)');
      expect(mockStatusBar.text).to.include('GPT-4');

      // Complete all operations
      statusBarModule.setDefaultStatus();
      statusBarModule.setDefaultStatus();

      // Should restore original text with model name and no spinner
      expect(mockStatusBar.text).to.equal('Qiskit Code Assistant: GPT-4');
      expect(mockStatusBar.text).to.not.include('$(sync~spin)');
    });

    test('should not add duplicate spinners if spinner already present', async () => {
      const context = createMockExtensionContext();
      await statusBarModule.registerStatusBar(context);

      mockStatusBar.text = 'Qiskit Code Assistant: Test Model $(sync~spin)';

      statusBarModule.setLoadingStatus();

      // Should not add another spinner
      const spinnerCount = (mockStatusBar.text.match(/\$\(sync~spin\)/g) || []).length;
      expect(spinnerCount).to.equal(1);
    });

    test('should not decrement counter below zero', async () => {
      const context = createMockExtensionContext();
      await statusBarModule.registerStatusBar(context);

      mockStatusBar.text = 'Qiskit Code Assistant: Test Model';

      // Call setDefaultStatus multiple times without any loading operations
      statusBarModule.setDefaultStatus();
      statusBarModule.setDefaultStatus();
      statusBarModule.setDefaultStatus();

      // Should not cause issues
      expect(mockStatusBar.text).to.not.include('$(sync~spin)');
    });
  });

  suite('edge cases', () => {
    test('should handle setLoadingStatus before registerStatusBar', () => {
      // Should not throw error
      statusBarModule.setLoadingStatus();
      expect(mockStatusBar.text).to.equal('');
    });

    test('should handle setDefaultStatus before registerStatusBar', () => {
      // Should not throw error
      statusBarModule.setDefaultStatus();
      expect(mockStatusBar.text).to.equal('');
    });
  });
});
