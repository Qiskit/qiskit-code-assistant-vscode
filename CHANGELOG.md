# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

> **Types of changes**:
>
> -   🎉 **Added**: for new features.
> -   ✏️ **Changed**: for changes in existing functionality.
> -   ⚠️ **Deprecated**: for soon-to-be removed features.
> -   ❌ **Removed**: for now removed features.
> -   🐛 **Fixed**: for any bug fixes.
> -   👾 **Security**: in case of vulnerabilities.

## [Unreleased]

### 🎉 Added

-   Adding ability to use custom python version and/or environment using `python.pythonPath` is VSCode settings ([#86](https://github.com/Qiskit/qiskit-vscode/pull/86) by [@zpbappi](https://github.com/zpbappi))

### 🐛 Fixed

### ✏️ Changed

### 👾 Security

### ❌ Removed

## [v0.5.4] - 2019-03-14

### 🐛 Fixed

-   Adding IBMQuantumExperience dependency to solve issue #81 and others alike ([#82](https://github.com/Qiskit/qiskit-vscode/pull/82) by [@cbjuan](https://github.com/cbjuan))

## [v0.5.3] - 2019-03-11

### 🐛 Fixed

-   Issues when displaying histograms (#78) ([#79](https://github.com/Qiskit/qiskit-vscode/pull/79) by [@cbjuan](https://github.com/cbjuan))
-   Use the WebView API for VSCode instead of `vscode.previewHTML` ([#79](https://github.com/Qiskit/qiskit-vscode/pull/79) by [@cbjuan](https://github.com/cbjuan))

## [v0.5.2] - 2019-03-06

### 🐛 Fixed

-   Improving checks for Qiskit versions ([#74](https://github.com/Qiskit/qiskit-vscode/pull/74) by [@cbjuan](https://github.com/cbjuan))
-   Updating dependencies to fix the error on startup #68 ([#70](https://github.com/Qiskit/qiskit-vscode/pull/70) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

-   Update the Jest config to avoid warnings in tests ([#76](https://github.com/Qiskit/qiskit-vscode/pull/76) by [@cbjuan](https://github.com/cbjuan))
-   Updating dependencies to meet qiskit-chemistry and current supported versions ([#72](https://github.com/Qiskit/qiskit-vscode/pull/72) by [@cbjuan](https://github.com/cbjuan))

## [v0.5.1] - 2019-02-08

-   Fixing CVE-2018-16491 ([#65](https://github.com/Qiskit/qiskit-vscode/pull/65) by [@cbjuan](https://github.com/cbjuan))

## [v0.5.0] - 2019-02-05

### 🎉 Added

-   Adding Qiskit citation to the README ([#63](https://github.com/Qiskit/qiskit-vscode/pull/63) by [@cbjuan](https://github.com/cbjuan))
-   Adding support for Qiskit Terra v0.7.X ([#61](https://github.com/Qiskit/qiskit-vscode/pull/61) by [@cbjuan](https://github.com/cbjuan))

### ❌ Removed

-   Removing support for Qiskit Terra v0.5.X ([#61](https://github.com/Qiskit/qiskit-vscode/pull/61) by [@cbjuan](https://github.com/cbjuan))

## [v0.4.1] - 2018-11-05

### 🎉 Added

-   Adding snippets for Qiskit Terra ([#39](https://github.com/Qiskit/qiskit-vscode/pull/39) by [@AkashGutha](https://github.com/AkashGutha))

### 👾 Security

-   Fixing CVE-2018-16469 and updating other dependencies ([#52](https://github.com/Qiskit/qiskit-vscode/pull/52) by [@cbjuan](https://github.com/cbjuan))

## [v0.4.0] - 2018-10-30

### 🎉 Added

-   Adding support for Qiskit Terra >v0.6 ([#47](https://github.com/Qiskit/qiskit-vscode/pull/47) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

-   Updating the support of snippets related to Qiskit Aqua to version v0.3 ([#49](https://github.com/Qiskit/qiskit-vscode/pull/49) by [@cbjuan](https://github.com/cbjuan))

## [v0.3.6] - 2018-10-25

### 🐛 Fixed

-   Changing update packages modal behavior: they must be only updated if the user clicks OK explicitly ([#45](https://github.com/Qiskit/qiskit-vscode/pull/45) by [@cbjuan](https://github.com/cbjuan))

## [v0.3.5] - 2018-10-24

### 🎉 Added

### 🐛 Fixed

-   Changing install packages modal behavior: they must be only installed if the user clicks OK explicitly ([#42](https://github.com/Qiskit/qiskit-vscode/pull/42) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

### 👾 Security

## [v0.3.4] - 2018-09-27

### 🎉 Added

-   Adding new device ibmq_16_melbourne to the list of devices ([#34](https://github.com/Qiskit/qiskit-vscode/pull/34) by [@cbjuan](https://github.com/cbjuan))

## [v0.3.3] - 2018-08-21

### 🎉 Added

### 🐛 Fixed

### ✏️ Changed

-   Rename qiskit-aqua(.\*)-related code -> from qiskit-acqua & qiskit-acqua-chemistry to qiskit-aqua and qiskit-aqua-chemistry ([#28](https://github.com/Qiskit/qiskit-vscode/pull/28) by [@cbjuan](https://github.com/cbjuan))
-   Improving the tests for the client (mocking vscode) ([#26](https://github.com/Qiskit/qiskit-vscode/pull/26) by [@cbjuan](https://github.com/cbjuan))

### 👾 Security

-   Solving CVE-2018-3774 and updating other dependencies ([#30](https://github.com/Qiskit/qiskit-vscode/pull/30) by [@cbjuan](https://github.com/cbjuan))

## [v0.3.2] - 2018-07-31

### 🎉 Added

-   Instructions to install the extension from VSCode IDE ([#24](https://github.com/Qiskit/qiskit-vscode/pull/24) by [@cbjuan](https://github.com/cbjuan))

### 🐛 Fixed

### ✏️ Changed

-   Updating the icon to the last version of qiskit's logo ([#23](https://github.com/Qiskit/qiskit-vscode/pull/23) by [@cbjuan](https://github.com/cbjuan))
-   Server tests use Jest as the client ([#21](https://github.com/Qiskit/qiskit-vscode/pull/21) by [@ydarias](https://github.com/ydarias))

### 👾 Security

-   Updating dependencies

## [v0.3.1] - 2018-07-24

### 🎉 Added

-   Added tests for the client ([#22](https://github.com/Qiskit/qiskit-vscode/pull/22) by [@cbjuan](https://github.com/cbjuan))

### 🐛 Fixed

-   Fixed client readme file external references ([#15](https://github.com/Qiskit/qiskit-vscode/pull/15) by [@ydarias](https://github.com/ydarias))

### ✏️ Changed

-   Modifying the background of extension's icon ([#13](https://github.com/Qiskit/qiskit-vscode/pull/13) by [@cbjuan](https://github.com/cbjuan))

### 👾 Security

-   Updating dependencies ([#16](https://github.com/Qiskit/qiskit-vscode/pull/16) by [@cbjuan](https://github.com/cbjuan))

## [v0.3.0] - 2018-07-23

### 🎉 Added

-   Better management of QConfig to improve users' experience ([#183](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/183) by [@cbjuan](https://github.com/cbjuan))

### 🐛 Fixed

-   RegEx expressions fixed when getting pip show output in Windows([#6](https://github.com/Qiskit/qiskit-vscode/pull/6) by [@cbjuan](http://github.com/cbjuan))
-   Replacing pool.map method by a for loop to avoid errors when getting the IBMQ devices' status in Windows ([#6](https://github.com/Qiskit/qiskit-vscode/pull/6) by [@cbjuan](http://github.com/cbjuan))
-   Now can be installed & updated several qiskit-related dependencies simultaneously ([#178](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/178) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

-   Update logo to the Qiskit one ([#7](https://github.com/Qiskit/qiskit-vscode/pull/7) by [@cbjuan](https://github.com/cbjuan))
-   Update publisher & author in package.json files ([#4](https://github.com/Qiskit/qiskit-vscode/pull/4) by [@cbjuan](https://github.com/cbjuan))
-   Renaming the repo, extension & texts descriptions to qiskit-vscode ([#184](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/184) by [@cbjuan](https://github.com/cbjuan))
-   Refactoring the management of dependencies ([#178](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/178) by [@cbjuan](https://github.com/cbjuan))

### 👾 Security

## [v0.2.2] - 2018-07-16

### 🎉 Added

### 🐛 Fixed

-   Variables at different scopes are now correctly parsed and redefined ones are correctly detected ([#176](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/176) by [@ydarias](https://github.com/ydarias))
-   The parser does not halt when it founds a malformed JSON ([#173](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/173) by [@ydarias](https://github.com/ydarias))
-   Background color fixed for IBMQ devices status template ([#175](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/175) [@cbjuan](https://github.com/cbjuan))
-   Get remote devices status now works fine with Qiskit Terra v0.5.5 and v0.5.6 ([#168](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/168) by [@ydarias](https://github.com/ydarias)) & [@cbjuan](https://github.com/cbjuan))
-   Get remote devices status now display the 'SIMULATOR' label when the device is a simulator ([#168](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/168) by [@cbjuan](https://github.com/cbjuan))
-   The Grover snippet does not generate a syntactic error ([#167](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/167) by [@ydarias](https://github.com/ydarias))

### ✏️ Changed

-   Symbol table store the different scopes and variable redefinition ([#176](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/176) by [@ydarias](https://github.com/ydarias))
-   The language server log level setted to info ([#167](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/167) by [@ydarias](https://github.com/ydarias))

### 👾 Security

## [v0.2.1] - 2018-07-03

### 🎉 Added

### 🐛 Fixed

-   Fixed error when rendering Histograms based on outputs that contain a WARNING ([#161](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/161) by [@cbjuan](https://github.com/cbjuan))
-   Fixed errors in management of dependencies ([#159](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/159) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

-   Improved readme for newcomers ([#154](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/154) by [@cbjuan](https://github.com/cbjuan))
-   Changed visualizations workflow to use a Template Engine ([#153](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/153) by [@ydarias](https://github.com/ydarias))

### 👾 Security

## [v0.2.0] - 2018-07-02

### 🎉 Added

-   Added snippets for some of the Aqua optimization algorithms ([#152](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/152) by [@ydarias](https://github.com/ydarias))
-   Imports validation for Qiskit files ([#150](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/150) by [@ydarias](https://github.com/ydarias))
-   qiskit-aqua and qiskit-aqua-chemistry added to dependencies ([#143](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/143) by [@cbjuan](https://github.com/cbjuan))
-   Added IBM Q 20 Tokyo backend ([#141](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/141) by [@cbjuan](https://github.com/cbjuan))
-   Added readme file to the client folder ([#134](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/134) by [@ydarias](https://github.com/ydarias))

### 🐛 Fixed

-   Qiskit parser does not fail with incomplete sentences ([#146](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/146) by [@ydarias](https://github.com/ydarias))
-   Qiskit parser does not halt at dictionary data ([#135](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/135) by [@ydarias](https://github.com/ydarias))

### ✏️ Changed

-   No magic numbers at the Qiskit symbol table ([#148](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/148) by [@ydarias](https://github.com/ydarias))

### 👾 Security

## [v0.1.1] - 2018-06-14

### 🎉 Added

-   Add a button to run getDevicesStatus command ([#132](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/132) by [@cbjuan](https://github.com/cbjuan))

### 🐛 Fixed

-   Enhance UX & visualizations related to UI buttons ([#132](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/132) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

### 👾 Security

## [v0.1.0] - 2018-06-13

### 🎉 Added

-   Winston as the logging library ([#118](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/118) by [@ydarias](https://github.com/ydarias))
-   Adding controls to enable/disable visualizations for code execution ([#120](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/120) by [@cbjuan](https://github.com/cbjuan))
-   Meeting internal guidelines for Github repos (Adding changelog, contributing, issues&PR templates, and code of conduct files) ([#106](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/106) by [@cbjuan](https://github.com/cbjuan))
-   Follow the dev guidelines: update the issue templates & move contributing ([#108](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/108) by [@abdonrod](https://github.ibm.com/abdonrod) & [@Juan-Cruz](https://github.ibm.com/abdonrod))

### 🐛 Fixed

-   Validation at the QASM conditional clauses ([#128](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/128) by [@ydarias](https://github.com/ydarias))
-   Syntax descriptor file customized for QASM language ([#123](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/123) by [@ydarias](https://github.com/ydarias))
-   Fixed an error in the message to users when qiskit installed is not the last version available ([#110](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/110) by [@cbjuan](https://github.com/cbjuan))

### ✏️ Changed

-   Allow users to select if they want explicit information or not at the boot of extension ([#122](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/122) by [@cbjuan](https://github.com/cbjuan))
-   Improved the NPM tasks to be more clear and readable ([#117](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/117) by [@ydarias](https://github.com/ydarias))
-   Adding prettier formatter to client code ([#116](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/116) by [@cbjuan](https://github.com/cbjuan))
-   Refactorization of the Qiskit symbol table generation and semantic errors detection ([#111](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/111) by [@ydarias](https://github.com/ydarias))
-   Update the gif in readme to meet version 0.0.2 and qiskit >= 0.5 ([#113](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/113) by [@cbjuan](https://github.com/cbjuan))
-   Updating usage of load_qasm_file() to qiskit 0.5.3 ([#112](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/112) by [@cbjuan](https://github.com/cbjuan))
-   Fixes in changelog's style and contents: following Keepachangelog guidelines ([#107](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/107) by [@cbjuan](https://github.com/cbjuan))

### 👾 Security

-   Check dependencies with vulnerabilities ([#104](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/104) by [@ydarias](https://github.com/ydarias))

## [v0.0.2] - 2018-05-28

> Fixes visualization problems at the x-axis.
>
> Fixed reload behavior when creating q config.

### 🐛 Fixed

-   Auto reload extension after setup QConfig & refactor extension.ts ([#101](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/101) by [@cbjuan](https://github.com/cbjuan))
-   Fixed errors when visualizing results with >1 count in get_counts() ([#100](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/100) by [@cbjuan](https://github.com/cbjuan))

## [v0.0.1] - 2018-05-25

> First internal release

### 🎉 Added

-   Added a new logo to the extension ([#95](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/96) by [@ydarias](https://github.com/ydarias))
-   Add command to get the status for remote devices ([#93](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/93) by [@cbjuan](https://github.com/cbjuan))
-   Parser adaptation to Qiskit 0.5 ([#92](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/92) by [@ydarias](https://github.com/ydarias))
-   Qiskit inline documentation ([#77](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/77) by [@ydarias](https://github.com/ydarias))
-   Visualizing the results of code executions ([#69](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/69) by [@cbjuan](https://github.com/cbjuan) & [@Ismael-Faro1](https://github.ibm.com/Ismael-Faro1))
-   Readme file for users and VS Code Marketplace ([#63](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/63) by [@ydarias](https://github.com/ydarias))
-   Run Python code using Qiskit and integration of useful commands from Qiskit & API ([#55](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/55) by [@cbjuan](https://github.com/cbjuan))
-   Qiskit errors highlight ([#40](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/40) by [@ydarias](https://github.com/ydarias))
-   Managing Qiskit VSCode Extension dependencies ([#38](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/38) by [@cbjuan](https://github.com/cbjuan))
-   ANTLR v4 grammar adaptation. ([#10](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/10) by [@ydarias](https://github.com/ydarias))

### 🐛 Fixed

-   Fix related to qiskit required version ([#91](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/91) by [@cbjuan](https://github.com/cbjuan))
-   Solving issues with Qiskit v0.5 ([#82](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/82) by [@cbjuan](https://github.com/cbjuan))
-   Managing properly the OS-dependent paths ([#80](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/80) by [@cbjuan](https://github.com/cbjuan))
-   Improving the check for dependencies. Fixes #65 ([#66](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/66) by [@cbjuan](https://github.com/cbjuan))
-   Add code owners ([#61](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/61) by [@abdonrod](https://github.ibm.com/abdonrod))
-   Array index out of bound check ([#55](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/53) by [@ydarias](https://github.com/ydarias))
-   Extension packaging phase fix ([#50](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/50) by [@ydarias](https://github.com/ydarias))
-   Fixed error when executing methods on the left side of an statement ([#45](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/45) by [@ydarias](https://github.com/ydarias))

### ✏️ Changed

-   Updating readme gif ([#98](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/98) by [@cbjuan](https://github.com/cbjuan))
-   Re-styling charts ([#97](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/97) by [@cbjuan](https://github.com/cbjuan))
-   Extension size reduction ([#76](https://github.ibm.com/IBMQuantum/qiskit-vscode/pull/76) by [@ydarias](https://github.com/ydarias))

[unreleased]: https://github.com/Qiskit/qiskit-vscode/compare/v0.5.4...HEAD
[v0.5.4]: https://github.com/Qiskit/qiskit-vscode/compare/v0.5.3...v0.5.4
[v0.5.3]: https://github.com/Qiskit/qiskit-vscode/compare/v0.5.2...v0.5.3
[v0.5.2]: https://github.com/Qiskit/qiskit-vscode/compare/v0.5.1...v0.5.2
[v0.5.1]: https://github.com/Qiskit/qiskit-vscode/compare/v0.5.0...v0.5.1
[v0.5.0]: https://github.com/Qiskit/qiskit-vscode/compare/v0.4.1...v0.5.0
[v0.4.1]: https://github.com/Qiskit/qiskit-vscode/compare/v0.4.0...v0.4.1
[v0.4.0]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.6...v0.4.0
[v0.3.6]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.5...v0.3.6
[v0.3.5]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.4...v0.3.5
[v0.3.4]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.3...v0.3.4
[v0.3.3]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.2...v0.3.3
[v0.3.2]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.1...v0.3.2
[v0.3.1]: https://github.com/Qiskit/qiskit-vscode/compare/v0.3.0...v0.3.1
[v0.3.0]: https://github.com/Qiskit/qiskit-vscode/compare/v0.2.2...v0.3.0
[v0.2.2]: https://github.com/Qiskit/qiskit-vscode/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/Qiskit/qiskit-vscode/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/Qiskit/qiskit-vscode/compare/v0.1.1...v0.2.0
[v0.1.1]: https://github.com/Qiskit/qiskit-vscode/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/Qiskit/qiskit-vscode/compare/v0.0.2...v0.1.0
[v0.0.2]: https://github.com/Qiskit/qiskit-vscode/compare/v0.0.1...v0.0.2
[v0.0.1]: https://github.com/Qiskit/qiskit-vscode/compare/d35decaf632f7b197c9df496a624baf2f46400d7...v0.0.1
