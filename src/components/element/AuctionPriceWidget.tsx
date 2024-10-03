import { HIHGEST_BIDDER, SINGLE_AUCTION } from "@/graphql";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { confirmAuction, resultAuction } from "@/redux/features/auction/api/auctionApi";
import { IAuctionGQL, IGameTitleGQL } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { ApolloQueryResult, OperationVariables, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FLyLoad from "../loading/FLyLoad";
import { useMarketContract } from "@/web3/connection/marketplaceConnect";
import { toast } from "react-toastify";
import { useBidTrackerContract } from "@/web3/connection/bidTrackerConnect";
interface IAuctionPriceWidget {
  auctionData: IAuctionGQL, demoLink: string, gametitleId: string, auctionId: string, refetchGame: () => void
}

export default function AuctionPriceWidget({ auctionData, demoLink, auctionId, refetchGame, gametitleId }: IAuctionPriceWidget) {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const [dataLoading, setDataLoading] = useState(false)

  const { FulfillBid: fulfillBid, confirmPaidAuction } = useBidTrackerContract()

  const user = useAppSelector(state => state.auth.user)
  const { data, refetch } = useQuery<{ highestBidder: { bid: number, bidderEmail: string, sellerEmail: string } }>(HIHGEST_BIDDER, { variables: { auctionId } })
  const bidPlaced = useAppSelector(state => state.auction.bidPlaced)

  // const fetchUpMinimumBid = async (auctionId) => {
  //   const data = await fetchMinimumBid(auctionId)
  //   if (data && data.success) {
  //     setMinimumBid(data.data)
  //     setBidAmount(data.data)
  //   }
  //   toast(data)
  // }

  useEffect(() => {
    refetch({ auctionId })
    console.log(bidPlaced, "BID CHANGED")
  }, [bidPlaced])

  useEffect(() => {
    console.log(data, "HIGHEST BIDDER")
  }, [data])

  const handleAuctionResultance = async () => {
    try {
      console.log("called", auctionData, auctionData.gameTitleId, auctionId)
      setDataLoading(true)


      if (user && auctionId && auctionData && gametitleId && data && data.highestBidder) {
        if (user.email != data.highestBidder.bidderEmail) {
          setDataLoading(true)
          throw new Error("You are Not the Highest bidder")
        }
        const txn = await fulfillBid(auctionId, data.highestBidder.sellerEmail, data.highestBidder.bid, true, user.id, gametitleId)

        console.log(txn, "CHEKCK TXN")
        const fetchedData = await dispatch(resultAuction(user.email, auctionId, user.token, txn.hash))
      }

      setDataLoading(false)
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        toast(err.message)
      }
      setDataLoading(false)

    }
  }

  const handleAuctionConfirmation = async () => {
    try {

      if (user && auctionId) {
        setDataLoading(true)
        await confirmPaidAuction(auctionId)
        await dispatch(confirmAuction(auctionId, user.token))
        setDataLoading(false)
      }

    } catch (err) {
      setDataLoading(false)

    }
  }

  useEffect(() => {
    // console.log(auctionData, "AUCTION DATa", dataLoading)
  }, [auctionData])
  return (
    <>
      {auctionData ? <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">{data && data.highestBidder && data.highestBidder.bid > 0 ? formatPriceToDollars(data.highestBidder.bid) : formatPriceToDollars(auctionData.reservedPrice)}</h3>
        <p className="text fz14">Current Bid</p>

        <div className="list-style1">
          <ul>
            <li>
              <i className="far fa-check text-thm3 bgc-thm3-light" />
              <small>Includes Live Game Ownership Transfer</small>
            </li>
          </ul>
        </div>
        <div className="d-grid gap-4">
          {auctionData.endTime && new Date(auctionData.endTime).getTime() > Date.now() && < Link
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            Place Bid
            <i className="fal fa-arrow-right-long" />
          </Link>}

          {auctionData.endTime && new Date(auctionData.endTime).getTime() < Date.now() && !auctionData.resulted && < Link href={"#"}
            onClick={handleAuctionResultance}

            className="ud-btn btn-thm"
          >
            {dataLoading ? <FLyLoad /> : <> Make Payment
              <i className="fal fa-arrow-right-long" /></>}
          </Link>}

          {auctionData.resulted && !auctionData.confirmed && < Link href={"#"}
            onClick={handleAuctionConfirmation}

            className="ud-btn btn-thm"
          >
            {dataLoading ? <FLyLoad /> : <> Confirm Auction
              <i className="fal fa-arrow-right-long" /></>}
          </Link>}

          <Link target="_blank" href={demoLink} className="ud-btn btn-btn-white">
            Play Game Demo
            <i className="fa fa-gamepad" />
          </Link>
          {/* <Link
            // data-bs-toggle="modal"
            href="/shop-checkout"
            className="ud-btn btn-thm"
          >
            Redeem Bid
            <i className="fal fa-arrow-right-long" />
          </Link> */}
        </div>
      </div > : null
      }
    </>
  );
}
