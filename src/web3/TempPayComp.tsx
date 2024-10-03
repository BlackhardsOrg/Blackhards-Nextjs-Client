// import React, { useState } from "react";
// import { approvePayment } from "./contract/payment.sol";

// const ApprovePaymentComponent: React.FC = () => {
//   const [amount, setAmount] = useState<number>(0);

//   const handleApprove = async () => {
//     try {
//       await approvePayment(amount);
//       alert("Payment Approved!");
//     } catch (error) {
//       console.error("Approval Error: ", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         placeholder="Amount in USDT"
//       />
//       <button onClick={handleApprove}>Approve Payment</button>
//     </div>
//   );
// };

// export default ApprovePaymentComponent;
