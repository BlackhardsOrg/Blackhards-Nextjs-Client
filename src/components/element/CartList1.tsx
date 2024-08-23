import { useAppDispatch } from "@/redux/app/hooks";
import { removeItemFromCart } from "@/redux/features/cart/slice/cartSlice";
import shopStore from "@/store/shopStore";

import { useEffect, useState } from "react";

export default function CartList1({ data }: any) {
  const [qty, setQty] = useState(data.qty);

  const deleteProduct = shopStore((state: any) => state.deleteProduct);
  const updateQty = shopStore((state: any) => state.updateQty);
  const dispatch = useAppDispatch()
  // handler
  const qtyHandler = (q: any) => {
    setQty(q);
  };

  const incHandler = () => {
    setQty(Number(qty) + 1);
  };

  const decHandler = () => {
    qty > 1 && setQty(Number(qty) - 1);
  };

  const deleteHandler = (id: any) => deleteProduct(id);

  useEffect(() => {
    updateQty(data.id, qty);
  }, [data.id, qty, updateQty]);

  return (
    <>
      <tr>
        <td className="pl30 ">
          <div className="cart_list d-flex align-items-center">
            <div className="cart-img">
              <img style={{ width: "63px", height: "77px", objectFit: "cover" }} src={data.GamePlayScreenShot} alt="cart-1.png" />
            </div>

            <h5 className="mb-0">{data.title.substring(0, 40) + "..."}</h5>
          </div>
        </td>
        <td>
          <div className="cart-price">${data.price}</div>
        </td>
        {/* <td>
          <div className="cart-quantity">
            <div className="quantity-block">
              <button onClick={decHandler} className="quantity-arrow-minus">
                <span className="fa fa-minus" />
              </button>
              <input
                className="quantity-num"
                type="number"
                value={qty}
                onChange={(e) => qtyHandler(e.target.value)}
              />
              <button onClick={incHandler} className="quantity-arrow-plus">
                <span className="fas fa-plus" />
              </button>
            </div>
          </div>
        </td> */}
        <td>
          <div className="cart-subtotal pl5">{data.packageType}</div>
        </td>
        <td>
          <a
            onClick={() => {
              dispatch(removeItemFromCart(data.id))
              console.log("Remove id, " + data.id)
            }
            }
            className="cart-delete d-inline-block"
          >
            <span className="flaticon-delete" />
          </a>
        </td>
      </tr>
    </>
  );
}
