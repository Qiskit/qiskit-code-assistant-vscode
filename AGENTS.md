# AGENTS.md

This file provides guidance to AI development assistants when working with code in this repository.

**Supported AI Assistants:**
- IBM Bob
- Claude Code
- GitHub Copilot
- Cursor AI
- Windsurf
- Gemini CLI
- Any AI assistant with codebase context awareness

## Project Overview

qiskit-code-assistant-vscode is a VSCode extension that provides AI-powered code completion for quantum computing development using Qiskit. It integrates with LLM APIs (IBM Quantum Cloud or OpenAI-compatible endpoints) to provide intelligent, context-aware code suggestions for Python quantum programs.

### Core Purpose
- Accelerate Qiskit code development with AI-powered completions
- Help developers learn Qiskit best practices through suggestions
- Support migration from Qiskit old Qiskit to v2.x
- Provide real-time streaming code generation
- Work both with cloud (IBM Quantum) and local (Ollama) deployments

### Key Technologies
- **Extension Platform**: VSCode Extension API (v1.88.0+)
- **Language**: TypeScript (strict mode)
- **LLM Integration**: IBM Quantum Cloud API, OpenAI-compatible APIs
- **Model**: `mistral-small-3.2-24b-qiskit` (via cloud) or other Qiskit Code Assistant LLMs (available through https://huggingface.co/Qiskit/models) via Ollama.
- **Streaming**: Server-Sent Events (SSE) with circuit breaker pattern
- **Testing**: Mocha + Chai + Sinon

## Architecture

### Component Structure
1. **Extension Core** ([src/extension.ts](src/extension.ts)):
   - Entry point and activation logic
   - Registers commands and inline completion provider
   - Manages background initialization

2. **Commands** ([src/commands/](src/commands/)):
   - `handleGetCompletion.ts`: Main completion trigger (Ctrl+.)
   - `setApiToken.ts`: API token management and credential selection
   - `migrateQiskitCode.ts`: Code migration from Qiskit v1.x to v2.x
   - `selectModel.ts`: Model selection UI
   - `acceptSuggestion.ts`: Suggestion acceptance logic

3. **Services** ([src/services/](src/services/)):
   - `serviceApi.ts`: Unified API layer and routing
   - `codeAssistant.ts`: IBM Quantum Cloud Qiskit Code Assistant service integration
   - `openAI.ts`: OpenAI-compatible API support
   - `qiskitMigration.ts`: Migration-specific IBM Quantum Cloud Qiskit Code Assistant service

4. **Streaming Pipeline** ([src/utilities/streamingPipeline.ts](src/utilities/streamingPipeline.ts)):
   - SSE parser for real-time streaming
   - Automatic retry with exponential backoff
   - Circuit breaker pattern for failure protection
   - LRU cache and debouncing

5. **Inline Suggestions** ([src/inlineSuggestions/](src/inlineSuggestions/)):
   - VSCode inline completion provider
   - Suggestion state management
   - Display and acceptance logic

### Data Flow
```
User Types Code → Trigger (Ctrl+.) → handleGetCompletion
                                            ↓
                                     runCompletion (orchestration)
                                            ↓
                                     serviceApi (routing)
                                            ↓
                           codeAssistant.ts OR openAI.ts
                                            ↓
                                  streamingPipeline (SSE parsing)
                                            ↓
                                  Inline Suggestion Display
                                            ↓
                              User Accepts (Tab) or Rejects (Esc)
```

## Key Components

### Configuration Settings
All extension settings are prefixed with `qiskitCodeAssistant.*`:
- `url`: API endpoint (default: https://qiskit-code-assistant.quantum.ibm.com)
- `selectedCredential`: Selected credential from ~/.qiskit/qiskit-ibm.json
- `enableTelemetry`: Opt-in telemetry (default: true)
- `enableStreaming`: Real-time streaming (default: true)
- `streamingBufferSize`: Chunks to buffer before displaying (default: 1)
- `streamingRetryAttempts`: Auto-retry attempts (default: 2)
- `streamingTimeout`: Request timeout in ms (default: 30000)
- `circuitBreakerEnabled`: Circuit breaker protection (default: true)
- `circuitBreakerThreshold`: Failures before circuit opens (default: 3)
- `streamingDebug`: Detailed debug logging (default: false)

### Core Files and Directories
- `src/extension.ts`: Main extension entry point
- `src/commands/`: All VSCode commands
- `src/services/`: LLM API integrations
- `src/utilities/`: Core utilities (streaming, completion, errors)
- `src/inlineSuggestions/`: Inline suggestion logic
- `src/statusBar/`: Status bar UI and telemetry
- `src/test/suite/`: Test suite
- `package.json`: Extension manifest and configuration
- `docs/`: User and developer documentation

## Development Guidelines

### Environment Setup

1. **Prerequisites**:
   - Visual Studio Code (with `code` command in PATH)
   - Node.js v18+
   - Git

2. **Installation**:
   ```bash
   # Clone the repository
   git clone https://github.com/Qiskit/qiskit-code-assistant-vscode.git
   cd qiskit-code-assistant-vscode

   # Install dependencies
   npm ci

   # Open in VSCode
   code .
   ```

3. **Running from Source**:
   - Press `F5` or go to Run and Debug → "Launch Extension"
   - A new VSCode window opens with the extension loaded
   - Make changes and reload with Cmd/Ctrl+R in the extension window

4. **Building VSIX**:
   ```bash
   # Package extension
   npm run vsce:package

   # This creates qiskit-vscode-<version>.vsix
   # Install via Extensions → Install from VSIX...
   ```

### Code Conventions

1. **TypeScript Standards**:
   - Strict mode enabled
   - Prefer `async/await` over promises
   - Use typed errors with try/catch
   - Naming: camelCase for functions, PascalCase for classes
   - JSDoc comments for public APIs

2. **Extension Patterns**:
   - Commands registered in `src/commands/index.ts`
   - All commands export `{ identifier, handler }`
   - Use `vscode.window.showInformationMessage()` for user feedback
   - Store secrets in `context.secrets` (SecretStorage)

3. **API Integration**:
   - All API calls go through `src/services/serviceApi.ts`
   - Use streaming pipeline for real-time responses
   - Implement proper error handling and retry logic
   - Follow existing patterns in `codeAssistant.ts` or `openAI.ts`

4. **Testing**:
   - Write tests in `src/test/suite/`
   - Use Mocha + Chai + Sinon
   - Mock VSCode API using `src/test/mocks/vscode.mock.ts`
   - Run tests: `npm test`

5. **Debugging**:
   - Enable debug logging: `qiskitCodeAssistant.streamingDebug: true`
   - Check Developer Console: Help → Toggle Developer Tools
   - Look for prefixed logs: `[Streaming Debug]`, `[Circuit Breaker]`
   - Monitor status bar for real-time feedback

### Adding New Features

1. **Adding a New Command**:
   ```typescript
   // src/commands/myNewCommand.ts
   import * as vscode from "vscode";

   async function handler(): Promise<void> {
     // Command implementation
   }

   export default {
     identifier: "qiskit-vscode.my-new-command",
     handler,
   };

   // Add to src/commands/index.ts
   import myNewCommand from "./myNewCommand";
   export default [
     // ... existing commands
     myNewCommand,
   ];

   // Register in package.json under contributes.commands
   ```

2. **Adding a New API Service**:
   - Create new file in `src/services/`
   - Implement streaming and non-streaming methods
   - Follow patterns from `codeAssistant.ts` or `openAI.ts`
   - Add to `serviceApi.ts` routing logic
   - Update tests in `src/test/suite/serviceApi.test.ts`

3. **Adding New Configuration**:
   - Add to `package.json` under `contributes.configuration.properties`
   - Follow naming: `qiskitCodeAssistant.<settingName>`
   - Access via `vscode.workspace.getConfiguration("qiskitCodeAssistant")`
   - Document in README.md and relevant docs

4. **Modifying Streaming Behavior**:
   - Core logic in `src/utilities/streamingPipeline.ts`
   - Read [docs/streaming.md](docs/streaming.md) first
   - Test with different network conditions
   - Ensure circuit breaker still works correctly

## Common Tasks

### Building and Testing
```bash
# Install dependencies
npm ci

# Build extension
npm run build

# Build with watch mode
npm run build-watch

# Run tests
npm test

# Compile tests
npm run compile-tests

# Watch tests
npm run watch-tests

# Package VSIX
npm run vsce:package
```

### Debugging Workflows

1. **Debugging Extension**:
   - Set breakpoints in TypeScript code
   - Press F5 to launch debug session
   - Extension Host window opens
   - Trigger your code path
   - Debugger pauses at breakpoints

2. **Debugging Tests**:
   - Set breakpoints in test files
   - Run specific test file
   - Use VSCode's test runner or npm test

3. **Debugging Streaming Issues**:
   - Enable: `qiskitCodeAssistant.streamingDebug: true`
   - Open Developer Tools (Help → Toggle Developer Tools)
   - Trigger completion
   - Check Console for detailed logs
   - Look for SSE parsing, retry attempts, circuit breaker state

### Release Process
Releases are automated via GitHub Actions:

1. Update version in `package.json`
2. Create git tag: `git tag v0.15.2`
3. Push tag: `git push origin v0.15.2`
4. Create GitHub Release with the tag
5. CI automatically builds, tests, and publishes to:
   - VSCode Marketplace
   - Open VSX Registry

See [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) for complete details.

## Documentation Structure

### User-Facing Documentation
- [README.md](README.md): Installation, setup, features
- [LOCAL_SETUP.md](LOCAL_SETUP.md): Local deployment with Ollama
- [docs/streaming.md](docs/streaming.md): Streaming configuration
- [docs/credentials_selection.md](docs/credentials_selection.md): Multi-credential setup
- [docs/EULA.md](docs/EULA.md): Model license and terms

### Developer Documentation
- [CONTRIBUTING.md](CONTRIBUTING.md): Contribution guidelines
- [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md): Release workflow
- [docs/MARKETPLACE_PUBLISHING.md](docs/MARKETPLACE_PUBLISHING.md): Marketplace setup (maintainers only)
- [docs/OPEN_VSX_SETUP.md](docs/OPEN_VSX_SETUP.md): Open VSX setup (maintainers only)

## Important Constraints

### What This Extension Does
- **Code completion only**: Provides inline suggestions for Python/Qiskit code
- **Single file context**: Analyzes current file only, no multi-file context
- **Python files**: Works with `.py` files and Jupyter notebooks (`.ipynb`)
- **Streaming**: Real-time token-by-token generation

### What This Extension Does NOT Do
- Does NOT analyze multiple files or workspace
- Does NOT execute code or quantum circuits
- Does NOT provide chat interface
- Does NOT work with non-Python languages
- Does NOT have agentic/autonomous capabilities
- Does NOT store code on servers (privacy-preserving)

### EULA Restrictions
- **Beta/Preview service**: No SLA, experimental features
- **Authorized use only**: Research, education, testing, evaluation
- **No commercial use**: Personal/educational use only
- **No proprietary code**: Don't use with proprietary code (cloud model)
- **Premium plan required**: IBM Quantum premium plan for cloud (or use local setup)

## Troubleshooting

### Common Issues

1. **No suggestions appearing**:
   - Check: Is it a `.py` file?
   - Check: Is API token set? (Command: `Qiskit Code Assistant: Set IBM Quantum API token`)
   - Check: Status bar shows model name (bottom right)
   - Check: Network connectivity to API endpoint
   - Check: Browser console for errors (Help → Toggle Developer Tools)

2. **Streaming not working**:
   - Verify: `qiskitCodeAssistant.enableStreaming` is `true`
   - Check: Circuit breaker state in console logs
   - Check: API endpoint is accessible
   - Try: Increase `streamingTimeout` if timing out
   - Try: Increase `streamingRetryAttempts` for flaky connections

3. **Tests failing**:
   - Ensure: VSCode installed with `code` command in PATH
   - Run: `npm ci` for clean dependencies
   - Check: No other VSCode instances blocking test window
   - Check: Port availability for test services

4. **Build errors**:
   - Clean: `npm run clear-out` then rebuild
   - Check: Node.js version (v18+ required)
   - Update: `npm ci` to sync dependencies
   - Verify: TypeScript version matches package.json

5. **Circuit breaker blocking requests**:
   - Symptom: "Service temporarily unavailable (circuit breaker open)"
   - Wait: Circuit auto-recovers after reset timeout (default 60s)
   - Check: Backend service status
   - Adjust: Increase `circuitBreakerThreshold` if needed
   - Disable: Set `circuitBreakerEnabled: false` (not recommended)

### Debug Commands

```bash
# Clear build artifacts
npm run clear-out

# Rebuild from scratch
npm run clear-out && npm run build

# Test with verbose output
npm test -- --reporter spec

# Check TypeScript types
npx tsc --noEmit
```

## File Structure Reference

```
qiskit-code-assistant-vscode/
├── .github/
│   └── workflows/          # CI/CD automation
├── .vscode/
│   └── launch.json         # Debug configurations
├── docs/
│   ├── AGENTS.md          # This file
│   ├── streaming.md       # Streaming technical docs
│   ├── credentials_selection.md
│   ├── EULA.md
│   ├── MARKETPLACE_PUBLISHING.md
│   ├── OPEN_VSX_SETUP.md
│   └── RELEASE_CHECKLIST.md
├── src/
│   ├── extension.ts       # Extension entry point
│   ├── commands/          # VSCode commands
│   │   ├── index.ts
│   │   ├── handleGetCompletion.ts
│   │   ├── setApiToken.ts
│   │   ├── migrateQiskitCode.ts
│   │   ├── selectModel.ts
│   │   └── acceptSuggestion.ts
│   ├── services/          # API integrations
│   │   ├── serviceApi.ts
│   │   ├── codeAssistant.ts
│   │   ├── openAI.ts
│   │   └── qiskitMigration.ts
│   ├── utilities/         # Core utilities
│   │   ├── streamingPipeline.ts
│   │   ├── circuitBreaker.ts
│   │   ├── runCompletion.ts
│   │   ├── errorUtils.ts
│   │   └── utils.ts
│   ├── inlineSuggestions/ # Suggestion UI
│   ├── statusBar/         # Status bar
│   ├── codelens/          # CodeLens provider
│   ├── globals/           # Global state
│   └── test/              # Test suite
│       ├── suite/
│       └── mocks/
├── package.json           # Extension manifest
├── tsconfig.json          # TypeScript config
├── README.md              # User docs
├── CONTRIBUTING.md        # Contributor guide
├── LOCAL_SETUP.md         # Local deployment
└── setup_local.sh         # Local setup script
```

## Best Practices for AI Assistants

When helping with this repository:

1. **Always check existing code first**: Use Read tool on relevant files before suggesting changes
2. **Follow existing patterns**: Match code style and architecture from similar components
3. **Don't hallucinate features**: Only reference capabilities that actually exist in the codebase
4. **Reference correct docs**: Point users to README.md and CONTRIBUTING.md, not internal docs
5. **Test before suggesting**: Verify code compiles and tests pass
6. **Respect constraints**: Remember this is Python-only, single-file context, code completion
7. **Check recent changes**: Review git history for context on recent modifications
8. **Use proper tool**: Use Grep for searching, Read for files, Edit for changes

### Quick Reference

**Want to add a feature?** → Start in [CONTRIBUTING.md](CONTRIBUTING.md)

**Fixing a bug?** → Write test first in [src/test/suite/](src/test/suite/)

**Updating docs?** → User docs in [README.md](README.md), technical in `docs/`

**Working with APIs?** → Check [src/services/](src/services/) for patterns

**Need architecture overview?** → Read [src/extension.ts](src/extension.ts)

**Streaming issues?** → See [docs/streaming.md](docs/streaming.md)

**Release process?** → See [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md)
