import { SINGLE_GAME_TITLE } from "@/graphql";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { fetchMinimumBid, PlaceBidOnAuction } from "@/redux/features/auction/api/auctionApi";
import { IGameTitleGQL } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FLyLoad from "../loading/FLyLoad";

export default function PlaceBidModal() {
  const navigate = useRouter().push;
  const dispatch = useAppDispatch()
  const [bidAmount, setBidAmount] = useState(0)
  const [minimumBid, setMinimumBid] = useState(0)
  const user = useAppSelector(state => state.auth.user)
  const [getLoading, setLoading] = useState(false)



  const router = useRouter()
  const { id } = router.query

  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ gameTitle: IGameTitleGQL }>(SINGLE_GAME_TITLE, {
    variables: {
      id
    }
  });

  const fetchUpMinimumBid = async (auctionId) => {
    const data = await fetchMinimumBid(auctionId)
    if (data && data.success) {
      setMinimumBid(data.data)
      setBidAmount(data.data)
    }
    toast(data)
    console.log(data, "CHECK DATA")
  }

  useEffect(() => {
    //fetch minimumBid
    if (data?.gameTitle && data?.gameTitle.auctionId)
      fetchUpMinimumBid(data.gameTitle.auctionId)
  }, [data?.gameTitle.auctionId])

  const handlePlaceBid = async (e) => {
    setLoading(true)
    if (bidAmount < minimumBid) {
      toast("Bid Amount must Exceed Minimum Bid!")
      setLoading(false)

      return
    }
    if (data?.gameTitle.auctionId)
      await dispatch(PlaceBidOnAuction(bidAmount, data?.gameTitle.auctionId, user.token))
    setLoading(false)

  }

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value)
  }

  return (
    <>
      <div className="search-modal">
        <div
          className="modal fade"
          id="placeBidModalToggle"
          aria-hidden="true"
          aria-labelledby="placeBidModalToggle"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="placeBidModalToggleLabel" />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fal fa-xmark" />
                </button>
              </div>
              <div className="modal-body d-flex flex-column gap-3 bg-white rounded ">
                <h3>Place a Bid</h3>

                <small>Min Bid: {formatPriceToDollars(minimumBid)}</small>
                <div className="popup-search-field search_area">
                  <input
                    type="number"
                    value={bidAmount}
                    className="form-control border-0"
                    placeholder="Bid Amount"
                    onChange={handleBidAmountChange}
                  />
                  <label>
                    <span className="fa fa-gavel" />
                  </label>

                </div>
                <button
                  onClick={handlePlaceBid}
                  className="ud-btn btn-thm"
                  type="submit"
                >
                  {getLoading ? <FLyLoad /> : "Place Bid"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
