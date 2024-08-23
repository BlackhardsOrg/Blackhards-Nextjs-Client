import Navigation from "./Navigation";

import MobileNavigation3 from "./MobileNavigation3";
import Link from "next/link";
import { links } from "@/data/links";
import { useAppSelector } from "@/redux/app/hooks";
import CartNavButton from "../cart/CartNavButton";

export default function Header4() {
  const user = useAppSelector(state => state.auth.user)
  return (
    <>
      <header
        className="header-nav nav-innerpage-style stricky main-menu at-home3 bdrb1"
        style={{ padding: "18px 0" }}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr20">
                    <Link className="header-logo logo2" href="/">
                      <img src="/images/Blackhards-white-logo-2.svg" alt="Header Logo" />
                    </Link>
                  </div>
                  <Navigation />
                </div>
              </div>
              <div className="col-auto">
                {user ? <div className="d-flex gap-1 align-items-center ">
                  <CartNavButton />
                  <Link
                    data-bs-toggle="modal"

                    className="login-info mx15-lg mx30 d-flex gap-1 cursor-pointer"
                    href="#logoutModalToggle"
                  >
                    <i className="fas fa-sign-out"></i>
                    <span>Logout</span>
                  </Link>
                </div> :
                  <div className="d-flex align-items-center">
                    <a
                      className="login-info"
                      data-bs-toggle="modal"
                      href="#exampleModalToggle"
                    >
                      <span className="flaticon-loupe" />
                    </a>
                    <Link className="login-info mx15-lg mx30" href="/become-seller">
                      <span className="d-none d-xl-inline-block">Become a </span>
                      Seller
                    </Link>
                    <Link className="login-info mr15-lg mr30" href={links.login}>
                      Sign in
                    </Link>
                    <Link className="ud-btn btn-home3 add-joining" href={links.registerEarly}>
                      Join
                    </Link>
                  </div>}


              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation3 />
    </>
  );
}
