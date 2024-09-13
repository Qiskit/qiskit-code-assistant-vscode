import * as vscode from "vscode";

const EXTENSION_SUBSTRING = "qiskit-vscode";

type ColorCustomizations = {
  "statusBar.background": string;
};

interface CodeAssistantExtensionProperties {
  extensionPath: string | undefined;
  version: string | undefined;
  name: string;
  vscodeVersion: string;
  isTypeScriptAutoImports: boolean | undefined;
  isJavaScriptAutoImports: boolean | undefined;
  id: string | undefined;
  logFilePath: string;
  logLevel: string | undefined;
  isRemote: boolean;
  remoteName: string;
  extensionKind: number;
  themeKind: string;
  themeName: string | undefined;
  statusBarColorCustomizations: string | undefined;
  isExtensionBetaChannelEnabled: boolean;
  isVscodeInsiders: boolean;
  isVscodeInlineAPIEnabled: boolean | undefined;
}

function getContext(): CodeAssistantExtensionProperties {
  const extension:
    | vscode.Extension<unknown>
    | undefined = vscode.extensions.all.find((x) =>
    x.id.includes(EXTENSION_SUBSTRING)
  );
  const configuration = vscode.workspace.getConfiguration();
  const isJavaScriptAutoImports = configuration.get<boolean>(
    "javascript.suggest.autoImports"
  );
  const isTypeScriptAutoImports = configuration.get<boolean>(
    "typescript.suggest.autoImports"
  );
  const logFilePath = configuration.get<string>("qiskit-vscode.logFilePath");
  const logLevel = configuration.get<string>("qiskit-vscode.logLevel");
  const { remoteName } = vscode.env as { remoteName: string };
  const { extensionKind } = extension as { extensionKind: number };
  const isRemote = !!remoteName && extensionKind === 2;

  const isExtensionBetaChannelEnabled =
    configuration.get<boolean>("qiskit-vscode.receiveBetaChannelUpdates") || false;

  const isVscodeInsiders = vscode.env.appName
    .toLocaleLowerCase()
    .includes("insider");

  return {
    get extensionPath(): string | undefined {
      return extension?.extensionPath;
    },

    get version(): string | undefined {
      return (extension?.packageJSON as { version: string }).version;
    },
    get id() {
      return extension?.id;
    },

    get name(): string {
      return `${EXTENSION_SUBSTRING}-${this.version ?? "unknown"}`;
    },
    get vscodeVersion(): string {
      return vscode.version;
    },
    get isJavaScriptAutoImports(): boolean | undefined {
      return isJavaScriptAutoImports;
    },
    get isTypeScriptAutoImports(): boolean | undefined {
      return isTypeScriptAutoImports;
    },
    get logFilePath(): string {
      return logFilePath ? `${logFilePath}-${process.pid}` : "";
    },
    get logLevel(): string | undefined {
      return logLevel;
    },
    get isRemote(): boolean {
      return isRemote;
    },
    get remoteName(): string {
      return remoteName;
    },
    get extensionKind(): number {
      return extensionKind;
    },
    get themeKind(): string {
      return vscode.ColorThemeKind[vscode.window.activeColorTheme.kind];
    },
    get themeName(): string | undefined {
      const workbenchConfig = getWorkbenchSettings();
      return workbenchConfig.get<string>("colorTheme");
    },
    get statusBarColorCustomizations(): string | undefined {
      const workbenchConfig = getWorkbenchSettings();
      const colorCustomizations = workbenchConfig.get<ColorCustomizations>(
        "colorCustomizations"
      );
      return colorCustomizations?.["statusBar.background"];
    },
    get isExtensionBetaChannelEnabled(): boolean {
      return isExtensionBetaChannelEnabled;
    },
    get isVscodeInsiders(): boolean {
      return isVscodeInsiders;
    },
    get isVscodeInlineAPIEnabled(): boolean | undefined {
      const INLINE_API_KEY = "editor.inlineSuggest.enabled";
      if (configuration.has(INLINE_API_KEY)) {
        return configuration.get<boolean>(INLINE_API_KEY, false);
      }
      return undefined;
    },
  };
}

function getWorkbenchSettings() {
  return vscode.workspace.getConfiguration("workbench");
}

const codeAssistantExtensionProperties: CodeAssistantExtensionProperties = getContext();

export default codeAssistantExtensionProperties;
