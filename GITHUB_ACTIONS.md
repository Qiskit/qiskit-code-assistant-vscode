# GitHub Actions CI/CD

This document describes the continuous integration and testing workflows for the Qiskit Code Assistant VSCode extension.

## Overview

The repository uses GitHub Actions to automatically test code changes, validate the setup script, and ensure quality standards. All workflows are defined in [`.github/workflows/`](.github/workflows/).

## Workflows

### Tests Workflow

**File:** [`.github/workflows/tests.yml`](.github/workflows/tests.yml)

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Weekly schedule (Mondays at 00:00 UTC)
- Manual dispatch

**Jobs:**

#### 1. `test`

Tests the VSCode extension on multiple platforms.

**Steps:**

- Checkout code
- Install Node.js dependencies
- Run VSCode extension tests
- Verify extension functionality

**Platforms:**
- Ubuntu Latest
- macOS Latest
- Windows Latest

**Duration:** ~5-10 minutes per platform

---

#### 2. `lint`

Validates code quality and TypeScript compilation.

**Steps:**

- Checkout code
- Install dependencies
- Check TypeScript compilation

**Platform:** Ubuntu Latest
**Duration:** ~2-3 minutes

---

#### 3. `test_setup_script`

Fast validation tests for the local setup script.

**Runs on:** Every PR and push to `main` or `develop`

**Platforms:**

- Ubuntu Latest
- macOS Latest

**Tests:**

- ✅ Script syntax validation (`bash -n`)
- ✅ `--help` flag functionality
- ✅ `--list-models` flag functionality
- ✅ Function definitions (`detect_os()`, `install_or_upgrade_extension()`, `check_ollama()`, `setup_model()`, `configure_vscode()`)

**Duration:** ~5-10 minutes per platform

---

#### 4. `check_setup_script_changes`

Lightweight job that checks if `setup_local.sh` was modified.

**Runs:** Always (on every push/PR)

**Platform:** Ubuntu Latest

**Purpose:**

- Uses `dorny/paths-filter` action to detect file changes
- Outputs `setup_changed` boolean for use by dependent jobs
- Very fast (~10 seconds) - just checks file modifications

**Duration:** ~10 seconds

---

#### 5. `test_setup_script_full`

Comprehensive end-to-end test of the setup script with Ollama model.

**Runs when:**

- ✅ `setup_local.sh` is modified in a PR/push (detected by `check_setup_script_changes`)
- ✅ Manually triggered via workflow dispatch
- ✅ Weekly on Mondays at 00:00 UTC (scheduled)
- ✅ Release tags are pushed (e.g., `v0.14.0`)

**Important:** This job uses a **job-level conditional** - it won't start at all unless one of the above conditions is met. This saves CI resources by preventing unnecessary job allocation.

**Platform:** Ubuntu Latest

**Features:**

- **Job-Level Gating:** Entire job is skipped unless conditions are met (not just individual steps)
- **Model Caching:** Downloads ~9GB Qwen model once, then reuses cached version
- **Cache Key:** Based on `DEFAULT_MODEL` value in script
- **Cache Duration:** 7 days (refreshed by weekly runs)
- **Non-Interactive Mode:** Uses `--non-interactive` flag for automated testing

**Steps:**

1. Set up environment
2. Restore Ollama model from cache (or download if not cached)
3. Install and start Ollama service
4. Run `setup_local.sh --non-interactive`
5. Verify model installation
6. Test model inference with Qiskit code
7. Verify VSCode configuration files

**Duration:**

- First run (no cache): ~30-45 minutes
- Subsequent runs (cached): ~10-15 minutes

---

## Setup Script Features Tested

### Non-Interactive Mode

The `setup_local.sh` script supports a `--non-interactive` or `-y` flag for CI/CD and automation:

```bash
# Interactive (default)
bash setup_local.sh

# Non-interactive (for CI/CD)
bash setup_local.sh --non-interactive
bash setup_local.sh -y
```

**What it does:**

- Auto-installs Ollama if missing (no prompt)
- Auto-upgrades extension to latest version
- Proceeds with default options automatically

### Extension Auto-Upgrade

The setup script **always upgrades** the VSCode extension to the latest version:

```bash
# Runs automatically in setup script
code --install-extension Qiskit.qiskit-vscode --force
```

This ensures users always have the latest bug fixes and features.

---

## Caching Strategy

### Ollama Model Cache

The full integration test uses GitHub Actions cache to store the Ollama model:

**Cache Location:** `~/.ollama`
**Cache Key:** `ollama-models-<MODEL_NAME>`
**Example:** `ollama-models-hf.co/Qiskit/Qwen2.5-Coder-14B-Qiskit-GGUF`

**Benefits:**

- ✅ First run downloads ~9GB model (20-30 min)
- ✅ Subsequent runs restore from cache (~2 min)
- ✅ Cache expires after 7 days of inactivity
- ✅ Weekly schedule keeps cache fresh

**Cache Invalidation:**

- Automatically invalidates when `DEFAULT_MODEL` in `setup_local.sh` changes
- Manual cache clear via GitHub Actions UI

---

## Running Tests Manually

### Trigger Full Integration Test

You can manually trigger the expensive full integration test:

1. Go to **Actions** tab in GitHub
2. Select **Tests** workflow
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow** button

This is useful for:

- Testing before releases
- Validating major changes to setup script
- Debugging issues in the full setup flow

---

## CI/CD Best Practices

### When to Run Full Test

The `test_setup_script_full` job is designed to be expensive but thorough. It runs:

| Scenario                    | Rationale                                         |
| --------------------------- | ------------------------------------------------- |
| **setup_local.sh modified** | Validate changes immediately                      |
| **Weekly schedule**         | Catch upstream dependency issues (Ollama, models) |
| **Manual trigger**          | Pre-release validation                            |
| **Release tags**            | Final validation before release                   |

### Resource Optimization

**Change detection** (`check_setup_script_changes`) runs on every PR:

- Ultra-lightweight (~10 seconds)
- Only checks if `setup_local.sh` was modified
- Provides output for conditional job execution

**Fast tests** (`test_setup_script`) run on every PR:

- Multi-platform (Ubuntu + macOS)
- No model downloads
- Complete in ~5-10 minutes
- Validate script logic

**Full test** (`test_setup_script_full`) runs conditionally:

- **Job-level gating:** Won't start unless conditions are met (not just skip steps)
- Single platform (Ubuntu only)
- Downloads 9GB model (cached)
- Complete in ~10-45 minutes
- End-to-end validation

This optimization strategy ensures that expensive integration tests only consume CI resources when necessary, while lightweight checks run on every PR to catch issues early.

---

## Schedule Configuration

### Current Schedule

```yaml
schedule:
  - cron: '0 0 * * 1' # Mondays at 00:00 UTC
```

### Customizing Schedule

To change the schedule, edit [`.github/workflows/tests.yml`](.github/workflows/tests.yml):

```yaml
# Daily at 2 AM UTC
- cron: '0 2 * * *'

# Twice weekly (Monday & Thursday)
- cron: '0 0 * * 1,4'

# Monthly on 1st at midnight
- cron: '0 0 1 * *'
```

**Cron syntax:** `minute hour day month weekday`

---

## Troubleshooting

### Test Failures

#### Lint Failures

If TypeScript compilation fails:

```bash
# Run locally to fix
npm ci
npm run compile-tests
```

#### Full Test Timeout

If `test_setup_script_full` times out:

- Check Ollama installation logs
- Verify model download didn't stall
- Increase timeout in workflow (currently 45 min)

#### Cache Issues

If model cache is corrupted:

1. Go to **Actions** → **Caches** in GitHub
2. Delete `ollama-models-*` caches
3. Re-run workflow to rebuild cache

---

## GitHub Actions Limits

**Free tier (public repos):**

- Unlimited minutes for public repositories
- 10GB cache storage per repository
- 7-day cache expiration

**Current usage:**

- Model cache: ~9GB (Qwen 14B)
- Weekly refresh prevents expiration
- Well within free tier limits

---

## Local Development

### Test Script Locally

```bash
# Syntax check
bash -n setup_local.sh

# Test help
bash setup_local.sh --help

# Test list models
bash setup_local.sh --list-models

# Test full setup (interactive)
bash setup_local.sh

# Test full setup (non-interactive)
bash setup_local.sh --non-interactive
```

### Test Extension

```bash
# Install dependencies
npm ci

# Run tests
npm test

# Run lint
npm run compile-tests
```

---

## Related Documentation

- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [LOCAL_SETUP.md](LOCAL_SETUP.md) - Detailed local setup instructions
- [GETTING_STARTED.md](GETTING_STARTED.md) - Getting started guide
- [setup_local.sh](setup_local.sh) - Local setup script

---

## Support

If you encounter issues with GitHub Actions:

1. Check the [Actions tab](https://github.com/Qiskit/qiskit-code-assistant-vscode/actions) for detailed logs
2. Review the [Issues page](https://github.com/Qiskit/qiskit-code-assistant-vscode/issues) for similar problems
3. Open a new issue with:
   - Workflow run URL
   - Error message
   - Expected behavior

---

## Continuous Integration Best Practices

### Pull Request Workflow

1. **Automated Tests:** All PRs trigger `test`, `lint`, and `test_setup_script` jobs
2. **Change Detection:** `check_setup_script_changes` determines if full test is needed
3. **Conditional Full Test:** Only runs if setup script was modified
4. **Review:** Maintainers review test results before merging

### Release Workflow

1. **Pre-Release Testing:** Manually trigger full integration test
2. **Tag Creation:** Create release tag (e.g., `v0.14.0`)
3. **Automatic Validation:** Full test runs automatically on tag push
4. **Deployment:** Extension is published after tests pass

### Maintenance

- **Weekly Validation:** Scheduled runs ensure dependencies remain compatible
- **Cache Management:** Model cache is refreshed weekly
- **Dependency Updates:** Dependabot keeps actions up to date
