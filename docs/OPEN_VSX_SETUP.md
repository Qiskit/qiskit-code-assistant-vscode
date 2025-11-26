# Open VSX Marketplace Publishing

This document provides setup instructions for publishing the Qiskit VSCode extension to the Open VSX Marketplace alongside the Microsoft VSCode Marketplace.

## What is Open VSX?

Open VSX is an open-source alternative to the Microsoft VSCode Marketplace. Publishing to Open VSX makes the extension available to:

- **VSCodium**: Privacy-focused VSCode alternative
- **IBM Bob, Windsurf, Cursor, Kilo**: AI-powered code editors
- **Gitpod, Eclipse Che**: Cloud-based IDEs
- **Other editors**: Any editor that uses Open VSX instead of Microsoft Marketplace

The extension automatically publishes to both marketplaces when you create a GitHub release (see [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md)).

## Setup Instructions

### 1. Register on Open VSX

1. Go to [https://open-vsx.org](https://open-vsx.org)
2. Click "Sign In" in the top right
3. Sign in using your GitHub account (use the Qiskit organization account)
4. This creates your Open VSX account

### 2. Create and Link Eclipse Account

1. Create an Eclipse Foundation account at [https://accounts.eclipse.org/user/register](https://accounts.eclipse.org/user/register)
2. In the Eclipse account settings, ensure your GitHub username is included
3. Return to [https://open-vsx.org](https://open-vsx.org) and verify the accounts are linked

### 3. Sign the Publisher Agreement

1. Log in to [https://open-vsx.org](https://open-vsx.org)
2. Navigate to your user settings
3. Sign the **Eclipse Foundation Open VSX Publisher Agreement**
4. **Important**: Without signing this agreement, you cannot publish extensions

### 4. Generate a Personal Access Token (PAT)

To publish to Open VSX, you need a Personal Access Token:

1. Go to [https://open-vsx.org/user-settings/tokens](https://open-vsx.org/user-settings/tokens)
2. Click "Generate New Token"
3. Configure the token:
   - **Name**: `Qiskit VSCode Extension Publishing`
   - **Description**: Optional description for reference
4. Click "Create"
5. **Important**: Copy the token immediately - you won't be able to see it again!

### 5. Create the Namespace

The extension's `package.json` specifies `"publisher": "Qiskit"`. You must create this namespace in Open VSX:

```bash
npx ovsx create-namespace Qiskit --pat <YOUR_PAT>
```

Replace `<YOUR_PAT>` with the token from step 4. You only need to do this once.

**Note**: If the namespace already exists, you'll see an error like "Namespace 'Qiskit' already exists". This is expected and safe to ignore if you're re-running the setup.

### 6. Add the Token to GitHub Secrets

1. Go to the GitHub repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secret:
   - **Name**: `OVSX_PAT`
   - **Value**: Paste the Personal Access Token from Open VSX
5. Click "Add secret"

## Publishing the Extension

### Automated Publishing (Recommended)

Once setup is complete, publishing to Open VSX happens automatically when you create a GitHub release:

1. Follow the normal release process (see [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md))
2. Create a new GitHub release with a properly formatted tag (`v{major}.{minor}.{patch}`)
3. The [publish.yml](../.github/workflows/publish.yml) workflow will:
   - Build and package the extension
   - Run tests
   - Publish to VSCode Marketplace
   - **Publish to Open VSX**
   - Upload the VSIX file to the GitHub release

The workflow publishes to both marketplaces using the same VSIX file, ensuring consistency.

### Manual Publishing

If you need to publish to Open VSX manually:

```bash
# Install dependencies
npm ci

# Build the extension
npm run vscode:prepublish

# Package the extension
npm run vsce:package

# Publish to Open VSX
export OVSX_PAT=<your-token>
npm run ovsx:publish

# Or publish a specific VSIX file
npx ovsx publish qiskit-vscode-0.15.1.vsix --pat $OVSX_PAT
```

## Verifying Publication

After publishing, verify the extension is available:

1. Visit [https://open-vsx.org/extension/Qiskit/qiskit-vscode](https://open-vsx.org/extension/Qiskit/qiskit-vscode)
2. Check that the latest version is displayed
3. Test installation in VSCodium or another Open VSX-compatible editor

## Troubleshooting

### Authentication Failed

If you see authentication errors:

**Possible causes:**
- Invalid or expired PAT
- Publisher Agreement not signed
- PAT not set in GitHub secrets

**Solution:**
1. Generate a new token at [https://open-vsx.org/user-settings/tokens](https://open-vsx.org/user-settings/tokens)
2. Verify you've signed the Publisher Agreement at [https://open-vsx.org](https://open-vsx.org)
3. Ensure `OVSX_PAT` secret is set in GitHub repository settings

### Namespace Does Not Exist

**Error message:** "Namespace 'Qiskit' does not exist"

**Solution:**
```bash
npx ovsx create-namespace Qiskit --pat <YOUR_PAT>
```

You only need to create the namespace once.

### License Required Error

**Error message:** "License is required"

**Possible cause:**
The `license` field is missing from `package.json`

**Solution:**
The extension already has `"license": "Apache-2.0"` in `package.json`. If you see this error:
1. Verify the `package.json` file is intact
2. Check that the VSIX package includes the license field: `unzip -p qiskit-vscode-*.vsix extension/package.json | grep license`

### Extension Not Appearing on Open VSX

**Check:**
1. Verify the workflow completed successfully in GitHub Actions
2. Check the workflow logs for errors in the "Publish to Open VSX" step
3. Wait a few minutes - the registry may take time to update
4. Verify the `OVSX_PAT` secret is correctly configured

## Security Notes

- Never commit your Personal Access Token to the repository
- Keep your PAT secure and rotate it periodically
- The PAT is securely accessed through GitHub Secrets and never logged
- Review the GitHub Actions workflow logs to ensure no sensitive information is exposed

## Additional Resources

- [Open VSX Documentation](https://github.com/eclipse/openvsx/wiki)
- [Open VSX Registry](https://open-vsx.org)
- [OVSX CLI Documentation](https://www.npmjs.com/package/ovsx)
- [Release Checklist](RELEASE_CHECKLIST.md)
- [Marketplace Publishing Guide](MARKETPLACE_PUBLISHING.md)
