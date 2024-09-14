import { ReactNode } from "react"
import HeaderEarly from "../early/HeaderEarly"
import Footer from "../footer/Footer"
import AuthHeader from "../early/AuthHeader"

interface IHomeLayouts {
    children: ReactNode
}
const AuthLayouts = ({ children }: IHomeLayouts) => {
    return (
        <>
            <AuthHeader />
            {children}
            <Footer />
        </>

    )
}

export default AuthLayouts