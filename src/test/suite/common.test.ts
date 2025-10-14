import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { getServiceApi, invalidateServiceApi } from '../../services/common';
import ServiceAPI from '../../services/serviceApi';
import CodeAssistantService from '../../services/codeAssistant';
import OpenAIService from '../../services/openAI';
import { createMockResponse, createMockConfiguration } from '../mocks/vscode.mock';
import * as selectModel from '../../commands/selectModel';

suite('Common Service API Singleton Test Suite', () => {
  let workspaceStub: sinon.SinonStub;
  let runFetchStub: sinon.SinonStub;
  let checkForTokenStubCA: sinon.SinonStub;
  let checkForTokenStubOAI: sinon.SinonStub;

  setup(() => {
    // Stub vscode.workspace.getConfiguration
    workspaceStub = sinon.stub(vscode.workspace, 'getConfiguration');

    // Stub ServiceAPI.runFetch
    runFetchStub = sinon.stub(ServiceAPI, 'runFetch');

    // Stub checkForToken for both service types (default to success)
    checkForTokenStubCA = sinon.stub(CodeAssistantService.prototype, 'checkForToken').resolves();
    checkForTokenStubOAI = sinon.stub(OpenAIService.prototype, 'checkForToken').resolves();

    // Always invalidate before each test to ensure clean state
    invalidateServiceApi();
  });

  teardown(() => {
    workspaceStub.restore();
    runFetchStub.restore();
    checkForTokenStubCA.restore();
    checkForTokenStubOAI.restore();

    // Clean up after each test
    invalidateServiceApi();
  });

  suite('invalidateServiceApi', () => {
    test('should clear cached service instance', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse);

      // Get service first time
      const service1 = await getServiceApi();
      expect(service1).to.be.instanceOf(CodeAssistantService);

      // Invalidate cache
      invalidateServiceApi();

      // Get service again - should create new instance
      const service2 = await getServiceApi();
      expect(service2).to.be.instanceOf(CodeAssistantService);

      // Verify runFetch was called twice (once for each initialization)
      expect(runFetchStub.callCount).to.equal(2);
    });

    test('should clear current model selection when invalidating service API', () => {
      // Stub invalidateCurrentModel
      const invalidateCurrentModelStub = sinon.stub(selectModel, 'invalidateCurrentModel');

      // Call invalidateServiceApi
      invalidateServiceApi();

      // Verify invalidateCurrentModel was called
      expect(invalidateCurrentModelStub.calledOnce).to.be.true;

      // Restore stub
      invalidateCurrentModelStub.restore();
    });
  });

  suite('getServiceApi - caching behavior', () => {
    test('should return cached instance on subsequent calls with same URL', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse);

      // First call
      const service1 = await getServiceApi();
      expect(service1).to.be.instanceOf(CodeAssistantService);

      // Second call - should use cache
      const service2 = await getServiceApi();
      expect(service2).to.equal(service1);

      // runFetch should only be called once (cached on second call)
      expect(runFetchStub.callCount).to.equal(1);
    });

    test('should invalidate cache and reinitialize when URL changes', async () => {
      // First URL
      const mockConfig1 = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig1);

      const mockResponse1 = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse1);

      // Get service with first URL
      const service1 = await getServiceApi();
      expect(service1).to.be.instanceOf(CodeAssistantService);
      expect(runFetchStub.callCount).to.equal(1);

      // Change URL
      const mockConfig2 = createMockConfiguration({
        url: 'https://api.openai.com'
      });
      workspaceStub.returns(mockConfig2);

      const mockResponse2 = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'text/html' }
      });
      runFetchStub.resolves(mockResponse2);

      // Get service with new URL - should reinitialize
      const service2 = await getServiceApi();
      expect(service2).to.be.instanceOf(OpenAIService);

      // runFetch should be called twice (once for each URL)
      expect(runFetchStub.callCount).to.equal(2);
    });

    test('should invalidate cache when URL changes to undefined', async () => {
      // First URL
      const mockConfig1 = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig1);

      const mockResponse1 = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse1);

      // Get service with first URL
      const service1 = await getServiceApi();
      expect(service1).to.be.instanceOf(CodeAssistantService);
      expect(runFetchStub.callCount).to.equal(1);

      // Change URL to undefined
      const mockConfig2 = createMockConfiguration({
        url: undefined
      });
      workspaceStub.returns(mockConfig2);

      // This should trigger cache invalidation and attempt to reinitialize
      // The initialization will likely fail due to missing URL, but cache should be cleared
      try {
        await getServiceApi();
      } catch (err) {
        // Expected to fail, but cache should be invalidated
      }

      // Verify cache was invalidated (runFetch called again)
      expect(runFetchStub.callCount).to.be.greaterThan(1);
    });

    test('should handle concurrent initialization requests', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      let resolveResponse: any;
      const responsePromise = new Promise<Response>((resolve) => {
        resolveResponse = resolve;
      });
      runFetchStub.returns(responsePromise);

      // Start multiple concurrent requests
      const promise1 = getServiceApi();
      const promise2 = getServiceApi();
      const promise3 = getServiceApi();

      // Resolve the mock response after all promises are created
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      resolveResponse(mockResponse);

      // Wait for all requests to complete
      const [service1, service2, service3] = await Promise.all([promise1, promise2, promise3]);

      // All should return the same instance
      expect(service1).to.equal(service2);
      expect(service2).to.equal(service3);

      // runFetch should only be called once despite concurrent requests
      expect(runFetchStub.callCount).to.equal(1);
    });
  });

  suite('getServiceApi - service type detection', () => {
    test('should initialize CodeAssistantService when response contains qiskit-code-assistant name', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse);

      const service = await getServiceApi();
      expect(service).to.be.instanceOf(CodeAssistantService);
      expect(service.name).to.equal('qiskit-code-assistant');
    });

    test('should initialize OpenAIService when response is not JSON', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://api.openai.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'text/html' },
        textResponse: '<html>OpenAI API</html>'
      });
      runFetchStub.resolves(mockResponse);

      const service = await getServiceApi();
      expect(service).to.be.instanceOf(OpenAIService);
      expect(service.name).to.equal('open-ai');
    });

    test('should initialize OpenAIService when JSON response has different name', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://api.openai.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'other-service' }
      });
      runFetchStub.resolves(mockResponse);

      const service = await getServiceApi();
      expect(service).to.be.instanceOf(OpenAIService);
    });

    test('should initialize OpenAIService when content-type is application/json with charset', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://api.openai.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
        data: { name: 'other-service' }
      });
      runFetchStub.resolves(mockResponse);

      const service = await getServiceApi();
      expect(service).to.be.instanceOf(OpenAIService);
    });

    test('should initialize OpenAIService when content-type is missing', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://api.openai.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: {}, // No content-type header
        textResponse: 'OK'
      });
      runFetchStub.resolves(mockResponse);

      const service = await getServiceApi();
      expect(service).to.be.instanceOf(OpenAIService);
    });

    test('should initialize OpenAIService when JSON response has no name field', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://api.openai.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { version: '1.0' } // No name field
      });
      runFetchStub.resolves(mockResponse);

      const service = await getServiceApi();
      expect(service).to.be.instanceOf(OpenAIService);
    });
  });

  suite('getServiceApi - error handling', () => {
    test('should invalidate cache and throw error when initialization fails', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      // First call fails
      runFetchStub.rejects(new Error('Network error'));

      try {
        await getServiceApi();
        expect.fail('Should have thrown error');
      } catch (err: any) {
        expect(err.message).to.include('Service API failed');
      }

      // Verify cache was invalidated by checking that second call also attempts fetch
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse);

      // Second call should succeed and not use cache
      const service = await getServiceApi();
      expect(service).to.be.instanceOf(CodeAssistantService);

      // runFetch should be called twice (once for failed attempt, once for retry)
      expect(runFetchStub.callCount).to.equal(2);
    });

    test('should handle checkForToken rejection', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse);

      // Use callsFake to override the stub behavior for this specific call
      checkForTokenStubCA.callsFake(async () => {
        throw new Error('Token validation failed');
      });

      try {
        await getServiceApi();
        expect.fail('Should have thrown error');
      } catch (err: any) {
        expect(err.message).to.include('Service API failed');
      }
    });

    test('should clear initialization promise on error to allow retry', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      // First call fails
      runFetchStub.onFirstCall().rejects(new Error('Network error'));

      // First attempt should fail
      try {
        await getServiceApi();
        expect.fail('Should have thrown error');
      } catch (err: any) {
        expect(err.message).to.include('Service API failed');
      }

      // Second call succeeds - configure stub after first failure
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.onSecondCall().resolves(mockResponse);

      // Second attempt should succeed (not stuck with failed promise)
      const service = await getServiceApi();
      expect(service).to.be.instanceOf(CodeAssistantService);
    });
  });

  suite('getServiceApi - URL tracking', () => {
    test('should track lastServiceUrl on successful initialization', async () => {
      const serviceUrl = 'https://qiskit-code-assistant.quantum.ibm.com';
      const mockConfig = createMockConfiguration({ url: serviceUrl });
      workspaceStub.returns(mockConfig);

      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.resolves(mockResponse);

      await getServiceApi();

      // Get service again - should use cache (same URL)
      await getServiceApi();

      // Should only initialize once
      expect(runFetchStub.callCount).to.equal(1);
    });

    test('should not track URL on failed initialization', async () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      // First call fails
      runFetchStub.onFirstCall().rejects(new Error('Network error'));

      try {
        await getServiceApi();
        expect.fail('Should have thrown error');
      } catch (err: any) {
        // Expected error
      }

      // Mock successful response for retry
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        headers: { 'content-type': 'application/json' },
        data: { name: 'qiskit-code-assistant' }
      });
      runFetchStub.onSecondCall().resolves(mockResponse);

      // Retry with same URL should attempt initialization again
      await getServiceApi();

      // Both calls should attempt fetch (URL wasn't tracked on first failure)
      expect(runFetchStub.callCount).to.equal(2);
    });
  });
});
