import { useNavigate } from "react-router-dom";

export default function PlaceBidModal() {
  const navigate = useNavigate();
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
