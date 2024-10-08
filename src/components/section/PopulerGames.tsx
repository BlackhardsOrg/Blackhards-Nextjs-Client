import { product1 } from "@/data/product";
import PopularGameSlideCard from "../card/PopularGameSlideCard";
import PopularServiceCard1 from "../card/PopularServiceCard1";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IGameTitle, IGameTitleGQL } from "@/types";
import { USER_GAME_TITLES } from "@/graphql";



export default function PopularGames() {

  const { data, loading, error } = useQuery<{ userGameTitles: [IGameTitleGQL] }>(USER_GAME_TITLES, {
    variables: {
      skip: 0,
      take: 2,
      developerEmail: "norbertmbafrank@gmail.com"
    }
  });

  return (
    <>
      <section className="pb40-md pb70 mt70 mt0-lg">
        <div className="container">
          <div className="row align-items-center wow fadeInUp">
            <div className="col-lg-12">
              <div className="main-title mb30-lg">
                <h2 className="title">
                  People Who Viewed This Game Also Viewed
                </h2>
                <p className="paragraph">
                  The best Deals
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {data ? data.userGameTitles.slice(0, 4).map((item, i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                {item.gamePlayScreenShots ? (
                  <PopularGameSlideCard style="listing-style1" data={item} />
                ) : (
                  <PopularServiceCard1 style="listing-style1" data={item} />
                )}
              </div>
            )): "loading"}
          </div>
        </div>
      </section>
    </>
  );
}
