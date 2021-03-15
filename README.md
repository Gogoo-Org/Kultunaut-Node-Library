# Kultunaut Node Libary 


![npm](https://img.shields.io/npm/v/kultunaut-node-library)

## Documentation

Read the [documentation here](https://gogoo-org.github.io/Kultunaut-Node-Library/).


## Requirements

Node 12 or higher.

## Installation

Install the package with:

```sh
npm install kultunaut-node-library
# or
yarn add kultunaut-node-library
```

## Usage

The package should be configured with a user account:

<!-- prettier-ignore -->
```js
import { setCredentials } from "kultunaut-node-library"

setCredentials(uniqeUserID)
```

<!-- prettier-ignore -->
```js
import {getById} from "kultunaut-node-library"

await getById("55.676788", "12.505840")
```
