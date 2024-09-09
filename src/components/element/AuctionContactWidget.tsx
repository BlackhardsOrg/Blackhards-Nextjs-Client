import { SINGLE_AUCTION } from "@/graphql";
import { IAuctionGQL } from "@/types";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuctionContactWidget() {
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
      {data && data.auction && data.auction.gametitle ?
        <div className="freelancer-style1 service-single mb-0 bdrs8">
          <h4>About Seller</h4>
          <div className="wrapper d-flex align-items-center mt20">
            <div className="thumb position-relative mb25">
              <img
                className="rounded-circle mx-auto"
                src="/images/team/client-1.png"
                alt="client"
              />
            </div>
            <div className="ml20">
              <h5 className="title mb-1">{data.auction.developer.studioName}</h5>
              <p className="mb-0">Digital Marketing</p>
              <div className="review">
                <p>
                  <i className="fas fa-star fz10 review-color pr10" />
                  <span className="dark-color">4.9</span> (595 reviews)
                </p>
              </div>
            </div>
          </div>
          <hr className="opacity-100" />
          <div className="details">
            <div className="fl-meta d-flex align-items-center justify-content-between">
              <a className="meta fw500 text-start">
                Location
                <br />
                <span className="fz14 fw400">London</span>
              </a>
              <a className="meta fw500 text-start">
                Employees
                <br />
                <span className="fz14 fw400">11-20</span>
              </a>
              <a className="meta fw500 text-start">
                Departments
                <br />
                <span className="fz14 fw400">Designer</span>
              </a>
            </div>
          </div>
          <div className="d-grid mt30">
            <Link href="/contact" className="ud-btn btn-thm-border">
              Contact Buyer
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div> : null}
    </>
  );
}
