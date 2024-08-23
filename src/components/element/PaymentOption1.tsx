import { IOrder } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

interface IPaymentOption {
  order: IOrder
  setOrder: Dispatch<SetStateAction<IOrder>>
}
export default function PaymentOption1({ order, setOrder }: IPaymentOption) {
  
  return (
    <>
      <div className="payment_widget default-box-shadow1">
        <h4 className="title">Payment</h4>
        <div className="radio-element">
          <div onClick={() => setOrder(old => ({ ...old, paymentType: "paystack" }))} className="form-check d-flex align-items-center mb15 cursor-pointer">
            <input
              className="form-check-input "
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              defaultChecked={order.paymentType === "paystack"}
            />
            <label className="form-check-label cursor-pointer d-flex gap-1" htmlFor="flexRadioDefault1">
              <i className="fab fa-stripe"></i>

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
            <label className="form-check-label cursor-pointer d-flex gap-1" htmlFor="flexRadioDefault3">
              <i className="fab fa-ethereum"></i>
              <span> Pay with Crypto</span>
            </label>
          </div>
          <div className="pw-details">
            <p className="fz13 mb30">
              Make Payments using Crypto metamask
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
