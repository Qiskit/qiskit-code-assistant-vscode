# Qiskit Code Assistant - Quick Start Guide

Get started with the Qiskit Code Assistant in under 5 minutes!

## Choose Your Setup

### Option 1: IBM Quantum Cloud (Recommended)

Use IBM's hosted service with the latest models.

**Requirements:**
- IBM Quantum premium account
- Internet connection

#### Steps:

1. **Install the Extension**
   - Open VSCode
   - Go to Extensions (Cmd/Ctrl+Shift+X)
   - Search for "Qiskit Code Assistant"
   - Click Install

2. **Create Your API Token (if you don't have one)**
   - Go to [IBM Quantum Platform](https://quantum.cloud.ibm.com/)
   - Login with your IBM Quantum account
   - Click `Create +` (upper-left in the API key section)
   - Enter **Name**
   - Click **Create**
   - Copy the API key

3. **Configure the Extension**
   - Press Cmd/Ctrl+Shift+P in VSCode
   - Type "Qiskit Code Assistant: Set IBM Quantum API token"
   - Paste your token and press Enter

4. **Accept the Model Disclaimer**
   - The first time you use the assistant, you'll see a model disclaimer
   - Read and click "Accept"

5. **Start Coding!**
   - Open a Python file
   - Press `Ctrl+.` to get AI suggestions
   - Press `Tab` to accept, `Esc` to reject

See [GETTING_STARTED.md](GETTING_STARTED.md) for detailed instructions.


### Option 2: Local Setup (For non-premium plan users)

Run everything on your local machine - **no internet required** for completions!

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Qiskit/qiskit-code-assistant-vscode/main/setup_local.sh)
```

**Pros:**
- ✅ Complete privacy - code never leaves your machine
- ✅ No API token needed
- ✅ Works offline
- ✅ Free forever

**Cons:**
- Requires 8-16GB RAM depending on model
- Initial setup downloads ~5-15GB

**Requirements:**
- Visual Studio Code installed
- 8GB+ RAM (16GB+ recommended)
- ~15-20GB disk space

See [LOCAL_SETUP.md](LOCAL_SETUP.md) for detailed instructions.

---

## Quick Comparison

| Feature | Local Setup | Cloud Setup |
|---------|-------------|-------------|
| **Privacy** | ✅ Complete | ⚠️ Code sent to IBM, not stored |
| **Speed** | Fast (depends on hardware) | Fast (depends on internet) |
| **Cost** | Free | Requires premium account |
| **Setup Time** | 5-10 minutes | 2 minutes |
| **Offline** | ✅ Yes | ❌ No |
| **RAM Required** | 8-16GB+ | Any |
| **Disk Space** | ~15-20GB | Minimal |

---

## Keyboard Shortcuts

Once set up, use these shortcuts in any Python file:

| Shortcut | Action |
|----------|--------|
| `Ctrl+.` | Trigger code completion |
| `Tab` | Accept suggestion |
| `Esc` | Reject suggestion |
| `Alt+[` / `Alt+]` | Cycle through suggestions |

---

## Example Usage

Try typing this in a Python file:

```python
from qiskit import QuantumCircuit

# Create a Bell state
qc = QuantumCircuit(2)
qc.h(0)
# Press Ctrl+. here for suggestions
```

The AI will suggest completing your quantum circuit!

---

## Next Steps

### For Local Setup Users:

1. **Choose a Model:**
   - Default: Qwen2.5-Coder 14B (best for code)
   - Lightweight: Granite 3.3 8B (for limited RAM)
   - Latest: Mistral Small 24B (for powerful systems)

2. **Customize Settings:**
   - Open VSCode Settings (Cmd/Ctrl+,)
   - Search for "Qiskit Code Assistant"
   - Adjust streaming, timeout, etc.

3. **Read the Docs:**
   - [LOCAL_SETUP.md](LOCAL_SETUP.md) - Detailed setup and troubleshooting
   - [README.md](README.md) - Feature overview

### For Cloud Setup Users:

1. **Explore Features:**
   - Code completion with `Ctrl+.`
   - Code migration (click the sparkle icon)
   - Inline suggestions

2. **Customize Shortcuts:**
   - Go to Preferences → Keyboard Shortcuts
   - Search for "qiskit-vscode"
   - Modify keybindings as needed

3. **Read the Docs:**
   - [GETTING_STARTED.md](GETTING_STARTED.md) - Detailed setup
   - [README.md](README.md) - Feature overview

---

## Troubleshooting

### Local Setup Issues

**Ollama Not Running?**
```bash
curl http://localhost:11434
# Should return: "Ollama is running"

# If not, start it:
ollama serve
```

**Extension Not Working?**
1. Verify VSCode settings have `"qiskitCodeAssistant.url": "http://localhost:11434"`
2. Restart VSCode completely (don't just reload window)
3. Check extension is installed: `code --list-extensions | grep qiskit`

See [LOCAL_SETUP.md](LOCAL_SETUP.md) for more troubleshooting.

### Cloud Setup Issues

**No API Token Accepted?**
1. Verify you're on IBM Quantum premium plan
2. Check token is copied correctly (no extra spaces)
3. Try regenerating token on IBM Quantum Platform

**Extension Not Showing Up?**
1. Check Extensions tab - make sure it's enabled
2. Reload VSCode window (Cmd/Ctrl+Shift+P → "Developer: Reload Window")
3. Check status bar at bottom for Qiskit icon

See [GETTING_STARTED.md](GETTING_STARTED.md) for more troubleshooting.

---

## Getting Help

- **Documentation:** Check [LOCAL_SETUP.md](LOCAL_SETUP.md) or [GETTING_STARTED.md](GETTING_STARTED.md)
- **Issues:** Report bugs at https://github.com/Qiskit/qiskit-code-assistant-vscode/issues
- **Community:** Join Qiskit Slack for community support

---

## Switching Between Local and Cloud

You can easily switch between setups by changing one setting:

**Use Local:**
```json
{
  "qiskitCodeAssistant.url": "http://localhost:11434"
}
```

**Use Cloud:**
```json
{
  "qiskitCodeAssistant.url": "https://qiskit-code-assistant.quantum.ibm.com"
}
```

Restart VSCode after changing the URL.

---

## Advanced Usage

### Local Setup: Choose Different Models

```bash
# Lightweight (8GB RAM)
bash setup_local.sh granite-3.3-8b

# Best quality (16GB RAM)
bash setup_local.sh qwen2.5-coder-14b

# Latest model (24GB RAM)
bash setup_local.sh mistral-small-24b
```

### Cloud Setup: Provide Feedback

- Click thumbs up/down on suggestions to help improve the model
- Click feedback icon in status bar for general feedback

---

## What's Next?

1. **Learn Qiskit 2.0:** The assistant is trained on the latest Qiskit
2. **Try Different Prompts:** Comment your intent and press Ctrl+.
3. **Explore Patterns:** Check out Qiskit patterns for reusable code
4. **Share Feedback:** Help improve the assistant by providing feedback

Happy quantum coding! 🚀
