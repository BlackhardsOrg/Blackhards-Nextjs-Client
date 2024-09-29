import { HIHGEST_BIDDER, SINGLE_AUCTION } from "@/graphql";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { resultAuction } from "@/redux/features/auction/api/auctionApi";
import { IAuctionGQL } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuctionPriceWidget({ auctionData, gameFileLink, auctionId }: { auctionData: IAuctionGQL, gameFileLink: string, auctionId: string }) {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const [resultLoading, setResultLoading] = useState(false)

  const user = useAppSelector(state => state.auth.user)
  const { data, loading, error } = useQuery<{ highestBidder: { bid: number } }>(HIHGEST_BIDDER, { variables: { auctionId } })
  const handleAuctionResultance = async () => {
    setResultLoading(true)
    if (user && auctionId)
      await dispatch(resultAuction(user.email, auctionId, user.token))

    setResultLoading(false)
  }


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

          {auctionData.endTime && new Date(auctionData.endTime).getTime() < Date.now() && < Link href={"#"}
            onClick={handleAuctionResultance}

            className="ud-btn btn-thm"
          >
            Result Auction
            <i className="fal fa-arrow-right-long" />
          </Link>}

          <Link target="_blank" href={gameFileLink} className="ud-btn btn-btn-white">
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
