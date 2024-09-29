import { IBidHistory } from "@/types";
import { timeAgo } from "@/utils";
import { formatPriceToDollars } from "@/utils/priceFormatter";

export default function TopBidCard({ data }: { data: IBidHistory }) {
  return (
    <>
      <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 align-items-start">
        <div className="col-xl-10 px-0">
          <div className="d-lg-flex align-items-center">
            <div className="thumb w90 position-relative rounded-circle mb15-md">
              <img
                style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                className="rounded-circle mx-auto"
                src={data.bidder.profileImageURL}
                alt="rounded-circle"
              />
              <span className="online" />
            </div>
            <div className="details ml20 ml0-md mb15-md">
              <h5 className="title mb-1">{data.bidder.studioName}</h5>
              <div className="review mb20">

                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 bdrn-md pl15 pl0-md bdrn-xs" />{" "}
                  {timeAgo(data.updatedAt)}
                </p>

              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 px-0">
          <div className="text-lg-center text-xl-end mt-0 mt-lg-2 mt-xl-0">
            <h4>
              {formatPriceToDollars(data.bid)}
            </h4>
            <p className="text mb-0">best deals</p>
          </div>
        </div>
      </div>
    </>
  );
}
