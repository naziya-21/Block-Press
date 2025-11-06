# Block Press - Decentralized Secure Communication System

A blockchain-based military-grade secure messaging platform. Built with Solidity smart contracts and Web3.js integration for tamper-proof, decentralized communication.

## Features

- **User Registration**: Create accounts on the blockchain with unique usernames
- **Friend System**: Add friends by address and username - only friends can message each other
- **Decentralized Messaging**: Send encrypted messages between friends, permanently stored on-chain
- **Tamper-Proof Storage**: All messages are immutable and cannot be altered or deleted
- **Cryptographic Security**: Uses MetaMask wallet authentication for secure access
- **Message History**: Complete audit trail of all communications stored on blockchain

## Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Smart Contracts

```bash
npm run compile
```

This will compile the Solidity contracts using Hardhat.

### 3. Deploy Smart Contracts

#### For Local Development (Hardhat Network)

1. Start a local Hardhat node:
```bash
npx hardhat node
```

2. In a new terminal, deploy the contract:
```bash
npm run deploy
```

This will deploy the contract to your local Hardhat network and save the contract address to `config.json`.

#### For Testnet (Sepolia)

1. Create a `.env` file in the root directory:
```
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
```

2. Deploy to Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Update Contract Address

After deployment, the contract address will be automatically saved to `config.json`. Make sure this file is accessible when running the frontend.

### 5. Run the Application

#### Option 1: Using http-server (Recommended)
```bash
npm run dev
```

Then open `http://localhost:8080/main.html` in your browser.

#### Option 2: Using Python
```bash
python -m http.server 8080
```

#### Option 3: Using VS Code Live Server
Use the Live Server extension in VS Code.

## Usage

### Connecting to MetaMask

1. Make sure MetaMask is installed and unlocked
2. Open the application in your browser
3. When prompted, approve the connection request in MetaMask
4. Select the appropriate network (Localhost 8545 for local development, or Sepolia for testnet)

### Creating an Account

1. Go to `main.html`
2. Enter a username
3. Click "Create Account"
4. Confirm the transaction in MetaMask
5. Wait for the transaction to be confirmed

### Adding Friends

1. Go to `friend.html`
2. Enter your friend's Ethereum address and username
3. Click "Add Friend"
4. Confirm the transaction in MetaMask
5. Your friend will be added to your friend list (both users must add each other)

### Messaging

1. Go to `chat.html`
2. Enter a recipient's Ethereum address
3. Click "Lookup Username" to verify
4. Type your message and click "Send to Blockchain"
5. Click "Load Messages" to see all messages

### Viewing Friend List

1. Go to `friend.html`
2. Click "Load Friend List" to see all your friends
3. Click "Chat" button next to any friend to start messaging

## Project Structure

```
Block-Press/
├── contracts/           # Solidity smart contracts
│   └── Database.sol    # Main messaging contract
├── scripts/            # Deployment scripts
│   └── deploy.js       # Contract deployment script
├── js/                 # JavaScript utilities
│   └── web3-config.js  # Web3 connection and contract interaction
├── main.html           # Landing page (account creation)
├── dashboard.html      # Dashboard (optional)
├── chat.html           # Messaging interface
├── friend.html         # Friend management
├── config.json         # Contract configuration (auto-generated)
├── hardhat.config.js   # Hardhat configuration
└── package.json        # Dependencies and scripts
```

## Smart Contract Functions

### User Management
- `createAccount(string name)` - Create a new account with username
- `checkUserExists(address pubkey)` - Check if a user exists
- `getUsername(address pubkey)` - Get username by address

### Friend Management
- `addFriend(address friend_key, string name)` - Add a friend (bidirectional)
- `checkAlreadyFriends(address pubkey1, address pubkey2)` - Check if users are friends
- `getMyFriendList()` - Get your complete friend list

### Messaging
- `sendMessage(address friend_key, string _msg)` - Send a message to a friend
- `readMessage(address friend_key)` - Read all messages with a specific friend
- Uses chat codes (hashed identifiers) for secure message storage

## Development

### Testing

Run Hardhat tests:
```bash
npx hardhat test
```

### Network Configuration

Edit `hardhat.config.js` to add custom networks or modify existing ones.

### Gas Optimization

The contract uses Hardhat's optimizer. Adjust settings in `hardhat.config.js`:

```javascript
settings: {
  optimizer: {
    enabled: true,
    runs: 200
  }
}
```

## Troubleshooting

### MetaMask Not Connecting
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network
- Try refreshing the page

### Contract Not Found
- Verify `config.json` contains the correct contract address
- Ensure you're connected to the same network where the contract was deployed
- Check the browser console for errors

### Transaction Fails
- Ensure you have enough ETH for gas fees
- Check that both users are registered
- Verify you are friends with the recipient (friends must be added first)
- Make sure you're not trying to add yourself as a friend

### Articles/Messages Not Loading
- Check browser console for errors
- Verify contract address in `config.json`
- Ensure you're connected to the correct network

## Security Notes

- Never share your private keys
- Always verify contract addresses before interacting
- Test on testnets before deploying to mainnet
- Review gas costs before confirming transactions

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

