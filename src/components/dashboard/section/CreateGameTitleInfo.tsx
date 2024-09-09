import { IGameTitle, IPageProgress, IPlans } from "@/types";
import DashboardNavigation from "../header/DashboardNavigation";
import BasicInformation from "./BasicInformation2";
import UploadAttachment from "./game-upload/fixed/UploadAttachment";
import { Dispatch, SetStateAction, useState } from "react";
import BasicInfo from "./game-upload/fixed/BasicInfo";
import PricingAndPlans from "./game-upload/fixed/PricingAndPlans";
import UploadProgressBar from "./game-upload/fixed/UploadProgressBar";
import SummaryAndPublish from "./game-upload/fixed/SummaryAndPublish";
import GameTabs from "./game-upload/fixed/GameTabs";
import FLyLoad from "@/components/loading/FLyLoad";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { createGameTitle } from "@/redux/features/gametitle/api/gameTitleApi";
import PublishNavBtnGroup from "./game-upload/fixed/PublishNavBtnGroup";




export default function CreateGameTitleInfo() {
  const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
  const user = useAppSelector(state => state.auth.user)

  const loading = useAppSelector(state => state.gametitle.loading.gameTitleCreate)


  const dispatch = useAppDispatch()
  const [currentTab, setCurrentTab] = useState(0);

  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setGetPageProgress((old) => {
      const pageList = [...old]
      pageList[getCurrentPageState].isDone = true
      return pageList
    })
    let nextPageNumber = getCurrentPageState + 1 < getPageProgress.length ? getCurrentPageState + 1 : getCurrentPageState
    if (nextPageNumber == 3 && user) {
      setCurrentPageState(nextPageNumber)
      setCurrentTab(nextPageNumber)
    }
    if (getCurrentPageState == 3 && user) {
      setCurrentPageState(nextPageNumber)
      setCurrentTab(nextPageNumber)
      dispatch(createGameTitle({
        ...gameTitle,
        saleType: "fixed",
        genre: [...gameTitle.genre, "all"],
        gamePlayVideo: "https://res.cloudinary.com/norvirae/video/upload/v1700744027/y2mate.com_-_Farlight_84_Official_Gameplay_Launch_Trailer_Farlight_84_720p_2_uvtz1i.mp4",
        gamePlayScreenShots: [
          "https://res.cloudinary.com/norvirae/image/upload/v1700743677/dhsqpz5iebyzwg0g8s92.jpg",
          "https://res.cloudinary.com/norvirae/image/upload/v1700571324/test-image-1_kmdrlc.jpg"
        ]
      }, user.token))
    } else {

      setCurrentPageState(nextPageNumber)
      setCurrentTab(nextPageNumber)
    }

  }

  const handlePrevious = () => {
    let prevPageNumber = getCurrentPageState - 1 >= 0 ? getCurrentPageState - 1 : getCurrentPageState

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
          <div className="col-lg-4">
            <div className="dashboard_title_area">
              <h2>Publish Game</h2>
              <p className="text">Easily Share Your Creations with the World</p>
            </div>
          </div>

          <PublishNavBtnGroup
            className="justify-content-end"
            loading={loading}
            getCurrentPageState={getCurrentPageState}
            handlePrevious={handlePrevious}
            handleGameSubmit={handleGameSubmit}
            getPageProgress={getPageProgress} />
        </div>
        <div className="row">
          <div className="col-xl-12">
            <UploadProgressBar currentUploadPageText={getPageProgress[getCurrentPageState].pageText}
              percentage={String(getPageProgress[getCurrentPageState].percentage)} />

            <GameTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              // gameTitle={gameTitle}
              // setGameTitle={setGameTitle}
              getPageProgress={getPageProgress}
              setGetPageProgress={setGetPageProgress}
              getCurrentPageState={getCurrentPageState}
              setCurrentPageState={setCurrentPageState}

            />
          </div>
        </div>
      </div >
    </>
  );
}
