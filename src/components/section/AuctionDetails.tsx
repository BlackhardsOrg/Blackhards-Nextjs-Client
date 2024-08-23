import { project1, projectProposal1 } from "@/data/product";
import TopBidCard from "../card/TopBidCard";
import ServiceDetailExtra1 from "../element/ServiceDetailExtra1";
import { Sticky, StickyContainer } from "react-sticky";
import AuctionPriceWidget from "../element/AuctionPriceWidget";
import AuctionContactWidget from "../element/AuctionContactWidget";
import useScreen from "@/hook/useScreen";

import AuctionDetailSlider from "../element/AuctionDetailSlider";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { IAuction, IAuctionGQL, IGameTitleGQL } from "@/types";
import { SINGLE_AUCTION } from "@/graphql";
import { useEffect } from "react";
import { timeAgo } from "@/utils";

const skills = [
  "SaaS",
  "Figma",
  "Software Design",
  "Sketch",
  "Prototyping",
  "HTML5",
  "Design",
  "Writing",
];

export default function AuctionDetails() {
  const isMatchedScreen = useScreen(1216);
  // const {query} = useRouter()
  // const { id } = query;

  // const data = project1.find((item: any) => item.id == id);

  const { query } = useRouter()
  const { id } = query;

  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ auction: IAuctionGQL }>(SINGLE_AUCTION, {
    variables: {
      id
    }
  });
  useEffect(() => {
    console.log(data, "SINGLE DATA")
  }, [loading, data])

  return (
    <>
      <StickyContainer>
        <section className="pt30">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <div className="cta-service-v1 mb30 freelancer-single-v1 pt60 pb60 bdrs16 position-relative overflow-hidden d-flex align-items-center">
                  <img
                    className="left-top-img wow zoomIn"
                    src="/images/vector-img/left-top.png"
                    alt=""
                  />
                  <img
                    className="right-bottom-img wow zoomIn"
                    src="/images/vector-img/right-bottom.png"
                    alt=""
                  />

                  <div className="row wow fadeInUp">
                    <div className="col-xl-12">
                      <div className="position-relative pl60 pl20-sm">
                        {data && data.auction ? (
                          <h2>{data.auction?.gametitle?.title}</h2>
                        ) : (
                          <h2>Ghost From Idemili</h2>
                        )}
                        {data && data.auction ? <div className="list-meta mt15">
                          <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                            <i className="flaticon-place vam fz20 text-thm2 me-2"></i>{" "}
                            London, UK
                          </p>
                          <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                            <i className="flaticon-calendar text-thm2 vam fz20 me-2"></i>{" "}
                            {timeAgo(data.auction.startTime)}

                          </p>
                          <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                            <i className="flaticon-website text-thm2 vam fz20 me-2"></i>{" "}
                            {data.auction?.gametitle?.gamePlays} Plays
                          </p>
                        </div> : null}
                      </div>
                    </div>
                  </div>
                </div>
                <AuctionDetailSlider />

                <div className="column">
                  <div className="scrollbalance-inner">
                    <div className="row">
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-notification-1" />
                          </div>
                          <div className="details">
                            <h5 className="title">Seller Type</h5>
                            <p className="mb-0 text">Company</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-dollar" />
                          </div>
                          <div className="details">
                            <h5 className="title">Project type</h5>
                            <p className="mb-0 text">Hourly</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-fifteen" />
                          </div>
                          <div className="details">
                            <h5 className="title">Project Duration</h5>
                            <p className="mb-0 text">10-15 Hours</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-like-1" />
                          </div>
                          <div className="details">
                            <h5 className="title">Project Level</h5>
                            <p className="mb-0 text">Expensive</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-translator" />
                          </div>
                          <div className="details">
                            <h5 className="title">Languages</h5>
                            <p className="mb-0 text">20</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
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
                    </div>
                    <div className="service-about">
                      <h4>Description</h4>
                      <p className="text mb30">
                        { }
                      </p>
                      {data && data.auction ? <p className="text mb30">
                        {data.auction?.gametitle?.description}
                      </p> : null}
                      <hr className="opacity-100 mb60 mt60" />

                      <h4 className="mb30">Genre</h4>
                      {data && data.auction ? <div className="mb60">
                        {data.auction?.gametitle?.genre.map((item, i) => (
                          <a
                            key={i}
                            className={`tag list-inline-item mb-2 mb-xl-0 ${Number(item.length) === 7 ? "mr0" : "mr10"
                              }`}
                          >
                            {item}
                          </a>
                        ))}
                      </div> : null}
                      <hr className="opacity-100 mb60" />
                      <h4 className="mb30">Top Bids (3)</h4>
                      <div className="row">
                        {projectProposal1.slice(0, 3).map((item, i) => (
                          <div key={i} className="col-md-6 col-lg-12">
                            <TopBidCard data={item} />
                          </div>
                        ))}
                      </div>
                      
                    </div>
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
                            <AuctionPriceWidget />
                            <AuctionContactWidget />
                          </div>
                        </div>
                      )}
                    </Sticky>
                  ) : (
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <AuctionPriceWidget />
                        <AuctionContactWidget />
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
