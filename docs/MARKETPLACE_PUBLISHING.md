# Automated Marketplace Publishing

This repository is configured to automatically publish the VSCode extension to the marketplace when a new GitHub release is created.

## How It Works

The [publish.yml](.github/workflows/publish.yml) workflow is triggered when you create a new GitHub release. It will:

1. Check out the code
2. Install dependencies
3. Run tests to ensure everything passes
4. Extract the version from the release tag
5. Update package.json with the version
6. Build and package the extension
7. Publish to the VSCode Marketplace
8. Upload the .vsix file as a release asset

## Setup Instructions

### 1. Generate a Personal Access Token (PAT)

To publish to the VSCode Marketplace, you need a Personal Access Token from Azure DevOps:

1. Go to [Azure DevOps](https://dev.azure.com/)
2. Sign in with the account that has access to your publisher (Qiskit)
3. Click on your profile icon in the top right corner
4. Select "Personal access tokens"
5. Click "New Token"
6. Configure the token:
   - **Name**: `VSCode Marketplace Publishing`
   - **Organization**: Select "All accessible organizations"
   - **Expiration**: Choose an appropriate timeframe (custom or 90 days)
   - **Scopes**: Select "Custom defined" and check **Marketplace > Manage**
7. Click "Create"
8. **Important**: Copy the token immediately - you won't be able to see it again!

### 2. Add the Token to GitHub Secrets

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secret:
   - **Name**: `VSCE_PAT`
   - **Value**: Paste the Personal Access Token from Azure DevOps
5. Click "Add secret"

### 3. Creating a Release

To trigger the automated publishing:

1. Ensure your code is ready for release and all tests pass
2. Update the version in [package.json](../package.json) if needed (or the workflow will do it based on the tag)
3. Create a new release on GitHub:
   - Go to the repository's "Releases" page
   - Click "Draft a new release"
   - Create a new tag following the format `v{major}.{minor}.{patch}` (e.g., `v0.15.0`)
     - For pre-releases, use: `v{major}.{minor}.{patch}-{prerelease}` (e.g., `v0.15.0-beta.1`)
   - Fill in the release title and description
   - Click "Publish release"
4. The workflow will automatically:
   - Validate the tag format
   - Run tests (unless skipped)
   - Build the extension
   - Publish to the VSCode Marketplace
   - Upload the .vsix file to the release assets
   - Create a summary report

#### Manual Workflow Dispatch

You can also trigger the workflow manually from the Actions tab:
1. Go to Actions > "Publish to VSCode Marketplace"
2. Click "Run workflow"
3. Optional: Check "Skip tests" for urgent hotfixes (use with caution!)
4. Click "Run workflow"

### 4. Monitoring the Workflow

- Go to the "Actions" tab in your GitHub repository
- Look for the "Publish to VSCode Marketplace" workflow
- You can monitor the progress and check logs if something fails

## Troubleshooting

### Authentication Failed

If you see authentication errors:
- Verify that the `VSCE_PAT` secret is correctly set in GitHub
- Check that the PAT hasn't expired
- Ensure the PAT has the correct scope (Marketplace > Manage)

### Tests Failing

The workflow runs tests before publishing. If tests fail:
- The publishing will be aborted
- Fix the failing tests
- Create a new release or re-run the workflow

### Version Mismatch

The workflow extracts the version from the git tag. Ensure:
- Tags follow the format `v{major}.{minor}.{patch}` (e.g., `v0.15.0`)
- For pre-releases: `v{major}.{minor}.{patch}-{prerelease}` (e.g., `v0.15.0-beta.1`)
- The version matches semantic versioning rules
- The workflow will validate the tag format and fail early if invalid

### Manual Publishing

If you need to publish manually:

```bash
# Install dependencies
npm ci

# Build the extension
npm run vscode:prepublish

# Package the extension
npm run vsce:package

# Publish (requires VSCE_PAT environment variable or --pat flag)
npx vsce publish -p <your-personal-access-token>
```

## Workflow Features

The automated publishing workflow includes several safety features:

- **Tag Validation**: Validates that release tags follow semantic versioning (v1.0.0 or v1.0.0-beta.1)
- **Test Verification**: Runs full test suite before publishing (can be skipped for hotfixes)
- **VSIX Verification**: Confirms the extension package was created successfully
- **Error Reporting**: Provides clear summary of success or failure with actionable guidance
- **Timeout Protection**: 30-minute timeout prevents indefinitely hanging workflows
- **Manual Trigger**: Can be triggered manually from Actions tab for re-runs or hotfixes
- **Release Asset Upload**: Automatically attaches the .vsix file to the GitHub release

## Security Notes

- Never commit your Personal Access Token to the repository
- Keep your PAT secure and rotate it periodically
- Only grant the minimum required scopes (Marketplace > Manage)
- Review the GitHub Actions workflow logs to ensure no sensitive information is exposed
- The PAT is securely accessed through GitHub Secrets and never logged
