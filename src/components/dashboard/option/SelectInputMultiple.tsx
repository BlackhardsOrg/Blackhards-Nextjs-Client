import { checkElementInArray } from "@/utils/checkElementInArray";
import { Tooltip } from "react-tooltip";

export default function SelectInputMultiple({
  label,
  defaultSelect,
  data = [],
  handler,
  name
}: any) {



  const listSelectButtons = (list: { options: any[], values: any[] }) => {
    return list.options.map((item, index) =>
    (<div key={index} className="message-alart-style1">
      <Tooltip anchorSelect="#bottom" className="ui-tooltip" place="bottom">
        Click to close
      </Tooltip>

      <button
        type="button"
        id="bottom"
        onClick={(e) => handler(item, list.values[index], { ...e, target: { ...e.target, name } })}
        className="alert alart_style_one alert-dismissible fade show mb20 p-1 cursor-pointer d-flex gap-2"
        role="alert"
      >
        <span>{item}</span>
        <i
          className="far fa-xmark p-0 m-0 fw-bold"
          // data-bs-dismiss="alert"
          aria-label="Close"
        />
      </button>
    </div>))
  }

  return (
    <>
      <div className="form-style1">
        <label className="heading-color ff-heading fw500 mb10">{label}</label>
        <div className="bootselect-multiselect">
          <div className="dropdown bootstrap-select">
            <button
              type="button"
              className="btn dropdown-toggle btn-light"
              data-bs-toggle="dropdown"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">
                    {defaultSelect.options.map((item: string) => {
                      return <>{item}{", "}</>
                    })}
                  </div>

                </div>
              </div>

            </button>
            <div className="dropdown-menu ">
              <div
                className="inner show"
                style={{
                  maxHeight: "300px",
                  overflowX: "auto",
                }}
              >
                <ul className="dropdown-menu inner show">
                  {data?.map((item: any, i: any) => (
                    <li key={i} className="selected active">
                      <a
                        onClick={(e) => handler(item.option, item.value, { ...e, target: { ...e.target, name } })}
                        className={`dropdown-item ${defaultSelect.values !== null &&
                          defaultSelect.values.length > 0 &&
                          checkElementInArray(defaultSelect.values, item.value)
                          ? "active selected"
                          : ""
                          }`}
                      >
                        <span className="text">{item.option}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-option">
        <div className="filter-option-inner">
          <div className="filter-option-inner-inner d-flex gap-1">
            {listSelectButtons(defaultSelect)}
          </div>

        </div>
      </div>
    </>
  );
}
