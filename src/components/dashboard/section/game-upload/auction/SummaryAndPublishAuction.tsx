import { useState } from "react";

import { IBasicInformation } from "@/types";

import PackagePlansSummaryTable from "../fixed/PackagePlansSummaryTable";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import PublishSummaryTextAuction from "./PublishSummaryTextAuction";
import PublishNavBtnGroupAuction from "./PublishNavBtnGroupAuction";
import { formatPriceToDollars } from "@/utils/priceFormatter";

export default function SummaryAndPublishAuction({
  id,
  // gameTitle,
  // setGameTitle,
  getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IBasicInformation) {

  const [loading, setLoading] = useState(false)


  const auction = useAppSelector(state => state.auction.auction)
  const auctionLoading = useAppSelector(state => state.auction.loading.auctionStart)
  const dispatch = useAppDispatch()


  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    setGetPageProgress((old) => {
      const pageList = [...old]
      pageList[id].isDone = true
      return pageList
    })
    let nextPageNumber = id + 1 < getPageProgress.length ? id + 1 : id

    setCurrentPageState(nextPageNumber)
    setCurrentTab(nextPageNumber)
    setLoading(false)

  }

  const handlePrevious = () => {
    let prevPageNumber = id - 1 >= 0 ? id - 1 : id

    setCurrentPageState(prevPageNumber)
    setCurrentTab(prevPageNumber)
  }
  // #endregion Handlers


  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Summary & Publish</h5>
        </div>
        <div className="col-xl-8">
          <form onSubmit={handleGameSubmit} className="form-style1">
            <div className="row">
              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Game Title" value={auction ? auction.title : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Game Description" value={auction ? auction.description : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Company Email" value={auction ? auction.developerEmail : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Genre" value={auction ? auction.genre : []} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Tags" value={auction ? auction.tags : []} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Target Platform" value={auction ? auction.targetPlatform : []} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Release Date" value={auction ? auction.releaseDate : ""} />
              </div>

              

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Game File Link" value={auction ? auction.gameFileLink : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Gameplay Video" value={auction ? auction.gamePlayVideo : ""} />
              </div>


              <hr/>
              <h1 className="h3 text-center"> Auction Info</h1>
              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Reserved Price" value={auction && auction.reservedPrice ? formatPriceToDollars(auction.reservedPrice) : ""} />
              </div>
              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Auction Starts" value={auction ? auction.startTime : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryTextAuction labelTitle="Auction Ends" value={auction ? auction.endTime : ""} />
              </div>

              


              {/* <div className="col-sm-12">
                <PackagePlansSummaryTable gameTitle={gameTitle} />
              </div> */}

              <PublishNavBtnGroupAuction
                loading={auctionLoading}
                getCurrentPageState={getCurrentPageState}
                handlePrevious={handlePrevious}
                handleGameSubmit={handleGameSubmit}
                getPageProgress={getPageProgress} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
