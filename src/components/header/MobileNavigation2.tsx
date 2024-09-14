import { links } from "@/data/links";
import { useAppSelector } from "@/redux/app/hooks";
import Link from "next/link";

export default function MobileNavigation2() {
  const user = useAppSelector(state => state.auth.user)
  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bdrb1">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <Link className="header-logo logo2" href="/">
                  <img src="/images/Blackhards-white-logo-2.svg" alt="Header Logo" />
                </Link>
                {user ? <div className="d-flex gap-2 justify-content-center align-items-center">
                  <Link className="btn" href="/user/library" >
                    <img
                      className="border rounded-circle"
                      style={{ width: "30px", height: "30px", objectFit: "cover" }}
                      src="/images/resource/user-50by50.png" alt="user.png" />
                  </Link>
                  <Link className="login-info d-flex gap-1 justify-content-center align-items-center"
                    data-bs-toggle="modal"
                    href="#logoutModalToggle">
                    <i className="fas fa-sign-out"></i>
                    <span className="d-none d-xl-inline-block">Logout</span>
                  </Link>
                </div> : <div className="d-flex align-items-center">
                  <Link className="login-info mx15-xl mx30" href="/register">
                    <span className="d-none d-xl-inline-block">Create your</span>{" "}
                    Studio
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
