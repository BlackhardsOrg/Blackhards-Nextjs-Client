import { useEffect, useState } from "react";
import ShopCheckoutAreaForm from "../element/ShopCheckoutAreaForm";
import ShopCheckoutAreaInfo1 from "../sidebar/ShopCheckoutAreaInfo1";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { useRouter } from "next/router";
import { innitializePayments, innitializePaymentsCrypto } from "@/redux/features/cart/api/checkoutApi";
import { IGamePackageIDs, IOrder } from "@/types";
import { usePaymentContract } from "@/web3/connection/walletconnect";
import { innitializePaymentFixedFailed, innitializePaymentFixedSuccess } from "@/redux/features/cart/slice/checkoutSlice";
import PageFlyLoader from "../loading/PageFlyLoader";

export default function CheckoutArea() {
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
    paymentType: "paystack",
    totalAmount: 0,
    email: "",
    GamePackageAndIds: []
  })

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const router = useRouter()
  const cartItems = useAppSelector(state => state.cart.items)
  const licenseFee = useAppSelector(state => state.cart.licenseFee)
  const [checkoutLoad, setCheckLoad] = useState(false)

  // useEffect(() => {
  //   dispatch(innitializePaymentFixedSuccess(null))
  // }, [checkoutLoad])


  const { approvePayment, payForGame } = usePaymentContract()

  const handlePlaceOrder = async () => {

    let total = 0;
    let Licensing = licenseFee;
    cartItems.forEach((item: any) => {
      const price = item.qty * item.price;
      total = total + price;
    });
    const GameIdsPackage = cartItems.map(item => ({ id: item.id, packageType: item.packageType })) as IGamePackageIDs[]


    if (order.paymentType == "crypto") {
      console.log("CRYPTO")

      const dataCrypto = await dispatch(innitializePaymentsCrypto({
        ...order,
        totalAmount: total + 10,
        email: user.email,
        GamePackageAndIds: GameIdsPackage
      },
        user.token))


      if (dataCrypto) {
        // router.push(dataCrypto.data.authorization_url)
        console.log("CRYPTO AMOUNT", dataCrypto)
        try {
          setCheckLoad(true)
          const appPay = await approvePayment(dataCrypto.amount / 100)
          console.log(dataCrypto.email, dataCrypto.orderID, GameIdsPackage.map(item => item.id), dataCrypto.amount / 100, "PAY ATTENT")
          const payGame = await payForGame(dataCrypto.email, dataCrypto.orderID, GameIdsPackage.map(item => item.id), dataCrypto.amount / 100)
          console.log("CRYPTO", dataCrypto.amount, payGame, appPay)
          dispatch(innitializePaymentFixedSuccess(null));
          setCheckLoad(false)

          router.push(`${dataCrypto.callback_url}&txnHash=${payGame.hash}`)
        } catch (err) {
          console.log(err)
          setCheckLoad(false)
          dispatch(innitializePaymentFixedFailed());
        }


      }
    }

    if (order.paymentType == "paystack") {

      const data = await dispatch(innitializePayments({
        ...order,
        totalAmount: total + 10,
        email: user.email,
        GamePackageAndIds: GameIdsPackage
      },
        user.token))


      if (data && data.data && data.data.authorization_url) {
        router.push(data.data.authorization_url)
      }

    }


  }

  return (
    <>
      <section className="shop-checkout pt-0">
        <div className="container">

          {checkoutLoad && <PageFlyLoader />}
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
