import { GameTitleTags } from "@/data/listing";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setTag } from "@/redux/features/sitepages/slices/pageSlice";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";

export default function SortOption() {

  const authorTag= useAppSelector(state => state.pages.games.tag)
  const dispatch = useAppDispatch()
  // handle
  const bestSellerHandler = (data: any) => {
    dispatch(setTag({tag: data}));
  };

  return (
    <>
      <div className="pcs_dropdown dark-color pr10 pr0-xs text-center">
        <span>Sort by</span>
        <div className="dropdown bootstrap-select show-tick">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-bs-toggle="dropdown"
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">
                  {authorTag && authorTag.title}
                </div>
              </div>
            </div>
          </button>
          <div className="dropdown-menu">
            <div className="inner show">
              <ul className="dropdown-menu inner show">
                {GameTitleTags.map((item, i) => (
                  <li key={i}>
                    <a
                      onClick={() => bestSellerHandler(item)}
                      className={`dropdown-item ${item.value === authorTag?.value ? "active selected" : ""
                        }`}
                    >
                      <span className="bs-ok-default check-mark" />
                      <span className="text">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
