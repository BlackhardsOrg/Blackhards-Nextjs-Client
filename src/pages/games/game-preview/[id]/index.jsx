import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import GameDetail from "@/components/section/GameDetail";
import PopularGames from "@/components/section/PopulerGames";

import TabSection1 from "@/components/section/TabSection1";
import React from "react";

export default function GamePreview() {
  return (
    <>
      <TabSection1 />
      <Breadcumb3 path={["Home", "Games", "Ghosts From Idemili"]} />
      <GameDetail />
      <PopularGames />
    </>
  );
}
