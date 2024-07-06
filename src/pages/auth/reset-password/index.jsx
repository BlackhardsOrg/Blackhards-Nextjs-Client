import FLyLoad from "@/components/loading/FLyLoad";
import { resetPassword } from "@/redux/features/auth/authThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [isPasswordMismatched, setIsPasswordMismatched] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("resetToken");
  const email = searchParams.get("email");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      resetPassword({ email, resetToken, password: credentials.password })
    );
    if (result.payload.success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!resetToken) {
      navigate("/dashboard");
    }
  }, [user, location, navigate, resetToken]);

  useEffect(() => {
    if (credentials.confirmPassword != "") {
      setIsPasswordMismatched(
        credentials.password !== credentials.confirmPassword
      );
    }
  }, [credentials.confirmPassword, credentials.password]);

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
                <h2 className="title"> Reset Password</h2>
                <p className="paragraph">
                  You may update your password any time. We suggest you choose a
                  strong password and update it regularly, e.g. every 6 months.
                  All new passwords must contain at least 8 characters. We also
                  suggest having at least one capital and one lower-case letter
                  (Aa-Zz), one special symbol (#, &, % etc), and one number
                  (0-9) in your password for the best strength.
                </p>

                {/* {message && message != "" && (
                  <p className="paragraph text-info">{message}!</p>
                )} */}
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>Create a new password!</h4>
                    <p className="text">
                      Already have an account?{" "}
                      <Link to="/login" className="text-thm">
                        Login
                      </Link>
                    </p>
                  </div>

                  <div className="mb15">
                    <label className="form-label fw600 dark-color">
                      Password
                    </label>
                    <input
                      name="password"
                      type="text"
                      className="form-control"
                      placeholder="*******"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb15">
                    <label className="form-label fw600 dark-color">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="text"
                      className="form-control"
                      placeholder="*******"
                      value={credentials.confirmPassword}
                      onChange={handleChange}
                    />
                    {isPasswordMismatched && (
                      <small style={{ color: "red" }}>
                        Passwords do not match
                      </small>
                    )}
                  </div>

                  <div className="d-grid mb20">
                    <button className="ud-btn btn-thm" type="submit">
                      {status === "loading" ? (
                        <FLyLoad />
                      ) : (
                        <>
                          Change Password{" "}
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
