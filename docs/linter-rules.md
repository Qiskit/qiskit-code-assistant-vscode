This document contains a list of TSLint rules that could be nice to add to the project, but they "show a lot of errors" that must be fixed before pushing those rules to the repository.

__The addition of some of these rules to the linter process is  a team decision.__

* **member-access**: Requires explicit visibility declarations for class members, so they are intentionally public and not by chance. **Included at Google's TS style guide**
* **no-any**: Using `any` as a type declaration nullifies the compile-time benefits of the type system. **Included at Google's TS style guide**
* **no-namespace**: Disallows use of internal modules and namespaces. **Included at Google's TS style guide**
* **prefer-const**: Requires that variable declarations use `const` instead of `let` and `var` if possible. **Included at Google's TS style guide**

An option is to create a new linter file with warning level, so it will no break the CI/CD pipeline, but it will be showed to the developer. After all errors are solved the temporal linter file will be deleted and rules taken to the general linter file.

### Interesting links

* [Google's TypeScript style guide](https://github.com/google/ts-style)