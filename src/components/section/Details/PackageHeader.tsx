import { formatPriceToDollars } from "@/utils/priceFormatter"

const PackageHeader = ({title, price, description}) => {
    return (
        <th className="col" scope="col">
            <span className="h2">
                {formatPriceToDollars(Number(price))} <small>/ onetime</small>
            </span>
            <br />
            <span className="h4">{title}</span>
            <br />
            <span className="text">
                I will redesign your current{" "}
                <br className="d-none d-lg-block" /> landing
                page or create one for{" "}
                <br className="d-none d-lg-block" /> you (upto 4
                sections)
            </span>
        </th>
    )
}