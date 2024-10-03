import { SINGLE_GAME_TITLE } from "@/graphql";
import { useAppDispatch } from "@/redux/app/hooks";
import { addItemToCart } from "@/redux/features/cart/slice/cartSlice";
import { IGameTitleGQL } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const tabs = ["Basic", "Standard", "Premium"];

export default function GameDetailPrice() {
  const [getTab, setTab] = useState(0);

  const { query } = useRouter()
  const { id } = query;

  const dispatch = useAppDispatch()
  const removeTypename = (obj: any) => {
    const { __typename, ...rest } = obj;
    return rest;
  };

  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ gameTitle: IGameTitleGQL }>(SINGLE_GAME_TITLE, {
    variables: {
      id
    }
  });


  return (
    <>
      <div className="price-widget">
        <div className="navtab-style1">
          <nav>
            <div className="nav nav-tabs mb20">
              {tabs.map((item, i) => (
                <button
                  onClick={() => setTab(i)}
                  key={i}
                  className={`nav-link fw500 ${getTab === i ? "active" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>
          {data && data.gameTitle && data.gameTitle.plans ?
            <div className="tab-content" id="nav-tabContent">
              {/*  */}
              {Object.keys(removeTypename(data.gameTitle.plans)).map((item: string, index) => {
                return (

                  <div key={index} className={`price-content ${getTab !== index && "d-none"}`}>
                    { }
                    <div className="price">{data.gameTitle.plans && formatPriceToDollars(data.gameTitle.plans[item].price)} </div>
                    <div className="h5 mb-2">High-Quality</div>
                    <p className="text fz14">
                      {data.gameTitle.plans && data.gameTitle.plans[item].description}
                    </p>
                    <hr className="opacity-100 mb20" />
                    <ul className="p-0 mb15 d-sm-flex align-items-center">
                      <li className="fz14 fw500 dark-color">
                        <i className="flaticon-sandclock fz20 text-thm2 me-2 vam" />
                        Launch in {data.gameTitle.plans && data.gameTitle.plans[item].howLongToLaunch} days
                      </li>
                      <li className="fz14 fw500 dark-color ml20 ml0-xs">
                        <i className="flaticon-recycle fz20 text-thm2 me-2 vam" />
                        {data.gameTitle.plans && data.gameTitle.plans[item].howManyCustomizations}&nbsp;Customizations
                      </li>
                    </ul>
                    <div className="list-style1">
                      <ul>
                        <li className="mb15">
                          <i className="far fa-check text-thm3 bgc-thm3-light" />
                          {data.gameTitle.plans && data.gameTitle.plans[item].howManyLevels}&nbsp;Levels
                        </li>
                        {data.gameTitle.plans && data.gameTitle.plans[item].hasAdminPanel ?
                          <li>
                            <i className="far fa-check text-thm3 bgc-thm3-light" />
                            Admin Panel
                          </li> : null
                        }

                        {data.gameTitle.plans && data.gameTitle.plans[item].hasDocumentation ?
                          <li>
                            <i className="far fa-check text-thm3 bgc-thm3-light" />
                            Comes with Documentation
                          </li> : null
                        }

                      </ul>
                    </div>
                    <div className="d-grid gap-3">
                      <Link href={"/market/cart"}
                        onClick={() => {
                          if (data.gameTitle && data.gameTitle.plans)
                            dispatch(addItemToCart({
                              id: data.gameTitle._id,
                              title: data.gameTitle.title,
                              price: data.gameTitle.plans[item].price,
                              GamePlayScreenShot: data.gameTitle.gamePlayScreenShots[0],
                              packageType: item, qty: 1
                            }))
                        }}
                        className="ud-btn btn-thm">
                        Buy Now {data.gameTitle.plans && formatPriceToDollars(data.gameTitle.plans[item].price)}
                        <i className="fal fa-arrow-right-long" />
                      </Link>

                      <a onClick={() => {
                        if (data.gameTitle && data.gameTitle.plans)
                          dispatch(addItemToCart({
                            id: data.gameTitle._id,
                            title: data.gameTitle.title,
                            price: data.gameTitle.plans[item].price,
                            GamePlayScreenShot: data.gameTitle.gamePlayScreenShots[0],
                            packageType: item, qty: 1
                          }))
                      }} className="ud-btn btn-gray">
                        Add to cart
                        <i className="fa fa-shopping-cart" />
                      </a>

                      <Link target="_blank" href={data.gameTitle.demoLink} className="ud-btn btn-btn-white">
                        Play Game Demo
                        <i className="fa fa-gamepad" />
                      </Link>
                    </div>
                  </div>
                )
              })}
              {/*  */}
            </div> : null}
        </div>
      </div>
    </>
  );
}
