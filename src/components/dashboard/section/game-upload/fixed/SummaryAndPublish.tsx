import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation } from "@/types";

import PublishSummaryText from "./PublishSummaryText";
import PackagePlansSummaryTable from "./PackagePlansSummaryTable";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import PublishNavBtnGroup from "./PublishNavBtnGroup";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { FaPlay } from "react-icons/fa";

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

  const isOfferingPackagedPlans = useAppSelector(state => state.gametitle.isOfferingPackagedPlans)
  const [getIsOfferingPackagedPlans, setIsOfferingPackagedPlans] = useState(isOfferingPackagedPlans ? isOfferingPackagedPlans : true)


  useEffect(() => {


    if (isOfferingPackagedPlans) {
      setIsOfferingPackagedPlans(isOfferingPackagedPlans)
    }

  }, [isOfferingPackagedPlans])


  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Summary & Publish</h5>
        </div>
        <div className="col-xl-8">
          <form onSubmit={handleGameSubmit} className="form-style1">
            <div className="row gap-5">
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
                <h5>Game Play Screen shots</h5>
                <Swiper
                  // onSwiper={setThumbsSwiper}
                  loop={false}
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper ui-service-gig-slder-bottom"
                >

                  {gameTitle && gameTitle.gamePlayScreenShots ? gameTitle.gamePlayScreenShots.map((item, i) => (
                    <SwiperSlide key={i}>
                      <img style={{ objectFit: "cover", height: "100%" }}
                        src={item} alt="image"
                        className={`swipe-image w-100 `} />
                      {/* {i == 0 && <div
                        className="video-button-click at-home13 popup-iframe popup-youtube d-flex align-items-center justify-content-center"
                        style={{ cursor: "pointer" }}
                      >
                        <FaPlay />
                      </div>} */}

                    </SwiperSlide>
                  )) : null}
                </Swiper>
              </div>

              <div className="col-sm-12">
                <h5>Game Play Video</h5>
                {/* <PublishSummaryText labelTitle="Release Date" value={gameTitle ? gameTitle.releaseDate : ""} /> */}
                <Link href={gameTitle && gameTitle.gamePlayVideo ? gameTitle.gamePlayVideo : "#"}>{gameTitle && gameTitle.gamePlayVideo ? gameTitle.gamePlayVideo : "No Link"}</Link>
              </div>

              <div className="col-sm-12">
                <h5>Demo Link</h5>
                {/* <PublishSummaryText labelTitle="Release Date" value={gameTitle ? gameTitle.releaseDate : ""} /> */}
                <Link href={gameTitle && gameTitle.gamePlayVideo ? gameTitle.gameFileLink : "#"}>
                  {gameTitle && gameTitle.gamePlayVideo ? gameTitle.gamePlayVideo : "No demo link"}{/*should be game demo link*/}
                </Link>

              </div>



              {getIsOfferingPackagedPlans == "yes" && <div className="col-sm-12">
                <PackagePlansSummaryTable gameTitle={gameTitle} />
              </div>}

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
