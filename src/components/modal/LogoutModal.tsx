import { links } from "@/data/links";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { persistor } from "@/redux/app/store";
import { logoutUser } from "@/redux/features/auth/api/authApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function LogoutModal() {
  const navigate = useRouter().push;
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const handleLogout = async (e: any) => {
    console.log("called");
    if (!user) {
      toast("You are not logged in!", { type: "error" })
      navigate(links.login)

    }
    if (user) {
      await dispatch(logoutUser(user.token));
      persistor.purge().then(() => {
        navigate(links.login);
      });
    }

  };
  return (
    <>
      <div className="search-modal">
        <div
          className="modal fade"
          id="logoutModalToggle"
          aria-hidden="true"
          aria-labelledby="logoutModalToggle"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalToggleLabel" />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fal fa-xmark" />
                </button>
              </div>
              <div className="modal-body d-flex flex-column gap-3 bg-white rounded ">
                <h3>Confirm logout?</h3>

                <button
                  type="button"
                  className="ud-btn btn-thm-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  No
                </button>

                <button
                  onClick={handleLogout}
                  className="ud-btn btn-thm"
                  data-bs-dismiss="modal"
                  type="submit"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
