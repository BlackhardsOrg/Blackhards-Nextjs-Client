import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

//@ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";
import FsLightbox from "fslightbox-react";
import { FaPlay } from "react-icons/fa";
import { IAuctionGQL } from "@/types";
import Countdown from "../section/Countdown";



export default function GameDetailSlider({ gigImages, videoUrl, auctionData }: { gigImages: string[], videoUrl: string, auctionData: IAuctionGQL }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selected, setSelected] = useState(0)
  const [toggler, settoggler] = useState(false);



  return (
    <>
      <div className="scrollbalance-inner">
        {auctionData && auctionData.endTime && <div className="col-sm-6 col-md-6">
          <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
            <div className="icon flex-shrink-0">
              <span className="flaticon-calendar" />
            </div>
            <div className="details">
              {/* <h3 className="title">01:02:11</h3> */}
              <Countdown targetDateStr={auctionData.endTime} />
              <p className="mb-0 text">Auction Deadline</p>
            </div>
          </div>
        </div>}

        <div className="service-single-sldier vam_nav_style slider-1-grid owl-carousel owl-theme mb60 owl-loaded owl-drag ">
          <div className="thumb">
            <Swiper
              // onChange={(res) => {
              //   console.log(res)
              // }}
              // onClick={(res) => {
              //   // console.log("res", res, "Clicked")
              // }}
              // onSelect={(res) => {
              //   console.log("res", res, "Slected")
              // }}
              onSlideChange={(res) => {
                console.log(res, "SLIDE CHANGE")
                setSelected(res.activeIndex)
              }}


              loop={false}
              spaceBetween={10}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >

              {gigImages.map((item, i) => (
                <SwiperSlide key={i} className="p-1">
                  <div className="item">
                    <div className="row align-items-center ">
                      <div className="col-lg-5 col-xl-5 w-100">
                        <div className="position-relative "></div>
                        <img src={item} alt="gallery" className="w-100 rounded" style={{ height: "70vh", objectFit: "cover" }} />
                        {i == 0 && <div
                          className="video-button-home11 at-home13 popup-iframe popup-youtube"
                          onClick={() => settoggler((pre) => !pre)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="far fa-play"></i>
                        </div>}
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button type="button" className="prev-btn">
            <i className="far fa-arrow-left-long" />
          </button>
          <button type="button" className="next-btn">
            <i className="far fa-arrow-right-long" />
          </button>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={false}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper ui-service-gig-slder-bottom"
          >

            {gigImages.map((item, i) => (
              <SwiperSlide key={i}>
                <img style={{ objectFit: "cover", height: "100%" }}
                  src={item} alt="image"
                  className={`swipe-image w-100  ${selected == i && "border-bh-success"} `} />
                {i == 0 && <div
                  className="video-button-click at-home13 popup-iframe popup-youtube d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  <FaPlay />
                </div>}

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div >
      <FsLightbox
        toggler={toggler}
        sources={[videoUrl]}
      />
    </>
  );
}
