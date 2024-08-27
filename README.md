# Chai and Earl comparison

This is a simple mock project to compare the Chai and Earl assertion libraries.

## Explanation

You can find a simple piece of code in `src/index.ts` which mocks a subset of the behavior of a blogging system. In particular,
it mocks a service that manages the users of the blog.

This code is not meant to be complete, but to be used to offer a pseudo-realistic example code to test.

## Tests

The are two sets of tests of the example code. One of them uses Chai, and the other uses Earl.

You can find the tests in `test/chai-example.ts` and `test/earl-example.ts`.

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
