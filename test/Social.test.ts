import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers'
// import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { config } from './helpers/config'
import { create } from './helpers/create'
import { append } from './helpers/append'
import { repay } from './helpers/repay'
import { tags } from './helpers/tags'
export { default as jsNumberForAddress } from './utils'

const APP_ID = 1
describe('SocialX', function () {
  async function deployOneYearLockFixture() {
    const [owner, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10] = await ethers.getSigners()

    const networkId = 1
    //deploy
    const Social = await ethers.getContractFactory('SocialX')
    const socialX = await Social.deploy(networkId)
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
  it('NETWORK_ID', async function () {
    const { socialX, user1, user2 } = await loadFixture(deployOneYearLockFixture)
    expect(await socialX.NETWORK_ID()).to.equal(1)
  })
  it('Approve & allowance', async function () {
    const { socialX, user1, user2 } = await loadFixture(deployOneYearLockFixture)
    // user1 是 owner
    // user2 是 agent
    const abi = ethers.utils.defaultAbiCoder
    const signDataAgent = abi.encode(['uint256', 'address'], ['0', user1.address])
    const signDataParse = abi.decode(['uint256', 'address'], signDataAgent)
    // console.log('log,', user1.address, signDataAgent)

    expect(await socialX.allowance(user1.address, user2.address)).to.equal(0)
    await expect(socialX.connect(user2).create(config.app_id, config.signDataAgent, create.node_index, create.title, create.content)).to.be.revertedWith('insufficient allowance')

    await socialX.connect(user1).approve(user2.address, 10) // 授权
    expect(await socialX.allowance(user1.address, user2.address)).to.equal(10)
    await socialX.connect(user2).create(config.app_id, config.signDataAgent, create.node_index, create.title, create.content)

    expect(await socialX.allowance(user1.address, user2.address)).to.equal(9)

    await socialX.connect(user1).approve(user2.address, 3)
    expect(await socialX.allowance(user1.address, user2.address)).to.equal(3)
  })

  describe('Topic', async function () {
    it('create', async function () {
      const { socialX, user1, user2 } = await loadFixture(deployOneYearLockFixture)

      // 自己发布
      const tx = await socialX.create(config.app_id, config.signData, create.node_index, create.title, create.content)
      const result = await tx.wait()
      const TXInfo = await socialX.apps(APP_ID)
      expect(TXInfo.topics).to.equal(1)

      // 授权发布:signDataAgent
      await socialX.connect(user1).approve(user2.address, 10) // 授权
      const tx2 = await socialX.connect(user2).create(config.app_id, config.signDataAgent, create.node_index, create.title, create.content)
      const result2 = await tx2.wait()
      expect(await socialX.allowance(user1.address, user2.address)).to.equal(9)
      const TXInfo2 = await socialX.apps(APP_ID)
      expect(TXInfo2.topics).to.equal(2)

      // 签名发布:signDataSingle
      const tx3 = await socialX.create(config.app_id, config.signDataSingle, create.node_index, create.title, create.content)
      const result3 = await tx3.wait()
      const TXInfo3 = await socialX.apps(APP_ID)
      expect(TXInfo3.topics).to.equal(3)
    })
    it('append', async function () {
      const { socialX, user1, user2 } = await loadFixture(deployOneYearLockFixture)
      // 自己发布
      const tx = await socialX.append(config.app_id, config.signData, append.topic_network_id, append.topic_hash, append.content)
      const result = await tx.wait()
      // console.log('result', result.transactionHash)
      const TXInfo1 = await socialX.apps(APP_ID)
      expect(TXInfo1.appends).to.equal(1)
      const tx2 = await socialX.append(config.app_id, config.signData, append.topic_network_id, append.topic_hash, append.content)
      const TXInfo2 = await socialX.apps(APP_ID)
      expect(TXInfo2.appends).to.equal(2)

      // 授权发布:signDataAgent
      await socialX.connect(user1).approve(user2.address, 10) // 授权
      const tx3 = await socialX.connect(user2).append(config.app_id, config.signDataAgent, append.topic_network_id, append.topic_hash, append.content)
      const result2 = await tx3.wait()
      expect(await socialX.allowance(user1.address, user2.address)).to.equal(9)
      const TXInfo3 = await socialX.apps(APP_ID)
      expect(TXInfo3.appends).to.equal(3)

      // 签名发布:signDataSingle
      const tx4 = await socialX.append(config.app_id, config.signDataSingle, append.topic_network_id, append.topic_hash, append.content)
      const result4 = await tx4.wait()
      const TXInfo4 = await socialX.apps(APP_ID)
      expect(TXInfo4.appends).to.equal(4)
    })

    it('reply', async function () {
      const { socialX, user1, user2 } = await loadFixture(deployOneYearLockFixture)
      // 自己发布
      // console.log('socialX', socialX.functions)
      const tx1 = await socialX['reply(uint256,bytes,uint256,string,string)'](config.app_id, config.signData, repay.topic_network_id, repay.topic_hash, repay.content)
      const result1 = await tx1.wait()

      const tx2 = await socialX['reply(uint256,bytes,uint256,string,string,uint256,string)'](config.app_id, config.signData, repay.topic_network_id, repay.topic_hash, repay.content, repay.reply_network_id, repay.reply_hash)
      const result2 = await tx2.wait()
      // console.log('result', result.transactionHash)

      // 授权发布:signDataAgent
      await socialX.connect(user1).approve(user2.address, 10) // 授权
      const tx3 = await socialX.connect(user2)['reply(uint256,bytes,uint256,string,string)'](config.app_id, config.signDataAgent, repay.topic_network_id, repay.topic_hash, repay.content)
      const result3 = await tx3.wait()
      expect(await socialX.allowance(user1.address, user2.address)).to.equal(9)
      const TXInfo3 = await socialX.apps(APP_ID)
      expect(TXInfo3.repays).to.equal(3)

      // 签名发布:signDataSingle
      const tx4 = await socialX['reply(uint256,bytes,uint256,string,string)'](config.app_id, config.signDataSingle, repay.topic_network_id, repay.topic_hash, repay.content)
      const result4 = await tx4.wait()
      const TXInfo4 = await socialX.apps(APP_ID)
      expect(TXInfo4.repays).to.equal(4)
    })

    it('tags', async function () {
      const { socialX, user1, user2 } = await loadFixture(deployOneYearLockFixture)

      let arr: any[] = []
      Object.keys(tags).map((item) => {
        // arr.push(web3.utils.asciiToHex(`${item} ${opt[item]}`))
        const info = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(`${item} ${tags[item]}`))
        // console.log(`${item} ${opt[item]}`, info)
        arr.push(info)
      })
      // 自己发布
      const tx = await socialX.tags(config.app_id, config.signData, arr)
      const result = await tx.wait()
      // console.log('result', result.transactionHash)

      // 授权发布:signDataAgent
      await socialX.connect(user1).approve(user2.address, 10) // 授权
      const tx2 = await socialX.connect(user2).tags(config.app_id, config.signDataAgent, arr)
      const result2 = await tx2.wait()
      expect(await socialX.allowance(user1.address, user2.address)).to.equal(9)

      // 签名发布:signDataSingle
      const tx3 = await socialX.tags(config.app_id, config.signDataSingle, arr)
      const result3 = await tx3.wait()
    })

    it('follow', async function () {
      const { socialX, user1, user2, user3 } = await loadFixture(deployOneYearLockFixture)

      let target_address = user3.address,
        follow_status = true,
        remark = '好友名字'

      // 自己发布
      const tx = await socialX.follow(config.app_id, config.signData, target_address, follow_status, remark)
      const result = await tx.wait()
      // console.log('result', result.transactionHash)

      // 授权发布:signDataAgent
      await socialX.connect(user1).approve(user2.address, 10) // 授权
      const tx2 = await socialX.connect(user2).follow(config.app_id, config.signDataAgent, target_address, follow_status, remark)
      const result2 = await tx2.wait()
      expect(await socialX.allowance(user1.address, user2.address)).to.equal(9)

      // 签名发布:signDataSingle
      const tx3 = await socialX.follow(config.app_id, config.signDataSingle, target_address, follow_status, remark)
      const result3 = await tx3.wait()
    })
  })
})
