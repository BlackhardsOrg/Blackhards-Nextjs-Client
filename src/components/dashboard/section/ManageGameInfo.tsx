import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import Pagination from "@/components/section/Pagination";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import Link from "next/link";
import { links } from "@/data/links";
import { useQuery } from "@apollo/client";
import { IGameTitleGQL, IUserAuction } from "@/types";
import { USER_AUCTIONS, USER_GAME_TITLES } from "@/graphql";
import { useAppSelector } from "@/redux/app/hooks";
import NoGamePublished from "./NoGamePublished";
import ManageAuctionCard from "../card/ManageAuctionCard";
import ManageAuctionProjectCard from "../card/ManageAuctionProjectCard";

const tab = [
  "Games",
  "Auctions"
];

export default function ManageGameInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useAppSelector(state => state.auth.user)
  const { data, loading, error, refetch: refetchGameTitle } = useQuery<{ userGameTitles: [IGameTitleGQL] }>(USER_GAME_TITLES, {
    variables: {
      skip: 0,
      take: 10,
      developerEmail: user ? user.email : "",
      genre: "all"
    }
  });

  const { data: userAuctions, loading: auctionLoad, refetch } = useQuery<{ userAuctions: [IUserAuction] }>(USER_AUCTIONS, {
    variables: {
      skip: 0,
      take: 10,
      developerEmail: user ? user.email : "",
      genre: "all"
    }
  });



  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Projects</h2>
              <p className="text">All the Projects you built.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href={links.publishGame}
                className="ud-btn btn-dark default-box-shadow2"
              >
                Create Project
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${selectedTab == i ? "active" : ""
                          }`}
                        onClick={() => {
                          setSelectedTab(i)
                          refetch({
                            skip: 0,
                            take: 10,
                            developerEmail: user ? user.email : "",
                            genre: "all"
                          })

                          refetchGameTitle({
                            skip: 0,
                            take: 10,
                            developerEmail: user ? user.email : "",
                            genre: "all"
                          })
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                {selectedTab === 0 && (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Genre</th>
                          <th scope="col">Cost/Package Type</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {
                          data && data.userGameTitles ?
                            data.userGameTitles.map((item, i) => {
                              return (
                                <ManageProjectCard gametitle={item} key={i} />
                              )
                            }) : null
                        }
                      </tbody>
                    </table>

                  </div>
                )}

                {selectedTab === 1 && (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Genre</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {
                          userAuctions && userAuctions.userAuctions ?
                            userAuctions.userAuctions.map((item, i) => {
                              return (
                                <ManageAuctionProjectCard auction={item} key={i} />
                              )
                            }) : null
                        }
                      </tbody>
                    </table>

                  </div>
                )}
                {data && data.userGameTitles.length <= 0 && <NoGamePublished />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
