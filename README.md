# IBM Q Studio

> IBM Q Studio is a tool that makes simple working with QASM files and QISKit SDK.

A Visual Studio Code extension with support for QISKit and the QASM language. It provides some useful commands to make easier launching jobs and visualizing results among others.

![alt text](./docs/images/execute-sample.gif "Example of running Q Studio")


## Quick start

1. Open the Extensions sidebar panel in VS Code. `Ctrl + Shift + X` on Windows or `⇧ + ⌘ + X` on Mac.
1. Search for Q Studio.
1. Click Install.
1. Click Reload.

Now the Q Studio extension will be available in QASM and Python(QISKit) files.

## Feature details

* Check necessary dependencies to execute QASM or QISKit files.
* Run QISKit source code in a backend.
* Run QASM source code in a local backend.
* Backends (local and remote ones) discovery.
* Job's execution management.
* User's credit management.
* QASM error detection.
* QASM autocompletion.
* QISKit static analysis.  

## Useful commands

The commands below are supported at the Command Palette (Command+Shift+P on macOS and Ctrl+Shift+P on Windows/Linux).

Command | Description
--- | ---
```QStudio: Check IBM Q Studio dependencies``` | Check that the required dependencies are properly installed.
```QStudio: Enter your QConfig``` | Allow the user to configure her QISKit credentials. Please, note that you will need to run this command prior to use `QStudio: Discover remote backends available`, `QStudio: List the user's pending jobs`, `QStudio: List the user's executed jobs`, `QStudio: Get the queue status` and `QStudio: Get the user's available credits` or they will fail.
```QStudio: Run this Q code``` | Executes the code at the current editor tab (QISKit or QASM).
```QStudio: Discover local backends available``` | The local backend available will be presented in a new tab.
```QStudio: Discover remote backends available``` | The remote backends available for the current user will be presented in a new tab.
```QStudio: List the user's pending jobs``` | A listing of the pending jobs to be executed will be presented in a new tab.
```QStudio: List the user's executed jobs``` | A listing of the previously executed jobs will be presented in a new tab.
```QStudio: Get the queue status``` | The current status of the queues will be presented in a new tab.
```QStudio: Get the user's available credits``` | The current available credits of the user will be presented in a new tab.

## Authors (alphabetical)

IBM Q Studio was originally authored by Juan Cruz-Benito, Yeray Darias, Ismael Faro, Juan Gómez and Paco Martín.

And continues to grow with the help and work of [many people](https://github.ibm.com/IBMQuantum/qiskit-studio/graphs/contributors) who contribute to the project at different levels.

## License 
This project uses the [Apache License Version 2.0 software license](https://www.apache.org/licenses/LICENSE-2.0).