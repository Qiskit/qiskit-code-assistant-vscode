# Qiskit Studio
> Qiskit Studio is a tool that makes simple working with QASM files.

Q-Studio

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

In Visual Studio Code, a language support extension is a little bit different from a basic extension because the first requires a server. One recommendation (from Microsoft documentation) is to keep client and server code in different folders.

```
.
├── .gitignore
├── .vscode                             // VS Code integration
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── .vscodeignore                       // files ignored when publishing extension
├── client                      
│   ├── out
|   |   └── ...                         // compiled code from the client
│   ├── src                             // source code from the client
│   |   ├── extension.ts                // client extension entry point
|   |   └── test                        // test folder
│   |       ├── extension.test.ts       
│   |       └── index.ts                
│   ├── syntaxes
|   |   └── ...                         // files related with syntax completion and hightlight
|   ├── package.json                    // client extension's manifest
|   ├── *.configuration.json            // files related with closing brackets helper and comments detection
|   └── tsconfig.json                   // Typescript client extension descriptor file
├── server                      
│   ├── out
|   |   └── ...                         // compiled code from the server
│   ├── src                             // source code from the server
│   |   ├── server.ts                   // server extension entry point
|   ├── package.json                    // server extension's manifest
|   └── tsconfig.json                   // TypeScript server extension descriptor file
├── package.json                        // extension's common manifest elements
└── tslint.json                         // TypeScript linter configuration file
```

### Parser design 

The server side of the extension is divided into various components to being able to evolve it more easily.

![Parser code structure](docs/diagrams/ParserStructure.png)

* Server is the main code that launches the server side features of the extension.
* CompilationTool is the "interface" that gives document validation and autocompletion tips to the extension, through the Parser.
* Parser is an adapter that is able to translate the results from the real parser engine, into the objects that the extension and CompilationTool understand.
* QasmParserEngine is the real implementation of the parser for qasm files.
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

## Interesting links

### Visual Studio Code extensions

* [Your first VS Code extension tutorial](https://code.visualstudio.com/docs/extensions/example-hello-world)
* [How to create a language server?](https://code.visualstudio.com/docs/extensions/example-language-server)
* [VS Code extension examples](https://code.visualstudio.com/docs/extensions/samples)

### Jison related links

* [Online Jison generator](http://zaa.ch/jison/try/usf/#prod_1): This web is quite interesting because it is able to extract firsts and follows of the grammar. One thing that is not possible in the auto-generated parser from the Jison console command.

## Meta

TBD
