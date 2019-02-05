# Qiskit VSCode Extension

[![Build Status](https://www.travis-ci.org/Qiskit/qiskit-vscode.svg?branch=master)](https://www.travis-ci.org/Qiskit/qiskit-vscode)

> Simplifying Qiskit to make developing quantum circuits and applications faster.

A Visual Studio Code extension with support for Qiskit and the OpenQASM language. It provides some useful commands to make easier launching jobs and visualizing results among others.

![Qiskit VSCode Extension](https://raw.githubusercontent.com/Qiskit/qiskit-vscode/master/docs/images/execute-sample.gif "Example of running Qiskit VSCode Extension")

## Quick start

1. Open the Extensions sidebar panel in VS Code. <kbd>Ctrl</kbd> + <kbd>Shift (⇧)</kbd> + <kbd>X</kbd> on Windows or <kbd>Command (⌘)</kbd> + <kbd>Shift (⇧)</kbd> + <kbd>X</kbd> on Mac (see [Install an extension](https://code.visualstudio.com/docs/editor/extension-gallery#_install-an-extension) for more details).
2. Search for `qiskit-extension`.
3. Click Install.
4. Click Reload.

Now the Qiskit VSCode Extension will be available when coding using OpenQASM and Python (Qiskit) files.

### To install the extension from a local file

Download the [latest release](https://github.com/Qiskit/qiskit-vscode/releases) of the extension from and follow the [instructions to install it](https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix)

### Your first program using Qiskit

We encourage you to visit [https://qiskit.org/](https://qiskit.org/) to explore the different examples, documentation and tutorials.

## Feature details

-   Support [Qiskit Terra](https://github.com/Qiskit/qiskit-terra/) version v0.6.X and v0.7.X.
-   Check necessary dependencies to execute OpenQASM or Qiskit files.
-   Run Qiskit source code in a backend.
-   Run OpenQASM source code in a local backend.
-   Backends (local and remote ones) discovery.
-   Job's execution management.
-   User's credit management.
-   OpenQASM error detection.
-   OpenQASM autocompletion.
-   Qiskit static analysis.
-   Provide pre-defined code snippets for code using Qiskit Terra and Qiskit Aqua

## Useful commands

The commands below are supported at the Command Palette (<kbd>Command (⌘)</kbd> + <kbd>Shift (⇧)</kbd> + <kbd>P</kbd> on macOS and <kbd>Ctrl</kbd> + <kbd>Shift (⇧)</kbd> + <kbd>P</kbd> on Windows/Linux).

| Command                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `qiskit-vscode: Check Qiskit VSCode Extension dependencies`                                 |  Check that the required dependencies are properly installed.                                                                                                                                                                                                                                                                                                                                                              |
| `qiskit-vscode: Enter your QConfig`                                                         | Allow the user to configure her Qiskit credentials. Please, note that you will need to run this command prior to use `Get the status of IBM Q devices`, `qiskit-vscode: Discover remote backends available`, `qiskit-vscode: List the user's pending jobs`, `qiskit-vscode: List the user's executed jobs`, `qiskit-vscode: Get the queue status` and `qiskit-vscode: Get the user's available credits` or they will fail. |
| `qiskit-vscode: Run this Q code`                                                            | Executes the code at the current editor tab (Qiskit or OpenQASM).                                                                                                                                                                                                                                                                                                                                                          |
| `qiskit-vscode: Discover local backends available`                                          | The local backend available will be presented in a new tab.                                                                                                                                                                                                                                                                                                                                                                |
| `qiskit-vscode: Get the status of IBM Q devices`                                            | The status for remote IBM Q devices available for the current user will be presented in a new tab. This information mixes also data from `Discover remote backends available` and `qiskit-vscode: Get the queue status`.                                                                                                                                                                                                   |
| `qiskit-vscode: Discover remote backends available`                                         | The remote backends available for the current user will be presented in a new tab.                                                                                                                                                                                                                                                                                                                                         |
| `qiskit-vscode: List the user's pending jobs`                                               | A listing of the pending jobs to be executed will be presented in a new tab.                                                                                                                                                                                                                                                                                                                                               |
| `qiskit-vscode: List the user's executed jobs`                                              | A listing of the previously executed jobs will be presented in a new tab.                                                                                                                                                                                                                                                                                                                                                  |
| `qiskit-vscode: Get the queue status`                                                       | The current status of the queues will be presented in a new tab.                                                                                                                                                                                                                                                                                                                                                           |
| `qiskit-vscode: Get the user's available credits`                                           | The current available credits of the user will be presented in a new tab.                                                                                                                                                                                                                                                                                                                                                  |
| `qiskit-vscode: Activate the visualizations for the execution of code`                      | Activate the automatic visualization of results achieved during the execution of code using the extension.                                                                                                                                                                                                                                                                                                                 |
| `qiskit-vscode: Deactivate the visualizations for the execution of code`                    | Deactivate the automatic visualization of results achieved during the execution of code using the extension (giving the results in text mode).                                                                                                                                                                                                                                                                             |
| `qiskit-vscode: Activate the display of information related to the boot of the extension`   | Activate the visualization (bubble messages) of information related to the boot of the extension. This information includes the version of dependencies installed, the different checks performed at the activation of the extension, etc.                                                                                                                                                                                 |
| `qiskit-vscode: Deactivate the display of information related to the boot of the extension` | Deactivate the visualization (bubble messages) of information related to the boot of the extension. It does not deactivate the display of error messages related to dependencies and other checks performed at the boot of the extension                                                                                                                                                                                   |

## Settings Options

This extension contributes the following variables to the settings:

-   `qiskit-vscode.ibmq.token`: Qiskit & Q Experience API Token.
-   `qiskit-vscode.ibmq.hub`: User's Qiskit & Q Experience hub.
-   `qiskit-vscode.ibmq.group`: User's Qiskit & Q Experience group.
-   `qiskit-vscode.ibmq.project`: User's Qiskit & Q Experience project.
-   `qiskit-vscode.config.visualizationsFlag`: Flag to control if visualizations are displayed or not for code executions.
-   `qiskit-vscode.config.displayBootInfo`: Display info about the extension boot process.

Other variables are contributed, but it is not recommended to change them.

## Authors and citation

Qiskit VSCode Extension was initially authored (alphabetically) by Juan Cruz-Benito, Yeray Darias, Ismael Faro, Juan Gómez, and Paco Martín. It continues growing with the help and work of [many people](https://github.com/Qiskit/qiskit-vscode/graphs/contributors) who contribute to the project at different levels.

If you use Qiskit, please cite as per the included [BibTeX file](https://github.com/Qiskit/qiskit/blob/master/Qiskit.bib).

## License

This project uses the [Apache License Version 2.0 software license](https://www.apache.org/licenses/LICENSE-2.0).
