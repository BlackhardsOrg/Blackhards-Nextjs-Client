import { useAppSelector } from "@/redux/app/hooks";
import shopStore from "@/store/shopStore";
import { useEffect } from "react";

export default function OrderInfo1() {
  const cartItems = useAppSelector(state => state.cart.items)
  const licenseFee = useAppSelector(state => state.cart.licenseFee)

  let total = 0;
  let Licensing = licenseFee;
  cartItems.forEach((item: any) => {
    const price = item.qty * item.price;
    total = total + price;
  });



  return (
    <>
      <div className="order_sidebar_widget mb30 default-box-shadow1">
        <h4 className="title">Your Order</h4>
        <ul className="p-0 mb-0">
          <li className="bdrb1 mb20">
            <h6>
              Product
              <span className="float-end">Subtotal</span>
            </h6>
          </li>
          {cartItems?.map((item: any, i: any) => (
            <li key={i} className="mb20">
              <p className="body-color">
                {item.title.substring(0, 10) + "..."} x {item.qty}
                <span className="float-end">${item.qty * item.price}</span>
              </p>
            </li>
          ))}
          <li className=" bdrb1 mb15">
            <h6>
              Subtotal
              <span className="float-end">${total.toFixed(2)}</span>
            </h6>
          </li>
          <li className=" bdrb1 mb15">
            <h6> 
              Licensing
              <span className="float-end">
                {cartItems?.length !== 0 ? "$10" : "$0.00"}
              </span>
            </h6>
          </li>
          <li>
            <h6>
              Total
              <span className="float-end">
                $
                {cartItems?.length !== 0
                  ? (Number(total) +10).toFixed(2)
                  : "$0.00"}
              </span>
            </h6>
          </li>
        </ul>
      </div>
    </>
  );
}
