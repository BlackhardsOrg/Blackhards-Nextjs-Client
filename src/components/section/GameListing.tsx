import ListingOption1 from "../element/ListingOption1";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination from "./Pagination";
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
import PaginationOld from "./PaginationOld";

export default function GameListing() {

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalGames = 300;
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Logic to fetch new items based on `page`
  };

  const currentGenreTab = useAppSelector(state => state.pages.games.genreCurrentTab)
  const priceRange = useAppSelector(state => state.pages.games.priceRange)
  const tag = useAppSelector(state => state.pages.games.tag)
  const rating = useAppSelector(state => state.pages.games.rating)
  const gamesPage = useAppSelector(state => state.pages.games)

  const [pageParams, setParams] = useState({
    skip: currentPage,
    take: itemsPerPage,
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
      skip: currentPage,
      take: itemsPerPage,
      // genre: "all"
      genre: currentGenreTab ? currentGenreTab.toLowerCase() : "all",
      // ...(priceRange?.min != null && { priceMin: Number(priceRange.min) }),
      // ...(priceRange?.max != null && { priceMax: Number(priceRange.max) }),
      // ...(rating != null && { rating: Number(rating) }),
      // ...(tag?.value != null && { tag: tag.value }),
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
                    {/* {item?.gamePlayScreenShots.length > 1 ? (
                    ) : (
                      <TrendingGameCard data={item} />
                    )} */}
                    <PopularGameSlideCard data={item} />

                  </div>
                )) :
                !loading && <GameGenreNotFound />

              : !loading && <GameDataNotFound />}
          </div>
          {loading && <SkeletonLoadContainer count={10} />}
          <Pagination totalItems={data && data.allGameTitles ? data.allGameTitles.length : totalGames} currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange} />
          {/* <PaginationOld/> */}
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
