import axios from "axios";
import { useState } from "react";
import StarRating from "../dropdown/StarRatingComponent";
import { sendRating } from "@/redux/features/rating/rating.api";
import FLyLoad from "../loading/FLyLoad";

import { useRouter } from "next/router";

export default function GameDetailComment() {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const { query } = useRouter()
  const { id: gameTitleId } = query;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const ratingData = {
      name,
      email,
      rating,
      comment,
      gameTitleId: String(gameTitleId)
    };

    setLoading(true)
    await sendRating(ratingData)
    setLoading(false)

  };

  return (
    <>
      <div className="bsp_reveiw_wrt mb20">
        <h6 className="fz17">Add a Review</h6>
        <p className="text">
          Your email address will not be published. Required fields are marked *
        </p>
        <h6>Your rating of this product</h6>

        <StarRating rating={rating} setRating={setRating} />
        <form onSubmit={handleSubmit} className="comments_form mt30 mb30-md">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-4">
                <label className="fw500 fz16 ff-heading dark-color mb-2">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="pt15"
                  rows={6}
                  placeholder="Your Comment"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb20">
                <label className="fw500 ff-heading dark-color mb-2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Chuka Obi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb20">
                <label className="fw500 ff-heading dark-color mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="rony@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              {/* <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                <label className="custom_checkbox fz15 ff-heading">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                  <input type="checkbox" />
                  <span className="checkmark" />
                </label>
              </div> */}
              <button className="ud-btn btn-thm">
                {loading ? <FLyLoad /> :
                  <>
                    Send
                    <i className="fal fa-arrow-right-long" />
                  </>
                }

              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
