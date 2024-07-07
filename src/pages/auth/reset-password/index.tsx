import AuthLayouts from "@/components/layouts/AuthLayouts";
import FLyLoad from "@/components/loading/FLyLoad";
import { links } from "@/data/links";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { resetPasswordUser } from "@/redux/features/auth/api/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useRouter().push;
  const user = useAppSelector((state) => state.auth.user);
  const { query } = useRouter();


  const [isPasswordMismatched, setIsPasswordMismatched] = useState(false);



  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (query.resetToken && query.email) {
      let queryResetToken = query.resetToken as string
      let queryEmail = query.email as string
      const result = await dispatch(
        resetPasswordUser({ email: queryEmail, resetToken: queryResetToken, password: credentials.password })
      ) as any;
      if (result.success) {
        navigate(links.login);
      }
    }

  };

  useEffect(() => {
    // toast(query.resetToken)
    // if (!query.resetToken || query.resetToken != "") {
    //   navigate(links.dashboard);
    // }
  }, [query]);

  useEffect(() => {
    if (credentials.confirmPassword != "") {
      setIsPasswordMismatched(
        credentials.password !== credentials.confirmPassword
      );
    }
  }, [credentials.confirmPassword, credentials.password]);

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
                <h2 className="title"> Reset Password</h2>
                <div className="message-alart-style1">
                  <div
                    className="alert alart_style_one alert-dismissible fade show mb20"
                    role="alert"
                  >
                    Update your password anytime.
                    Use at least 8 characters with one uppercase,
                    one lowercase, one special symbol (#, &, %),
                    and one number (0-9). Update it regularly,
                    like every 6 months, for better security.
                    {/* <i
                      className="far fa-xmark btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    /> */}
                  </div>
                </div>
                {/* <p className="paragraph">
                  You may update your password any time. We suggest you choose a
                  strong password and update it regularly, e.g. every 6 months.
                  All new passwords must contain at least 8 characters. We also
                  suggest having at least one capital and one lower-case letter
                  (Aa-Zz), one special symbol (#, &, % etc), and one number
                  (0-9) in your password for the best strength.
                </p> */}

                {/* {message && message != "" && (
                  <p className="paragraph text-info">{message}!</p>
                )} */}
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="log-reg-form default-box-shadow5 search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>Create a new password!</h4>
                    <p className="text">
                      Already have an account?{" "}
                      <Link href={links.login} className="text-thm">
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
                      {loading.resetPassword ? (
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
    </AuthLayouts>
  );
}
