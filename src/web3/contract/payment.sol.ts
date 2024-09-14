// import { ethers } from "ethers";
// import { marketplaceAddress, paymentABI } from "./abi/payment.abi";

// export const approvePayment = async (_amount: number) => {
//   try {
//     const { signer } = await connectWallet();

//     if (signer) {
//       // Create contract instance
//       const contract = new ethers.Contract(
//         marketplaceAddress,
//         paymentABI,
//         signer
//       );

//       // Call approvePayment
//       const tx = await contract.approvePayment(
//         ethers.utils.parseUnits(_amount.toString(), 6)
//       ); // Assuming USDT has 6 decimals
//       await tx.wait();

//       console.log("Payment approved successfully");
//     }
//   } catch (err) {
//     console.error("Failed to approve payment", err);
//   }
// };

// export const payForGame = async (_gameId: string, _amount: number) => {
//   try {
//     const { signer } = await connectWallet();
//     if (signer) {
//       // Create contract instance
//       const contract = new ethers.Contract(
//         marketplaceAddress,
//         paymentABI,
//         signer
//       );

//       // Call payForGame
//       const tx = await contract.payForGame(
//         _gameId,
//         ethers.utils.parseUnits(_amount.toString(), 6)
//       ); // Assuming USDT has 6 decimals
//       await tx.wait();

//       console.log("Payment successful");
//     }
//   } catch (err) {
//     console.error("Failed to pay for the game", err);
//   }
// };

// export const getTransaction = async (_index: number) => {
//   try {
//     const { signer } = await connectWallet();

//     if (signer) {
//       // Create contract instance
//       const paymentContract = new ethers.Contract(
//         marketplaceAddress,
//         paymentABI,
//         signer
//       );

//       // Call getTransaction
//       const transaction = await paymentContract.getTransaction(_index);

//       return {
//         buyer: transaction[0],
//         amount: ethers.utils.formatUnits(transaction[1], 6), // Assuming USDT has 6 decimals
//         gameId: transaction[2],
//         timestamp: transaction[3],
//       };
//     }
//   } catch (err) {
//     console.error("Failed to get transaction", err);
//   }
// };

// export const getTransactionCount = async () => {
//   try {
//     const { signer } = await connectWallet();
//     if (signer) {
//       // Create contract instance
//       const contract = new ethers.Contract(
//         marketplaceAddress,
//         paymentABI,
//         signer
//       );

//       // Call getTransactionCount
//       const count = await contract.getTransactionCount();

//       return count.toNumber();
//     }
//   } catch (err) {
//     console.error("Failed to get transaction count", err);
//   }
// };
