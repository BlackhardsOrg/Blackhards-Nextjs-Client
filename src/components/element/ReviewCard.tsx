import { timeAgo } from "@/utils"
import { useEffect } from "react"

interface IReviewCard {
    name: string
    createdAt: string
    comment: string
}

const ReviewCard = ({
    name,
    createdAt,
    comment,
}: IReviewCard) => {

 
    return (
        <div className="col-md-12">
            <div className="mbp_first position-relative d-flex align-items-center justify-content-start mb30-sm">
                <img
                    src="/images/blog/CommentProfile.png"
                    className="mr-3 rounded-circle"
                    alt="comments-2.png"
                />
                <div className="ml20">
                    <h6 className="mt-0 mb-0">{name}</h6>
                    <div>
                        <span className="fz14">{timeAgo(createdAt)}</span>
                    </div>
                </div>
            </div>
            <p className="text mt20 mb20">
                {comment}
            </p>
            {/* <div className="review_cansel_btns d-flex">
                <a>
                    <i className="fas fa-thumbs-up" />
                    Helpful
                </a>
                <a>
                    <i className="fas fa-thumbs-down" />
                    Not helpful
                </a>
            </div> */}
        </div>
    )
}

export default ReviewCard