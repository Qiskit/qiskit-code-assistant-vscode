import vscode from "vscode";

/**
 * Command to test and debug streaming configuration
 */
async function handler(): Promise<void> {
  console.log("=== Qiskit Code Assistant Streaming Debug ===");
  
  // Get current configuration
  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const streamingEnabled = config.get<boolean>("enableStreaming");
  const telemetryEnabled = config.get<boolean>("enableTelemetry");
  
  console.log("Current configuration:", {
    streamingEnabled,
    telemetryEnabled,
    configSource: config.inspect("enableStreaming")
  });
  
  // Test streaming endpoint (if possible)
  try {
    const testResult = await testStreamingEndpoint();
    console.log("Streaming test result:", testResult);
  } catch (error) {
    console.error("Streaming test failed:", error);
  }
  
  // Show result to user
  const message = `Streaming Debug Results:
- Streaming Enabled: ${streamingEnabled}
- Telemetry Enabled: ${telemetryEnabled}
- Check console for detailed logs`;

  vscode.window.showInformationMessage(
    message,
    "Open Console",
    "Toggle Streaming",
    "Dismiss"
  ).then((choice) => {
    if (choice === "Open Console") {
      vscode.commands.executeCommand("workbench.action.toggleDevTools");
    } else if (choice === "Toggle Streaming") {
      config.update("enableStreaming", !streamingEnabled, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`Streaming ${!streamingEnabled ? 'enabled' : 'disabled'}`);
    }
  });
}

async function testStreamingEndpoint(): Promise<any> {
  const testStream = async function* () {
    yield { test: "chunk1", generated_text: "hello " };
    yield { test: "chunk2", generated_text: "world!" };
  };
  
  const chunks: any[] = [];
  for await (const chunk of testStream()) {
    chunks.push(chunk);
  }
  
  return {
    chunksReceived: chunks.length,
    chunks: chunks
  };
}

const command: CommandModule = {
  identifier: "qiskit-vscode.debug-streaming",
  handler,
};

export default command;
