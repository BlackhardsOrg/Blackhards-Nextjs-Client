import { FETCH_GAME_REVIEWS } from "@/graphql";
import { IReview } from "@/types";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReviewCard from "./ReviewCard";

export default function GameDetailReviewInfo() {
  const { query } = useRouter()
  const { id } = query;
  // const { data, error, refetch } = useQuery(FETCH_GAME_REVIEWS, { variables: { gameTitleId: String(id) } })
  const { data, loading, error, refetch } = useQuery<{ fetchGameReviews: IReview[] }>(FETCH_GAME_REVIEWS, {
    variables: {
      gameTitleId: id
    }
  });
  useEffect(() => {
    console.log(data, error, "DATA", id)
    refetch({ gameTitleId: id })
  }, [data, id, error])
  return (
    <>
      <div className="product_single_content mb50">
        <div className="mbp_pagination_comments">
          <div className="row">
            <div className="col-lg-12">
              <div className="total_review mb30 mt45">
                <h4>80 Reviews</h4>
              </div>
              <div className="d-md-flex align-items-center mb30">
                <div className="total-review-box d-flex align-items-center text-center mb30-sm">
                  <div className="wrapper mx-auto">
                    <div className="t-review mb15">4.96</div>
                    <h5>Exceptional</h5>
                    <p className="text mb-0">3,014 reviews</p>
                  </div>
                </div>
                <div className="wrapper ml60 ml0-sm">
                  <div className="review-list d-flex align-items-center mb10">
                    <div className="list-number">5 Star</div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: "90%",
                        }}
                        aria-valuenow={90}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="value text-end">58</div>
                  </div>
                  <div className="review-list d-flex align-items-center mb10">
                    <div className="list-number">4 Star</div>
                    <div className="progress">
                      <div
                        className="progress-bar w-75"
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="value text-end">20</div>
                  </div>
                  <div className="review-list d-flex align-items-center mb10">
                    <div className="list-number">3 Star</div>
                    <div className="progress">
                      <div
                        className="progress-bar w-50"
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="value text-end">15</div>
                  </div>
                  <div className="review-list d-flex align-items-center mb10">
                    <div className="list-number">2 Star</div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: "30%",
                        }}
                        aria-valuenow={30}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="value text-end">2</div>
                  </div>
                  <div className="review-list d-flex align-items-center mb10">
                    <div className="list-number">1 Star</div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: "20%",
                        }}
                        aria-valuenow={10}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="value text-end">1</div>
                  </div>
                </div>
              </div>

            </div>

            {data && data.fetchGameReviews ?
              data.fetchGameReviews.map((item, index) => {
                return (
                  <ReviewCard key={index}
                    name={item.name}
                    comment={item.comment}
                    createdAt={item.createdAt} />
                )
              }) : null}


            {/* <div className="col-md-12">
              <div className="position-relative bdrb1 pb50">
                <Link href="/service-single" className="ud-btn btn-light-thm">
                  See More
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
