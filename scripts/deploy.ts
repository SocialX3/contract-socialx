import hre from 'hardhat'
import { ethers } from 'hardhat'

console.log('hre.network.name', hre.network.name)

// ************ 配置:开始 ************
const CONFIG = {
  fbchain: {
    networkId: 1,
  },
  // hardhat / okchain
  okchain: {
    networkId: 3,
  },
  polygon: {
    networkId: 4,
  },
}
const config = CONFIG[hre.network.name]
// ************ 配置:结束 ************

// current network info
console.log('\n ============ BASIC  INFO ============')
console.log('✅ Current Network   :', hre.network.name)
console.log('        networkId   :', config.networkId)
console.log('   Network Url       :', hre.network.config.url || 'hardhat temp network')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('✅ Deployer Address  :', deployer.address)

  console.log(`\n ____________ DEPLOY INFO ____________`)

  //deploy
  const Social = await ethers.getContractFactory('SocialX')
  const SocialContract = await Social.deploy(config.networkId)
  await SocialContract.deployed()
  console.log(`SocialX              : ${SocialContract.address}`)

  // End
  console.log('\n ============ DEPLOY  END ============')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
