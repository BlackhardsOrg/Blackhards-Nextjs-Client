import Link from "next/link";
import Mega from "./Mega";
import MobileNavigation2 from "./MobileNavigation2";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import { links } from "@/data/links";


export default function Header3() {
  const { pathname } = useRouter();
  return (
    <>
      <header className="header-nav nav-innerpage-style main-menu  ">
        <nav className="posr">
          <div className="container-fluid posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto pe-0">
                <div className="d-flex align-items-center">
                  <Link className="header-logo bdrr1 pr30 pr5-xl" href="/">
                    <img
                      className="w-100 h-100 object-fit-contain"
                      src="/images/header-logo-dark.svg"
                      alt="Header Logo"
                    />
                  </Link>
                  <div className="home1_style">
                    <Mega />
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <Navigation />
                  <a
                    className="login-info bdrl1 pl15-lg pl30"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                  >
                    <span className="flaticon-loupe" />
                  </a>
                  <Link
                    className={`login-info mx15-lg mx30 ${pathname === "/become-seller" ? "ui-active" : ""
                      }`}
                    href="/become-seller"
                  >
                    <span className="d-none d-xl-inline-block">Become a</span>{" "}
                    Seller
                  </Link>
                  <Link
                    className={`login-info mr15-lg mr30 ${pathname === "/auth/login" ? "ui-active" : ""
                      }`}
                    href={links.login}
                  >
                    Sign in
                  </Link>
                  <Link className="ud-btn btn-thm add-joining" href={links.register}>
                    Join
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation2 />
    </>
  );
}
