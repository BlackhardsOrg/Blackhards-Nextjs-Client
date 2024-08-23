import React from "react";
import Navigation from "./Navigation";
import useStickyMenu from "@/hook/useStickyMenu";
import Link from "next/link";
import { links } from "@/data/links";
import { useAppSelector } from "@/redux/app/hooks";


export default function Header14() {
  const sticky = useStickyMenu(50);
  const user = useAppSelector(state => state.auth.user)
  
  return (
    <header
      className={`header-nav nav-homepage-style at-home3  stricky  stricky main-menu border-0 animated  ${sticky ? "slideInDown stricky-fixed" : "slideIn"
        }`}
    >
      <nav className="posr">
        <div className="container posr">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto px-0 px-xl-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="logos">
                  <Link className="header-logo logo1" href="/">
                    <img src="/images/Blackhards-white-logo-2.svg" alt="Header Logo" />
                  </Link>
                  <Link className="header-logo logo2" href="/">
                    <img src="/images/Blackhards-white-logo-2.svg" alt="Header Logo" />
                  </Link>
                </div>

                <Navigation />
              </div>
            </div>
            <div className="col-auto pe-0 pe-xl-3">
              {user ? <div className="d-flex gap-2 justify-content-center align-items-center">
                <Link className="btn" href="/user/dashboard" >
                  <img src="/images/resource/user-50by50.png" alt="user.png" />
                </Link>
                <h4>{user.studioName}</h4>
              </div> : <div className="d-flex align-items-center">
                <Link className="login-info mx15-xl mx30" href="/become-seller">
                  <span className="d-none d-xl-inline-block">Become a</span>{" "}
                  Seller
                </Link>
                <Link
                  className="login-info mr15-xl mr10 ud-btn btn-dark add-joining bdrs12 dark-color bg-transparent"
                  href={links.login}
                >
                  Sign in
                </Link>
                <Link
                  className="ud-btn btn-dark add-joining bdrs12 text-white"
                  href={links.register}
                >
                  Join
                </Link>
              </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
