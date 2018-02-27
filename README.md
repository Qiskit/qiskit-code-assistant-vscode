# Qiskit Studio
> Qiskit Studio is a tool that makes simple working with QASM files.

## Installation

TBD

### How to run locally

```sh
npm install
npm run compile
```

Jison is required to compile the parser grammar.

```sh
npm install jison -g
```

## Usage example

TBD

## Development setup

TBD

It is recommended to read the document [extension-structure](docs/extension-structure.md), to know more details about the desing decisions around the qasm parser.

### Configuring Python >3.5

The extension have some previous requirements, one of them is Python 3.5 or greater.

#### MacOS X

If there is no XCode command line tools installed.

```
xcode-select --install
```

It is recommended to continue using [Homebrew](https://brew.sh/index_es) as a package manager.

```
brew install python3
cd <your-directory>
python3 -m venv <your-virtual-env>
source <your-virtual-env>/bin/activate
```

Some additional information can be found in this [link](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-macos).

## Meta

TBD
