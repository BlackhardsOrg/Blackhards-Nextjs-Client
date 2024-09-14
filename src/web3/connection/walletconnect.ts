// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { ethers } from "ethers";

// export async function connectWallet(): Promise<{
//   provider: WalletConnectProvider | null;
//   signer: ethers.providers.JsonRpcSigner | null;
// }> {
//   try {
//     const provider = new WalletConnectProvider({
//       rpc: {
//         42421: "https://enugu-rpc.assetchain.org/", // Ethereum Mainnet
//         // 4: "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Rinkeby Testnet (use the network you prefer)
//       },
//     });

//     // Enable session (triggers QR Code modal)
//     await provider.enable();

//     // Create ethers provider
//     const web3Provider = new ethers.providers.Web3Provider(provider);
//     const signer = web3Provider.getSigner();

//     return { provider, signer };
//   } catch (err) {
//     console.error("Failed to connect wallet", err);
//     return { provider: null, signer: null };
//   }
// }

import { ethers } from "ethers";
import { usdtABI } from "../contract/abi/usdt.abi";

// ABI of your contract (only include the functions you are going to call)
const abi = [
  "function approvePayment(uint256 _amount) public",
  "function payForGame(string memory _sellerPublicEmail, string memory _orderRef, string[] memory _gameId, uint256 _amount) public",
  "function getTransaction(uint256 _index) public view returns (address, string memory, string memory, uint256, string[] memory, uint256)",
  "function getTransactionByOrderRef(string memory _orderRef) public view returns (address, string memory, string memory, uint256, string[] memory, uint256)",
  "function getTransactionCount() public view returns (uint256)",
];

// Payment contract address (replace this with your deployed contract address)
const marketContractAddress = "0xfE1A96c945c970e3d9cE1788A0E42d64Aa29b7be";
const usdtContractAddress = "0x65c2A522377b6D0C4aa63B323485508B852b17cc";

const RPC_URL = "https://enugu-rpc.assetchain.org";

const chainId = 42421;

export const usePaymentContract = () => {
  const switchNetwork = async () => {
    // const chainId = 1337; // Example chainId
    const hexChainId = ethers.utils.hexlify(chainId);
    console.log("Network switched to:", ethers.utils.hexlify(hexChainId));

    try {
      if (
        window.ethereum &&
        window.ethereum.request &&
        typeof window.ethereum !== "undefined"
      ) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexlify(hexChainId) }],
        });
        console.log("Network switched to:", ethers.utils.hexlify(hexChainId));
      }
    } catch (switchError: any) {
      if (
        window.ethereum &&
        window.ethereum.request &&
        typeof window.ethereum !== "undefined"
      ) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: ethers.utils.hexlify(hexChainId),
                  chainName: "AssetChain",
                  rpcUrls: ["https://enugu-rpc.assetchain.org"],
                  nativeCurrency: {
                    name: "AssetChain Token",
                    symbol: "RWA", // Replace with actual symbol
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://scan-testnet.assetchain.org/"], // Replace with your block explorer URL or set to null
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add the network:", addError);
          }
        } else {
          console.error("Failed to switch network:", switchError);
        }
      }
    }
  };

  const connectToMetaMask = async () => {
    if (
      window.ethereum &&
      window.ethereum.request &&
      typeof window.ethereum !== "undefined"
    ) {
      // Custom provider using your RPC URL

      // Request account access from MetaMask
      await switchNetwork();

      await window.ethereum.request({ method: "eth_requestAccounts" });
      //   const customProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

      // Get MetaMask signer (linked with custom provider)
      const customProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = customProvider.getSigner();

      return { customProvider, signer };
    } else {
      throw new Error("MetaMask is not installed");
    }
  };

  const getContract = async (signer: ethers.Signer) => {
    const paymentContract = new ethers.Contract(
      marketContractAddress,
      abi,
      signer
    );
    return paymentContract;
  };

  const getUSDTContract = async (signer: ethers.Signer) => {
    const paymentContract = new ethers.Contract(
      usdtContractAddress,
      usdtABI,
      signer
    );
    return paymentContract;
  };

  const approvePayment = async (_amount: number) => {
    const { signer } = await connectToMetaMask();
    const usdtContract = await getUSDTContract(signer);

    // Call approvePayment on the contract
    const tx = await usdtContract.approve(
      marketContractAddress,
      ethers.utils.parseUnits(_amount.toString(), 6)
    ); // Assuming 6 decimals for USDT
    await tx.wait(); // Wait for transaction confirmation

    console.log("Payment Approved", tx);
    return tx;
  };

  const payForGame = async (
    _sellerPublicEmail: string,
    _orderRef: string,
    _gameId: string[],
    _amount: number
  ) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(signer);

    // Call payForGame on the contract
    const tx = await contract.payForGame(
      _sellerPublicEmail,
      _orderRef,
      _gameId,
      ethers.utils.parseUnits(_amount.toString(), 6)
    ); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Payment Made", tx);
    return tx;
  };

  const getTransactionByOrderRef = async (_orderRef: string) => {
    const { signer } = await connectToMetaMask();
    const contract = await getContract(signer);

    const transaction = await contract.getTransactionByOrderRef(_orderRef);
    return transaction;
  };

  const getTransactionCount = async () => {
    const { signer } = await connectToMetaMask();
    const contract = await getContract(signer);

    const count = await contract.getTransactionCount();
    return count;
  };

  return {
    approvePayment,
    payForGame,
    getTransactionByOrderRef,
    getTransactionCount,
  };
};
