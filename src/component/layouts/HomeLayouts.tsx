import { ReactNode } from "react"
import Header19 from "../early/Header19"
import Footer from "../footer/Footer"

interface IHomeLayouts {
    children: ReactNode
}
const HomeLayouts = ({ children }: IHomeLayouts) => {
    return (
        <>
            <Header19 />
            {children}
            <Footer />
        </>

    )
}

export default HomeLayouts