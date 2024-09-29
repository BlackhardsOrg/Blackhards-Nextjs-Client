import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// @ts-ignore
import { Navigation, Pagination } from "swiper";


import { useEffect, useState } from "react";
import shopStore from "@/store/shopStore";
import { useRouter } from "next/router";
import Link from "next/link";
import { IPopularGameSlideCard } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { addItemToCart } from "@/redux/features/cart/slice/cartSlice";
import StarRatingCardDisplay from "../dropdown/StarRatingCardDisplay";
import Countdown from "../section/Countdown";
import GeneralCountdown from "../section/GeneralCountdown";
import { HIHGEST_BIDDER } from "@/graphql";
import { useQuery } from "@apollo/client";
import { formatPriceToDollars } from "@/utils/priceFormatter";

export default function PopularGameSlideCard({
  data,
  style = "",
  isContentExpanded,
}: IPopularGameSlideCard) {

  const { data: highestBid, loading, error } = useQuery<{ highestBidder: { bid: number } }>(HIHGEST_BIDDER, { variables: { auctionId: data.auctionId } })

  const [isFavActive, setFavActive] = useState(false);
  const { pathname } = useRouter();

  const cartItems = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()

  const navigate = useRouter().push;

  const addToCartHandler = (product: any) => {
    // addToCart(product);
    if (data.plans)
      dispatch(addItemToCart({
        title: product.title,
        price: data.plans?.basic.price,
        GamePlayScreenShot: data.gamePlayScreenShots[0],
        id: data._id, qty: 1,
        packageType: "basic"
      }))
    navigate("/market/cart");
  };

  const isAdded = cartItems.some((product: any) => product.id === data._id);

  return (
    <>
      <div
        className={`listing-style1 ${pathname === "/home-7" ? "style5" : ""} 
                ${pathname === "/home-2" ||
            pathname === "/home-9" ||
            pathname === "/home-16" ||
            pathname === "/home-14"
            ? "default-box-shadow1 bdrs16"
            : ""
          } 
                ${style}`}
        style={
          pathname === "/home-20" ? { border: "none", boxShadow: "none" } : {}
        }
      >
        <div className="list-thumb">
          <div className="listing-thumbIn-slider position-relative navi_pagi_bottom_center slider-1-grid">
            <div className="item">
              <Swiper
                navigation={{
                  prevEl: ".btn__prev__005",
                  nextEl: ".btn__next__005",
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                loop={true}
                pagination={{
                  el: ".swiper__pagination__005",
                  clickable: true,
                }}
              >
                {data?.gamePlayScreenShots?.map((item: any, index: any) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-100 object-fit-cover"
                      style={{ height: "15rem" }}
                      src={item}
                      alt="thumbnail"
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper__parent">
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <button className="swiper__btn swiper__btn-2 btn__prev__005">
                        <i className="far fa-arrow-left-long" />
                      </button>
                    </div>
                    <div className="col-auto">
                      <div className="swiper__pagination swiper__pagination-2 swiper__pagination__005"></div>
                    </div>
                    <div className="col-auto">
                      <button className="swiper__btn swiper__btn-2 btn__next__005">
                        <i className="far fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </Swiper>

              <a
                onClick={() => setFavActive(!isFavActive)}
                className={`listing-fav fz12 z-1 ${isFavActive ? "ui-fav-active" : ""
                  }`}
              >
                <span className="far fa-heart" />
              </a>
            </div>
          </div>
        </div>
        <div className={`list-content ${isContentExpanded ? "px-0" : ""}`}>
          <p className="list-text body-color fz14 mb-1">{data.genre.map(item => `${item != "all" ? item + ", " : ""} `)}</p>
          <h5 className="list-title">
            <Link href={`/games/game-preview/${data._id}`}>{data.title}</Link>
          </h5>
          <div className="review-meta d-flex align-items-center">
            {/* <i className="fas fa-star fz10 review-color me-2" />
            <p className="mb-0 body-color fz14">
              <span className="dark-color me-2">{data.gameRating}</span>
              {data.gamePlays} reviews
            </p> */}

            <StarRatingCardDisplay rating={data.gameRating} />
          </div>
          <hr className="my-2" />
          <div className="list-meta d-flex justify-content-between align-items-center mt15">
            <div className="budget">
              <p className="mb-0 body-color">
                {data.auctionData ? "Current Bid" : "Market Price"}
                {!data.auctionData ? <span className="fz17 fw500 dark-color ms-1">
                  {data.plans && formatPriceToDollars(data.plans.basic.price)}
                </span> : <small className="fz17 fw500 dark-color ms-1">
                  {highestBid && highestBid.highestBidder && highestBid.highestBidder.bid > 0 ? formatPriceToDollars(highestBid.highestBidder.bid) : data.auctionData && formatPriceToDollars(data.auctionData.reservedPrice)}
                </small>}
              </p>
            </div>
          </div>
        </div>
        {!data.auctionData && <a
          onClick={() => addToCartHandler(data)}
          className={`ud-btn ${isAdded ? "btn-thm2" : "btn-light-thm"}`}
        >
          <>{isAdded ? "Added to Cart" : "Add to cart"}
            <i className="fal fa-arrow-right-long" /></>

        </a>}

        {data.auctionData && <Link href={`/games/game-preview/${data._id}`}
          className={`ud-btn ${isAdded ? "btn-thm2" : "btn-light-thm"}`}
        >
          <GeneralCountdown targetDateStr={data.auctionData.endTime} />
        </Link>}
      </div >
    </>
  );
}
