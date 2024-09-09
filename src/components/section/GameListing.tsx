import ListingOption1 from "../element/ListingOption1";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination1 from "./Pagination1";
import TrendingGameCard from "../card/TrendingGameCard";
import PopularGameSlideCard from "../card/PopularGameSlideCard";
import { useQuery } from "@apollo/client";
import { IGameTitleGQL } from "@/types";
import { ALL_GAME_TITLES } from "@/graphql";
import { useAppSelector } from "@/redux/app/hooks";
import GameGenreNotFound from "../dashboard/section/GameGenreNotFound";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../card/SkeletonCard";
import { SkeletonLoadContainer } from "../card/SkeletonLoadContainer";
import GameDataNotFound from "../dashboard/section/GameDataNotFound";

export default function GameListing() {

  const currentGenreTab = useAppSelector(state => state.pages.games.genreCurrentTab)
  const priceRange = useAppSelector(state => state.pages.games.priceRange)
  const tag = useAppSelector(state => state.pages.games.tag)
  const rating = useAppSelector(state => state.pages.games.rating)
  const gamesPage = useAppSelector(state => state.pages.games)

  const [pageParams, setParams] = useState({
    skip: 0,
    take: 10,
    genre: currentGenreTab?.toLowerCase(),
    ...(priceRange?.min != null && { priceMin: priceRange.min }),
    ...(priceRange?.max != null && { priceMax: priceRange.max }),
    ...(rating != null && { rating }),
    ...(tag?.value != null && { tag: tag.value }),
  })


  const { data, loading, error, refetch } = useQuery<{ allGameTitles: [IGameTitleGQL] }>(ALL_GAME_TITLES, {
    variables: pageParams
  });

  useEffect(() => {
    setParams({
      skip: 0,
      take: 10,
      genre: currentGenreTab?.toLowerCase(),
      ...(priceRange?.min != null && { priceMin: Number(priceRange.min) }),
      ...(priceRange?.max != null && { priceMax: Number(priceRange.max) }),
      ...(rating != null && { rating: Number(rating) }),
      ...(tag?.value != null && { tag: tag.value }),
    })
    console.log(data, "GAME POAGE", gamesPage, " DATA ", pageParams)

    refetch(pageParams)
  }, [gamesPage])

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <ListingOption1 />
          <div className="row">
            {data && data.allGameTitles ?
              data.allGameTitles.length > 0 ? data.allGameTitles
                .map((item, i) => (
                  <div key={i} className="col-sm-6 col-xl-3">
                    {item?.gamePlayScreenShots.length > 1 ? (
                      <PopularGameSlideCard data={item} />
                    ) : (
                      <TrendingGameCard data={item} />
                    )}
                  </div>
                )) :
                !loading && <GameGenreNotFound />

              : !loading && <GameDataNotFound />}
          </div>
          {loading && <SkeletonLoadContainer count={5} />}
          <Pagination1 />
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
