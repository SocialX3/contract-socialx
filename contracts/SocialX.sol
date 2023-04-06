// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SocialX {
    struct Channel {
        uint256 topics;
        uint256 appends;
        uint256 repays;
    }
    uint256 public immutable LOCATION_ID;
    mapping(uint256 => Channel) public channels;
    event Create(uint256 indexed channel_id, uint256 topic_id);
    event Append(uint256 indexed channel_id, uint256 append_id);
    event Reply(uint256 indexed channel_id, uint256 repay_id);
    event Attributes(uint256 indexed channel_id);
    event Follow(uint256 indexed channel_id);

    constructor(uint256 location_id) {
        LOCATION_ID = location_id;
    }

    // @param sign_data Consists of {SignTypeId}{SignAddress}{SignMessage}{SignResult} padded.  abi.encode(['uint256', 'address', 'string', 'string'],[SignTypeId,SignAddress,SignMessage,SignResult])
    function create(uint256 channel_id, bytes calldata sign_data, uint256 node_id, string calldata title, string calldata content) external {
        channels[channel_id].topics += 1;
        emit Create(channel_id, channels[channel_id].topics);
    }

    function append(uint256 channel_id, bytes calldata sign_data, uint256 target_location_id, string calldata topic_hash, string calldata content) external {
        channels[channel_id].appends += 1;
        emit Append(channel_id, channels[channel_id].appends);
    }

    function reply(uint256 channel_id, bytes calldata sign_data, uint256 target_location_id, string calldata topic_hash, string calldata content) external {
        channels[channel_id].repays += 1;
        emit Reply(channel_id, channels[channel_id].repays);
    }

    function reply(uint256 channel_id, bytes calldata sign_data, uint256 target_location_id, string calldata topic_hash, string calldata content, uint256 target_reply_location_id, string calldata reply_hash) external {
        channels[channel_id].repays += 1;
        emit Reply(channel_id, channels[channel_id].repays);
    }

    function attributes(uint256 channel_id, bytes calldata sign_data, bytes[] calldata data) external {
        emit Attributes(channel_id);
    }

    function follow(uint256 channel_id, bytes calldata sign_data, address target_address, bool follow_status, string calldata remark) external {
        emit Follow(channel_id);
    }
}