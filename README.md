# Kultunaut Node Libary 


![npm](https://img.shields.io/npm/v/kultunaut-node-library)

## Documentation

Read the [documentation here](https://gogoo-org.github.io/Kultunaut-Node-Library/).


## Requirements

Node 12 or higher.

## Installation

Install the package with:

```sh
npm install stripe --save
# or
yarn add stripe
```

## Usage

The package needs to be configured with your account:

<!-- prettier-ignore -->
```js
process.env.credentials
```

<!-- prettier-ignore -->
```js
import {getById} from "kultunaut-node-library"

await getById("55.676788", "12.505840")
```
