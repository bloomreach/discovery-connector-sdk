# Bloomreach Discovery SDK
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


| Dependency                                                                                                        | Version |                                                                        Notes |
|:------------------------------------------------------------------------------------------------------------------|:-------:|-----------------------------------------------------------------------------:|
| ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)           | v16.13  |                                                      [ ] TODO Upgrade to LTS |
| ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | v4.8.3  |                                                              Version @latest |
| ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)             |  v8.18  |                                                      [ ] TODO Upgrade to LTS |
| ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)            | v3.2.2  |                                                              Version @latest |
| ![Rollup](https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white)        | v2.75.5 | NOTE - Upgrade to LTS will introduce breaking changes  |


# Table of Contents

### [Overview](#overview)

### [Demo](#demo)

### [Installation](#installation)

### [Developer tools](#developer-tools)

### [API Design](#api-design)

### [Contributing](#contributing)

### [Dev-Tools & Utilities](#dev-tools--utilities)



### [API Design](#api-design)




## Overview

---
This library provides a simplified access to the following Bloomreach APIs:

- [Autosuggest API](https://documentation.bloomreach.com/api-reference/search-and-merchandising/autosuggest-api/autosuggest-api.html)
- [Category API](https://documentation.bloomreach.com/api-reference/search-and-merchandising/category-api/category-api.html)
- [Product Search API](https://documentation.bloomreach.com/api-reference/search-and-merchandising/product-search-api/product-search-api.html)
- [Pathways and Recommendations API](https://documentation.bloomreach.com/api-reference/pathways-and-recommendations/pathways-and-recommendations-api-v2.html)


Simple and relatable APIs mean that designers and developers are free choose a front end and user experience that meets their needs.

The APIs are broken up into individual functions & calls to ensure that each API does one thing, and does it well.

# Demos

---
### Headless / React Example / Demo
To assist developers with their implementation, there is a basic example of a client-side implementation using React / Preact that can be built / loaded locally from a package located in `packages/frontend/react-custom`

### Bloomreach Experience ManagerVanillaJS Example / Demo
To assist developers with their implementation of Bloomreach Experience Manager Widgets, there is a basic example of a client-side implementation using VanillaJS / Typescript that can be built / loaded locally from a package located in `packages/frontend/vanilla-js`





# Installation


---
## Prerequisites
### Node.js (Required)
**Version:** 16.13.1

[Click Here to view documentation](https://nodejs.org/en/about/releases/)

### Core Pack (Optional)
The preferred way to manage Yarn is through Corepack, a new binary shipped with all Node.js releases starting from 16.10. It acts as an intermediary between you and Yarn, and lets you use different package manager versions across multiple projects without having to check-in the Yarn binary anymore.

[Click Here to view documentation](https://nodejs.org/api/corepack.html)


### Yarn Package Manager (Required)
**Version:** 3.2.1

[Click Here to view documentation](https://yarnpkg.com/)


## Install SDK from package repo
1. SDK can be downloaded from npm.js using the following command, and should be installed as a `dependency` in the package.json, NOT a `devDependency`
```shell
yarn -i @bloomreach/discovery-sdk
```

2. Install dependencies from root directory
```shell
yarn install
```

# Developer Tools

---
## Postman Collection
[Click Here to view the Workspace](https://www.postman.com/crimson-astronaut-583755/workspace/bloomreach-discovery-search/overview)


## SDK Languages & Frameworks
### Node.js v.16.13.x
SKD foundational language

[Click Here to view documentation](https://nodejs.org/en/about/releases/)

### Typescript v4.7.x
Primary coding language, utilizing ES6+

[Click Here to view documentation](https://www.typescriptlang.org/)

### Eslint v8.x.x
Code quality checks & enforcement
[Click Here to view documentation](https://eslint.org/blog/2021/06/whats-coming-in-eslint-8.0.0)

### Yarn Package Manager / Monorepo
[Click Here to view documentation](https://yarnpkg.com/)

# API Design

---
### Design Approach
Provide a lightweight and modern set of API packages that will provide developers easy to implement APIs that utilize the modern features of...
* Node.js
* Typescript
* Fetch API

### Why `fetch()` as the method of choice?
* Effective Browser support for client-side calls
* Native Typescript support, and does not require incremental packages or dependencies
* Support for sync and async capabilities
* Native Node.js support for v16+
  * NOTE...Node.js LTS version will be 18 as of August 2022


# Contributing

---
## Building the modules

### API Modules Overview
The API modules are built using custom rollup.js configurations, and will output the following formats...
* ES: ES Module file
* UMD: Universal module definition file file
* CJS: CommonJS  file

### Building the API clients
#### Prerequisites
Install the SDK Monorepo by running `yarn install` from the project's parent directory

#### Build Command
1. Navigate to the path `./packages/api-client`
2. Run command `yarn build`



### Dev-tools & Utilities


#### 1. Node Modules Cleanup
Run command `. ./cleanup.sh` which will access a custom script which will delete all of node_modules directories, which can be helpful when updating / modifying dependencies.

#### 2. Code Quality & Coverage Tools

##### Eslint
Primary code quality utility that utilizes a variety of plugins to provide resources such as...
* Code formatting
* Coding standard enforcement
* Best Practices Enforcement
* Type checking

#####  TS Coverage Report
Provides a utility that checks and provides an HTML reportof the the explicit type coverage for the various projects and files.

The configurations for the type coverage can be found in the `package.json` for each module.

#####  Dependency Scan
###### **Overview**
The audit command submits a description of the dependencies configured in your project to your default registry and asks for a report of known vulnerabilities. If any vulnerabilities are found, then the impact and appropriate remediation will be calculated.

###### **Running Manually**
Can be run utilizing command `yarn npm audit --recursive`

#### 3.Utility Functions

##### Default Response

* By default, the response includes a maximum of 8 products.
* Keyword suggestions are in the `querySuggestions` field
* Product suggestions are in the `searchSuggestions` field.


##### Querying using Special Characters
The SDK provides a function, `escapeSpecialCharacters()`, that can be used to escape special characters from the search input.

### Generating unique RequestID
The SDK provides a function, `generateRequestID()`, that can be used to generate the recommended 13 character randomized / unique parameter `request_id`
See API documentation for more info on the `request_id`


### Extracting `_br_uid_2` cookie ID
The SDK provides a function, `extractTrackingCookie()`, that can be used to check for the presence of the `_br_uid_2` cookie, and if one is not found, the function will return the default value provided in the API Documentation

### Debounce function
The SDK provides a function, `debounce()` that can be called to set a delay to call the real time Autosuggest API

[Click Here for a brief overview on using Debounce](https://www.joshwcomeau.com/snippets/javascript/debounce/)

# Package Management

---
### dist/
The /dist stands for distributable. The /dist folder contains the minimized version of the source code. The code present in the /dist folder is actually the code which is used on production web applications.

### lib/

The lib folder is what package. json main points to, and users that install your package using npm will consume that directly.




# Version Control

---
Each of the APIs can be included in a project via the SDK, but note EACH API is individually version controlled to allow for optimal flexibility of development & release.

