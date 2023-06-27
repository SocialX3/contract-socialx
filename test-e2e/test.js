const Web3 = require('web3')
const RPC_URL_OK = 'https://exchaintestrpc.okex.org'
let web3 = new Web3(RPC_URL_OK)
;(async function () {
  const networkId = 1
  const address = '0xBB83214561E9690ff36639299494726944AA30Fc'
  const signaturMessage = '0xBB83214561E9690ff36639299494726944AA30Fc'
  const signaturResult = '0xBB83214561E9690ff36639299494726944AA30Fc'
  const signData = web3.eth.abi.encodeParameters(['uint256', 'address', 'string', 'string'], [networkId, address, signaturMessage, signaturResult])
  console.log('signData', signData)

  const result = web3.eth.abi.decodeParameters(['uint256', 'address', 'string', 'string'], signData)
  console.log('result', result)
})()
