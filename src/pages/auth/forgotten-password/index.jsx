import FLyLoad from "@/components/loading/FLyLoad";
import { forgottenPassword} from "@/redux/features/auth/authThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(forgottenPassword(email));
    console.log(result, "RESuLT");
    // if (result.payload.success) {
    //   navigate("/dashboard");
    // }
  };

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
                <h2 className="title">Forgotten Password</h2>
                <p className="paragraph">Please Type in your Email</p>

                {message && message != "" && (
                  <p className="paragraph text-info">{message}!</p>
                )}
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>Reset your Blackhards password - Blackhards.com</h4>
                    <p className="text">
                      Already have an account?{" "}
                      <Link to="/login" className="text-thm">
                        Login
                      </Link>
                    </p>
                  </div>

                  <div className="mb15">
                    <label className="form-label fw600 dark-color">Email</label>
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      placeholder="johnodogwu@mail.com"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-grid mb20">
                    <button className="ud-btn btn-thm" type="submit">
                      {status === "loading" ? (
                        <FLyLoad />
                      ) : (
                        <>
                          Send Reset Email{" "}
                          <i className="fal fa-arrow-right-long" />
                          {/* <FLyLoad/> */}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
