# Chai and Earl comparison

This is a simple mock project to compare the Chai and Earl assertion libraries.

## Explanation

You can find a simple piece of code in `src/index.ts` which mocks a subset of the behavior of a blogging system. In particular,
it mocks a service that manages the users of the blog.

This code is not meant to be complete, but to be used to offer a pseudo-realistic example code to test.

## Tests

The are two sets of tests of the example code. One of them uses Chai, and the other uses Earl.

You can find the tests in `test/chai-example.ts` and `test/earl-example.ts`.

## Required environment

Please make sure you have Node.js version `22.0.0` or higher installed. You can validate your version with `node --version`.

You can also use the included devcontainer to run this project. The simplest way to do this it to use Github Codespaces, by clicking on the green "Code" button on the top of this page, and then clicking on "Codespaces", and then "Create codespace on main". This will open a new tab in your browser, with a vscode instance that has the project cloned and ready to go.

## Installation

```bash
npm install
```

## Running the tests

```bash
npm test
```

### Expected failures

Some of the tests are expected to fail. Please pay attention to the comments in the code to understand why.

## Scope of the comparison

This repository isn't meant to be a full comparison of the two libraries, but to illustrate how their style differs.
