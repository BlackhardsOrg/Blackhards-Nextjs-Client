import FLyLoad from "@/components/loading/FLyLoad";
import { login } from "@/redux/features/auth/authThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(":ddhs");

    const result = await dispatch(login(credentials));
    console.log(result, "RESuLT");
    if (result.payload.success) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (user) {
      // Redirect to the previous location if user is already authenticated
      const { from } = location.state || { from: "/" };
      navigate("/dashboard");
    }
  }, [user, location, navigate]);

  return (
    <>
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

                {message && message!= "" && <p className="paragraph text-info">
                  {message}!
                </p>}
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>We&apos;re glad to see you again!</h4>
                    <p className="text">
                      Don&apos;t have an account?{" "}
                      <Link to="/register-early" className="text-thm">
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
                      <input type="checkbox" defaultChecked="checked" />
                      <span className="checkmark" />
                    </label>
                    <Link to="/forgot-password" className="fz14 ff-heading">Lost your password?</Link>
                  </div>
                  <div className="d-grid mb20">
                    <button className="ud-btn btn-thm" type="submit">
                      {status === "loading" ? (
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
    </>
  );
}
