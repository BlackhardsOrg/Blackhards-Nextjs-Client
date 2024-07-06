import { ReactNode } from "react"
import Header19 from "../early/Header19"
import Footer from "../footer/Footer"
import Header1 from "../header/Header1"
import Header14 from "../header/Header14"
import Header3 from "../header/Header3"
import Header4 from "../header/Header4"

interface IHomeLayouts {
    children: ReactNode
}
const MarketLayouts = ({ children }: IHomeLayouts) => {
    return (
        <>
            <Header4 />
            {children}
            <Footer />
        </>

    )
}

export default MarketLayouts