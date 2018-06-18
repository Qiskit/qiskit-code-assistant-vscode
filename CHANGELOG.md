# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

> **Types of changes**:
>
> - 🎉 **Added**: for new features.
> - ✏️ **Changed**: for changes in existing functionality.
> - ⚠️ **Deprecated**: for soon-to-be removed features.
> - ❌ **Removed**: for now removed features.
> - 🐛 **Fixed**: for any bug fixes.
> - 👾 **Security**: in case of vulnerabilities.

## [Unreleased]

### 🎉 Added
- Added readme file to the client folder ([#134](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/134) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Add a button to run getDevicesStatus command ([#132](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/132) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))

### 🐛 Fixed
- Enhance UX & visualizations related to UI buttons ([#132](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/132) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))

### ✏️ Changed

### 👾 Security


## [v0.1.0] - 2018-06-13

### 🎉 Added

- Winston as the logging library ([#118](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/118) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Adding controls to enable/disable visualizations for code execution ([#120](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/120) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Meeting internal guidelines for Github repos (Adding changelog, contributing, issues&PR templates, and code of conduct files) ([#106](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/106) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Follow the dev guidelines: update the issue templates & move contributing ([#108](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/108) by [@abdonrod](https://github.ibm.com/abdonrod) & [@Juan-Cruz](https://github.ibm.com/abdonrod))

### 🐛 Fixed

- Validation at the QASM conditional clauses ([#128](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/128) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Syntax descriptor file customized for QASM language ([#123](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/123) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Fixed an error in the message to users when qiskit installed is not the last version available ([#110](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/110) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))

### ✏️ Changed

- Allow users to select if they want explicit information or not at the boot of extension ([#122](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/122) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Improved the NPM tasks to be more clear and readable ([#117](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/117) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Adding prettier formatter to client code ([#116](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/116) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Refactorization of the QISKit symbol table generation and semantic errors detection ([#111](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/111) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Update the gif in readme to meet version 0.0.2 and qiskit >= 0.5 ([#113](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/113) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Updating usage of load_qasm_file() to qiskit 0.5.3 ([#112](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/112) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Fixes in changelog's style and contents: following Keepachangelog guidelines ([#107](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/107) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))

### 👾 Security

- Check dependencies with vulnerabilities ([#104](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/104) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))

## [v0.0.2] - 2018-05-28

> Fixes visualization problems at the x-axis.
>
> Fixed reload behavior when creating q config.

### 🐛 Fixed

- Auto reload extension after setup QConfig & refactor extension.ts ([#101](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/101) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Fixed errors when visualizing results with >1 count in get_counts() ([#100](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/100) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))

## [v0.0.1] - 2018-05-25

> First internal release

### 🎉 Added

- Added a new logo to the extension ([#95](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/96) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Add command to get the status for remote devices ([#93](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/93) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Parser adaptation to QISKit 0.5 ([#92](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/92) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- QISKit inline documentation ([#77](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/77) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Visualizing the results of code executions ([#69](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/69) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz) & [@Ismael-Faro1](https://github.ibm.com/Ismael-Faro1))
- Readme file for users and VS Code Marketplace ([#63](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/63) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Run Python code using QISKit and integration of useful commands from QISKit & API ([#55](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/55) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- QISKit errors highlight ([#40](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/40) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Managing IBM Q Studio dependencies ([#38](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/38) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- ANTLR v4 grammar adaptation. ([#10](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/10) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))

### 🐛 Fixed

- Fix related to qiskit required version ([#91](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/91) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Solving issues with QISKit v0.5 ([#82](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/82) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Managing properly the OS-dependent paths ([#80](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/80) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Improving the check for dependencies. Fixes #65 ([#66](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/66) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Add code owners ([#61](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/61) by [@abdonrod](https://github.ibm.com/abdonrod))
- Array index out of bound check ([#55](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/53) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Extension packaging phase fix ([#50](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/50) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))
- Fixed error when executing methods on the left side of an statement ([#45](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/45) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))

### ✏️ Changed

- Updating readme gif ([#98](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/98) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Re-styling charts ([#97](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/97) by [@Juan-Cruz](https://github.ibm.com/Juan-Cruz))
- Extension size reduction ([#76](https://github.ibm.com/IBMQuantum/qiskit-studio/pull/76) by [@Yeray-Darias](https://github.ibm.com/Yeray-Darias))

[Unreleased]: https://github.ibm.com/IBMQuantum/qiskit-studio/compare/v0.0.2...HEAD
[v0.0.2]: https://github.ibm.com/IBMQuantum/qiskit-studio/compare/v0.0.1...v0.0.2
[v0.0.1]: https://github.ibm.com/IBMQuantum/qiskit-studio/compare/d35decaf632f7b197c9df496a624baf2f46400d7...v0.0.1
