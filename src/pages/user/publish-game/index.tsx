import DashboardLayout from "@/components/dashboard/DashboardLayout";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

import MetaComponent from "@/components/common/MetaComponent";
import { useState } from "react";
import { IGameTitle } from "@/types";
import CreateGameTitleInfo from "@/components/dashboard/section/CreateGameTitleInfo";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Create Project",
};

export default function DasbPageCreateProject() {

  return (
    <>
      <MetaComponent meta={metadata} />
      <MobileNavigation2 />
      <DashboardLayout>
        <CreateGameTitleInfo />
      </DashboardLayout>
    </>
  );
}
