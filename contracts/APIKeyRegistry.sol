// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract APIKeyRegistry {
    struct KeyData {
        address owner;
        bool revoked;
        uint256 timestamp;
    }

    mapping(bytes32 => KeyData) private keys;

    event KeyRegistered(bytes32 indexed keyHash, address indexed owner, uint256 timestamp);
    event KeyRevoked(bytes32 indexed keyHash, address indexed owner);

    // Allowing the relayer (API) to specify the owner of the key
    function registerKeyHash(bytes32 keyHash, address owner) external {
        require(keys[keyHash].timestamp == 0, "Key already registered");
        require(owner != address(0), "Invalid owner address");
        
        keys[keyHash] = KeyData({
            owner: owner,
            revoked: false,
            timestamp: block.timestamp
        });
        emit KeyRegistered(keyHash, owner, block.timestamp);
    }

    function revokeKey(bytes32 keyHash, address owner) external {
        require(keys[keyHash].timestamp != 0, "Key not registered");
        require(keys[keyHash].owner == owner, "Not the owner");
        require(!keys[keyHash].revoked, "Key already revoked");

        keys[keyHash].revoked = true;
        emit KeyRevoked(keyHash, owner);
    }

    function verifyOwner(bytes32 keyHash, address owner) external view returns (bool) {
        KeyData memory data = keys[keyHash];
        if (data.timestamp == 0 || data.revoked) {
            return false;
        }
        return data.owner == owner;
    }
}
