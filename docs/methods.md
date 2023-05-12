# SocialX Contract 说明文档

## 更新日志

- 2023 年 5 月 11 日: 增加授权发布方式
- 2023 年 5 月 12 日: 参数 `sign_data` 修改为 `data`。原 `tage()` 方法内 `data 修改为 user_data`

## 方法

- 核心
- 只读信息
- 事件
- 管理功能

## ✅ 核心

data 说明:

- **上链方式 1**: 作者付手续费:传 `0x`
- **上链方式 2**: 作者授权发布: 作者需要先做 `approve`，然后发布者上传时，使用 `abi.encode(['uint256', 'address'], ['0', author.address])`。授权额度不足时会报错 `insufficient allowance`
- **上链方式 3**: 作者签名发布: 作者每次都需要签名，使用 `abi.encode(['uint256', 'address', 'string', 'string'],[SignTypeId,SignAddress,SignMessage,SignResult])`。
  - 签名方式: https://github.com/Social-xxx/sign-type-list

### create: 创建主题

- `uint256`app_id: 应用 ID
- `bytes` data: 代发的相关信息，自己支付上链手续费传"0x"
- `uint256` node_id:节点 ID
- `string` title: 主题标题
- `string` content: 主题内容

### append: 追加主题

- `uint256`app_id: 应用 ID
- `bytes` data: 代发的相关信息，自己支付上链手续费传"0x"
- `uint256` target_location_id:主题的网络位置
- `string` topic_hash:主题哈希
- `string` content: 追加内容

### reply: 回复主题

- `uint256`app_id: 应用 ID
- `bytes` data: 代发的相关信息，自己支付上链手续费传"0x"
- `uint256` target_location_id:主题的网络位置
- `string` topic_hash:主题哈希
- `string` content: 回复内容
- `string` reply_location:某条回复的网络位置(如果不针对"回复"进行回复，无该参数)
- `string` reply_hash: 某条回复的网络哈希(如果不针对"回复"进行回复，无该参数)

### tags: 填写地址属性

- `uint256`app_id: 应用 ID
- `bytes` data: 代发的相关信息，自己支付上链手续费传"0x"
- `bytes[]` user_data: 属性的 `key+value`

### follow: 关注

- `uint256` app_id: 应用 ID
- `bytes` data: 代发的相关信息，自己支付上链手续费传"0x"
- `address` target_address: 目标地址
- `bool` follow_status: follow 状态
- `string` remark: 备注信息

### approve: 授权

- `_agent`: 代理人
- `_value`: 额度

## ✅ 只读信息

- LOCATION_ID : 网络位置。不同的区块链网络的该值是不同的，可以通过该值判断网络位置。
  - 如下是一个简单的演示
  - `1`: Fibo
  - `2`: Bitcoin
  - `3`: Ethereum
  - `101`: BSC
  - `102`: Polygon
  - `103`: Optimism
  - `104`: Arbitrum
- apps(appId): 指定应用 ID 的统计信息
  - `uint256` topics; 主题数量
  - `uint256` appends; 追加数量
  - `uint256` repays; 回复数量
- signatureTypes(signTypeId): 代发交易的指定加密类型
  - `uint256` id; 唯一 ID
  - `string` name; 名称
  - `string` description; 描述
  - `uint256` creation_time; 创建时间
- allSignatureTypes: 获取所有代发交易的加密类型
  - 返回内容是数组，元素内参考 `signatureTypes`
- allowance(`_owner`, `_agent`): 查看代理人拥有作者的授权额度

## ✅ 事件

- `event Create(uint256 indexed app_id, uint256 topic_id);`: 创建的时候抛出
- `event Append(uint256 indexed app_id, uint256 append_id);`: 追加的时候抛出
- `event Reply(uint256 indexed app_id, uint256 repay_id);`: 回复的时候抛出
- `event Tags(uint256 indexed app_id);`: 创建/更新个人地址相关属性的时候抛出
- `event Follow(uint256 indexed app_id);`: 关注的时候抛出
- `event SignType(uint256 indexed _stid, string name, string description);`: 增加/修改，加密类型的时候抛出
- `event Approval(address indexed _owner, address indexed _agent, uint256 _value);`: 授权事件

## 🔒 管理功能

🔒 该功能仅合约管理员地址可以使用

- addSignatureType: 添加签名类型
  - `string` name, 名称
  - `string` description 描述
- modiSignatureType: 修改签名类型
  - `uint256` stid, 类型
  - `string` description 描述
