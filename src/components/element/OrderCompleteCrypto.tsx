import { useAppDispatch } from "@/redux/app/hooks";
import { verifyCrypto, verifyPayments } from "@/redux/features/cart/api/checkoutApi";
import { clearCart } from "@/redux/features/cart/slice/cartSlice";
import { IData, IDataCrypto, IMetadata, IVerificationDataResponse, IVerificationResponse } from "@/types";
import { timeAgo } from "@/utils";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function OrderCompleteCrypto() {
  const [refrenceData, setRefrenceData] = useState<IDataCrypto | null>(null)
  const { query } = useRouter()
  const { txnHash, orderID } = query;
  const dispatch = useAppDispatch()


  const handleFetchReference = async (txnHash: string, orderID: string) => {
    const data = await verifyCrypto(txnHash, orderID) as IDataCrypto
    if (data) {
      setRefrenceData(data)

      console.log(data, "REF DATA")
      dispatch(clearCart())
    }

  }

  useEffect(() => {
    if (txnHash && orderID) {
      const orderId = orderID as string

      handleFetchReference(String(txnHash), orderId)
    }
  }, [txnHash, orderID])

  function shortenAddr(addr: string | undefined) {
    if (addr) {

      return <Link href={`${"https://scan-testnet.assetchain.org/tx/" + addr}`}> {`${addr.slice(0, 4)}...${addr.slice(addr.length - 4, addr.length)}`}</Link>
    }
  }

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
                      <h6 className="mb-0">{refrenceData && refrenceData.order && shortenAddr(refrenceData?.order?.transactionHash)}</h6>
                    </li>
                    <li className="mb20-sm">
                      <p className="text mb5">Date</p>
                      <h6 className="mb-0">{refrenceData && refrenceData.order && refrenceData.order.createdAt}</h6>
                    </li>
                    <li className="mb20-sm">
                      <p className="text mb5">Total</p>
                      <h6 className="mb-0">{refrenceData && refrenceData.order && formatPriceToDollars(Number(refrenceData.order.totalAmount))}</h6>
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
                      {refrenceData?.order.GamePackageAndIds.map((item, index) => {
                        return (
                          <li key={index} className="mb20">
                            <p className="body-color">
                              {item.title} x1
                              <span className="float-end">{formatPriceToDollars(Number(item.price))}</span>
                            </p>
                          </li>
                        )
                      })}

                      <li className=" bdrb1 mb15">
                        <h6>
                          Subtotal
                          <span className="float-end">{formatPriceToDollars(Number(refrenceData?.order.totalAmount))}</span>
                        </h6>
                      </li>

                      <li>
                        <h6>
                          Total
                          <span className="float-end">{formatPriceToDollars((Number(refrenceData?.order.totalAmount)))}</span>
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
