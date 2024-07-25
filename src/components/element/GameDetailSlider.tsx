import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

//@ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";

const gigImages = [
  "/images/listings/service-details-1.jpg",
  "/images/listings/service-details-1.jpg",
  "/images/listings/service-details-1.jpg",
];

export default function GameDetailSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <div className="scrollbalance-inner">
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
              <div className="icon flex-shrink-0">
                <span className="flaticon-calendar" />
              </div>
              <div className="details">
                <h5 className="title">Delivery Time</h5>
                <p className="mb-0 text">1-3 Days</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
              <div className="icon flex-shrink-0">
                <span className="flaticon-goal" />
              </div>
              <div className="details">
                <h5 className="title">English Level</h5>
                <p className="mb-0 text">Professional</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
              <div className="icon flex-shrink-0">
                <span className="flaticon-tracking" />
              </div>
              <div className="details">
                <h5 className="title">Location</h5>
                <p className="mb-0 text">New York</p>
              </div>
            </div>
          </div>
        </div>
        <div className="service-single-sldier vam_nav_style slider-1-grid owl-carousel owl-theme mb60 owl-loaded owl-drag">
          <div className="thumb p50 p30-sm">
            <Swiper
              loop={true}
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
                <SwiperSlide key={i}>
                  <img src={item} alt="gallery" className="w-100 h-auto" />
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
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper ui-service-gig-slder-bottom"
          >
            {gigImages.map((item, i) => (
              <SwiperSlide key={i}>
                <img src={item} alt="image" className="w-100" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
