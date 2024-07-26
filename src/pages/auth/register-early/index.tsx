import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import Link from "next/link";
import AuthLayouts from "@/components/layouts/AuthLayouts";
import { links } from "@/data/links";
import { Tooltip } from "react-tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";

import SelectInput from "@/components/dashboard/option/SelectInput";
import { toast } from "react-toastify";
import { registerUserEarly } from "@/redux/features/auth/api/authApi";
import { useRouter } from "next/router";
import FLyLoad from "@/components/loading/FLyLoad";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Register",
};


export default function RegisterPage() {
  const [purpose, setPurpose] = useState({ value: "sell", option: "I want to sell" })
  const [role, setRole] = useState({ value: "game-studio", option: "A Game studio" })

  const loading = useAppSelector(state => state.auth.loading)

  const roleHandler = (option: any, value: any) => {
    setRole({ option: option, value: value })

  };



  const purposeHandler = (option: any, value: any) => {
    // setCredentials(old => ({ ...old, yourPurpose: value }))
    setPurpose({ option: option, value: value })
  };


  const [credentials, setCredentials] = useState({
    studioName: "",
    country: "",
    email: "",
    yourPurpose: "",
    portfolioLink: "",
    yourRole: ""
  });

  const [getEmptyErrors, setEmptyErrors] = useState({
    role: false,
    purpose: false
  })

  const dispatch = useAppDispatch()
  const navigate = useRouter().push

  const handleChange = (e) => {
    setCredentials(old => ({ ...old, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    console.log(loading)
  }, [loading])

  useEffect(() => {
    setEmptyErrors(old => ({
      ...old,
      purpose: purpose.value == "" || purpose.value == "none" ? true : false,
      role: role.value == "" || role.value == "none" ? true : false

    }))
  }, [role.value, purpose.value])

  useEffect(() => {
    setCredentials(old => ({ ...old, yourRole: role.value }))

  }, [role])

  useEffect(() => {
    setCredentials(old => ({ ...old, yourPurpose: purpose.value }))

  }, [purpose])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (role.value == "") {
      toast("Cannot be empty!")
      return
    }
    const result = await dispatch(registerUserEarly(credentials)) as any;
    console.log(result, "CRED")

    if (result && result.success) {
      navigate(
        "/"
      );
    }
  };



  <MetaComponent meta={metadata} />;
  return (
    <AuthLayouts>
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
                    <Link href={links.login} className="text-thm">
                      Log In!
                    </Link>
                  </p>
                </div>
                <form onSubmit={handleSubmit}>

                  <div className="mb25">
                    <label className="form-label fw500 dark-color">Email<i className="text-danger">*</i></label>
                    <input
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Company, Studio or Personal Email"
                    />
                  </div>
                  <div className="mb25">
                    <label className="form-label fw500 dark-color">Studio Name<i className="text-danger">*</i></label>
                    <input
                      name="studioName"
                      value={credentials.studioName}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="eg., Orange Dawn Studio"
                    />
                  </div>

                  <div className="mb25">
                    <label className="form-label fw500 dark-color">Country<i className="text-danger">*</i></label>
                    <input
                      name="country"
                      value={credentials.country}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="eg., Nigeria, Germany, Ghana etc"
                    />
                  </div>
                  <div className="mb25">
                    <SelectInput
                      isCompulsory={true}
                      isEmptyError={
                        getEmptyErrors.purpose
                      }
                      label="What do you want to do on Blackhards?"
                      defaultSelect={purpose}
                      data={[
                        { value: "none", option: "None" },
                        { value: "sell", option: "I want to sell" },
                        { value: "buy", option: "I want to Buy" }
                      ]}
                      handler={purposeHandler}
                      type="email"
                      className="form-control"
                      placeholder="alitfn58@gmail.com"
                    />
                  </div>

                  {credentials.yourPurpose == "sell" && < div className="mb25">
                    <label className="form-label fw500 dark-color">
                      <span>Portfolio Link</span>
                      <div className="d-flex gap-2">

                        <Tooltip anchorSelect="#youtube" className="ui-tooltip" place="bottom">
                          Youtube studio Channel Link
                        </Tooltip>

                        <Tooltip anchorSelect="#linkedin" className="ui-tooltip" place="bottom">
                          LinkedIn studio Page Link
                        </Tooltip>

                        <Tooltip anchorSelect="#link" className="ui-tooltip" place="bottom">
                          Your Studio Website Link
                        </Tooltip>

                        <button id="youtube" className="fab fa-youtube text-danger cursor-pointer border-none"></button>
                        <button id="linkedin" className="fab fa-linkedin text-info cursor-pointer border-none"></button>
                        <button id="link" className="fas fa-link text-success cursor-pointer border-none"></button>



                      </div>
                    </label>
                    <input
                      name="portfolioLink"
                      value={credentials.portfolioLink}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="https://www.porfolio.com"
                    />
                  </div>}

                  <div className="mb25">
                    <SelectInput
                      isEmptyError={
                        getEmptyErrors.role
                      }
                      isCompulsory={true}
                      label="Your Role?"
                      defaultSelect={role}
                      data={[
                        { value: "none", option: "None" },
                        { value: "indie-developer", option: "An Indie Developer" },
                        { value: "game-studio", option: "A Game Studio" },
                        { value: "merchant", option: "Merchant" },
                        { value: "game-enthusiast", option: "Game Hobbyist or Enthusiast" },
                        { value: "individual", option: "Individual" },
                      ]}
                      handler={roleHandler}
                      type="email"
                      className="form-control"
                      placeholder="alitfn58@gmail.com"
                    />
                  </div>

                  <div className="d-grid mb20">
                    <button
                      disabled={getEmptyErrors.role || getEmptyErrors.purpose}
                      className="ud-btn btn-thm default-box-shadow2"
                      type="submit"
                      style={{ opacity: getEmptyErrors.role || getEmptyErrors.purpose ? ".4" : "1" }}
                    >
                      {loading.register ? (
                        <FLyLoad />
                      ) : (
                        <>
                          Get Access <i className="fal fa-arrow-right-long" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section >
    </AuthLayouts >
  );
}
