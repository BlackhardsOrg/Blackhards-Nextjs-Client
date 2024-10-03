
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setCurrentGenreTab } from "@/redux/features/sitepages/slices/pageSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const genres = [
  "All",
  "Adventure",
  "Simulation",
  "Strategy",
  "Horror",
  "Fighting",
  "Sports",
  "Racing",
  "Casual",
  "MOBA",
  "Sandbox"
];

// categories_list_section overflow-hidden

export default function TabSection1() {
  // const [getCurrentTab, setCurrentTab] = useState("All Genre's");
  const getCurrentTab = useAppSelector(state => state.pages.games.genreCurrentTab)
  const dispatch = useAppDispatch()
  const { pathname } = useRouter();


  return (
    <>
      <section
        className={`categories_list_section overflow-hidden ${pathname === "/home-3" ? "bgc-thm5" : ""
          }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="listings_category_nav_list_menu">
                <ul className="mb0 d-flex ps-0">
                  {genres.map((item, index) => (
                    <li key={index}>
                      <a
                        onClick={() => dispatch(setCurrentGenreTab({ currentTab: item }))}
                        className={getCurrentTab == item ? "active" : ""}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
