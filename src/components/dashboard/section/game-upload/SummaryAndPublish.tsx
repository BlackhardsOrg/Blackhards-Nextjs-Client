import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation, IGameTitle } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import TagSelect from "../../option/TagSelect";
import SelectInputMultiple from "../../option/SelectInputMultiple";
import PublishSummaryText from "./PublishSummaryText";

export default function SummaryAndPublish({
  id,
  gameTitle,
  setGameTitle, getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IBasicInformation) {

  const [loading, setLoading] = useState(false)





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
                  <PublishSummaryText labelTitle="Game Title" value={gameTitle.title} />
              </div>

              <div className="col-sm-12">
                  <PublishSummaryText labelTitle="Game Description" value={gameTitle.description} />
              </div>

              <div className="col-sm-12">
                  <PublishSummaryText labelTitle="Company Email" value={gameTitle.developerEmail} />
              </div>

              <div className="col-sm-12">
                  <PublishSummaryText labelTitle="Genre" value={gameTitle.genre} />
              </div>

              <div className="col-sm-12">
                  <PublishSummaryText labelTitle="Tags" value={gameTitle.tags} />
              </div>

              <div className="col-sm-12">
                  <PublishSummaryText labelTitle="Target Platform" value={gameTitle.targetPlatform} />
              </div>

              <div className="col-sm-12">
                  <PublishSummaryText labelTitle="Release Date" value={gameTitle.releaseDate} />
              </div>

              


              <div className="col-md-12">
                <div className="text-start d-flex gap-1">
                  <button type={"button"} onClick={handlePrevious} style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-dark" >
                    {loading ? <FLyLoad /> :
                      <>
                        <span>Prev</span>
                        <i className="fal fa-arrow-left-long" />
                      </>}
                  </button>

                  <button type="submit" style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-thm" >
                    {loading ? <FLyLoad /> :
                      <>
                        <span>{id == getPageProgress.length - 1 ? "Publish" : "Save & Continue"}</span>
                        <i className="fal fa-arrow-right-long" />
                      </>}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
