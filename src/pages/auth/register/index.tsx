import MetaComponent from "@/components/common/MetaComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FLyLoad from "@/components/loading/FLyLoad";
import AuthLayouts from "@/components/layouts/AuthLayouts";
import PasswordSetup from "@/components/auth/PasswordSetup";
import Link from "next/link";
import { useRouter } from "next/router";
import { registerUser } from "@/redux/features/auth/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { links } from "@/data/links";
const metadata = {
  title: "Blackhards - AI Game Code | Register",
};
export default function RegisterPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    studioName: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useRouter().push;
  const [gameLoading, setGameLoading] = useState(false)
  const [isPasswordMismatched, setIsPasswordMismatched] = useState(false);
  const [isSubmitAllowable, setIsSubmitAllowable] = useState(false);

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setGameLoading(true)
    const result = await dispatch(registerUser(credentials)) as any;
    console.log(result, "RESULT")
    if (result && result.success) {
      navigate(
        "/auth/login?message=Verification email sent, please check your inbox"
      );
    }

    setGameLoading(false)

  };

  const shouldAllowSubmit = () => {
    if (
      !isPasswordMismatched &&
      credentials.email != "" &&
      credentials.password != "" &&
      credentials.confirmPassword != ""
    ) {
      setIsSubmitAllowable(true);
    } else {
      setIsSubmitAllowable(false);
    }
  };

  useEffect(() => {
    shouldAllowSubmit();
  }, [credentials.email, isPasswordMismatched, credentials.password]);

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
                <h2 className="title">Register</h2>
                <p className="paragraph">Join us at Blackhards</p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                  <div className="mb30">
                    <h4>Let&apos;s create your account!</h4>
                    <p className="text mt20">
                      Already have an account?{" "}
                      <Link href={links.login} className="text-thm">
                        Log In!
                      </Link>
                    </p>
                  </div>
                  <div className="mb25">
                    <label className="form-label fw500 dark-color">
                      Studio Name
                    </label>
                    <input
                      value={credentials.studioName}
                      onChange={handleChange}
                      type="text"
                      name="studioName"
                      className="form-control"
                      placeholder="Quiva Games Studio"
                    />
                  </div>

                  <div className="mb25">
                    <label className="form-label fw500 dark-color">
                      Business Email <span className="text-danger">*</span>
                    </label>
                    <input
                      value={credentials.email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="davido@quiva.com"
                    />
                  </div>
                  <PasswordSetup
                    handleChange={handleChange}
                    credentials={credentials}
                    isPasswordMismatched={isPasswordMismatched}
                    setIsPasswordMismatched={setIsPasswordMismatched}
                  />

                  <div className="d-grid mb20">
                    <button
                      disabled={!isSubmitAllowable}
                      className="ud-btn btn-thm default-box-shadow2"
                      type="submit"
                      style={{ opacity: !isSubmitAllowable ? ".4" : "1" }}
                    >
                      {gameLoading ? (
                        <FLyLoad />
                      ) : (
                        <>
                          Register <i className="fal fa-arrow-right-long" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="hr_content mb20">
                    <hr />
                    <span className="hr_top_text">OR</span>
                  </div>
                  <div className="d-md-flex justify-content-between">
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
                    <button
                      className="ud-btn btn-apple fz14 fw400"
                      type="button"
                    >
                      <i className="fab fa-apple" /> Continue Apple
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
