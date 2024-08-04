import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation, IGameTitle } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import TagSelect from "../../../option/TagSelect";
import SelectInputMultiple from "../../../option/SelectInputMultiple";
import PublishSummaryText from "./PublishSummaryText";
import PackagePlansSummaryTable from "./PackagePlansSummaryTable";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import PublishNavBtnGroup from "./PublishNavBtnGroup";

export default function SummaryAndPublish({
  id,
  // gameTitle,
  // setGameTitle,
  getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IBasicInformation) {

  const [loading, setLoading] = useState(false)


  const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
  const auctionLoading = useAppSelector(state => state.auction.loading.auctionStart)
  const dispatch = useAppDispatch()


  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log(gameTitle)
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
    console.log(getCurrentPageState, "WhatsaAAAAA", prevPageNumber)

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
                <PublishSummaryText labelTitle="Game Title" value={gameTitle ? gameTitle.title : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryText labelTitle="Game Description" value={gameTitle ? gameTitle.description : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryText labelTitle="Company Email" value={gameTitle ? gameTitle.developerEmail : ""} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryText labelTitle="Genre" value={gameTitle ? gameTitle.genre : []} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryText labelTitle="Tags" value={gameTitle ? gameTitle.tags : []} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryText labelTitle="Target Platform" value={gameTitle ? gameTitle.targetPlatform : []} />
              </div>

              <div className="col-sm-12">
                <PublishSummaryText labelTitle="Release Date" value={gameTitle ? gameTitle.releaseDate : ""} />
              </div>



              <div className="col-sm-12">
                <PackagePlansSummaryTable gameTitle={gameTitle} />
              </div>

              <PublishNavBtnGroup
                className={"align-items-end"}
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
