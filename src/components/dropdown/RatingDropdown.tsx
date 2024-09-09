
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setGameRating, setPriceRange } from "@/redux/features/sitepages/slices/pageSlice";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import StarRating from "./StarRatingComponent";

export default function RatingDropdown() {

  const ratingPersisted = useAppSelector(state => state.pages.games.rating)

  const [rating, setRating] = useState<number>(ratingPersisted?ratingPersisted: 0); // Stores the clicked rating


  useEffect(() => {
    // Dynamically import Bootstrap only on the client side
    if (typeof window !== 'undefined') {
      import('bootstrap').then((bootstrap) => {
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
          return new bootstrap.Dropdown(dropdownToggleEl);
        });
      });
    }
  }, []);

  const closeDropdown = (e) => {
    if (typeof window !== 'undefined') {
      import('bootstrap').then((bootstrap) => {
        const dropdownElement = e.target.closest('.dropdown-menu');
        const dropdown = new bootstrap.Dropdown(dropdownElement.previousElementSibling);
        dropdown.hide();
      });
    }
  };

  const dispatch = useAppDispatch();


  return (
    <>
      <div className="widget-wrapper pb25 mb0 pr20">
        <div className="range-slider-style1">
          <div className="range-wrapper">
            <div className="price__range__box">
              <StarRating rating={rating}
                setRating={setRating} />
            </div>

          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          dispatch(setGameRating({ rating }))
          closeDropdown(e)
        }}
        className="done-btn ud-btn btn-thm drop_btn3"
        data-bs-dismiss="dropdown"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
