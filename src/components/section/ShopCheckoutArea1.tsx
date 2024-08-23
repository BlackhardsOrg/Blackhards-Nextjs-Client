import { useState } from "react";
import ShopCheckoutAreaForm from "../element/ShopCheckoutAreaForm";
import ShopCheckoutAreaInfo1 from "../sidebar/ShopCheckoutAreaInfo1";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { useRouter } from "next/router";
import { innitializePayments } from "@/redux/features/cart/api/checkoutApi";
import { IGamePackageIDs, IOrder } from "@/types";

export default function ShopCheckoutArea1() {
  const [order, setOrder] = useState<IOrder>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    houseNo: "",
    streetName: "",
    town: "",
    state: "",
    zip: "",
    phone: "",
    additionalInfo: "",
    paymentType: "",
    totalAmount: 0,
    email: "",
    GamePackageAndIds: []
  })

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const router = useRouter()
  const cartItems = useAppSelector(state => state.cart.items)
  const licenseFee = useAppSelector(state => state.cart.licenseFee)


  const handlePlaceOrder = async () => {

    let total = 0;
    let Licensing = licenseFee;
    cartItems.forEach((item: any) => {
      const price = item.qty * item.price;
      total = total + price;
    });
    const GameIdsPackage = cartItems.map(item => ({ id: item.id, packageType: item.packageType })) as IGamePackageIDs[]
    console.log(GameIdsPackage, "IDSD")
    const data = await dispatch(innitializePayments({
      ...order,
      totalAmount: total + 10,
      email: user.email,
      GamePackageAndIds: GameIdsPackage
    },
      user.token))
    console.log(data, "DTAT")
    if (data && data.data && data.data.authorization_url) {
      router.push(data.data.authorization_url)
    }
  }
  return (
    <>
      <section className="shop-checkout pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-md-7 col-lg-8">
              <ShopCheckoutAreaForm order={order} setOrder={setOrder} />
            </div>
            <div className="col-md-5 col-lg-4">
              <ShopCheckoutAreaInfo1 handlePlaceOrder={handlePlaceOrder} order={order} setOrder={setOrder} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
