import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers'
// import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { config } from './helpers/config'
import { create } from './helpers/create'
import { append } from './helpers/append'
import { repay } from './helpers/repay'
import { attributes } from './helpers/attributes'
export { default as jsNumberForAddress } from './utils'

describe('SocialX', function () {
  async function deployOneYearLockFixture() {
    const [owner, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10] = await ethers.getSigners()

    const locationId = 1
    //deploy
    const Social = await ethers.getContractFactory('SocialX')
    const socialX = await Social.deploy(locationId)
    await socialX.deployed()

    return {
      // 合约部署者
      owner,

      // 普通地址
      user1,
      user2,
      user3,
      user4,
      user5,
      user6,
      user7,
      user8,
      user9,
      user10,

      // 合约
      socialX,
    }
  }
  it('LOCATION_ID', async function () {
    const { socialX } = await loadFixture(deployOneYearLockFixture)
    expect(await socialX.LOCATION_ID()).to.equal(1)
  })
  describe('Topic', async function () {
    it('create', async function () {
      const { socialX } = await loadFixture(deployOneYearLockFixture)
      const tx = await socialX.create(config.channel_id, config.signData, create.node_index, create.title, create.content)

      const result = await tx.wait()
      const TXInfo = await socialX.channels(1)
      expect(TXInfo.topics).to.equal(1)
    })

    it('append', async function () {
      const { socialX } = await loadFixture(deployOneYearLockFixture)
      const tx = await socialX.append(config.channel_id, config.signData, append.topic_location, append.topic_hash, append.content)

      const result = await tx.wait()
      // console.log('result', result.transactionHash)
      const TXInfo1 = await socialX.channels(1)
      expect(TXInfo1.appends).to.equal(1)

      const tx2 = await socialX.append(config.channel_id, config.signData, append.topic_location, append.topic_hash, append.content)

      const TXInfo2 = await socialX.channels(1)
      expect(TXInfo2.appends).to.equal(2)
    })

    it('reply', async function () {
      const { socialX } = await loadFixture(deployOneYearLockFixture)
      // console.log('socialX', socialX.functions)
      const tx1 = await socialX['reply(uint256,bytes,uint256,string,string)'](config.channel_id, config.signData, repay.topic_location, repay.topic_hash, repay.content)
      const result1 = await tx1.wait()

      const tx2 = await socialX['reply(uint256,bytes,uint256,string,string,uint256,string)'](config.channel_id, config.signData, repay.topic_location, repay.topic_hash, repay.content, repay.reply_location, repay.reply_hash)
      const result2 = await tx2.wait()
      // console.log('result', result.transactionHash)
    })

    it('attributes', async function () {
      const { socialX } = await loadFixture(deployOneYearLockFixture)

      let arr: any[] = []
      Object.keys(attributes).map((item) => {
        // arr.push(web3.utils.asciiToHex(`${item} ${opt[item]}`))
        const info = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(`${item} ${attributes[item]}`))
        // console.log(`${item} ${opt[item]}`, info)
        arr.push(info)
      })

      const tx = await socialX.attributes(config.channel_id, config.signData, arr)

      const result = await tx.wait()
      // console.log('result', result.transactionHash)
    })
  })
})
