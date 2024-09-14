import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import OrderInfo1 from "../element/OrderInfo1";
import PaymentOption from "../element/PaymentOption";
import { innitializePayments } from "@/redux/features/cart/api/checkoutApi";
import FLyLoad from "../loading/FLyLoad";
import { useRouter } from "next/router";
import { IGamePackageIDs, IOrder } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface IShopCheckoutAreaInfo {
  handlePlaceOrder: () => Promise<void>
  order: IOrder
  setOrder: Dispatch<SetStateAction<IOrder>>
}

export default function ShopCheckoutAreaInfo1({ handlePlaceOrder, order, setOrder

}: IShopCheckoutAreaInfo) {
  const checkoutLoad = useAppSelector(state => state.checkout.loading)

  return (
    <>
      <div className="shop-sidebar ms-md-auto">
        <OrderInfo1 />
        <PaymentOption
          order={order}
          setOrder={setOrder} />
        <div className="d-grid default-box-shadow2">
          <button onClick={handlePlaceOrder} className="ud-btn btn-thm">
            {checkoutLoad ? <FLyLoad /> : <>
              <i className="fal fa-arrow-right-long" />
              Place Order
            </>}
          </button>
        </div>
      </div>
    </>
  );
}
