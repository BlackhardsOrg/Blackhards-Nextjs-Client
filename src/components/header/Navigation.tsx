import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Navigation() {
  const { pathname } = useRouter();

  return (
    <>
      <ul
        className={`ace-responsive-menu ui-navigation ${pathname == "/home-3" ||
          pathname == "/home-4" ||
          pathname == "/home-10"
          ? "menu-without-paddingy"
          : ""
          } `}
      >
        {navigation.map((item: any, i) => (
          <li

            key={i}
            className={`visible_list menu-active ${item.id == 1 ? "home-menu-parent" : ""
              } `}
          >
            {item.children ? (
              <a

                className={`list-item  ${isActiveNavigation(pathname, item) ? "ui-active" : ""
                  }`}
              >
                <span className="title">{item.name}</span>{" "}
                {item.children && <span className="arrow "></span>}
              </a>
            ) : (
              <Link

                href={item.active ? item.path : "#Coming#soon"}
                className={`list-item
                                ${item.path === pathname ? "ui-active" : ""}`}
              >
                <span className="title">{item.name}</span>
              </Link>
            )}

            {item.children && (
              <ul className={`sub-menu ${item.id == 1 ? "home-menu" : ""} `}>
                {item.children?.map((item2, i2) => (
                  <li
                    key={i2}
                    className={`menu-active ${isActiveNavigation(pathname, item2) ||
                      item2.path === pathname
                      ? "ui-child-active"
                      : ""
                      }`}
                  >
                    {item2.children ? (
                      <a>
                        <span className="title">{item2.name}</span>
                        {item2.children && <span className="arrow "></span>}
                      </a>
                    ) : (
                      <Link href={item2.active ? item2.path : "#Coming#soon"}>
                        <span className="title">{item2.name}</span>
                      </Link>
                    )}

                    {item2.children && (
                      <ul className="sub-menu">
                        {item2.children?.map((item3, i3) => (
                          <li
                            key={i3}
                            className={
                              item3.path === pathname ||
                                item3.path === pathname.replace(/\/\d+$/, "")
                                ? "ui-child-active"
                                : ""
                            }
                          >
                            <Link href={item3.active ? item3.path : "#Coming#soon"}>{item3.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
