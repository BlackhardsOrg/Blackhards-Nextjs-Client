import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import Pagination from "@/components/section/Pagination";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import Link from "next/link";
import { links } from "@/data/links";
import PurchasedGamesCard from "../card/PurchasedGamesCard";
import { useQuery } from "@apollo/client";
import { FETCH_GAME_IN_INVENTORY } from "@/graphql";
import { useAppSelector } from "@/redux/app/hooks";
import { IGameTitleInventory } from "@/types";
import NoGamePurchased from "./NoGamePurchased";

const tab = [
  "Purchased Games",
];

export default function LibraryInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useAppSelector(state => state.auth.user)
  const { data } = useQuery<{ fetchUserGamesInInventory: IGameTitleInventory[] }>(FETCH_GAME_IN_INVENTORY, { variables: { buyerEmail: user?.email } })
  useEffect(() => {
    console.log(data, "DATA")
  }, [data])

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Library</h2>
              <p className="text">All the  Games you purchased</p>
            </div>
          </div>
          {/* <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href={links.publishGame}
                className="ud-btn btn-dark default-box-shadow2"
              >
                Create Project
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div> */}
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
                        onClick={() => setSelectedTab(i)}
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
                          <th scope="col">Category</th>
                          <th scope="col">Type/Cost</th>
                          <th scope="col">Downloads</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {data ? data.fetchUserGamesInInventory
                          .map((item, i) => (
                            <PurchasedGamesCard updatedAt={item.updatedAt} packageTypeGameLink={item.packageTypeGameLink} packageType={item.packageType} gametitle={item.gametitle} key={i} />
                          )) : null}
                      </tbody>
                    </table>
                    {/* <div className="mt30">
                      <Pagination />
                    </div> */}
                  </div>

                )}
                {data && data.fetchUserGamesInInventory.length==0 && <NoGamePurchased />}

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
