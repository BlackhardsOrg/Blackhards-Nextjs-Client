import { useAppSelector } from "@/redux/app/hooks"
import Link from "next/link"

const CartNavButton = () => {
    const cart = useAppSelector(state => state.cart.items)
    return (
        <Link className=" cart-container login-info d-flex gap-1 cursor-pointer" href="/market/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
            {cart.length > 0 ? <div className="cart-count bg-success text-light">{cart.length}</div> : null}
        </Link>
    )
}

export default CartNavButton