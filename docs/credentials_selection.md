# Managing Multiple Credentials

## Quick Start

If you have multiple IBM Quantum accounts in your `~/.qiskit/qiskit-ibm.json` file, the extension helps you choose which one to use.

### First Time
When you open VS Code, you'll see a prompt:
```
Qiskit Code Assistant found N IBM Quantum credentials. Would you like to choose which one to use?
```

**Options:**
- **Select Credential** → Pick one from your file
- **Enter Token Manually** → Enter a token directly
- **Don't Ask Again** → Never show this prompt

### Switch Anytime
1. Press `Cmd/Ctrl+Shift+P`
2. Type: `Qiskit Code Assistant: Select Credential`
3. Choose from your credentials

### Reset Selection
1. Press `Cmd/Ctrl+Shift+P`
2. Type: `Qiskit Code Assistant: Reset Credential Selection`
3. Reload the window to be prompted again

## Configuration File

Your credentials are stored in `~/.qiskit/qiskit-ibm.json`:

```json
{
  "production": { "token": "prod_token" },
  "development": { "token": "dev_token" },
  "team-shared": { "token": "team_token" }
}
```

The extension:
- Automatically discovers all credentials
- Formats names nicely: `production` → "Production"
- Shows which one is currently selected

## Auto-Selection Priority

If you don't choose a credential, this order is used:

1. `QISKIT_IBM_TOKEN` environment variable (overrides everything)
2. `qiskit-code-assistant`
3. `default-ibm-quantum-platform`
4. `default-ibm-quantum`
5. First available credential

## Common Use Cases

**Multiple Environments**
```json
{
  "production": { "token": "prod_token" },
  "development": { "token": "dev_token" }
}
```
Each workspace can use a different credential automatically.

**Team Projects**
```json
{
  "team-project-a": { "token": "project_a_token" },
  "personal": { "token": "my_token" }
}
```
Switch between team and personal credentials as needed.

**Testing**
Quickly test with different accounts by selecting different credentials between runs.

## Troubleshooting

**"No credentials found"**
- Check file exists: `ls ~/.qiskit/qiskit-ibm.json`
- Verify JSON is valid
- Check permissions: `chmod 600 ~/.qiskit/qiskit-ibm.json`

**Credential not working**
- Run `Select Credential` command again
- Choose a different credential
- Or clear the setting to use auto-selection

**Reset the prompt**
- Use the `Reset Credential Selection` command
- This clears your selection, "Don't Ask Again" flag, and workspace state
- Reload the window to be prompted again

## Security

- Tokens stored in OS keychain/credential manager (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- The UI never shows actual tokens
- Set file permissions: `chmod 600 ~/.qiskit/qiskit-ibm.json`

## Advanced

**Environment Variable Override**
```bash
export QISKIT_IBM_TOKEN="your_token"
```
This overrides any credential selection (useful for CI/CD).

**Custom Names**
Use any name you want:
```json
{
  "client-acme": { "token": "..." },
  "research_2024": { "token": "..." }
}
```
Displayed as: "Client Acme", "Research 2024"

## FAQ

**Q: Does switching reload the extension?**
A: No, it's instant.

**Q: Can different files use different credentials?**
A: No, it's per-workspace.

**Q: What if I delete a selected credential?**
A: Auto-selection kicks in silently.

**Q: Does it work with local setup?**
A: No, this is for IBM Quantum Cloud only.

## For Developers

**Key Functions**
```typescript
getAllCredentials()              // Returns all credentials from file
promptCredentialSelectionIfNeeded(context)  // Shows prompt on startup
selectCredentialCommand          // Command module for manual selection
resetCredentialSelectionCommand  // Command module to reset all state
```

**State Keys**
- `qiskitCodeAssistant.selectedCredential` - Settings (selected credential name)
- `qiskit.hasPromptedCredentialSelection` - Workspace state (has shown prompt)
- `qiskit.neverPromptCredentialSelection` - Global state ("Don't Ask Again")

**Files Modified**
- `src/commands/setApiToken.ts` - Core logic
- `src/extension.ts` - Startup integration
- `types/index.d.ts` - Type: `[key: string]: { token?: string }`
- `package.json` - Command & setting registration

---

**Related:** [Set API Token](../README.md) | [Report Issues](https://github.com/Qiskit/qiskit-code-assistant-vscode/issues)
