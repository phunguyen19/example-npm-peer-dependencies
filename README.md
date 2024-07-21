# Example npm peerDependencies

This repo is an example of peerDependencies in npm.

## Theory and information of the example

Official npm document about `peerDependencies`: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies

More detail explain about the real-world use case that we need `peerDependencies`: https://nodejs.org/en/blog/npm/peer-dependencies

Summary real-world use case: When develop a plugin for a host package, we use `peerDependencies` to display error when user try to install the plugin that is not compatible with the host package.

## Example design

The package `pkg_express_3` has a peerDependencies of `express` with version `^3`.

The `main_no_express_installed` package has a dependency of `pkg_express_3` and does not have `express` installed. When we install the packages, it will automatically resolve the `express` dependency to `^3`.

The `main_installed_express_4` package has a dependency of `pkg_express_3` and has `express` installed with version `^4`. When we install the packages, it will throw an error because the `express` version is not compatible with the `pkg_express_3` package.

Example tested with:

```
node: v18.10.0
npm: 8.19.2
```

## Compatible case

Expecting the commands below run successfully

```bash
cd main_no_express_installed
npm i --install-links
node .
```

## Not compatible case with error

When express version is not compatible

```bash
cd main_installed_express_4
npm i --install-links
```

Expected: error message

```text
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: main@1.0.0
npm ERR! Found: express@4.19.2
npm ERR! node_modules/express
npm ERR!   express@"^4.19.2" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer express@"^3" from pkg@2.0.0
npm ERR! node_modules/pkg
npm ERR!   pkg@"file:../pkg_express_3" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See /Users/phu.nguyen/.npm/eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/phu.nguyen/.npm/_logs/2024-07-21T03_49_15_052Z-debug-0.log
```
