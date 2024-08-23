import { SINGLE_GAME_TITLE } from "@/graphql";
import { IGameTitleGQL } from "@/types";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GameContactWidget() {

  const { query } = useRouter()
  const { id } = query;

  const removeTypename = (obj: any) => {
    const { __typename, ...rest } = obj;
    return rest;
  };

  // const data = product1.find((item: any) => item.id == id);
  const { data, loading, error } = useQuery<{ gameTitle: IGameTitleGQL }>(SINGLE_GAME_TITLE, {
    variables: {
      id
    }
  });
  useEffect(() => {
    console.log(data, "SINGLE DATA")
  }, [loading, data])
  return (
    <>
      <div className="freelancer-style1 service-single mb-0">
        <div className="wrapper d-flex align-items-center">
          <div className="thumb position-relative mb25">
            <img
              style={{ width: "90px", height: "90px" }}
              className="rounded-circle mx-auto"
              src="/images/team/fl-1.png"
              alt="rounded-circle"
            />
            <span className="online" />
          </div>
          <div className="ml20">
            <h5 className="title mb-1">{data?.gameTitle.developer.studioName}</h5>
            <p className="mb-0">Dog Trainer</p>
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
              Rate
              <br />
              <span className="fz14 fw400">$90 / hr</span>
            </a>
            <a className="meta fw500 text-start">
              Job Success
              <br />
              <span className="fz14 fw400">%98</span>
            </a>
          </div>
        </div>
        <div className="d-grid mt30">
          <Link href="/freelancer-single" className="ud-btn btn-thm-border">
            Send Message
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
