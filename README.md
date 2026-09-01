# Aetheria: Digital Card Exchange

<div align="center">
  <img src="https://img.shields.io/badge/Blockchain-GameCardMarketplace-2563EB" alt="Blockchain" />
  <img src="https://img.shields.io/badge/Next.js-14-0F172A" alt="Next.js" />
  <img src="https://img.shields.io/badge/Solidity-0.8.20-3B82F6" alt="Solidity" />
  <img src="https://img.shields.io/badge/Hardhat-2.x-0F172A" alt="Hardhat" />
</div>

Aetheria is a premium, white-theme Web3 card marketplace designed for digital collectible trading, gaming utility, and NFT ownership. The product combines a polished enterprise-grade UI with Solidity-based NFT marketplace logic for minting, listing, and purchasing digital cards on the Sepolia testnet.

## Project Overview

| Category | Details |
| --- | --- |
| Product Name | Aetheria: Digital Card Exchange |
| Network | Sepolia Testnet |
| Token Standard | ERC-721 via OpenZeppelin URIStorage |
| Frontend | Next.js App Router + Tailwind CSS |
| Smart Contracts | Hardhat + Solidity 0.8.20 |
| Storage | IPFS via Pinata |
| Primary UX Style | Light SaaS / Corporate Fintech |

## Key Features

- Mint collectible game cards with metadata stored on IPFS
- List owned cards for sale with ETH pricing
- Purchase cards instantly from the marketplace using ETH
- Search and filter cards by name and rarity
- Browse a premium white-and-blue marketplace dashboard
- View the user collection and list cards from a dedicated studio flow
- Built with a trust-first, enterprise UX standard for Web3 onboarding

## Full Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Smart Contracts | Solidity 0.8.20, Hardhat |
| NFT Standard | OpenZeppelin ERC-721 URIStorage |
| Wallet Integration | Ethers.js v6 / Wagmi |
| Icons | Lucide React |
| Hosting | Vercel (recommended) |
| Storage | Pinata IPFS |
| Contract Verification | Etherscan |

## Setup & Installation Guide

### 1. Clone repository

```bash
git clone https://github.com/your-org/aetheria-digital-card-exchange.git
cd aetheria-digital-card-exchange
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Update the following keys:

- `SEPOLIA_RPC_URL`
- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`
- `NEXT_PUBLIC_PINATA_JWT`

### 4. Compile smart contracts

```bash
npx hardhat compile
```

### 5. Run test suite

```bash
npx hardhat test
```

### 6. Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 7. Launch the Next.js app

```bash
npm run dev
```

Open `http://localhost:3000` in the browser.

## Testnet Details & Contract Address

| Network | Status | Explorer |
| --- | --- | --- |
| Sepolia | Testnet | https://sepolia.etherscan.io |

Current deployed contract address placeholder:

```text
0x0000000000000000000000000000000000000000
```

Explorer link:

https://sepolia.etherscan.io/address/0x0000000000000000000000000000000000000000

## IPFS Architecture & Pinning Workflow

Aetheria stores all collectible metadata and card artwork references on IPFS and uses Pinata as the pinning service for long-term availability.

1. Prepare metadata JSON with fields:
   - `name`
   - `description`
   - `image`
   - `rarity`
   - `attack`
   - `defense`
2. Send JSON payload to Pinata using the JWT-backed API helper.
3. Receive a pinned CID.
4. Save that CID as the `tokenURI` on the NFT contract.
5. Mirror the card metadata in the marketplace UI for viewing and collection display.

This ensures metadata remains permanent, indexable, and verifiable on-chain.

## Screenshots Guide

The UI is designed to match a premium white-labeled NFT marketplace experience with blue accenting and strong card hierarchy.

### Navbar

- Clean white top bar
- Left-aligned brand + tabs
- Right-aligned network indicator + wallet button

### Marketplace Grid

- Filterable rarity dropdown
- Search field for card names
- Card cards showing stats, image, and ETH price
- Primary CTA: Buy Card

### Minting UI

- Form panel with fields for card name, rarity, attack, defense, and image URL
- Live metadata preview on the right
- Clean enterprise card designer pattern

### Hardhat Test Output

- Contract deployment checks
- Minting and pricing validation
- Ownership transfer tests
- Error reverts for invalid sales scenarios

## Live Demo

A Vercel deployment placeholder will be added after launch.

```text
https://aetheria-digital-card-exchange.vercel.app
```

## License

This project is intended for recruitment showcase purposes and can be adapted for production deployment with additional auditing and security review.
