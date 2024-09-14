import { ReactNode } from "react"
import HeaderEarly from "../early/HeaderEarly"
import Footer from "../footer/Footer"

interface IHomeLayouts {
    children: ReactNode
}
const HomeLayoutsEarlyAccess = ({ children }: IHomeLayouts) => {
    return (
        <>
            <HeaderEarly />
            {children}
            <Footer />
        </>

    )
}

export default HomeLayoutsEarlyAccess