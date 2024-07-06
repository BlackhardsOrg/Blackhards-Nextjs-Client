import { Link } from "react-router-dom";

export default function AuctionPriceWidget() {
  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">$5000</h3>
        <p className="text fz14">Current Bid</p>
        <div className="d-grid gap-4">
          <a
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            Place Bid
            <i className="fal fa-arrow-right-long" />
          </a>

          <a
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            Result Auction
            <i className="fal fa-arrow-right-long" />
          </a>

          <a
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            Confirm Auction
            <i className="fal fa-arrow-right-long" />
          </a>

          <a
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            End Auction
            <i className="fal fa-arrow-right-long" />
          </a>

          <a
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            Re-start Auction
            <i className="fal fa-arrow-right-long" />
          </a>

          <Link
            // data-bs-toggle="modal"
            to="/shop-checkout"
            className="ud-btn btn-thm"
          >
            Redeem Bid
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
