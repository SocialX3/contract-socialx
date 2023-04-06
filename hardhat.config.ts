import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('dotenv').config()

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    okchain: {
      url: process.env.RPC_URL_OK,
      accounts: [process.env.PK_ACCOUNT_1],
      timeout: 600000,
      blockGasLimit: 0x1fffffffffffff,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
    },
    fbchain: {
      url: process.env.RPC_URL_FBC,
      accounts: [process.env.PK_ACCOUNT_1],
      timeout: 600000,
    },
  },
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
}

export default config
