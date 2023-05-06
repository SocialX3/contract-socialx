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
    event Create(uint256 indexed app_id, uint256 topic_id);
    event Append(uint256 indexed app_id, uint256 append_id);
    event Reply(uint256 indexed app_id, uint256 repay_id);
    event Tags(uint256 indexed app_id);
    event Follow(uint256 indexed app_id);
    constructor(uint256 location_id) {
        LOCATION_ID = location_id;
    }
    // @param sign_data Consists of {SignTypeId}{SignAddress}{SignMessage}{SignResult} padded.  abi.encode(['uint256', 'address', 'string', 'string'],[SignTypeId,SignAddress,SignMessage,SignResult])
    function create(uint256 app_id, bytes calldata sign_data, uint256 node_id, string calldata title, string calldata content) external {
        emit Create(app_id, ++apps[app_id].topics);
    }
    function append(uint256 app_id, bytes calldata sign_data, uint256 target_location_id, string calldata topic_hash, string calldata content) external {
        emit Append(app_id, ++apps[app_id].appends);
    }
    function reply(uint256 app_id, bytes calldata sign_data, uint256 target_location_id, string calldata topic_hash, string calldata content) external {
        emit Reply(app_id, ++apps[app_id].repays);
    }
    function reply(uint256 app_id, bytes calldata sign_data, uint256 target_location_id, string calldata topic_hash, string calldata content, uint256 target_reply_location_id, string calldata reply_hash) external {
        emit Reply(app_id, ++apps[app_id].repays);
    }
    function tags(uint256 app_id, bytes calldata sign_data, bytes[] calldata data) external {
        emit Tags(app_id);
    }
    function follow(uint256 app_id, bytes calldata sign_data, address target_address, bool follow_status, string calldata remark) external {
        emit Follow(app_id);
    }
}