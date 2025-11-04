# Qiskit Code Assistant - Local Setup Guide

Run the Qiskit Code Assistant entirely on your local machine using our Qiskit open-source models!

## Quick Start (One Command)

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Qiskit/qiskit-code-assistant-vscode/main/setup_local.sh)
```

Or clone the repository and run:

```bash
bash setup_local.sh
```

That's it! The script will:

- Check if Visual Studio Code is installed
- Always upgrade the Qiskit Code Assistant extension to the latest version
- Install Ollama (if not already installed)
- Download the recommended Qiskit model
- Configure optimal model parameters
- Set up VSCode extension settings
- Verify everything is working

### Non-Interactive Mode

For CI/CD pipelines or automated setups, use the `--non-interactive` flag to skip all prompts:

```bash
bash setup_local.sh --non-interactive
# Or use the short form:
bash setup_local.sh -y
```

This will automatically:

- Install Ollama if missing (no prompt)
- Upgrade the extension to the latest version
- Proceed with all default options

## Requirements

- **Operating System**: macOS, Linux, or Windows (via Git Bash or WSL)
- **Visual Studio Code**: Installed with `code` command in PATH
- **RAM**: Minimum 8GB (16GB+ recommended for larger models)
- **Disk Space**: ~5-20GB depending on model size
- **Windows Users**: Git Bash (comes with Git for Windows) or WSL recommended

The script will automatically:

- Check for and offer to install/update the `Qiskit Code Assistant` VSCode extension
- Check for and offer to install Ollama

## Available Models

The setup script supports multiple models. By default, it uses **Qwen2.5-Coder 14B** which offers the best quality for code generation.

### Model Options

| Model                           | Size  | Quality                                               | RAM Required | Command                                          |
| ------------------------------- | ----- | ----------------------------------------------------- | ------------ | ------------------------------------------------ |
| **Qwen2.5-Coder 14B** (Default) | ~9GB  | Best for code                                         | 16GB+        | `hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF`     |
| Mistral Small 24B               | ~15GB | Most recent model                                     | 24GB+        | `hf.co/Qiskit/Mistral-Small-3.2-24B-Qiskit-GGUF` |
| Granite 3.3 8B                  | ~5GB  | Lightweight option, less accurate for code generation | 8GB+         | `hf.co/Qiskit/Granite-3.3-8B-Qiskit-GGUF`        |

All models are trained on **Qiskit 2.0+** and optimized for quantum computing code assistance.

**Built-in System Prompt**: These models include a comprehensive system prompt embedded in their chat template that defines them as Qiskit coding experts. The prompt emphasizes Qiskit 2.0 best practices, modern primitives (SamplerV2/EstimatorV2), and PassManagers instead of deprecated methods.

### Choosing a Different Model

```bash
# Use the most recent model (Mistral Small 24B) if you have 24GB+ RAM
bash setup_local.sh mistral-small-24b

# For systems with 8-12GB RAM (lightweight option, less accurate)
bash setup_local.sh granite-3.3-8b

# Combine with non-interactive mode for automation
bash setup_local.sh -y mistral-small-24b
```

### Script Options

```bash
# Show help
bash setup_local.sh --help

# List available models
bash setup_local.sh --list-models

# Non-interactive mode (for automation)
bash setup_local.sh --non-interactive
bash setup_local.sh -y
```

## Manual Setup (Alternative)

If you prefer to set up manually or the script doesn't work for your system:

### Step 1: Install Ollama

**macOS:**

```bash
# Download from https://ollama.com/download
# Or use Homebrew
brew install ollama
```

**Linux:**

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**

```bash
# Download the installer from https://ollama.com/download
# Run the .exe installer
# Then verify in Git Bash or WSL:
ollama --version
```

### Step 2: Download and Configure Model

```bash
# Pull the default model
ollama pull hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF

# Create optimized Modelfile
cat > ~/qiskit-modelfile <<EOF
FROM hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF

PARAMETER temperature 0
PARAMETER top_k 1
PARAMETER top_p 1
PARAMETER repeat_penalty 1.05
PARAMETER num_ctx 4096

# Note: The GGUF model has an embedded chat template with a comprehensive system prompt
# Ollama automatically uses this template - no SYSTEM or TEMPLATE directive needed
# The embedded prompt: "You are the Qiskit code assistant, a Qiskit coding expert
# developed by IBM Quantum..." includes Qiskit 2.0 best practices and guidance
EOF

# Create optimized model with a display-friendly name
# This creates a model named "qwen2.5-coder-14b-qiskit-gguf"
ollama create qwen2.5-coder-14b-qiskit-gguf -f ~/qiskit-modelfile
```

**Note:** The model name is shortened for better display in the extension UI by removing the `hf.co/Qiskit/` prefix and converting to lowercase. The `-qiskit-GGUF` suffix is kept to indicate it's a Qiskit-optimized model in GGUF format. The full HuggingFace name is `hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF`. For other models, use similar shortened names (e.g., `mistral-small-3.2-24b-qiskit-gguf` or `granite-3.3-8b-qiskit-gguf`).

### Step 3: Configure VSCode Extension

**Important:** You must restart VSCode after changing the configuration.

Open VSCode Settings (JSON):

1. Press `Cmd/Ctrl+Shift+P`
2. Type "Preferences: Open Settings (JSON)"
3. Add the following settings:

```json
{
  "qiskitCodeAssistant.url": "http://localhost:11434",
  "qiskitCodeAssistant.enableTelemetry": false,
  "qiskitCodeAssistant.enableStreaming": true
}
```

**Note:** The extension auto-detects that Ollama is an OpenAI-compatible service and uses the `/v1/completions` endpoint. Streaming is enabled for faster response feedback from Ollama.

### Step 4: Start Ollama and VSCode

```bash
# Verify Ollama is running
curl http://localhost:11434

# Restart VSCode to apply the new settings
# Then open a Python file
```

**Verify Configuration:**
After VSCode restarts:

1. Go to **Settings → Extensions → Qiskit Code Assistant**
2. Verify that **Qiskit Code Assistant: Url** shows `http://localhost:11434`
3. If it still shows the IBM URL, restart VSCode again

## Using the Code Assistant

Once set up, the Qiskit Code Assistant works just like the cloud version:

### Keyboard Shortcuts

- **`Ctrl + .`** - Trigger code completion
- **`Alt + [`** and **`Alt + ]`** - Cycle through suggestions
- **`Tab`** - Accept suggestion
- **`Esc`** - Reject suggestion

### Example Usage

1. Open a Python file in VSCode
2. Start typing Qiskit code:

   ```python
   from qiskit import QuantumCircuit

   # Create a Bell state
   qc = QuantumCircuit(2)
   qc.h(0)  # Press Ctrl+. here for suggestions
   ```

3. Press `Ctrl + .` to get AI-powered completions
4. Press `Tab` to accept the suggestion

## Configuration

### VSCode Settings

You can customize the extension behavior in VSCode Settings:

1. Open VSCode
2. Go to Settings (Cmd/Ctrl+,)
3. Search for "Qiskit Code Assistant"

Available settings:

- **qiskitCodeAssistant.url**: Ollama endpoint (default: `http://localhost:11434`)
- **qiskitCodeAssistant.enableTelemetry**: Send usage data (disabled by default for local)
- **qiskitCodeAssistant.enableStreaming**: Stream responses for faster feedback

## Troubleshooting

### Extension Not Working

**Check Ollama is Running:**

```bash
curl http://localhost:11434
# Should return: "Ollama is running"
```

**List Available Models:**

```bash
ollama list
```

**Test the Model:**

```bash
# Use the shortened model name created by the setup script
ollama run qwen2.5-coder-14b-qiskit-gguf
# Or for other models:
# ollama run mistral-small-3.2-24b-qiskit-gguf
# ollama run granite-3.3-8b-qiskit-gguf

# Type some Qiskit code and see if it responds
```

### Check Extension Installation

```bash
# Check if extension is installed
code --list-extensions | grep qiskit
# Should show: Qiskit.qiskit-vscode
```

### How OpenAI-Compatible API Integration Works

The extension automatically detects OpenAI-compatible services (including Ollama):

1. **Auto-detection:** When `qiskitCodeAssistant.url` is set to a service endpoint, the extension makes a test request to detect the service type
2. **OpenAI mode:** If the service doesn't return `"name": "qiskit-code-assistant"`, the extension activates OpenAI compatibility mode
3. **Endpoint usage:** In OpenAI mode, the extension uses `/v1/completions` endpoint
4. **Streaming:** Enabled by default for faster response feedback. The extension handles both:
   - **NDJSON format** (Ollama): `{...}\n{...}\n`
   - **SSE format** (OpenAI, others): `data: {...}\n\ndata: {...}\n\n`
   - Partial chunks are buffered until complete JSON objects are received

### Configuration Issues

**Extension Still Shows IBM URL:**

If the extension still shows `https://qiskit-code-assistant.quantum.ibm.com` after running the setup script:

1. **Verify VSCode Settings:**

   ```bash
   # On macOS
   cat ~/Library/Application\ Support/Code/User/settings.json | grep qiskitCodeAssistant

   # On Linux
   cat ~/.config/Code/User/settings.json | grep qiskitCodeAssistant
   ```

   Should show `"qiskitCodeAssistant.url": "http://localhost:11434"`

2. **Restart VSCode (Critical):**

   - Completely quit VSCode (Cmd+Q on macOS, or close all windows)
   - Wait a few seconds
   - Start VSCode again
   - Do NOT just reload the window - you must restart the application

3. **Clear Extension Host:**

   - Press Cmd/Ctrl+Shift+P
   - Type "Developer: Reload Window"
   - This will reload the extension host with new settings

4. **Verify in VSCode UI:**
   - Open VSCode Settings (Cmd/Ctrl+,)
   - Search for "Qiskit Code Assistant"
   - The URL field should show `http://localhost:11434`

**Reset Configuration:**

```bash
# Manually edit VSCode settings
code ~/Library/Application\ Support/Code/User/settings.json  # macOS
code ~/.config/Code/User/settings.json  # Linux

# Or reset and run setup_local.sh again
```

### Performance Issues

**Model Takes Too Long:**

- Try a smaller model (e.g., Granite 3.3 8B instead of Mistral Small 24B)
- Check system resources (RAM, CPU usage)
- Increase VSCode timeout settings if needed

**Out of Memory:**

```bash
# Check Ollama logs
# On Linux
journalctl -u ollama -f

# On macOS
# Check Console.app for Ollama logs

# Reduce model size by using a smaller variant
bash setup_local.sh granite-3.3-8b
```

### VSCode Not Detecting Extension

**Make sure 'code' command is in PATH:**

On macOS:
1. Open VSCode
2. Press Cmd+Shift+P
3. Type "Shell Command: Install 'code' command in PATH"

On Linux/Windows:
- The `code` command should be available after installation
- On Windows, use Git Bash or WSL

**Reinstall Extension:**

```bash
# Uninstall
code --uninstall-extension Qiskit.qiskit-vscode

# Reinstall
code --install-extension Qiskit.qiskit-vscode

# Restart VSCode
```

## Privacy & Security

### Benefits of Local Deployment

- **Complete Privacy**: Your code never leaves your machine
- **No Internet Required**: Works offline once models are downloaded
- **No Telemetry**: Disabled by default in local setup
- **Full Control**: Customize models and parameters as needed

### Data Handling

When running locally:

- No data is sent to IBM or external services
- All processing happens on your local machine
- No API tokens or authentication required
- You control all model parameters and behavior

## Comparison: Local vs Cloud

| Feature           | Local Setup               | IBM Quantum Cloud        |
| ----------------- | ------------------------- | ------------------------ |
| **Cost**          | Free                      | Requires Premium Account |
| **Privacy**       | Complete                  | Data sent to IBM         |
| **Speed**         | Depends on hardware       | Consistent               |
| **Internet**      | Only for initial download | Required                 |
| **Setup**         | One-time setup needed     | Immediate access         |
| **Model Updates** | Manual                    | Automatic                |
| **Resources**     | Uses your RAM/CPU         | Uses IBM infrastructure  |


## Switching Between Local and Cloud

You can easily switch between local Ollama and IBM Cloud:

**Use Local (Ollama):**
```json
{
  "qiskitCodeAssistant.url": "http://localhost:11434"
}
```

**Use IBM Cloud:**
```json
{
  "qiskitCodeAssistant.url": "https://qiskit-code-assistant.quantum.ibm.com"
}
```

Don't forget to restart VSCode after changing the URL!

## Advanced Configuration

### Custom Model Parameters

You can create custom models with different parameters:

```bash
cat > ~/custom-modelfile <<EOF
FROM hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF

# More creative responses
PARAMETER temperature 0.7
PARAMETER top_p 0.9

# Longer context
PARAMETER num_ctx 8192
EOF

ollama create my-custom-qiskit -f ~/custom-modelfile
```

### Multiple Models

Install multiple models and switch between them:

```bash
# Install all models
ollama pull hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF
ollama pull hf.co/Qiskit/Mistral-Small-3.2-24B-Qiskit-GGUF
ollama pull hf.co/Qiskit/Granite-3.3-8B-Qiskit-GGUF

# Create optimized versions
ollama create qwen2.5-coder-14b-qiskit-gguf -f ~/qwen-modelfile
ollama create mistral-small-3.2-24b-qiskit-gguf -f ~/mistral-modelfile
ollama create granite-3.3-8b-qiskit-gguf -f ~/granite-modelfile

# List all models
ollama list
```

## Updating

### Update the Extension

```bash
code --install-extension Qiskit.qiskit-vscode --force
```

Or use the setup script:

```bash
bash setup_local.sh --non-interactive
```

### Update Ollama

**macOS:**
```bash
brew upgrade ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Update Models

```bash
# Re-pull the model to get latest version
ollama pull hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF
```

## Related Documentation

- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [GETTING_STARTED.md](GETTING_STARTED.md) - Getting started guide
- [README.md](README.md) - Main documentation
- [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) - CI/CD documentation

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify Ollama is running: `curl http://localhost:11434`
3. Check VSCode extension logs (View → Output → Qiskit Code Assistant)
4. Open an issue at: https://github.com/Qiskit/qiskit-code-assistant-vscode/issues

## Frequently Asked Questions

**Q: Can I use this without an IBM Quantum account?**
A: Yes! Local mode doesn't require any IBM account or API token.

**Q: Which model should I choose?**
A: Start with Qwen2.5-Coder-14B-Qiskit for best code quality. Use Granite 3.3 8B if you have limited RAM.

**Q: How much disk space do I need?**
A: The Qwen 14B model is ~9GB. Allow for 15-20GB total with Ollama and cache.

**Q: Can I use custom models?**
A: Yes! You can use any GGUF model with Ollama. However, Qiskit-specific models will give better results for quantum computing code.

**Q: Is this slower than the cloud version?**
A: It depends on your hardware. On modern machines (M1/M2 Macs, high-end PCs), local inference can be as fast or faster than cloud with no network latency.

**Q: Can I use both local and cloud?**
A: Yes! Just change the `qiskitCodeAssistant.url` setting and restart VSCode to switch between them.
