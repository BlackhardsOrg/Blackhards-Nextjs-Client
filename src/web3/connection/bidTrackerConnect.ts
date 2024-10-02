import { ethers } from "ethers";
import { usdtABI } from "../contract/abi/usdt.abi";
import { bidTrackerAbi } from "../contract/abi/bidTracker.abi";

// Payment contract address (replace this with your deployed contract address)
export const bidTrackerContractAddress =
  "0x5d70fA3F7c394fF48E7a74CBF944147bDBAA7C47";
export const usdtContractAddress = "0x65c2A522377b6D0C4aa63B323485508B852b17cc";

const chainId = 42421;

export const useBidTrackerContract = () => {
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
      bidTrackerContractAddress,
      ethers.utils.parseUnits(_amount.toString(), 6)
    ); // Assuming 6 decimals for USDT
    await tx.wait(); // Wait for transaction confirmation

    console.log("Payment Approved", tx);
    return tx;
  };

  const FulfillBid = async (
    auctionId: string,
    sellerDbId: string,
    bidAmount: number,
    started: boolean,
    buyerDbId: string,
    gameTitleId: string
  ) => {
    const { signer } = await connectToMetaMask();
    const contract = await getContract(
      signer,
      bidTrackerAbi,
      bidTrackerContractAddress
    );
    await approvePayment(bidAmount);

    // Call payForGame on the contract
    const tx = await contract.FulfillBid(
      auctionId,
      sellerDbId,
      ethers.utils.parseUnits(bidAmount.toString(), 6),
      started,
      buyerDbId,
      gameTitleId
    ); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Transaction started", tx);
    return tx;
  };

  const setAuctionSellerWallet = async (_auctionId: string) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      bidTrackerAbi,
      bidTrackerContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.setAuctionSellerWallet(_auctionId); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Set Auction Seller", tx);
    return tx;
  };

  const confirmPaidAuction = async (_auctionId: string) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      bidTrackerAbi,
      bidTrackerContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.confirmPaidAuction(_auctionId); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("Auction Confirmed Seller", tx);
    return tx;
  };

  const fetchSingleFulfilledBid = async (_auctionId: string) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      bidTrackerAbi,
      bidTrackerContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.fetchSingleFulfilledBid(_auctionId); // Assuming 6 decimals for USDT

    console.log("Auction Resulted", tx);
    return tx;
  };

  const transferOutUSDTToken = async (
    amount: number,
    recipientAddress: string
  ) => {
    const { signer } = await connectToMetaMask();
    console.log(signer, "SIGNER");
    const contract = await getContract(
      signer,
      bidTrackerAbi,
      bidTrackerContractAddress
    );

    // Call payForGame on the contract
    const tx = await contract.transferOutUSDTToken(amount, recipientAddress); // Assuming 6 decimals for USDT
    await tx.wait();

    console.log("USDT Transfered", tx);
    return tx;
  };

  return {
    FulfillBid,
    setAuctionSellerWallet,
    fetchSingleFulfilledBid,
    transferOutUSDTToken,
    approvePayment,
    confirmPaidAuction,
  };
};
