# ChainGuard — Decentralized API Key Manager

A secure, decentralized API key management dApp built on Ethereum (Sepolia Testnet). Generate cryptographic keys locally in your browser, register their hashes on-chain, and verify ownership through blockchain-gated API routes.

## Tech Stack

| Layer               | Technology                |
| ------------------- | ------------------------- |
| Framework           | Next.js 16 (App Router)   |
| Language            | TypeScript                |
| Styling             | Tailwind CSS v4           |
| Wallet              | RainbowKit v2 + Wagmi v2  |
| Blockchain          | Solidity 0.8.20 (Sepolia) |
| Backend Chain Lib   | Ethers.js v6              |
| Frontend Chain Lib  | Viem v2                   |
| Contract Deployment | Remix IDE                 |

## Architecture

```
Browser (Web Crypto API)         Backend (Next.js API Routes)         Blockchain (Sepolia)
┌─────────────────────┐         ┌──────────────────────────┐         ┌─────────────────────┐
│ Generate 256-bit key│         │ /api/register            │         │ APIKeyRegistry.sol  │
│ SHA-256 hash locally│ ──────► │ Relayer pays gas         │ ──────► │ registerKeyHash()   │
│ Show key ONCE       │         │ /api/protected           │         │ verifyOwner()       │
│                     │         │ Hash + verify on-chain   │ ◄────── │ revokeKey()         │
└─────────────────────┘         └──────────────────────────┘         └─────────────────────┘
```

## Smart Contract

**Address:** [`0x950AACf33014e9924191f0deD6CEdbb515D347B2`](https://sepolia.etherscan.io/address/0x950AACf33014e9924191f0deD6CEdbb515D347B2)

| Function                            | Type  | Description               |
| ----------------------------------- | ----- | ------------------------- |
| `registerKeyHash(bytes32, address)` | Write | Register a hashed API key |
| `revokeKey(bytes32, address)`       | Write | Permanently revoke a key  |
| `verifyOwner(bytes32, address)`     | Read  | Check ownership (gasless) |

## Getting Started

### Prerequisites
- Node.js 18+
- MetaMask with Sepolia ETH
- Infura/Alchemy RPC URL

### Setup

```bash
git clone <your-repo-url>
cd api-key-manager
npm install
```

Create `.env.local`:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=YOUR_RELAYER_WALLET_PRIVATE_KEY
NEXT_PUBLIC_CONTRACT_ADDRESS=0x950AACf33014e9924191f0deD6CEdbb515D347B2
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
```

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Register a Key Hash

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"keyHash": "0xYOUR_HASH", "owner": "0xYOUR_WALLET"}'
```

### Verify a Key (Protected Route)

```bash
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_RAW_API_KEY" \
  -H "X-Wallet-Address: 0xYOUR_WALLET"
```

### Check Ownership

```bash
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"keyHash": "0xYOUR_HASH", "owner": "0xYOUR_WALLET"}'
```

### Revoke a Key

```bash
curl -X POST http://localhost:3000/api/revoke \
  -H "Content-Type: application/json" \
  -d '{"keyHash": "0xYOUR_HASH", "owner": "0xYOUR_WALLET"}'
```

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add the 4 environment variables from `.env.local`
4. Deploy — Vercel auto-detects Next.js

## Security Notes

- Raw API keys are generated client-side and **never sent to the server**
- Only SHA-256 hashes are stored on-chain
- The relayer wallet (`PRIVATE_KEY`) pays gas for registration/revocation
- Verification is gasless (read-only contract call)
- Keys are permanently tied to the registering wallet address

## License

MIT
