# Ourtips smart contract template

This smart contract is used as a template on Ourtips dapp (ourtips.org)

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download/) v8 or higher


## Installing
- Run `npm install`


## Running the tests
The recommended way to develop new features and assert the proper behavior is writing failing tests first.
Truffle makes it easy to run tests against a local Ethereum node.

- Run `npm run develop` to start a local node. Keep it running and enter the next command in a new window
- Run `npm t` manually to run the whole test suite. There is no watch mode.

Tip: use `.only` to run a single test

```
  it.only('should have 0 balance initially', ...
```

## Compilation
To build a json with all compilation artifacts run `npm run build`

To copy the artifact to the dapp project, modify `copy` script located in `package.json` to match your folder structure. Then run `npm run copy`.
