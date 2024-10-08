import { useState } from "react";
import HeroSearch1 from "../element/HeroSearch1";
import { useRouter } from "next/router";

const role = [
  "Choose Category",
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
];

const Breadcumb7: React.FC = () => {
  const [getSelectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  // choose a category
  const roleHandler = (select: string) => {
    setSelectedRole(select);
  };

  // search handler
  const searchHandler = () => {
    router.push("/service-6");
  };

  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-service-v6 cta-banner mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative d-flex align-items-center">
          <img
            className="service-v3-vector d-none d-lg-block"
            src="/images/about/about-4.png"
            alt="about"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="position-relative">
                  <h2 className="text-white">Games</h2>
                  <p className="text mb30 text-white">
                    All Things Look Equal
                  </p>
                  <div className="advance-search-tab bgc-white p10 bdrs4">
                    <div className="row">
                      <div className="col-md-5 col-lg-6 col-xl-6">
                        <div className="advance-search-field">
                          <HeroSearch1 />
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-xl-3">
                        <div className="bselect-style1 bdrl1 bdrn-sm">
                          <div className="dropdown bootstrap-select">
                            <button
                              type="button"
                              className="btn dropdown-toggle btn-light"
                              data-bs-toggle="dropdown"
                            >
                              <div className="filter-option">
                                <div className="filter-option-inner">
                                  <div className="filter-option-inner-inner">
                                    {getSelectedRole !== null
                                      ? getSelectedRole
                                      : "Choose Category"}
                                  </div>
                                </div>
                              </div>
                            </button>
                            <div className="dropdown-menu ">
                              <div className="inner show" id="bs-select-1">
                                <ul className="dropdown-menu inner show">
                                  {role.map((item, index) => (
                                    <li
                                      onClick={() => roleHandler(item)}
                                      key={index}
                                      className="selected active"
                                    >
                                      <a
                                        className={`dropdown-item selected ${getSelectedRole === item
                                            ? "active"
                                            : ""
                                          }`}
                                      >
                                        <span className="text">{item}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-3">
                        <div className="text-center text-xl-start">
                          <button
                            onClick={searchHandler}
                            className="ud-btn btn-thm w-100"
                            type="button"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcumb7;
