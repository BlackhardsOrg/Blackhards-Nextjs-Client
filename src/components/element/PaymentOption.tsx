import { IOrder } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { SiTether } from "react-icons/si";

interface IPaymentOption {
  order: IOrder
  setOrder: Dispatch<SetStateAction<IOrder>>
}
export default function PaymentOption({ order, setOrder }: IPaymentOption) {
  return (
    <>
      <div className="payment_widget default-box-shadow1">
        <h4 className="title">Payment</h4> {order.paymentType}
        <div className="radio-element">
          <div onClick={() => setOrder(old => ({ ...old, paymentType: "paystack" }))} className="form-check d-flex align-items-center mb15 cursor-pointer">
            <input
              className="form-check-input "
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              defaultChecked={order.paymentType === "paystack"}
            />
            <label className="form-check-label cursor-pointer d-flex gap-1 align-items-center" htmlFor="flexRadioDefault1">
              <FaCreditCard />

              <span>Pay with Paystack</span>
            </label>
          </div>
          <div className="pw-details">
            <p className="fz13 mb30">
              Make Payments using paystack api
            </p>
          </div>

          <div onClick={() => setOrder(old => ({ ...old, paymentType: "crypto" }))} className="form-check d-flex align-items-center mb15 cursor-pointer">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
              defaultChecked={order.paymentType === "crypto"}
            />
            <label className="form-check-label cursor-pointer d-flex gap-1 align-items-center" htmlFor="flexRadioDefault3">
              <SiTether className="text-info" />
              <span> Pay with Crypto</span>
            </label>

          </div>
          <div className="pw-details">
            <p className="fz13 mb30">
              Make Payments using Crypto (USDT)
            </p>
          </div>
          {/* <button onClick={async () => {
            try {
              await approvePayment(40)
              await payForGame("66afe9230a82160a06eacfaf", 40)
            } catch (err) {
              console.log("LOOLA", err)
            }
          }}
            className="btn btn-success text-light">Connect Wallet</button> */}
        </div>
      </div>
    </>
  );
}
