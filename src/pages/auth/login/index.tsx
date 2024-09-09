import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/redux/app/hooks"
import { loginUser, verifyEmailUser } from "@/redux/features/auth/api/authApi"
import AuthLayouts from "@/components/layouts/AuthLayouts";
import FLyLoad from "@/components/loading/FLyLoad";
import { links } from "@/data/links";


export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useRouter().push;
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const { query } = router;
  const message = query.message || "";

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await dispatch(loginUser(credentials)) as any;
    // if (result.success) {
    //   navigate(links.dashboard);
    // }
  };

  useEffect(() => {
    if (user) {
      // Redirect to the previous location if user is already authenticated
      navigate(links.dashboard);
    }
  }, [user, navigate]);

  useEffect(() => {

    if (query.verifyToken && query.email) {
      let queryEmail = query.email as string
      let queryVerifyToken = query.verifyToken as string
      dispatch(verifyEmailUser({ email: queryEmail, verifyToken: queryVerifyToken }))
    }
  }, [query]);


  return (
    <AuthLayouts>
      <section className="our-login">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Log In</h2>
                <p className="paragraph">
                  Access all your game titles and auctions in one place
                </p>

                {message && message != "" && (
                  <div className="message-alart-style1">
                    <div
                      className="alert alart_style_one alert-dismissible fade show mb20"
                      role="alert"
                    >
                      {message}
                      <i
                        className="far fa-xmark btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      />
                    </div>
                  </div>

                )}
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight " data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="log-reg-form search-modal default-box-shadow5 form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>We&apos;re glad to see you again!</h4>
                    <p className="text">
                      Don&apos;t have an account?{" "}
                      <Link
                        href={links.registerEarly}
                        className="text-thm"
                      >
                        Get Early Access
                      </Link>
                    </p>
                  </div>
                  <div className="mb20">
                    <label className="form-label fw600 dark-color">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="alitfn58@gmail.com"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb15">
                    <label className="form-label fw600 dark-color">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="*******"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                    <label className="custom_checkbox fz14 ff-heading">
                      Remember me
                      <input type="checkbox" defaultChecked={true} />
                      <span className="checkmark" />
                    </label>
                    <Link href={links.forgotPassword} className="fz14 ff-heading">
                      Lost your password?
                    </Link>
                  </div>
                  <div className="d-grid mb20">
                    <button className="ud-btn btn-thm" type="submit">
                      {loading.login ? (
                        <FLyLoad />
                      ) : (
                        <>
                          Log In <i className="fal fa-arrow-right-long" />
                          {/* <FLyLoad/> */}
                        </>
                      )}
                    </button>
                  </div>
                  {/* <div className="hr_content mb20">
                  <hr />
                  <span className="hr_top_text">OR</span>
                </div> */}
                  {/* <div className="d-md-flex justify-content-between">
                  <button
                    className="ud-btn btn-fb fz14 fw400 mb-2 mb-md-0"
                    type="button"
                  >
                    <i className="fab fa-facebook-f pr10" /> Continue Facebook
                  </button>
                  <button
                    className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0"
                    type="button"
                  >
                    <i className="fab fa-google" /> Continue Google
                  </button>
                  <button className="ud-btn btn-apple fz14 fw400" type="button">
                    <i className="fab fa-apple" /> Continue Apple
                  </button>
                </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AuthLayouts>
  );
}
