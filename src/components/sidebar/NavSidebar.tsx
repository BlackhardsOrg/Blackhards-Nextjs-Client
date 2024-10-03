import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";


import { useRef } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useRouter } from "next/router"
import Link from "next/link"

export default function NavSidebar() {
  const { pathname } = useRouter();
  const crossRef = useRef(null);

  const isEarlyAccess = true;
  // const isLoggedIn = false;

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header border-bottom">
          <Link href="/">
            <img alt="Header Logo" src="/images/Blackhards-white-logo-2.svg" />
          </Link>
          <button
            ref={crossRef}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="ui-navigation-sidebar">
            {isEarlyAccess ? (
              <Sidebar>
                <Menu>
                  <MenuItem
                    component={<Link href={"/auth/login"} />}
                    className={
                      "/auth/login" === pathname ? "ui-mobile-active" : ""
                    }
                  >
                    <span data-bs-dismiss="offcanvas">Login</span>
                  </MenuItem>
                  <MenuItem
                    component={<Link href={"/auth/login"} />}
                    className={
                      "/early-join" === pathname ? "ui-mobile-active" : ""
                    }
                  >
                    <span data-bs-dismiss="offcanvas">Join Early</span>
                  </MenuItem>
                </Menu>
              </Sidebar>
            ) : (
              <Sidebar>
                <Menu>
                  {navigation.map((item: any, i) =>
                    item?.children ? (
                      <SubMenu
                        key={i}
                        label={item.name}
                        className={
                          isActiveNavigation(pathname, item)
                            ? "ui-mobile-active"
                            : ""
                        }
                      >
                        {item.children.map((item2: any, i2) =>
                          item2?.children ? (
                            <SubMenu
                              key={i2}
                              label={item2.name}
                              className={
                                isActiveNavigation(pathname, item2)
                                  ? "ui-mobile-active"
                                  : ""
                              }
                            >
                              {item2.children.map((item3, i3) => (
                                <MenuItem
                                  key={i3}
                                  component={<Link href={item3.path} />}
                                  className={
                                    item3.path === pathname ||
                                      item3.path ===
                                      pathname.replace(/\/\d+$/, "")
                                      ? "ui-mobile-active"
                                      : ""
                                  }
                                >
                                  <span data-bs-dismiss="offcanvas">
                                    {item3.name}
                                  </span>
                                </MenuItem>
                              ))}
                            </SubMenu>
                          ) : (
                            <MenuItem
                              key={i2}
                              component={<Link href={item2.path} />}
                              className={
                                item2.path === pathname
                                  ? "ui-mobile-active"
                                  : ""
                              }
                            >
                              <span data-bs-dismiss="offcanvas">
                                {item2.name}
                              </span>
                            </MenuItem>
                          )
                        )}
                      </SubMenu>
                    ) : (
                      <MenuItem
                        key={i}
                        component={<Link href={item.path} />}
                        className={
                          item.path === pathname ? "ui-mobile-active" : ""
                        }
                      >
                        <span data-bs-dismiss="offcanvas">{item.name}</span>
                      </MenuItem>
                    )
                  )}
                </Menu>
              </Sidebar>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
