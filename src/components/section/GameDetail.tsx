import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import ServiceDetailExtra1 from "../element/ServiceDetailExtra1";
import ServiceDetailFaq1 from "../element/ServiceDetailFaq1";
import ServiceDetailPrice1 from "../element/ServiceDetailPrice1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import ServiceDetailSlider1 from "../element/ServiceDetailSlider1";
import { Sticky, StickyContainer } from "react-sticky";
import useScreen from "@/hook/useScreen";
import ServiceContactWidget1 from "../element/ServiceContactWidget1";

import { product1 } from "@/data/product";
import GameDetailSlider from "../element/GameDetailSlider";
import GameDetailPrice from "../element/GameDetailPrice";
import GameContactWidget from "../element/GameContactWidget";
import { useRouter } from "next/router";
import { SINGLE_GAME_TITLE } from "@/graphql";
import { IGameTitleGQL } from "@/types";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useAppDispatch } from "@/redux/app/hooks";
import StarRatingCardDisplay from "../dropdown/StarRatingCardDisplay";

export default function GameDetail() {
  const isMatchedScreen = useScreen(1216);
  const { query } = useRouter()
  const { id } = query;

  const dispatch = useAppDispatch()

  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ gameTitle: IGameTitleGQL }>(SINGLE_GAME_TITLE, {
    variables: {
      id
    }
  });

  return (
    <>
      <StickyContainer>
        <section className="pt10 pb90 pb30-md">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <div className="column">
                  <div className="row mb30 pb30 bdrb1">
                    <div className="col-xl-12">
                      <div className="position-relative">
                        {data && data.gameTitle ? (
                          <h2>{data.gameTitle.title}</h2>
                        ) : (
                          <h2>
                            Escape from Tarkov
                          </h2>
                        )}
                        <div className="list-meta mt30">
                          <a className="list-inline-item mb5-sm" href="#">
                            <span className="position-relative mr10">
                              <img
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                className="rounded-circle"
                                src={data && data.gameTitle && data.gameTitle.developer ? data.gameTitle.developer.profileImageURL : ""}
                                alt="Freelancer Photo"
                              />
                              <span className="online-badge"></span>
                            </span>
                            <span className="fz14"> {data && data.gameTitle && data.gameTitle.developer ? data.gameTitle.developer.studioName : "Eleanor Pena"}</span>
                          </a>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            {/* <i className="fas fa-star vam fz10 review-color me-2"></i>{" "} */}
                          
                           <StarRatingCardDisplay rating={data && data.gameTitle ? data.gameTitle.gameRating: 5}/>
                          </p>
                          {/* <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="fas fa-play vam me-2"></i>
                            700 plays
                          </p>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-website vam fz20 me-2"></i>{" "}
                            902 Views
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {data && data.gameTitle ? <GameDetailSlider gigImages={data.gameTitle.gamePlayScreenShots} /> : null}
                  <div className="service-about">
                    <h4>About</h4>
                    <p className="text mb30">
                      {data && data.gameTitle ? data.gameTitle.description : null}
                    </p>

                    <div className="d-flex align-items-start mb50">
                      <div className="list1">
                        <h6>Genre</h6>
                        <p className="text mb-0">
                          {data && data.gameTitle ? data.gameTitle.genre.map(((item, index) => `${item}, `)) : null}
                        </p>
                      </div>
                      {/* <div className="list1 ml80">
                        <h6>Design tool</h6>
                        <p className="text mb-0">Adobe XD, Figma,</p>
                        <p className="text">Adobe Photoshop</p>
                      </div> */}
                      <div className="list1 ml80">
                        <h6>Device</h6>
                        <p className="text">
                          {data && data.gameTitle ? data.gameTitle.targetPlatform.map(((item, index) => `${item}, `)) : null}
                        </p>
                      </div>
                    </div>
                    <hr className="opacity-100 mb60" />
                    <h4>Compare Packages</h4>
                    <div className="table-style2 table-responsive bdr1 mt30 mb60">
                      <table className="table table-borderless mb-0">
                        <thead className="t-head">
                          {data && data.gameTitle && data.gameTitle.plans ?
                            <tr>
                              <th className="col" scope="col" />

                              <th className="col" scope="col">
                                <span className="h2">
                                  {formatPriceToDollars(Number(data.gameTitle.plans.basic.price))} <small>/ onetime</small>
                                </span>
                                <br />
                                <span className="h4">{data.gameTitle.plans.basic.title}</span>
                                <br />
                                <span className="text">
                                  {data.gameTitle.plans.basic.description}

                                </span>
                              </th>
                              <th className="col" scope="col">
                                <span className="h2">
                                  {data && data.gameTitle ? formatPriceToDollars(Number(data.gameTitle.plans?.standard.price)) : null} <small>/ onetime</small>
                                </span>
                                <br />
                                <span className="h4">{data.gameTitle.plans.standard.title}</span>
                                <br />
                                <span className="text">
                                  {data.gameTitle.plans.standard.description}
                                </span>
                              </th>
                              <th className="col" scope="col">
                                <span className="h2">
                                  {data && data.gameTitle ? formatPriceToDollars(Number(data.gameTitle.plans?.premium.price)) : null} <small>/ onetime</small>
                                </span>
                                <br />
                                <span className="h4">{data.gameTitle.plans.premium.title}</span>
                                <br />
                                <span className="text">
                                  {data.gameTitle.plans.premium.description}
                                </span>
                              </th>
                            </tr>
                            : null}
                        </thead>
                        {data && data.gameTitle && data.gameTitle.plans ?
                          <tbody className="t-body">
                            <tr className="bgc-thm3">
                              <th scope="row">It Has an Admin Panel</th>
                              <td>
                                <a className="check_circle bgc-thm">
                                  <span className={`fas ${data.gameTitle.plans.basic.hasAdminPanel ? "fa-check" : "fa-square"} `} />
                                </a>
                              </td>
                              <td>
                                <a className="check_circle bgc-thm">
                                  <span className={`fas ${data.gameTitle.plans.standard.hasAdminPanel ? "fa-check" : "fa-square"} `} />
                                </a>
                              </td>
                              <td>
                                <a className="check_circle bgc-thm">
                                  <span className={`fas ${data.gameTitle.plans.premium.hasAdminPanel ? "fa-check" : "fa-square"} `} />
                                </a>
                              </td>
                            </tr>
                            <tr className="bgc-thm3">
                              <th scope="row">It has Documentation</th>
                              <td>
                                <a className="check_circle bgc-thm">
                                  <span className={`fas ${data.gameTitle.plans.basic.hasDocumentation ? "fa-check" : "fa-square"} `} />
                                </a>
                              </td>
                              <td>
                                <a className="check_circle bgc-thm">
                                  <span className={`fas ${data.gameTitle.plans.standard.hasDocumentation ? "fa-check" : "fa-square"} `} />
                                </a>
                              </td>
                              <td>
                                <a className="check_circle bgc-thm">
                                  <span className={`fas ${data.gameTitle.plans.premium.hasDocumentation ? "fa-check" : "fa-square"} `} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Number of Levels</th>
                              <td>{data.gameTitle.plans.basic.howManyLevels}</td>
                              <td>{data.gameTitle.plans.standard.howManyLevels}</td>
                              <td>{data.gameTitle.plans.premium.howManyLevels}</td>
                            </tr>
                            <tr className="bgc-thm3">
                              <th scope="row">Customization Requests</th>
                              <td>{data.gameTitle.plans.basic.howManyCustomizations}</td>
                              <td>{data.gameTitle.plans.standard.howManyCustomizations}</td>
                              <td>{data.gameTitle.plans.premium.howManyCustomizations}</td>
                            </tr>
                            <tr>
                              <th scope="row">How may days to Launch </th>
                              <td>{data.gameTitle.plans.basic.howLongToLaunch} Days</td>
                              <td>{data.gameTitle.plans.standard.howLongToLaunch} Days</td>
                              <td>{data.gameTitle.plans.premium.howLongToLaunch} Days</td>
                            </tr>
                            <tr className="bgc-thm3">
                              <th scope="row">Customization Charge</th>
                              <td>{formatPriceToDollars(Number(data.gameTitle.plans.basic.customizationCharge))}</td>
                              <td>{formatPriceToDollars(Number(data.gameTitle.plans.standard.customizationCharge))}</td>
                              <td>{formatPriceToDollars(Number(data.gameTitle.plans.premium.customizationCharge))}</td>
                            </tr>
                            
                          </tbody> : null}
                      </table>
                    </div>
                    <hr className="opacity-100 mb60" />
                    <h4>Frequently Asked Questions</h4>
                    <ServiceDetailFaq1 />
                    <hr className="opacity-100 mb60" />
                    {/* <h4>Add Extra Services</h4>
                    <ServiceDetailExtra1 /> */}
                    <hr className="opacity-100 mb15" />
                    <ServiceDetailReviewInfo1 />
                    <ServiceDetailComment1 />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="column">
                  {isMatchedScreen ? (
                    <Sticky>
                      {({ style }) => (
                        <div className="scrollbalance-inner" style={style}>
                          <div className="blog-sidebar ms-lg-auto">
                            <GameDetailPrice />
                            {/* <GameContactWidget /> */}
                          </div>
                        </div>
                      )}
                    </Sticky>
                  ) : (
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <GameDetailPrice />
                        {/* <GameContactWidget /> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </StickyContainer>
    </>
  );
}
