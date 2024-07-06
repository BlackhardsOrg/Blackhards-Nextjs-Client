import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import SelectInput from "@/components/dashboard/option/SelectInput";
import { useState } from "react";
import { countries } from "@/data/countries";
const metadata = {
  title: "Freeio - Freelance Marketplace ReactJs Template | Register",
};
export default function RegisterPage() {
  const [getCountry, setCountry] = useState({
    option: "Select",
    value: null,
  });
  const countryHandler = (option, value) => {
    setCountry({ option, value });
  };
  <MetaComponent meta={metadata} />;
  return (
    <>
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Get Early Access</h2>
                <p className="paragraph">
                  Unlock Exclusive Features Before Anyone Else Comrade!
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow5 bdrs12">
                <div className="mb30">
                  <h4>Let&apos;s get you on the list!</h4>
                  <p className="text mt20">
                    Already have access?{" "}
                    <Link to="/login" className="text-thm">
                      Log In!
                    </Link>
                  </p>
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">
                    Alias
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pet Name"
                  />
                </div>

                <div className="mb25">
                  <label className="form-label fw500 dark-color">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Country"
                  />
                </div>
                <div className="mb25">
                  <label className="form-label fw500 dark-color">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="alitfn58@gmail.com"
                  />
                </div>

                <div className="d-grid mb20">
                  <button
                    className="ud-btn btn-thm default-box-shadow2"
                    type="button"
                  >
                    Get Access<i className="fal fa-arrow-right-long" />
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
