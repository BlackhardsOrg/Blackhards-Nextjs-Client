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
import { MarketplaceAbi } from "../contract/abi/marketplace.abi";

// Payment contract address (replace this with your deployed contract address)
export const marketContractAddress =
  "0x16455d61a8B8f1A9dFF7512c8267669fcBc78c78";
export const usdtContractAddress = "0x65c2A522377b6D0C4aa63B323485508B852b17cc";
const blackhardsNFTContractAddress = "";

const RPC_URL = "https://enugu-rpc.assetchain.org";

const chainId = 42421;

export const useMarketContract = () => {
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

  const getContract = async (
    signer: ethers.Signer,
    contractabi,
    contractAddress
  ) => {
    const paymentContract = new ethers.Contract(
      contractAddress,
      contractabi,
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

  const startAuction = async (
    tokenId: number,
    endTime: number,
    reservePrice: number,
    auctionId: string
  ) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER", tokenId, endTime, reservePrice, auctionId);
    const contract = await getContract(
      signer,
      MarketplaceAbi,
      marketContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.startAuction(
      tokenId,
      endTime,
      ethers.utils.parseUnits(reservePrice.toString(), 6),
      auctionId
    ); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Transaction started", tx);
    return tx;
  };

  const placeBidOnAuction = async (
    _auctionId: string,
    bidAmount: number,
    stablecoin: string
  ) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      MarketplaceAbi,
      marketContractAddress
    );
    await approvePayment(bidAmount);

    // Call payForGame on the contract
    const tx = await contract.placeBid(
      _auctionId,
      ethers.utils.parseUnits(bidAmount.toString(), 6),
      stablecoin
    ); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Bid Placed", tx);
    return tx;
  };

  const resultAuction = async (_auctionId: string, gameTitleDbId: string) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      MarketplaceAbi,
      marketContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.resultAuction(_auctionId, gameTitleDbId); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Auction Resulted", tx);
    return tx;
  };

  const confirmAuction = async (_auctionId: string) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      MarketplaceAbi,
      marketContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.confirmAuction(_auctionId); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Auction Confirmed", tx);
    return tx;
  };

  return {
    startAuction,
    placeBidOnAuction,
    resultAuction,
    confirmAuction,
    approvePayment,
  };
};
