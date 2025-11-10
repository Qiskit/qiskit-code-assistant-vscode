# Contributing to the Qiskit Code Assistant

Welcome and thank you for contributing to the Qiskit Code Assistant!

If you are thinking to contribute to the Qiskit Code Assistant, you agree to abide by our [code of conduct](CODE_OF_CONDUCT.md) which we strongly recommend you read before continuing.

There are many ways of contributing from opening an issue to preparing a patch to updating documentation. Continue reading the contribution guidelines for opening new issues and submitting pull requests.

## Opening issues

Issues can be opened from https://github.com/Qiskit/qiskit-code-assistant-vscode/issues to report failures and misfunctions. Please do provide steps to reproduce and also expected behaviour.

## Contributing code

Feel free to view the [issues](https://github.com/Qiskit/qiskit-code-assistant-vscode/issues) in the repository to decide what to work on.

### Assigning yourself

The very first step to working on an issue is assigning yourself the issue. This gives all contributors the visibility into who is working on what.

### Setting up your development environment

Before you start working on an issue you will need to make sure you have the code cloned or forked. And you should be able to run and test the extension locally.

#### Development environment install

Note: You will need Visual Studio Code and Node.js to contribute and work on the extension.

```bash
# Clone the repo to your local environment
# Change directory to the qiskit-code-assistant-vscode directory
# Install extension dependencies
npm ci
# Open the qiskit-code-assistant-vscode directory in Visual Studio Code
code .
```

#### Running from source

You can update, launch, and debug the extension from source within your Visual Studio Code

1. Go into the Run and Debug tab in Visual Studio Code
1. Select **Launch Extension** from the drop down
1. Press `F5` or click the **Start Debugging** button (i.e., the green triangle)

With the extension running from source you can use many of the Visual Studio Code Developer commands to debug and troubleshoot

1. Press `Cmd/Ctrl+Shift+P` to open the command palette
1. Type `developer` to see the Developer commands
1. Select the desired commands (e.g., **Toggle Developer Tools**, **Reload Window**, etc.)

#### Running from VSIX file

You can package the extension into a VSIX file and install it into your Visual Studio Code

```bash
# From a Terminal go to the qiskit-code-assistant-vscode directory
# Generate the extension's VSIX file
npm run vsce:package
```

1. Go into the Extensions tab in Visual Studio Code
1. Click the **...** (i.e., More Actions) button
1. Click **Install from VSIX...**
1. Browse and select the VSIX file that was generated
1. Restart Visual Code Studio

With the extension running from installed VSIX you can run and test the extension as users would be running it.

#### Development environment uninstall

If the extension was launched from the **Run and Debug**, close the Visual Studio Code window that was opened or click the **Stop** (i.e., the red square) button.

If running using the VSIX file

1. Go into the Extensions tab in Visual Studio Code
1. Select the **Qiskit Code Assistant** extension under the **INSTALLED** section
1. Click **Uninstall**

Also, delete the VSIX file that was generated.

### Working on an issue

When you are going to start working on an issue, make sure you are in your `main` branch and that it is up to date then create a new branch with a meaningful name.

When committing your changes do try to use descritive titles and informative summary notes.

### Opening pull requests

When you think your work is done, [create a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) against the `main` branch. In the pull request, provide a description and link with the issue that is being solved.

### Code review

Once you have sent a pull request, the code contributors get notified, and there will be a code review. The repository also contains some automated checks for pull requests . For a pull request to be ready for merging it needs to pass automatic checks and have, at least, one accepted review.

## Releasing

If you're a maintainer looking to publish a new release to the VSCode Marketplace, we have automated the process:

- **[Release Checklist](docs/RELEASE_CHECKLIST.md)** - Quick reference guide for creating releases
- **[Marketplace Publishing Guide](docs/MARKETPLACE_PUBLISHING.md)** - Complete setup and documentation

The release process is automated through GitHub Actions. Simply create a new GitHub release with a properly formatted tag (e.g., `v0.15.0`), and the extension will be automatically built, tested, and published to the marketplace.

## Final words

Thank you for reading until the end of the document! Abiding by these guidelines you express your willingness in collaborating and contributing to the project in a healthy way. Thanks for that too!
