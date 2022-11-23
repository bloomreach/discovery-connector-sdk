# Bloomreach Discovery - Vanilla.js Demo

---

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


| Dependency                                                                                                 | Version  |                                                         Notes |
|:-----------------------------------------------------------------------------------------------------------|:--------:|--------------------------------------------------------------:|
| <img src="https://mma.prnewswire.com/media/327274/bloomreach_logo.jpg" width="100"   />                    |   v2.0   | API Client                                    Version @latest |
| ![Preact](https://badges.aleen42.com/src/preact.svg)                                                       | v10.11.2 |                                               Version @latest |
| ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)    |  v16.13  |                                       [ ] TODO Upgrade to LTS |
| ![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)    |  v4.8.3  |                                               Version @latest |
| ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)      |  v8.18   |                                       [ ] TODO Upgrade to LTS |
| ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)     |  v3.2.2  |                                               Version @latest |
| ![Rollup](https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white) | v2.75.5  |         NOTE - Upgrade to LTS will introduce breaking changes |



This package renders the UI of the returned results for the Bloomreach Discovery SDK.

The Bloomreach Discovery SDK provides a thin API layer for the Bloomreach Autosuggest, Product Search, Category and Pathways & Recommendations APIs. Data is returned from the Bloomreach Discovery SDK as raw JSON from the API call.

This UI package is an enhancement that renders the return of these APIs directly to the page. If you want to use the Bloomreach Discovery SDK with vanilla JS, we recommend looking at this as a starting point. If, however, you want to use it with other libraries/frameworks, for example, React, Vue, Angular, etc., that have specific ways to render the UI, we recommend using the Discovery SDK directly.

## Setup local environment

### Prerequisites

Install project dependencies in the project root; this will install all of the project dependencies using Yarn Workspaces:

```bash
yarn install
```

Build the API client:

```bash
cd packages/api-client
yarn build
```

Reinstall UI package dependencies with the previously build API client package:

```bash
cd packages/frontend/vanilla-js
rm -rf node_modules && yarn install
```

### Start the project in development mode

```bash
cd packages/frontend/vanilla-js
yarn start
```

In another terminal serve the project folder:

```bash
cd packages/frontend/vanilla-js
yarn serve
```

Now you can access the example documents at `http://localhost:3000/documents`.

The used account details can be configured in each example HTML document modifying the connector config object in `packages/frontend/vanilla-js/documents`.

The Category and Search modules can be tested easily by using the `q` URL parameter.
The value of the `q` parameter is the search query string in the Search module and the category ID in the Category module document.

Examples:
- `http://localhost:3000/documents/product-search?q=*`
- `http://localhost:3000/documents/category?q=93`

### Build the project

```bash
cd packages/frontend/vanilla-js
yarn build
```

The newly built files will be in the `dist/` subfolder.
