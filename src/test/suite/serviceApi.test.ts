import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import ServiceAPI from '../../services/serviceApi';
import { createMockResponse, createMockConfiguration } from '../mocks/vscode.mock';
import { mockErrors } from '../mocks/fixtures';

use(chaiAsPromised);

suite('ServiceAPI Test Suite', () => {
  let fetchStub: sinon.SinonStub;

  setup(() => {
    // Stub the global fetch
    fetchStub = sinon.stub(global, 'fetch');
  });

  teardown(() => {
    fetchStub.restore();
  });

  suite('getHeaders', () => {
    test('should return headers without Authorization when no token provided', () => {
      const headers = ServiceAPI.getHeaders();
      expect(headers).to.deep.equal({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Caller': 'qiskit-vscode'
      });
    });

    test('should include Authorization header when token provided', () => {
      const headers = ServiceAPI.getHeaders('test-token-123');
      expect(headers).to.have.property('Authorization', 'Bearer test-token-123');
    });
  });

  suite('getErrorMessage', () => {
    test('should return error detail from JSON response', async () => {
      const mockResponse = createMockResponse({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: { detail: 'Invalid request data' }
      });

      const message = await ServiceAPI.getErrorMessage(mockResponse);
      expect(message).to.equal('Invalid request data');
    });

    test('should return plain text when response is not JSON', async () => {
      const mockResponse = createMockResponse({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        textResponse: 'Plain text error'
      });

      const message = await ServiceAPI.getErrorMessage(mockResponse);
      expect(message).to.equal('Plain text error');
    });

    test('should return statusText when text() fails', async () => {
      // Note: Using inline mock here instead of createMockResponse because we need
      // text() to reject with an error, which the helper doesn't support
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: sinon.stub().rejects(new Error('Read error'))
      } as any;

      const message = await ServiceAPI.getErrorMessage(mockResponse);
      expect(message).to.equal('Bad Request');
    });

    test('should return authorization error message for 401 status', async () => {
      const mockResponse = createMockResponse({
        ok: false,
        status: mockErrors.unauthorized.status,
        statusText: 'Unauthorized',
        data: { detail: mockErrors.unauthorized.detail }
      });

      const message = await ServiceAPI.getErrorMessage(mockResponse);
      expect(message).to.include('API Token is not authorized');
      expect(message).to.include(mockErrors.unauthorized.detail);
    });

    test('should return disclaimer error for 403 with disclaimer keyword', async () => {
      const mockResponse = createMockResponse({
        ok: false,
        status: mockErrors.forbidden.status,
        statusText: 'Forbidden',
        data: { detail: mockErrors.forbidden.detail }
      });

      const message = await ServiceAPI.getErrorMessage(mockResponse);
      expect(message).to.equal('Disclaimer has not yet been accepted');
    });

    test('should return unknown error for ok response', async () => {
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        statusText: 'OK'
      });

      const message = await ServiceAPI.getErrorMessage(mockResponse);
      expect(message).to.equal('An unknown error has occurred');
    });
  });

  suite('getServiceBaseUrl', () => {
    let workspaceStub: sinon.SinonStub;

    setup(() => {
      // Stub vscode.workspace.getConfiguration
      workspaceStub = sinon.stub(vscode.workspace, 'getConfiguration');
    });

    teardown(() => {
      workspaceStub.restore();
    });

    test('should return normalized URL from configuration', () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com/'
      });
      workspaceStub.returns(mockConfig);

      const url = ServiceAPI.getServiceBaseUrl();
      expect(url).to.equal('https://qiskit-code-assistant.quantum.ibm.com');
    });

    test('should handle URL without trailing slash', () => {
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);

      const url = ServiceAPI.getServiceBaseUrl();
      expect(url).to.equal('https://qiskit-code-assistant.quantum.ibm.com');
    });

    test('should throw error when URL is missing', () => {
      const mockConfig = createMockConfiguration({
        url: ''
      });
      workspaceStub.returns(mockConfig);

      expect(() => ServiceAPI.getServiceBaseUrl()).to.throw('Missing service URL');
    });

    test('should throw error when URL is undefined', () => {
      const mockConfig = createMockConfiguration({});
      workspaceStub.returns(mockConfig);

      expect(() => ServiceAPI.getServiceBaseUrl()).to.throw('Missing service URL');
    });
  });

  suite('runFetch', () => {
    let workspaceStub: sinon.SinonStub;

    setup(() => {
      workspaceStub = sinon.stub(vscode.workspace, 'getConfiguration');
      const mockConfig = createMockConfiguration({
        url: 'https://qiskit-code-assistant.quantum.ibm.com'
      });
      workspaceStub.returns(mockConfig);
    });

    teardown(() => {
      workspaceStub.restore();
    });

    test('should successfully fetch when response is ok', async () => {
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        data: { data: 'success' }
      });

      fetchStub.resolves(mockResponse);

      const response = await ServiceAPI.runFetch('/test', { method: 'GET' });
      expect(response).to.equal(mockResponse);
      expect(fetchStub.calledOnce).to.be.true;
    });

    test('should throw error when fetch fails', async () => {
      fetchStub.rejects(new Error('Network error'));

      await expect(ServiceAPI.runFetch('/test', { method: 'GET' }))
        .to.be.rejectedWith('Fetch failed');
    });

    test('should throw error when response is not ok', async () => {
      const mockResponse = createMockResponse({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: { detail: 'Invalid data' }
      });

      fetchStub.resolves(mockResponse);

      await expect(ServiceAPI.runFetch('/test', { method: 'GET' }))
        .to.be.rejectedWith('Invalid data');
    });

    test('should handle 404 errors correctly', async () => {
      const mockResponse = createMockResponse({
        ok: false,
        status: mockErrors.notFound.status,
        statusText: 'Not Found',
        data: { detail: mockErrors.notFound.detail }
      });

      fetchStub.resolves(mockResponse);

      await expect(ServiceAPI.runFetch('/api/missing', { method: 'GET' }))
        .to.be.rejectedWith(mockErrors.notFound.detail);
    });

    test('should normalize URL path with leading slash', async () => {
      const mockResponse = createMockResponse({ ok: true, status: 200 });
      fetchStub.resolves(mockResponse);

      await ServiceAPI.runFetch('test', { method: 'GET' });

      expect(fetchStub.calledOnce).to.be.true;
      const callUrl = fetchStub.firstCall.args[0];
      expect(callUrl).to.include('/test');
    });
  });

  suite('runFetchStreaming', () => {
    test('should stream response body chunks', async () => {
      const chunks = ['chunk1', 'chunk2', 'chunk3'];
      const mockReader = {
        read: sinon.stub()
          .onFirstCall().resolves({ done: false, value: new TextEncoder().encode(chunks[0]) })
          .onSecondCall().resolves({ done: false, value: new TextEncoder().encode(chunks[1]) })
          .onThirdCall().resolves({ done: false, value: new TextEncoder().encode(chunks[2]) })
          .resolves({ done: true, value: undefined })
      };

      const mockResponse = {
        ok: true,
        status: 200,
        body: {
          getReader: () => mockReader
        }
      } as any;

      fetchStub.resolves(mockResponse);

      const result: string[] = [];
      for await (const chunk of ServiceAPI.runFetchStreaming('/test', { method: 'POST' })) {
        result.push(chunk);
      }

      expect(result).to.deep.equal(chunks);
    });

    test('should throw error when response has no body', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        body: null
      } as any;

      fetchStub.resolves(mockResponse);

      const generator = ServiceAPI.runFetchStreaming('/test', { method: 'POST' });
      await expect(generator.next())
        .to.be.rejectedWith('No response body');
    });
  });

  suite('ServiceAPI instance', () => {
    test('should have correct name property', () => {
      const api = new ServiceAPI();
      expect(api.name).to.equal('service-api');
    });

    test('should have enableFeedback set to false', () => {
      const api = new ServiceAPI();
      expect(api.enableFeedback).to.be.false;
    });

    test('should have checkForToken method', async () => {
      const api = new ServiceAPI();
      await api.checkForToken();
      // Should resolve without error
    });

    test('should return empty array for getModels', async () => {
      const api = new ServiceAPI();
      const models = await api.getModels();
      expect(models).to.be.an('array').that.is.empty;
    });

    test('should return empty object for getModel', async () => {
      const api = new ServiceAPI();
      const model = await api.getModel('test-model');
      expect(model).to.be.an('object');
    });

    test('should return success for postDisclaimerAcceptance', async () => {
      const api = new ServiceAPI();
      const result = await api.postDisclaimerAcceptance('model-id', 'disclaimer-id', true);
      expect(result).to.deep.equal({ success: true });
    });

    test('should return success for postPromptAcceptance', async () => {
      const api = new ServiceAPI();
      const result = await api.postPromptAcceptance('prompt-id', true);
      expect(result).to.deep.equal({ success: true });
    });

    test('should return success for postFeedback', async () => {
      const api = new ServiceAPI();
      const result = await api.postFeedback({ rating: 5 });
      expect(result).to.deep.equal({ success: true });
    });
  });
});
