
import FLyLoad from "@/components/loading/FLyLoad";
import { useAppDispatch } from "@/redux/app/hooks";
import { startAuction } from "@/redux/features/auction/api/auctionApi";
import { IGameTitleGQL, IUserAuction } from "@/types";
import { timeAgo } from "@/utils";

import Link from "next/link";
import { useEffect, useState } from "react"
import { Tooltip } from "react-tooltip";

export default function ManageAuctionProjectCard({ auction }: { auction?: IUserAuction }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleEndAuction = () => {
    console.log("Auction End!")
  }

  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
            <div className="d-lg-flex px-0">
              <div className="details mb15-md-md">
                <h5 className="title mb10"><Link href={"/games/game-preview/" + auction?._id}>{auction?.gametitle.title}</Link> </h5>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-video-file fz16 vam text-thm2 me-1" />{" "}
                  {auction?.gametitle.gamePlays} bids
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {auction && auction.updatedAt && timeAgo(auction.updatedAt)}
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm text-thm">
                  <i className="flaticon-contract fz16 vam me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {auction?.started ? "Live" : "InActive"}
                </p>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span className="fz15 fw400">{auction?.gametitle.genre.map(stringText => {
            return `${stringText}, `
          })}</span>
        </td>

        <td>
          <div className="d-flex">
            <Link href={`http://localhost:3000/user/publish-game?gameId=${auction?.gametitle._id}`}
              className="icon me-2"
              id="edit"

            >
              <Tooltip anchorSelect="#edit" className="ui-tooltip" place="top">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </Link>

            {auction?.started && <button onClick={handleEndAuction}
              id="sauction"

              className="ud-btn btn-dark p-2 " type="button">End&nbsp;Auction
              </button>}
              <Tooltip anchorSelect="#sauction" className="ui-tooltip" place="top">
                One Click Tap to End Auction
              </Tooltip>

            {/* <a
              className="icon"
              id="delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <Tooltip
                anchorSelect="#delete"
                place="top"
                className="ui-tooltip"
              >
                Delete
              </Tooltip>
              <span className="flaticon-delete" />
            </a> */}
          </div>
        </td>
      </tr>
    </>
  );
}
