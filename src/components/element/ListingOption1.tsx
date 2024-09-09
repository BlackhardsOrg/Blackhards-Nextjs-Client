
import { useEffect, useState } from "react";
import ClearButton from "../button/ClearButton";
import SortOption from "../option/SortOption";
import PriceDropdown from "../dropdown/PriceDropdown";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import RatingDropdown from "../dropdown/RatingDropdown";

export default function ListingOption1() {

  const [getPrice, setPrice] = useState({
    min: 0,
    max: 100000,
  });

  const priceRange = useAppSelector(state => state.pages.games.priceRange);


  return (
    <>
      <div className="row align-items-center mb20">
        <div className="col-6 col-sm-6 col-lg-9 pe-0">
          <div className="text-center text-sm-start">
            <div className="dropdown-lists">
              <ul className="p-0 mb-0 text-center text-sm-start">


                <li className="list-inline-item position-relative d-none d-xl-inline-block">
                  <button
                    className="open-btn mb10 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Budget
                    <i className="fa fa-angle-down ms-2" />
                  </button>
                  <div className="dropdown-menu dd3">
                    <PriceDropdown />
                  </div>
                </li>

                <li className="list-inline-item position-relative d-none d-xl-inline-block">
                  <button
                    className="open-btn mb10 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Rating
                    <i className="fa fa-angle-down ms-2" />
                  </button>
                  <div className="dropdown-menu dd4 pb20">
                    <RatingDropdown />
                  </div>
                </li>
                <li className="list-inline-item position-relative d-none d-xl-inline-block">
                  <ClearButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-lg-3 px-0">
          <div className="page_control_shorting mb10 d-flex align-items-center justify-content-center justify-content-sm-end">
            <SortOption />
          </div>
        </div>
      </div>
    </>
  );
}
