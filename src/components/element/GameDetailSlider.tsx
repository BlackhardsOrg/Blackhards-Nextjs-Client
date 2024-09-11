import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

//@ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";

// const gigImages = [
//   "/images/listings/service-details-1.jpg",
//   "/images/listings/service-details-1.jpg",
//   "/images/listings/service-details-1.jpg",
// ];

export default function GameDetailSlider({ gigImages }: { gigImages: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    console.log(gigImages, "GIG IMAgES", thumbsSwiper)
  }, [gigImages, thumbsSwiper])

  return (
    <>
      <div className="scrollbalance-inner">

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
                  <img src={item} alt="gallery" className="w-100 rounded" />
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
                <img style={{ objectFit: "cover", height: "100%" }} src={item} alt="image" className={`swipe-image w-100  ${selected == i && "border-bh-success"} `} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div >
    </>
  );
}
