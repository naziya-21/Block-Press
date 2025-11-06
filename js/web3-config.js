// Web3 Configuration and Connection Utilities for Database Contract

let web3;
let contract;
let contractAddress;
let userAccount;

// Initialize Web3
async function initWeb3() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            
            console.log('Connected account:', userAccount);
            
            // Load contract address from config
            await loadContractConfig();
            
            // Initialize contract
            await initContract();
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                userAccount = accounts[0];
                console.log('Account changed to:', userAccount);
                updateUI();
            });
            
            return true;
        } else {
            alert('Please install MetaMask to use this application!');
            return false;
        }
    } catch (error) {
        console.error('Error initializing Web3:', error);
        alert('Error connecting to blockchain. Please check your MetaMask connection.');
        return false;
    }
}

// Load contract configuration
async function loadContractConfig() {
    try {
        const response = await fetch('./config.json');
        const config = await response.json();
        contractAddress = config.contractAddress;
        console.log('Contract address loaded:', contractAddress);
    } catch (error) {
        console.error('Error loading contract config:', error);
        // For local development, you can set a default address
        contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Default Hardhat address
    }
}

// Contract ABI for Database contract
const contractABI = [
    {
        "inputs": [{"internalType": "address", "name": "pubkey", "type": "address"}],
        "name": "checkUserExists",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "name", "type": "string"}],
        "name": "createAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "pubkey", "type": "address"}],
        "name": "getUsername",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "friend_key", "type": "address"}, {"internalType": "string", "name": "name", "type": "string"}],
        "name": "addFriend",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyFriendList",
        "outputs": [{
            "components": [
                {"internalType": "address", "name": "pubkey", "type": "address"},
                {"internalType": "string", "name": "name", "type": "string"}
            ],
            "internalType": "struct Database.friend[]",
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "friend_key", "type": "address"}, {"internalType": "string", "name": "_msg", "type": "string"}],
        "name": "sendMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "friend_key", "type": "address"}],
        "name": "readMessage",
        "outputs": [{
            "components": [
                {"internalType": "address", "name": "sender", "type": "address"},
                {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                {"internalType": "string", "name": "msg", "type": "string"}
            ],
            "internalType": "struct Database.message[]",
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Initialize contract instance
async function initContract() {
    if (!contractAddress) {
        console.error('Contract address not set');
        return;
    }
    
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log('Contract initialized');
}

// Contract interaction functions
async function checkUserExists(address) {
    try {
        if (!contract) {
            throw new Error('Web3 not initialized');
        }
        
        const exists = await contract.methods.checkUserExists(address).call();
        return exists;
    } catch (error) {
        console.error('Error checking user exists:', error);
        return false;
    }
}

async function createAccount(name) {
    try {
        if (!contract || !userAccount) {
            throw new Error('Web3 not initialized');
        }
        
        const result = await contract.methods.createAccount(name).send({
            from: userAccount,
            gas: 300000
        });
        
        console.log('Account created:', result);
        return result;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
}

async function getUsername(address) {
    try {
        if (!contract) {
            throw new Error('Web3 not initialized');
        }
        
        const username = await contract.methods.getUsername(address).call();
        return username;
    } catch (error) {
        console.error('Error getting username:', error);
        throw error;
    }
}

async function addFriend(friendKey, friendName) {
    try {
        if (!contract || !userAccount) {
            throw new Error('Web3 not initialized');
        }
        
        const result = await contract.methods.addFriend(friendKey, friendName).send({
            from: userAccount,
            gas: 300000
        });
        
        console.log('Friend added:', result);
        return result;
    } catch (error) {
        console.error('Error adding friend:', error);
        throw error;
    }
}

async function getMyFriendList() {
    try {
        if (!contract || !userAccount) {
            throw new Error('Web3 not initialized');
        }
        
        const friendList = await contract.methods.getMyFriendList().call({
            from: userAccount
        });
        
        return friendList;
    } catch (error) {
        console.error('Error getting friend list:', error);
        throw error;
    }
}

async function sendMessage(friendKey, message) {
    try {
        if (!contract || !userAccount) {
            throw new Error('Web3 not initialized');
        }
        
        const result = await contract.methods.sendMessage(friendKey, message).send({
            from: userAccount,
            gas: 300000
        });
        
        console.log('Message sent:', result);
        return result;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

async function readMessage(friendKey) {
    try {
        if (!contract || !userAccount) {
            throw new Error('Web3 not initialized');
        }
        
        const messages = await contract.methods.readMessage(friendKey).call({
            from: userAccount
        });
        
        return messages;
    } catch (error) {
        console.error('Error reading messages:', error);
        throw error;
    }
}

// Utility function to update UI
function updateUI() {
    // This will be implemented in individual HTML files
    if (typeof window.updateBlockchainUI === 'function') {
        window.updateBlockchainUI();
    }
}

// Export functions for use in HTML files
window.web3Config = {
    initWeb3,
    checkUserExists,
    createAccount,
    getUsername,
    addFriend,
    getMyFriendList,
    sendMessage,
    readMessage,
    getContract: () => contract,
    getUserAccount: () => userAccount,
    getWeb3: () => web3
};
