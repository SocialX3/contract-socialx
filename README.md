# Social X

## Command Line

- install :
  - `npm i`
- create `.env` file in project root path
  - mirror `.env.example`
- compile :
  - `npm run compile`
  - if got `Error HH12`: run command `npm install --save-dev hardhat`
- test :
  - `npm run test`
- coverage :
  - `npm run coverage`
- view methods gas :
  - `npm run gas`
- deploy on hardhat temp network
  - `npm run d`
- deploy on localhost network
  - Terminal 1: `npm run node`
  - Terminal 2: `npm run d:l`
- deploy on blockchain network
  - `npm run d:fbchain`

All scripts is in `package.json` file.

## Open in remixd web

1. `npm install -g @remix-project/remixd`
2. `npm run remixd`

## log in contract

```
import "hardhat/console.sol";

console.log(msg.sender);
```

## networkId

```
Fibo Chain
networkId  : 1
SocialX    : 0x81B51A11666Dab30f9C0B067033c08f6fFf3904E

OKT Chain
networkId  : 3
SocialX    : 0xFDcf8E92c0B898b3bCD028FeA5243a5Ba539480b

Polygon Chain
networkId  : 4
SocialX    : 0xFDcf8E92c0B898b3bCD028FeA5243a5Ba539480b
```
