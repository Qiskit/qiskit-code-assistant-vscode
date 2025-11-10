# Release Checklist

Quick reference guide for releasing a new version of the Qiskit VSCode extension.

## Pre-Release Checklist

- [ ] All features/fixes for the release are merged to `main`
- [ ] All tests pass locally: `npm test`
- [ ] Version number is decided (follow [Semantic Versioning](https://semver.org/))
- [ ] `VSCE_PAT` secret is configured in GitHub repository settings

## Release Process

### Option A: Automated Release (Recommended)

1. **Create a GitHub Release**
   ```
   Go to: https://github.com/Qiskit/qiskit-code-assistant-vscode/releases/new
   ```

2. **Create a new tag**
   - Format: `v{major}.{minor}.{patch}`
   - Examples:
     - Production: `v0.15.0`, `v1.0.0`
     - Pre-release: `v0.15.0-beta.1`, `v1.0.0-rc.1`

3. **Fill in release details**
   - Title: e.g., "v0.15.0 - Feature name"
   - Description: Write or generate automatically the release notes with relevant changes

4. **Publish the release**
   - Click "Publish release"
   - The automation will handle the rest

5. **Monitor the workflow**
   ```
   Go to: https://github.com/Qiskit/qiskit-code-assistant-vscode/actions
   ```
   - Watch the "Publish to VSCode Marketplace" workflow
   - Should complete in a few minutes

6. **Verify publication**
   - Check the [marketplace page](https://marketplace.visualstudio.com/items?itemName=Qiskit.qiskit-vscode)
   - Version should update within a few minutes
   - VSIX file should be attached to the GitHub release

### Option B: Manual Release (Emergency Only)

If the automated workflow fails or is unavailable:

```bash
# 1. Ensure you're on main and up to date
git checkout main
git pull origin main

# 2. Install dependencies
npm ci

# 3. Run tests
npm test

# 4. Update version in package.json
npm version {major|minor|patch} --no-git-tag-version

# 5. Build and package
npm run vscode:prepublish
npm run vsce:package

# 6. Publish to marketplace
npx vsce publish -p YOUR_VSCE_PAT

# 7. Create GitHub release manually with the VSIX file
```

## Post-Release Checklist

- [ ] Verify extension appears on [marketplace](https://marketplace.visualstudio.com/items?itemName=Qiskit.qiskit-vscode)
- [ ] Test installation: `code --install-extension Qiskit.qiskit-vscode`
- [ ] Verify VSIX file is attached to GitHub release
- [ ] Announce release (if applicable):
  - [ ] Team Slack/Discord
  - [ ] Social media
  - [ ] Documentation updates

## Hotfix Process

For urgent bug fixes that need to skip tests:

1. **Ensure the fix is thoroughly tested locally**

2. **Use manual workflow dispatch**
   ```
   Go to: Actions > Publish to VSCode Marketplace > Run workflow
   ```

3. **Enable "Skip tests"**
   - ⚠️ Only use for critical bugs
   - Check the "Skip tests" option
   - Select the branch/tag to release

4. **Create the release as normal**

## Troubleshooting

### Workflow fails at "Publish to VSCode Marketplace"

**Likely causes:**
- VSCE_PAT expired or invalid
- Network timeout
- Marketplace API issues

**Solution:**
1. Check if VSCE_PAT secret is set: Settings > Secrets > Actions
2. Verify PAT has "Marketplace > Manage" scope
3. Re-run the workflow after fixing
4. If persistent, use manual release process

### Workflow fails at "Verify tests pass"

**Solution:**
1. Fix failing tests locally
2. Push fixes to main
3. Create a new release with updated code
4. For urgent fixes, use manual dispatch with skip_tests

### Tag format is invalid

**Error message:** "Tag must follow format v{major}.{minor}.{patch}"

**Solution:**
- Use correct format: `v1.2.3` (note the 'v' prefix)
- Pre-releases: `v1.2.3-beta.1`
- Delete incorrect tag and create new one

### VSIX not uploaded to release

**Possible causes:**
- Publishing failed before upload step
- Permissions issue with GITHUB_TOKEN

**Solution:**
1. Check workflow logs for specific error
2. Manually upload VSIX from workflow artifacts
3. Re-run the workflow

## Quick Commands Reference

```bash
# Run tests
npm test

# Build extension
npm run vscode:prepublish

# Package extension
npm run vsce:package

# List all releases
gh release list

# View specific release
gh release view v0.15.0

# Install extension locally
code --install-extension qiskit-vscode-0.15.0.vsix
```

## Important Links

- [Marketplace Page](https://marketplace.visualstudio.com/items?itemName=Qiskit.qiskit-vscode)
- [GitHub Actions](https://github.com/Qiskit/qiskit-code-assistant-vscode/actions)
- [Releases](https://github.com/Qiskit/qiskit-code-assistant-vscode/releases)
- [Full Documentation](MARKETPLACE_PUBLISHING.md)

## Support

Questions? Check:
1. [MARKETPLACE_PUBLISHING.md](MARKETPLACE_PUBLISHING.md) - Full setup guide
3. GitHub Actions logs - Detailed execution logs
