import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PlaceBidModal() {
  const navigate = useRouter().push;

  // useEffect(() => {
  //   // Ensure Bootstrap's JS is loaded
  //   if (typeof window !== 'undefined' && window.bootstrap) {
  //     const myModal = new window.bootstrap.Modal(document.getElementById('placeBidModalToggle'), {
  //       keyboard: true
  //     });

  //     // To open the modal programmatically
  //     myModal.show();

  //     // To close the modal programmatically
  //     // myModal.hide();
  //   }
  // }, []);
  return (
    <>
      <div className="search-modal">
        <div
          className="modal fade"
          id="placeBidModalToggle"
          aria-hidden="true"
          aria-labelledby="placeBidModalToggle"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="placeBidModalToggleLabel" />
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
                <h3>Bid</h3>


                <div className="popup-search-field search_area">
                  <input
                    type="number"
                    className="form-control border-0"
                    placeholder="Bid Amount"
                  />
                  <label>
                    <span className="fa fa-gavel" />
                  </label>

                </div>
                <button
                  onClick={() => navigate("/service-1")}
                  className="ud-btn btn-thm"
                  type="submit"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
