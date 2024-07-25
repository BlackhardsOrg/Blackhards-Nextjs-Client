import { bestSeller, deliveryTime, level, location } from "@/data/listing";
import toggleStore from "@/store/toggleStore";

import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import priceStore from "@/store/priceStore";
import ReactSlider from "react-slider";
import ClearButton from "../button/ClearButton";
import SortOption1 from "../option/SortOption1";
import PriceDropdown1 from "../dropdown/PriceDropdown1";
import LevelDropdown1 from "../dropdown/LevelDropdown1";
import LocationDropdown1 from "../dropdown/LocationDropdown1";
import GenreDropdown1 from "../dropdown/GenreDropdown1";

export default function ListingOption1() {
  const [getDelivery, SetDelivery] = useState("");

  const [getPrice, setPrice] = useState({
    min: 0,
    max: 100000,
  });
  const [getLevel, setLevel] = useState<any>([]);
  const [getLocation, setLocation] = useState<any>([]);

  const priceRange = priceStore((state: any) => state.priceRange);
  const setPriceRange = priceStore((state: any) => state.priceRangeHandler);
  const listingToggle = toggleStore((state: any) => state.listingToggleHandler);
  const setOurDeliveryTime = listingStore((state: any) => state.setDeliveryTime);
  const getDeliveryTime = listingStore((state: any) => state.getDeliveryTime);
  const setOurLevel = listingStore((state: any) => state.setLevel);
  const getOurLevel = listingStore((state: any) => state.getLevel);
  const getOurLocation = listingStore((state: any) => state.getLocation);
  const setOurLocation = listingStore((state: any) => state.setLocation);

  // filters handler
  const deliveryHandler = (data: any) => {
    SetDelivery(data);
  };

  useEffect(() => {
    SetDelivery(getDeliveryTime);
  }, [getDeliveryTime]);

  const priceHandler = (data: any) => {
    setPrice({
      min: data[0],
      max: data[1],
    });
  };

  useEffect(() => {
    setPrice(priceRange);
  }, [priceRange]);

  const levelHandler = (data: any) => {
    const isExist = getLevel.includes(data);
    if (!isExist) {
      return setLevel((item: any) => [...item, data]);
    }
    const deleted = getLevel.filter((item: any) => item !== data);
    setLevel(deleted);
  };

  useEffect(() => {
    setLevel(getOurLevel);
  }, [getOurLevel]);

  const locationHandler = (data: any) => {
    const isExist = getLocation.includes(data);
    if (!isExist) {
      return setLocation((item: any) => [...item, data]);
    }
    const deleted = getLocation.filter((item: any) => item !== data);
    setLocation(deleted);
  };

  useEffect(() => {
    setLocation(getOurLocation);
  }, [getOurLocation]);

  return (
    <>
      <div className="row align-items-center mb20">
        <div className="col-6 col-sm-6 col-lg-9 pe-0">
          <div className="text-center text-sm-start">
            <div className="dropdown-lists">
              <ul className="p-0 mb-0 text-center text-sm-start">
                <li className="list-inline-item">
                  <button
                    onClick={listingToggle}
                    type="button"
                    className="open-btn filter-btn-left mb10"
                  >
                    <img
                      className="me-2"
                      src="/images/icon/all-filter-icon.svg"
                      alt="icon"
                    />
                    All Filter
                  </button>
                </li>
                <li className="list-inline-item position-relative d-none d-xl-inline-block">
                  <button
                    className="open-btn mb10 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Publish Time
                    <i className="fa fa-angle-down ms-2" />
                  </button>
                  <div className="dropdown-menu">
                    <div className="widget-wrapper pb25 mb0">
                      <div className="radio-element">
                        {deliveryTime.map((item, i) => (
                          <div
                            key={i}
                            className="form-check d-flex align-items-center mb10"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id={`flexRadioDefault1${item.id}`}
                              checked={getDelivery === item.value}
                              onChange={() => deliveryHandler(item.value)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexRadioDefault1${item.id}`}
                            >
                              {item.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setOurDeliveryTime(getDelivery)}
                      className="done-btn ud-btn btn-thm drop_btn"
                    >
                      Apply
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                </li>
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
                    <PriceDropdown1 />
                  </div>
                </li>
                <li className="list-inline-item position-relative d-none d-xl-inline-block">
                  <button
                    className="open-btn mb10 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Level
                    <i className="fa fa-angle-down ms-2" />
                  </button>
                  <div className="dropdown-menu">
                    <LevelDropdown1 />
                  </div>
                </li>
                <li className="list-inline-item position-relative d-none d-xl-inline-block">
                  <button
                    className="open-btn mb10 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Genre
                    <i className="fa fa-angle-down ms-2" />
                  </button>
                  <div className="dropdown-menu dd4 pb20">
                    <GenreDropdown1 />
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
            <SortOption1 />
          </div>
        </div>
      </div>
    </>
  );
}
