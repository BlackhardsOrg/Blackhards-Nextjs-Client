
import { useRouter } from "next/router";
import { useState } from "react";

const genres = [
  "All Genre's",
  "Action",
  "Adventure",
  "Role-Playing Game (RPG)",
  "Simulation",
  "Strategy",
  "Sports & Racing",
  "Puzzle",
  "Party and Music",
  "Horror",
];

// categories_list_section overflow-hidden

export default function TabSection1() {
  const [getCurrentTab, setCurrentTab] = useState("All Categories");

  const { pathname } = useRouter();

  return (
    <>
      <section
        className={`categories_list_section overflow-hidden ${
          pathname === "/home-3" ? "bgc-thm5" : ""
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
                        onClick={() => setCurrentTab(item)}
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
