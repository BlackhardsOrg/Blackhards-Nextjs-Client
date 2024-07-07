import AuthLayouts from "@/components/layouts/AuthLayouts";
import FLyLoad from "@/components/loading/FLyLoad";
import { links } from "@/data/links";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { forgottenPasswordUser } from "@/redux/features/auth/api/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useRouter().push;
  const user = useAppSelector((state) => state.auth.user);
  const { query } = useRouter();

  const message = query.message as string;

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await dispatch(forgottenPasswordUser(email)) as any;
    console.log(result, "RESuLT");
    // if (result.success) {
    //   navigate(links.dashboard);
    // }
  };

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
                <div className="log-reg-form box-shadow search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>Reset your Blackhards password - Blackhards.com</h4>
                    <p className="text">
                      Already have an account?{" "}
                      <Link href={links.login} className="text-thm">
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
                      {loading.forgottenPassword ? (
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
    </AuthLayouts>
  );
}
