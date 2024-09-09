import { ReactNode } from "react"
import Footer from "../footer/Footer"
import Header14 from "../header/Header14"

interface IHomeLayouts {
    children: ReactNode
}
const HomeLayoutsMain = ({ children }: IHomeLayouts) => {
    return (
        <>
            <Header14/>
            {children}
            <Footer />
        </>

    )
}

export default HomeLayoutsMain