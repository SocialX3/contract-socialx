export const create = {
  node_index: '10000001999900000000',
  title: '这是一个标题信息',
  content: `### 以太坊（Ethereum ）:下一代智能合约和去中心化应用平台
  ### 历史
   
  去中心化的数字货币概念，正如财产登记这样的替代应用一样，早在几十年以前就被提出来了。1980和1990年代的匿名电子现金协议，大部分是以乔姆盲签技术（Chaumian blinding）为基础的。这些电子现金协议提供具有高度隐私性的货币，但是这些协议都没有流行起来，因为它们都依赖于一个中心化的中介机构。1998年，戴伟（Wei Dai）的b-money首次引入了通过解决计算难题和去中心化共识创造货币的思想，但是该建议并未给出如何实现去中心化共识的具体方法。2005年，芬尼（Hal Finney）引入了“可重复使用的工作量证明机制”（reusable proofs of work）概念，它同时使用b-money的思想和Adam Back提出的计算困难的哈希现金（Hashcash）难题来创造密码学货币。但是，这种概念再次迷失于理想化，因为它依赖于可信任的计算作为后端。
  
  因为货币是一个先申请应用，交易的顺序至关重要，所以去中心化的货币需要找到实现去中心化共识的方法。比特币以前的所有电子货币协议所遇到的主要障碍是，尽管对如何创建安全的拜占庭问题容错（Byzantine-fault-tolerant）多方共识系统的研究已经历时多年，但是上述协议只解决了问题的一半。这些协议假设系统的所有参与者是已知的，并产生如“如果有N方参与到系统中，那么系统可以容忍N/4的恶意参与者”这样形式的安全边界。然而这个假设的问题在于，在匿名的情况下，系统设置的安全边界容易遭受女巫攻击，因为一个攻击者可以在一台服务器或者僵尸网络上创建数以千计的节点，从而单方面确保拥有多数份额。
  
  中本聪的创新是引入这样一个理念：将一个非常简单的基于节点的去中心化共识协议与工作量证明机制结合在一起。节点通过工作量证明机制获得参与到系统的权利，每十分钟将交易打包到“区块”中，从而创建出不断增长的区块链。拥有大量算力的节点有更大的影响力，但获得比整个网络更多的算力比创建一百万个节点困难得多。尽管比特币区块链模型非常简陋，但是实践证明它已经足够好用了，在未来五年，它将成为全世界两百个以上的货币和协议的基石。
  
  ### 作为状态转换系统的比特币
  
  ![](https://raw.githubusercontent.com/ethereumbuilders/GitBook/master/en/vitalik-diagrams/statetransition.png)
  
  从技术角度讲，比特币账本可以被认为是一个状态转换系统，该系统包括所有现存的比特币所有权状态和“状态转换函数”。状态转换函数以当前状态和交易为输入，输出新的状态。例如，在标准的银行系统中，状态就是一个资产负债表，一个从A账户向B账户转账X美元的请求是一笔交易，状态转换函数将从A账户中减去X美元，向B账户增加X美元。如果A账户的余额小于X美元，状态转换函数就会返回错误提示。所以我们可以如下定义状态转换函数：
  
      APPLY(S,TX) ­> S' or ERROR
  
  在上面提到的银行系统中，状态转换函数如下：
  
      APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30,Bob: $70 }
   
  但是：
   
      APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
   
  比特币系统的“状态”是所有已经被挖出的、没有花费的比特币（技术上称为“未花费的交易输出，unspent transaction outputs 或UTXO”）的集合。每个UTXO都有一个面值和所有者（由20个字节的本质上是密码学公钥的地址所定义[1]）。一笔交易包括一个或多个输入和一个或多个输出。每个输入包含一个对现有UTXO的引用和由与所有者地址相对应的私钥创建的密码学签名。每个输出包含一个新的加入到状态中的UTXO。
   
  在比特币系统中，状态转换函数'APPLY(S,TX)->S’'大体上可以如下定义：
  
  1. 交易的每个输入：
      * 如果引用的UTXO不存在于现在的状态中（'S'），返回错误提示
      * 如果签名与UTXO所有者的签名不一致，返回错误提示
  2.  如果所有的UTXO输入面值总额小于所有的UTXO输出面值总额，返回错误提示
  3.  返回新状态'S’',新状态'S’'中移除了所有的输入UTXO，增加了所有的输出UTXO。
  
  第一步的第一部分防止交易的发送者花费不存在的比特币，第二部分防止交易的发送者花费其他人的比特币。第二步确保价值守恒。比特币的支付协议如下。假设Alice想给Bob发送11.7BTC。事实上，Alice不可能正好有11.7BTC。假设，她能得到的最小数额比特币的方式是：6+4+2=12。所以，她可以创建一笔有3个输入，2个输出的交易。第一个输出的面值是11.7BTC，所有者是Bob（Bob的比特币地址），第二个输出的面值是0.3BTC，所有者是Alice自己，也就是找零。
  
  ### 挖矿
  
  ![](https://raw.githubusercontent.com/ethereumbuilders/GitBook/master/en/vitalik-diagrams/block.png)
  
  如果我们拥有可信任的中心化服务机构，状态转换系统可以很容易地实现，可以简单地将上述功能准确编码。然而，我们想把比特币系统建成为去中心化的货币系统，为了确保每个人都同意交易的顺序，我们需要将状态转换系统与一个共识系统结合起来。比特币的去中心化共识进程要求网络中的节点不断尝试将交易打包成“区块”。网络被设计为大约每十分钟产生一个区块，每个区块包含一个时间戳、一个随机数、一个对上一个区块的引用（即哈希）和上一区块生成以来发生的所有交易列表。这样随着时间流逝就创建出了一个持续增长的区块链，它不断地更新，从而能够代表比特币账本的最新状态。
  
  依照这个范式，检查一个区块是否有效的算法如下：
  
  1.	检查区块引用的上一个区块是否存在且有效。
  2.	检查区块的时间戳是否晚于以前的区块的时间戳，而且早于未来2小时[2]。
  3.	检查区块的工作量证明是否有效。
  4.	将上一个区块的最终状态赋于'S[0]'。
  5.	假设TX是区块的交易列表，包含n笔交易。对于属于0……n-1的所有i,进行状态转换'S[i+1] = APPLY(S[i],TX[i])'。如果任何一笔交易i在状态转换中出错，退出程序，返回错误。
  6.	返回正确，状态'S[n]'是这一区块的最终状态。
  
  一旦步骤（1）发生，几分钟后矿工将把这笔交易打包到区块，假设是第270000个区块。大约一个小时以后，在此区块后面将会有五个区块，每个区块间接地指向这笔交易，从而确认这笔交易。这时卖家收到货款，并向买家发货。因为我们假设这是数字商品，攻击者可以即时收到货。现在，攻击者创建另一笔交易，将相同的100BTC发送到自己的账户。如果攻击者只是向全网广播这一消息，这一笔交易不会被处理。矿工会运行状态转换函数'APPLY(S,TX)'，发现这笔交易将花费已经不在状态中的UTXO。所以，攻击者会对区块链进行分叉，将第269999个区块作为父区块重新生成第270000个区块，在此区块中用新的交易取代旧的交易。因为区块数据是不同的，这要求重新进行工作量证明。另外，因为攻击者生成的新的第270000个区块有不同的哈希，所以原来的第270001到第270005的区块不指向它，因此原有的区块链和攻击者的新区块是完全分离的。在发生区块链分叉时，区块链长的分支被认为是诚实的区块链，合法的的矿工将会沿着原有的第270005区块后挖矿，只有攻击者一人在新的第270000区块后挖矿。攻击者为了使得他的区块链最长，他需要拥有比除了他以外的全网更多的算力来追赶（即51%攻击）。
   
  ### 脚本
   
  即使不对比特币协议进行扩展，它也能在一定程度上实现”智能合约”。比特币的UTXO可以不只被一个公钥拥有，也可以被用基于堆栈的编程语言所编写的更加复杂的脚本所拥有。在这一模式下，花费这样的UTXO，必须提供满足脚本的数据。事实上，基本的公钥所有权机制也是通过脚本实现的：脚本将椭圆曲线签名作为输入，验证交易和拥有这一UTXO的地址，如果验证成功，返回1，否则返回0。更加复杂的脚本用于其它不同的应用情况。例如，人们可以创建要求集齐三把私钥中的两把才能进行交易确认的脚本（多重签名），对公司账户、储蓄账户和某些商业代理来说，这种脚本是非常有用的。脚本也能用来对解决计算问题的用户发送奖励。人们甚至可以创建这样的脚本“如果你能够提供你已经发送一定数额的的狗币给我的简化确认支付证明，这一比特币UTXO就是你的了”，本质上，比特币系统允许不同的密码学货币进行去中心化的兑换。
  
  然而，比特币系统的脚本语言存在一些严重的限制：
  
  * **缺少图灵完备性** – 这就是说，尽管比特币脚本语言可以支持多种计算，但是它不能支持所有的计算。最主要的缺失是循环语句。不支持循环语句的目的是避免交易确认时出现无限循环。理论上，对于脚本程序员来说，这是可以克服的障碍，因为任何循环都可以用多次重复if 语句的方式来模拟，但是这样做会导致脚本空间利用上的低效率，例如，实施一个替代的椭圆曲线签名算法可能将需要256次重复的乘法，而每次都需要单独编码。
  * **价值盲（Value-blindness）**。UTXO脚本不能为账户的取款额度提供精细的的控制。例如，预言机合约（oracle contract）的一个强大应用是对冲合约，A和B各自向对冲合约中发送价值1000美元的比特币，30天以后，脚本向A发送价值1000美元的比特币，向B发送剩余的比特币。虽然实现对冲合约需要一个预言机（oracle）决定一比特币值多少美元，但是与现在完全中心化的解决方案相比，这一机制已经在减少信任和基础设施方面有了巨大的进步。然而，因为UTXO是不可分割的，为实现此合约，唯一的方法是非常低效地采用许多有不同面值的UTXO（例如对应于最大为30的每个k，有一个2^k的UTXO)并使预言机挑出正确的UTXO发送给A和B。
  * **缺少状态** – UTXO只能是已花费或者未花费状态，这就没有给需要任何其它内部状态的多阶段合约或者脚本留出生存空间。这使得实现多阶段期权合约、去中心化的交换要约或者两阶段加密承诺协议（对确保计算奖励非常必要）非常困难。这也意味着UTXO只能用于建立简单的、一次性的合约，而不是例如去中心化组织这样的有着更加复杂的状态的合约，使得元协议难以实现。二元状态与价值盲结合在一起意味着另一个重要的应用-取款限额-是不可能实现的。
  * **区块链盲（Blockchain-blindness）**- UTXO看不到区块链的数据，例如随机数和上一个区块的哈希。这一缺陷剥夺了脚本语言所拥有的基于随机性的潜在价值，严重地限制了博彩等其它领域应用。
  
  我们已经考察了在密码学货币上建立高级应用的三种方法：建立一个新的区块链，在比特币区块链上使用脚本，在比特币区块链上建立元币协议。建立新区块链的方法可以自由地实现任意的特性，成本是开发时间和培育努力。使用脚本的方法非常容易实现和标准化，但是它的能力有限。元币协议尽管非常容易实现，但是存在扩展性差的缺陷。在以太坊系统中，我们的目的是建立一个能够同时具有这三种模式的所有优势的通用框架。`,
}