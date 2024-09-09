import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setPriceRange } from "@/redux/features/sitepages/slices/pageSlice";
import priceStore from "@/store/priceStore";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";

export default function PriceDropdown() {
  const [getPrice, setPrice] = useState({
    min: 0,
    max: 100000,
  });

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

  const priceRange = useAppSelector(state => state.pages.games.priceRange);
  const dispatch = useAppDispatch();

  const priceHandler = (data: any) => {
    setPrice({
      min: data[0],
      max: data[1],
    });
  };


  return (
    <>
      <div className="widget-wrapper pb25 mb0 pr20">
        <div className="range-slider-style1">
          <div className="range-wrapper">
            <div className="price__range__box">
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                value={[getPrice.min, getPrice.max]}
                min={0}
                max={100000}
                onChange={priceHandler}
                minDistance={10}
              />
            </div>
            <div className="d-flex gap-1 align-items-center pt-4">
              <input
                type="number"
                className="amount w-100"
                placeholder="$20"
                min={0}
                value={getPrice.min}
                onChange={(e: any) =>
                  setPrice({
                    ...getPrice,
                    min: e.target.value,
                  })
                }
              />
              <span className="fa-sharp fa-solid fa-minus mx-1 dark-color" />
              <input
                type="number"
                className="amount2 w-100"
                placeholder="$100000"
                min={0}
                max={100000}
                value={getPrice.max}
                onChange={(e: any) =>
                  setPrice({
                    ...getPrice,
                    max: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          dispatch(setPriceRange({ priceRange: getPrice }))
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
