import FLyLoad from "@/components/loading/FLyLoad";
import { USER_GAME_TITLES } from "@/graphql";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { startAuction } from "@/redux/features/auction/api/auctionApi";
import { IGameTitleGQL } from "@/types";
import { timeAgo } from "@/utils";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useBidTrackerContract } from "@/web3/connection/bidTrackerConnect";
import { useMarketContract } from "@/web3/connection/marketplaceConnect";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

export default function ManageProjectCard({ gametitle }: { gametitle?: IGameTitleGQL }) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const user = useAppSelector(state => state.auth.user)
  // const { startAuction: startBlockchainAuction } = useMarketContract()
  const { setAuctionSellerWallet } = useBidTrackerContract()

  const handleStartAuction = async () => {
    try {

      setLoading(true)
      if (gametitle && gametitle.auction && gametitle.auction.endTime && gametitle.auction.reservedPrice) {
        const dateInSeconds = new Date(gametitle.auction.endTime).getTime() / 1000
        console.log(dateInSeconds, "DAt$")
        toast("Connecting your wallet to this Auction");

        const data = await dispatch(startAuction({
          endTime: gametitle?.auction?.endTime,
          startTime: gametitle?.auction?.startTime,
          reservedPrice: gametitle?.auction?.reservedPrice,
          gameTitleId: gametitle?._id
        }, user.token))
        console.log(data, " DATA ")
        if (!data.data) throw new Error("Auction start did not return data")
        await setAuctionSellerWallet(data.data.auctionId)
        toast("🦄 Auction innitiation confirmed on chain!");


        setLoading(false)
      } else {
        setLoading(false)

      }

    } catch (err) {
      if (err instanceof Error)
        toast(err.message)
      setLoading(false)

    }
  }
  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
            <div className="d-lg-flex px-0">
              <div className="details mb15-md-md">
                <h5 className="title mb10"><Link href={"/games/game-preview/" + gametitle?._id}>{gametitle?.title}</Link> </h5>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-video-file fz16 vam text-thm2 me-1" />{" "}
                  {gametitle?.gamePlays} plays
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {gametitle && gametitle.updatedAt && timeAgo(gametitle.updatedAt)}
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm text-thm">
                  <i className="flaticon-contract fz16 vam me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {gametitle?.isOnSale ? "OnSale" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span className="fz15 fw400">{gametitle?.genre.map(stringText => {
            return `${stringText}, `
          })}</span>
        </td>
        <td className="vam">
          {gametitle?.saleType == "fixed" && <span className="fz14 fw400">{gametitle && gametitle.plans && formatPriceToDollars(gametitle.plans.basic.price)}/Basic</span>}
          {gametitle?.saleType == "auction" && <span className="fz14 fw400">{gametitle && gametitle.auction && gametitle.auction.reservedPrice && formatPriceToDollars(gametitle.auction.reservedPrice)}/Auction</span>}

        </td>
        <td>
          <div className="d-flex">
            <Link href={`http://localhost:3000/user/publish-game?gameId=${gametitle?._id}`}
              className="icon me-2"
              id="edit"

            >
              <Tooltip anchorSelect="#edit" className="ui-tooltip" place="top">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </Link>
            {gametitle?.saleType == "auction" && <button
              onClick={handleStartAuction}
              className="ud-btn btn-dark p-2 "
              type="button">{loading ? <FLyLoad /> : "Start Auction"}</button>}
          </div>
        </td>
      </tr>
    </>
  );
}
