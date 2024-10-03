import { useQuery } from "@apollo/client"
import TopBidCard from "../card/TopBidCard"
import { BID_HISTORIES } from "@/graphql"
import { useEffect } from "react"
import { IBidHistory } from "@/types"
import { useAppSelector } from "@/redux/app/hooks"


const TopBidsPanel = ({ auctionId }: { auctionId: string }) => {
    const { data, loading, error, refetch } = useQuery<{ bids: IBidHistory[] }>(BID_HISTORIES, { variables: { auctionId } })
    const bidPlaced = useAppSelector(state => state.auction.bidPlaced)
    useEffect(() => {
        refetch({ auctionId })
        console.log(bidPlaced, "BID CHANGED")
    }, [bidPlaced])
    return (
        <>
            <h4 className="mb30">Top Bids ({data && data.bids && data.bids.length})</h4>
            <div className="row">

                <div className="col-md-6 col-lg-12">
                    {
                        data && data.bids.slice().reverse().map((item, index) => {
                            return (
                                <TopBidCard key={index}
                                    data={item} />
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default TopBidsPanel