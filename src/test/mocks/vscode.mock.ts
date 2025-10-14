import * as sinon from 'sinon';
import * as vscode from 'vscode';

/**
 * Create a mock VSCode ExtensionContext for testing
 */
export function createMockExtensionContext(): vscode.ExtensionContext {
  return {
    subscriptions: [],
    workspaceState: {
      get: sinon.stub(),
      update: sinon.stub().resolves(),
      keys: sinon.stub().returns([])
    } as any,
    globalState: {
      get: sinon.stub(),
      update: sinon.stub().resolves(),
      keys: sinon.stub().returns([]),
      setKeysForSync: sinon.stub()
    } as any,
    secrets: {
      get: sinon.stub().resolves(undefined),
      store: sinon.stub().resolves(),
      delete: sinon.stub().resolves(),
      onDidChange: sinon.stub()
    } as any,
    extensionUri: vscode.Uri.file('/mock/extension/path'),
    extensionPath: '/mock/extension/path',
    environmentVariableCollection: {} as any,
    asAbsolutePath: (relativePath: string) => `/mock/extension/path/${relativePath}`,
    storageUri: vscode.Uri.file('/mock/storage'),
    storagePath: '/mock/storage',
    globalStorageUri: vscode.Uri.file('/mock/global/storage'),
    globalStoragePath: '/mock/global/storage',
    logUri: vscode.Uri.file('/mock/log'),
    logPath: '/mock/log',
    extensionMode: vscode.ExtensionMode.Test,
    extension: {} as any,
    languageModelAccessInformation: {} as any
  };
}

/**
 * Create a mock VSCode TextDocument
 */
export function createMockTextDocument(options: {
  languageId?: string;
  uri?: vscode.Uri;
  fileName?: string;
  lineCount?: number;
  getText?: () => string;
} = {}): vscode.TextDocument {
  return {
    uri: options.uri || vscode.Uri.file('/mock/file.py'),
    fileName: options.fileName || '/mock/file.py',
    isUntitled: false,
    languageId: options.languageId || 'python',
    version: 1,
    isDirty: false,
    isClosed: false,
    save: sinon.stub().resolves(true),
    eol: vscode.EndOfLine.LF,
    lineCount: options.lineCount || 10,
    lineAt: sinon.stub(),
    offsetAt: sinon.stub(),
    positionAt: sinon.stub(),
    getText: options.getText || sinon.stub().returns(''),
    getWordRangeAtPosition: sinon.stub(),
    validateRange: sinon.stub(),
    validatePosition: sinon.stub()
  } as any;
}

/**
 * Create a mock VSCode TextEditor
 */
export function createMockTextEditor(document?: vscode.TextDocument): vscode.TextEditor {
  return {
    document: document || createMockTextDocument(),
    selection: new vscode.Selection(0, 0, 0, 0),
    selections: [new vscode.Selection(0, 0, 0, 0)],
    visibleRanges: [],
    options: {},
    viewColumn: vscode.ViewColumn.One,
    edit: sinon.stub().resolves(true),
    insertSnippet: sinon.stub().resolves(true),
    setDecorations: sinon.stub(),
    revealRange: sinon.stub(),
    show: sinon.stub(),
    hide: sinon.stub()
  } as any;
}

/**
 * Create a mock Response object for fetch testing
 */
export function createMockResponse(options: {
  ok?: boolean;
  status?: number;
  statusText?: string;
  data?: any;
  textResponse?: string;
  headers?: Record<string, string>;
}): Response {
  const { ok = true, status = 200, statusText = 'OK', data = {}, textResponse, headers = {} } = options;

  return {
    ok,
    status,
    statusText,
    headers: new Headers(headers),
    json: sinon.stub().resolves(data),
    text: sinon.stub().resolves(textResponse !== undefined ? textResponse : JSON.stringify(data)),
    body: null,
    bodyUsed: false,
    redirected: false,
    type: 'basic',
    url: 'https://mock.api.com',
    clone: sinon.stub(),
    arrayBuffer: sinon.stub(),
    blob: sinon.stub(),
    formData: sinon.stub()
  } as any;
}

/**
 * Create a mock configuration object
 */
export function createMockConfiguration(values: Record<string, any> = {}) {
  return {
    get: sinon.stub().callsFake((key: string) => values[key]),
    has: sinon.stub().callsFake((key: string) => key in values),
    inspect: sinon.stub(),
    update: sinon.stub().resolves()
  };
}
