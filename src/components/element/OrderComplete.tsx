import { useAppDispatch } from "@/redux/app/hooks";
import { verifyPayments } from "@/redux/features/cart/api/checkoutApi";
import { clearCart } from "@/redux/features/cart/slice/cartSlice";
import { IData, IMetadata, IVerificationResponse } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function OrderComplete() {
  const [refrenceData, setRefrenceData] = useState<IData | null>(null)
  const { query } = useRouter()
  const { reference, orderID } = query;
  const dispatch = useAppDispatch()


  const handleFetchReference = async (ref: string, orderID: string) => {
    const data = await verifyPayments(ref, orderID) as IVerificationResponse
    if (data.status && data.data) {
      setRefrenceData(data.data)
      dispatch(clearCart())
    }

  }
  useEffect(() => {
    if (reference && orderID) {
      const ref = reference as string
      const orderId = orderID as string

      handleFetchReference(ref, orderId)
    }
  }, [reference])



  return (
    <>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="order_complete_message text-center">
                <div className="icon bgc-thm4">
                  <span className="fa fa-check text-thm" />
                </div>
                <h2 className="title">Your Order Is Completed !</h2>
                <p className="text">Thank you. Your order has been received.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8 offset-xl-2">
              <div className="shop_order_box mt60">
                <div className="order_list_raw">
                  <ul className="d-md-flex align-items-center justify-content-md-between p-0 mb-0">
                    <li className="mb20-sm">
                      <p className="text mb5">Ref Number</p>
                      <h6 className="mb-0">{refrenceData?.reference}</h6>
                    </li>
                    <li className="mb20-sm">
                      <p className="text mb5">Date</p>
                      <h6 className="mb-0">{refrenceData?.createdAt}</h6>
                    </li>
                    <li className="mb20-sm">
                      <p className="text mb5">Total</p>
                      <h6 className="mb-0">{formatPriceToDollars(Number(refrenceData?.amount) / 100)}</h6>
                    </li>
                    <li>
                      <p className="text mb5">Payment Method</p>
                      <h6 className="mb-0">Card Payment</h6>
                    </li>
                  </ul>
                </div>
                <div className="order_details default-box-shadow1">
                  <h4 className="title mb25">Order details</h4>
                  <div className="od_content">
                    <ul className="p-0 mb-0">
                      <li className="bdrb1 mb20">
                        <h6>
                          Product
                          <span className="float-end">Subtotal</span>
                        </h6>
                      </li>
                      {refrenceData?.metadata.custom_fields.map((item, index) => {
                        return (
                          <li key={index} className="mb20">
                            <p className="body-color">
                              {item.gameTitle} x1
                              <span className="float-end">{formatPriceToDollars(Number(item.price))}</span>
                            </p>
                          </li>
                        )
                      })}

                      <li className=" bdrb1 mb15">
                        <h6>
                          Subtotal
                          <span className="float-end">{formatPriceToDollars(Number(refrenceData?.amount) / 100)}</span>
                        </h6>
                      </li>

                      <li>
                        <h6>
                          Total
                          <span className="float-end">{formatPriceToDollars((Number(refrenceData?.amount) / 100))}</span>
                        </h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
