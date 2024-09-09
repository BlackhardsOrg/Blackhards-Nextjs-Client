import { SINGLE_AUCTION } from "@/graphql";
import { IAuctionGQL } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuctionPriceWidget() {
  const { query } = useRouter()
  const { id } = query;

  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ auction: IAuctionGQL }>(SINGLE_AUCTION, {
    variables: {
      id
    }
  });

  return (
    <>
      {data && data.auction ? <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">{formatPriceToDollars(data.auction.reservedPrice)}</h3>
        <p className="text fz14">Current Bid</p>
        <div className="d-grid gap-4">
          <Link
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn btn-thm"
          >
            Place Bid
            <i className="fal fa-arrow-right-long" />
          </Link>

          <a
            data-bs-toggle="modal"
            href="#placeBidModalToggle"
            className="ud-btn3 btn-thm"
          >
            Result Auction
            <i className="fal fa-arrow-right-long" />
          </a>



          {/* <Link
            // data-bs-toggle="modal"
            href="/shop-checkout"
            className="ud-btn btn-thm"
          >
            Redeem Bid
            <i className="fal fa-arrow-right-long" />
          </Link> */}
        </div>
      </div> : null}
    </>
  );
}
