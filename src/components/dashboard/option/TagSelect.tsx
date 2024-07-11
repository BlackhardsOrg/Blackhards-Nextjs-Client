import { Tooltip } from "react-tooltip";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { checkElementInArray } from "@/utils/checkElementInArray";

const tagOptions = [
  { option: "battle royale", value: "battle-royale" },
  { option: "rpg", value: "rpg" },
  { option: "strategy", value: "strategy" },
  { option: "adventure", value: "adventure" },
  { option: "action", value: "action" },
  { option: "racing", value: "racing" },
];


export default function TagSelect({
  selectedTags,
  setSelectedTags
}: any) {

  const [search, setSearch] = useState("");
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // search dropdown
  const focusDropdown = () => {
    setSearchDropdownOpen(true);
  };
  const blurDropdown = () => {
    setSearchDropdownOpen(false);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag) || selectedTags.length >= 5) return;
    setSelectedTags([...selectedTags, tag]);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t: string) => t !== tag));
  };

  const filteredTags = tagOptions.filter(tag => tag.option.toLowerCase().includes(search.toLowerCase()));


  const listSelectButtons = () => {
    return selectedTags.map((tag: string, index: number) =>
    (<div key={index} className="message-alart-style1">
      <Tooltip anchorSelect="#bottom" className="ui-tooltip" place="bottom">
        Click to close
      </Tooltip>

      <button
        type="button"
        id="bottom"
        onClick={() => handleTagRemove(tag)}
        className="alert alart_style_one alert-dismissible fade show mb20 p-1 cursor-pointer d-flex gap-2"
        role="alert"
      >
        <span key={tag}>
          {tagOptions.find(t => t.value === tag)?.option}
        </span>
        <i
          className="far fa-xmark p-0 m-0 fw-bold"
          // data-bs-dismiss="alert"
          aria-label="Close"
        />
      </button>
    </div>))
  }


  return (
    <div className="advance-search-field position-relative bdr1">
      <form className="form-search position-relative">
        <div className="box-search">
          <span className="icon far fa-magnifying-glass" />
          <input
            className="form-control"
            type="text"
            name="search"
            placeholder="Type in Game tags"
            onFocus={focusDropdown}
            onBlur={blurDropdown}
            value={search}
            onChange={handleSearchChange}
          />

          <div
            className="search-suggestions"
            style={
              isSearchDropdownOpen
                ? {
                  visibility: "visible",
                  opacity: "1",
                  top: "70px",
                }
                : {
                  visibility: "hidden",
                  opacity: "0",
                  top: "100px",
                }
            }
          >
            <h6 className="fz14 ml30 mt25 mb-3">Popular Search</h6>
            <div className="box-suggestions">
              <ul className="px-0 m-0 pb-4">
                {filteredTags.map(tag => (

                  <li
                    onClick={() => handleTagClick(tag.value)}
                    key={tag.value}
                    className={
                      checkElementInArray(selectedTags, tag.value) ? "ui-list-active" : ""
                    }
                  >
                    <div

                      className="info-product cursor-pointer"
                    >
                      <div className="item_title">{tag.option}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </form >
      <div className="filter-option">
        {/* <h4>Selected Tags:</h4> */}

        <div className="filter-option-inner">
          <div className="filter-option-inner-inner d-flex gap-1">
            {listSelectButtons()}
          </div>

        </div>
      </div>
    </div >
  );
}
