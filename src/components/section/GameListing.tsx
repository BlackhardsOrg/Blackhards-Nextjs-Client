import { product1 } from "@/data/product";
import ListingOption1 from "../element/ListingOption1";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination1 from "./Pagination1";
import TrendingGameCard from "../card/TrendingGameCard";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularGameSlideCard from "../card/PopularGameSlideCard";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { IGameTitleGQL } from "@/types";
import { ALL_GAME_TITLES, USER_GAME_TITLES } from "@/graphql";
import { useAppSelector } from "@/redux/app/hooks";
import Link from "next/link";
import GameGenreNotFound from "../dashboard/section/GameGenreNotFound";

export default function GameListing() {

  const currentGenreTab = useAppSelector(state => state.pages.games.genreCurrentTab)
  const priceRange = useAppSelector(state => state.pages.games.priceRange)
  const tag = useAppSelector(state => state.pages.games.tag)
  const rating = useAppSelector(state => state.pages.games.rating)


  const { data, loading, error, refetch } = useQuery<{ allGameTitles: [IGameTitleGQL] }>(ALL_GAME_TITLES, {
    variables: {
      skip: 0,
      take: 10,
      genre: currentGenreTab?.toLowerCase(),
      priceMin: priceRange?.min,
      priceMax: priceRange?.max,
      rating,
      tag: tag?.value,
    }
  });

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <ListingOption1 />
          <div className="row">
            {data && data.allGameTitles ?
              data.allGameTitles.length > 0 ? data.allGameTitles
                // .slice(0, 12)
                // .filter(deliveryFilter)
                // .filter(priceFilter)
                // .filter(levelFilter)
                // .filter(locationFilter)
                // .filter(searchFilter)
                // .filter(sortByFilter)
                // .filter(designToolFilter)
                // .filter(speakFilter)
                .map((item, i) => (
                  <div key={i} className="col-sm-6 col-xl-3">
                    {item?.gamePlayScreenShots.length > 1 ? (
                      <PopularGameSlideCard data={item} />
                    ) : (
                      <TrendingGameCard data={item} />
                    )}
                  </div>
                )) :
                <GameGenreNotFound />

              : null}
          </div>
          <Pagination1 />
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
