---
title: "Qiskit VSCode: a tool to enhance the quantum computing programming experience"
tags:
    - Qiskit
    - Quantum Computing
    - Software
    - Visual Studio Code
    - VSCode
    - IBM Research
    - Open Source
authors:
    - name: Juan Cruz-Benito
      orcid: 0000-0003-2045-8329
      affiliation: 1
    - name: Yeray Darias
      affiliation: 1
    - name: Ismael Faro
      affiliation: 1
    - name: Juan Gómez
      affiliation: 1
    - name: Francisco Martín-Fernández
      affiliation: 1
affiliations:
    - name: T.J. Watson Research Center. IBM Research. Yorktown Heights, NY, USA.
      index: 1
date: 3 December 2018
bibliography: paper.bib
---

# Summary

Qiskit VSCode is an extension developed for Visual Studio Code [@vscode2018] that aims to enhance the researchers, developers and newcomers' experience [@barabasistudent2018] when programming quantum computing code using the language OpenQASM [@cross2017open] or the Qiskit libraries [@qiskit2018][@cross2018ibm].
Visual Studio Code (VSCode) is a popular code editor that embraces the open source philosophy and encourages collaboration. It allows the Open Source community to develop and add extensions that bring new functionality to its users. Similarly, a central goal of Qiskit is to build a software stack that makes it easy for anyone to use quantum computers. Following these ideas, this extension helps users keep Qiskit libraries (Terra, Aqua, etc.) up to date, detect code errors, autocomplete code and offer programming aids like the visualization of code executions or the integration with online quantum computers. These features aim to help beginners learn the right syntax for Qiskit or OpenQASM, and support advanced users and researchers find errors faster and remember parameters for various Qiskit functions. By leveraging this functionality, users can spend more time running Quantum Computing experiments instead of troubleshooting errors.

Some of the new features that our Qiskit VSCode extension add to VSCode IDE include:

-   Seamless integration with the IBM Q Experience platform [@ibmq2018] and its backends [@mckay2018qiskit].
-   Automatic management of Qiskit dependencies.
-   An easy way to run and visualize the results of the experiments.
-   Dynamic error detection in the code.
-   Code auto-completion.
-   Inline documentation.

From a technical perspective, the Qiskit VSCode extension is a Typescript-based [@bierman2014understanding] project which comprises a client/server structure built on the top of the VSCode API and which extends the capabilities of the official VSCode Python extension [@pythonVSCode2018]. The server implements a parser based on ANTLR [@parr1995antlr] to deal with OpenQASM language and to extend the Python grammar [@rossum1995python] to support the Qiskit libraries and methods. This ANTLR parser is used to detect errors on the code and to implement helpers that could be used in realtime when typing code. The client provides different visual features and commands like the real-time check of quantum backends available on the Internet, the execution of the code typed in Python or OpenQASM, the management of the Qiskit versions installed in the system, and so on. To assure the quality of the code and the project, Qiskit VSCode runs a continuous integration / continuous deployment (CI/CD) pipeline through using Travis [@travis2018]. This process checks and compiles the Typescript code and runs 18 test suites with about 100 unit tests (using Jest testing library [@jest2018]) on each Git commit, and can deploy the extension on the Visual Studio Code Marketplace automatically when a commit is tagged as a new version.

The extension is freely available for installing at the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=qiskit.qiskit-vscode), and the code is hosted in [GitHub](https://github.com/Qiskit/qiskit-vscode).

# Acknowledgements

We acknowledge the contributions, ideas, and feedback received from Abdón Rodríguez Dávila, Diego Moreda, Talia Gershon, Jay M. Gambetta, and the other colleagues from IBM Research AI & Q division.

# References
