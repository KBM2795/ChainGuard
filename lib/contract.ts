export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export const API_KEY_REGISTRY_ABI = [
    "function registerKeyHash(bytes32 keyHash, address owner) external",
    "function revokeKey(bytes32 keyHash, address owner) external",
    "function verifyOwner(bytes32 keyHash, address owner) external view returns (bool)",
    "event KeyRegistered(bytes32 indexed keyHash, address indexed owner, uint256 timestamp)",
    "event KeyRevoked(bytes32 indexed keyHash, address indexed owner)"
];
