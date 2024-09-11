import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import GameDetail from "@/components/section/GameDetail";
import PopularGames from "@/components/section/PopulerGames";

import TabSection1 from "@/components/section/TabSection1";
import React from "react";
import MarketLayouts from "@/components/layouts/MarketLayouts"
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { IGameTitleGQL } from "@/types";
import { SINGLE_GAME_TITLE } from "@/graphql";

export default function GamePreview() {
  const { query } = useRouter()
  const { id } = query;
  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ gameTitle: IGameTitleGQL }>(SINGLE_GAME_TITLE, {
    variables: {
      id
    }
  });
  return (
    <MarketLayouts>
      {/* <TabSection1 /> */}
      <Breadcumb3 path={["Home", "games", data && data.gameTitle.title ? data.gameTitle.title : "Ghosts From Idemili"]} />
      <GameDetail />
      <PopularGames />
    </MarketLayouts>
  );
}
