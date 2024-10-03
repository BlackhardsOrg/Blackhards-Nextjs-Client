
// Define the contract ABI
export const paymentABI = [
  // Add only the functions you'll interact with from your contract
  {
    "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "approvePayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_gameId", "type": "string" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" },
    ],
    "name": "payForGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "getTransaction",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "getTransactionCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
  }
];

export const usdtAddress = "YOUR_USDT_TOKEN_ADDRESS";
export const marketplaceAddress = "YOUR_CONTRACT_ADDRESS";
