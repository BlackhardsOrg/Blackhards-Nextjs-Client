import { IGameTitle, IPageProgress } from "@/types";
import DashboardNavigation from "../header/DashboardNavigation";
import BasicInformation from "./BasicInformation2";
import UploadAttachment from "./UploadAttachment";
import { Dispatch, SetStateAction, useState } from "react";
import BasicInfo from "./game-upload/BasicInfo";
import PricingAndPlans from "./game-upload/PricingAndPlans";
import UploadProgressBar from "./game-upload/UploadProgressBar";
import SummaryAndPublish from "./game-upload/SummaryAndPublish";
import GameTabs from "./game-upload/GameTabs";
import FLyLoad from "@/components/loading/FLyLoad";



export default function CreateProjectInfo() {
  const [gameTitle, setGameTitle] = useState<IGameTitle>({
    developerEmail: "",
    gameFileLink: "",
    title: "",
    description: "",
    gamePlayScreenShots: [""],
    gamePlayVideo: "",
    genre: [""],
    tags: [""],
    targetPlatform: [""],
    price: 0,
    saleType: "",
    releaseDate: "",
    legal: "",
    ageRating: "",
    developerId: "",
    gameRating: 0,
    gamePlays: 0,
  })

  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState(0);

  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log(gameTitle)
    setGetPageProgress((old) => {
      const pageList = [...old]
      pageList[getCurrentPageState].isDone = true
      return pageList
    })
    let nextPageNumber = getCurrentPageState + 1 < getPageProgress.length ? getCurrentPageState + 1 : getCurrentPageState

    setCurrentPageState(nextPageNumber)
    setCurrentTab(nextPageNumber)
    setLoading(false)

  }

  const handlePrevious = () => {
    let prevPageNumber = getCurrentPageState - 1 >= 0 ? getCurrentPageState - 1 : getCurrentPageState
    console.log(getCurrentPageState, "WhatsaAAAAA", prevPageNumber)

    setCurrentPageState(prevPageNumber)
    setCurrentTab(prevPageNumber)
  }
  // #endregion Handlers


  const [getPageProgress, setGetPageProgress] = useState<IPageProgress[]>([
    { id: 0, pageText: "Basic Info", percentage: 30, isDone: false },
    { id: 1, pageText: "Pricing & Plans", percentage: 60, isDone: false },
    { id: 2, pageText: "Upload Project Files", percentage: 90, isDone: false },
    { id: 3, pageText: "Summary & Publish", percentage: 100, isDone: false },

  ])
  const [getCurrentPageState, setCurrentPageState] = useState(0)
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-8">
            <div className="dashboard_title_area">
              <h2>Publish Game</h2>
              <p className="text">Easily Share Your Creations with the World</p>
            </div>
          </div>
          {/* <div className="col-lg-3">
            <div className="text-lg-end">
              <a className="ud-btn btn-dark">
                Save &amp; Publish
                <i className="fal fa-arrow-right-long" />
              </a>
            </div>
          </div> */}
          <div className="col-md-4">
            <div className="text-start d-flex gap-1">
              <button
                disabled={loading || (getCurrentPageState == 0 && true)}
                type={"button"}
                onClick={handlePrevious}
                style={{ opacity: getCurrentPageState == 0 && true || loading ? .5 : 1 }}
                className="ud-btn btn-dark p-2 px-3" >
                {loading ? <FLyLoad /> :
                  <>
                    <span>Prev</span>
                    <i className="fal fa-arrow-left-long" />
                  </>}
              </button>

              <button onClick={(e) => {
                handleGameSubmit(e)
              }}
                type="submit"
                style={{ opacity: loading ? .5 : 1 }}
                disabled={loading}
                className="ud-btn btn-thm p-2 px-3" >
                {loading ? <FLyLoad /> :
                  <>
                    <span>{getCurrentPageState == getPageProgress.length - 1 ? "Publish" : "Save & Continue"}</span>
                    <i className="fal fa-arrow-right-long" />
                  </>}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <UploadProgressBar currentUploadPageText={getPageProgress[getCurrentPageState].pageText}
              percentage={String(getPageProgress[getCurrentPageState].percentage)} />

            <GameTabs
              loading={loading}
              setLoading={setLoading}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              gameTitle={gameTitle}
              setGameTitle={setGameTitle}
              getPageProgress={getPageProgress}
              setGetPageProgress={setGetPageProgress}
              getCurrentPageState={getCurrentPageState}
              setCurrentPageState={setCurrentPageState}

            />
          </div>
        </div>
      </div>
    </>
  );
}
