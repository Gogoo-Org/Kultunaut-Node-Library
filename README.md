# Kultunaut Node Libary 

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