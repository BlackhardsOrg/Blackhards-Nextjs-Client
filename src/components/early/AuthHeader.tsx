import useStickyMenu from "@/hook/useStickyMenu";

import MobileNavigation2 from "./MobileNavigation2";
import Link from "next/link";

export default function AuthHeader() {
  const sticky = useStickyMenu(50);
  return (
    <>
      <header
        className={`header-nav nav-homepage-style at-home18 stricky main-menu border-0 animated 
    ${sticky ? "slideInDown stricky-fixed" : "slideIn"}
    `}
      >
        <nav className="posr">
          <div className="container posr">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto px-0 px-xl-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos">
                    <Link className="header-logo logo1" href="/">
                      <img
                        src="/images/Blackhards-white-logo-login.svg"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <img src="/images/Blackhards-white-logo-2.svg" alt="Header Logo" />
                    </Link>
                  </div>
                  {/* <div className="home1_style at-home18 mx20">
                    <Mega
                      staticMenuClass={
                        "text-white d-flex justify-content-center align-items-center"
                      }
                    />
                  </div> */}

                  {/* <Navigation /> */}
                </div>
              </div>
              {/* <div className="col-auto pe-0 ">
                <div className="d-flex align-items-center">
                  
                  <Link
                    className="login-info ud-btn btn-2 mr10 home18-sign-btn px30 py-1 bdrs120"
                    to="/login"
                  >
                    Sign in
                  </Link>
                  <Link
                    className="ud-btn btn-white add-joining home18-join-btn bdrs120"
                    to="/register"
                  >
                    Join Early
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation2 />
    </>
  );
}
