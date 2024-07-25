import { links } from "@/data/links";
import Link from "next/link";


export default function MobileNavigation1() {
  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bb-white-light">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <Link className="mobile_logo" href="/">
                  <img src="/images/header-logo.svg" alt="Header Logo" />
                </Link>
                <div className="right-side text-end">
                  <Link className="text-white" href={links.login}>
                    join
                  </Link>
                  <a
                    className="menubar ml30"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    <img src="/images/white-nav-icon.svg" alt="icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="posr">
              <div className="mobile_menu_close_btn">
                <span className="far fa-times" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
