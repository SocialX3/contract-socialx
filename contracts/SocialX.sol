// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract SocialX {
    struct App {
        uint256 topics;
        uint256 appends;
        uint256 repays;
    }
    uint256 public immutable LOCATION_ID;
    mapping(uint256 => App) public apps;
    mapping(address => mapping(address => uint256)) private _allowances;
    event Create(uint256 indexed app_id, uint256 topic_id);
    event Append(uint256 indexed app_id, uint256 append_id);
    event Reply(uint256 indexed app_id, uint256 repay_id);
    event Tags(uint256 indexed app_id);
    event Follow(uint256 indexed app_id);
    event Approval(address indexed _owner, address indexed _agent, uint256 _value);
    constructor(uint256 location_id) {
        LOCATION_ID = location_id;
    }
    modifier predict(bytes calldata data) {
        if (data.length != 0) {
            (uint256 dataType, address author) = abi.decode(data, (uint256, address));
            if (dataType == 0) {
                require(_allowances[author][msg.sender] > 1, 'insufficient allowance');
                --_allowances[author][msg.sender];
            }
        }
        _;
    }
    // @param data Consists of {SignTypeId}{SignAddress}{SignMessage}{SignResult} padded.  abi.encode(['uint256', 'address', 'string', 'string'],[SignTypeId,SignAddress,SignMessage,SignResult])
    function create(uint256 app_id, bytes calldata data, uint256 node_id, string calldata title, string calldata content) external predict(data) {
        emit Create(app_id, ++apps[app_id].topics);
    }

    function append(uint256 app_id, bytes calldata data, uint256 target_location_id, string calldata topic_hash, string calldata content) external predict(data) {
        emit Append(app_id, ++apps[app_id].appends);
    }
    function reply(uint256 app_id, bytes calldata data, uint256 target_location_id, string calldata topic_hash, string calldata content) external predict(data) {
        emit Reply(app_id, ++apps[app_id].repays);
    }
    function reply(uint256 app_id, bytes calldata data, uint256 target_location_id, string calldata topic_hash, string calldata content, uint256 target_reply_location_id, string calldata reply_hash) external predict(data) {
        emit Reply(app_id, ++apps[app_id].repays);
    }
    function tags(uint256 app_id, bytes calldata data, bytes[] calldata user_data) external predict(data) {
        emit Tags(app_id);
    }
    function follow(uint256 app_id, bytes calldata data, address target_address, bool follow_status, string calldata remark) external predict(data) {
        emit Follow(app_id);
    }
    function approve(address _agent, uint256 _value) public returns (bool success) {
        _allowances[msg.sender][_agent] = _value;
        emit Approval(msg.sender, _agent, _value);
        return true;
    }
    function allowance(address _owner, address _agent) public view returns (uint256 remaining) {
        return _allowances[_owner][_agent];
    }
}