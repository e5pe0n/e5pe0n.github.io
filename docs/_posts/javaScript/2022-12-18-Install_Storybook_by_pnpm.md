---
title: "Note: Install Storybook using pnpm"
categories:
  - Note
tags:
  - Programming
  - JavaScript
  - pnpm
last-modified-at: 2022-12-18
---

Currently Storybook only supports *npm* and *yarn*.  
If you install storybook using *pnpx* instead of *npx* as [install guide](https://storybook.js.org/docs/react/get-started/install), you'd get error like below when *pnpx* try to install dependencies.  


```
$ pnpx storybook init

[snip]

 • Preparing to install dependencies. ✓


npm ERR! Cannot read properties of null (reading 'matches')

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/node/.npm/_logs/2022-12-18T04_41_08_428Z-debug-0.log
. ✖

     An error occurred while installing dependencies.

 ERROR  Command failed with exit code 1: /workspaces/react-sandbox/.pnpm-store/v3/tmp/dlx-8836/node_modules/.bin/storybook init

pnpm: Command failed with exit code 1: /workspaces/react-sandbox/.pnpm-store/v3/tmp/dlx-8836/node_modules/.bin/storybook init
    at makeError (/usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:22852:17)
    at handlePromise (/usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:23423:33)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.handler [as dlx] (/usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:202479:7)
    at async /usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:209921:21
    at async main (/usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:209892:34)
    at async runPnpm (/usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:210123:5)
    at async /usr/local/share/npm-global/lib/node_modules/pnpm/dist/pnpm.cjs:210115:7
```

To avoid this, specify `-s` option to skip install dependencies.  
Then `storybook init` command doesn't install them but just writes them into *package.json* and creates files necessary to use Storybook such as `.storybook/main.js` and `.storybook/preview.js`.    
Also, specify `webpack5` as builder (default is `webpack4`, i don't know why but i couldn't start Storybook correctly using it).  

```
pnpx storybook init -s --builder webpack5
```

After installation skipped, you'd be asked whether to install [eslint-plugin-storybook](https://www.npmjs.com/package/eslint-plugin-storybook) which is an eslint plugin for storybook.  
The same above, to avoid installation, enter `N`.  

```
✔ Do you want to run the 'eslintPlugin' migration on your project? … no
Skipping the eslintPlugin migration.
```

After `storybook init` command finished, 
Your `package.json` should be like below.  

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.9.4",
  },
  "devDependencies": {
    "@babel/core": "^7.20.5",
    "@storybook/addon-actions": "^6.5.14",
    "@storybook/addon-essentials": "^6.5.14",
    "@storybook/addon-interactions": "^6.5.14",
    "@storybook/addon-links": "^6.5.14",
    "@storybook/builder-webpack5": "^6.5.14",
    "@storybook/manager-webpack5": "^6.5.14",
    "@storybook/react": "^6.5.14",
    "@storybook/testing-library": "^0.0.13",
    "@types/node": "^18.11.17",
    "@types/react": "^18.0.26",
    "babel-loader": "^8.3.0",
  },
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  },
}

```

you can manually install these dependencies.  

```
pnpm i
```

Also `eslint-plugin-storybook` if necessary.  

```
pnpm i -D eslint-plugin-storybook
```

