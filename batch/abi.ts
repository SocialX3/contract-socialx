let fs = require('fs')
let path = require('path')

//  获取ABI源文件
const contractName = 'SocialX'
const file = require(`../artifacts/contracts/${contractName}.sol/${contractName}.json`)

const filePath = path.resolve(__dirname, `../abi`)
const utility = {
  start() {
    utility.init()
    utility.writer()
  },
  // 路径如果没有就创建
  init() {
    if (!fs.existsSync(filePath)) {
      console.log('ABI路径不存在:创建ABI储存目录...')
      fs.mkdirSync(filePath)
    }
  },
  // 写入指定目录
  writer() {
    console.log('ABI文件:准备中...')
    fs.writeFileSync(path.resolve(filePath, `${contractName}.json`), JSON.stringify(file.abi, null, 2))
    console.log('ABI文件:已经成功写入')
  },
}
utility.start()
