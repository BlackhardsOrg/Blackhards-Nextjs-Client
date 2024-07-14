


interface IPlansSelectOptionsInput {
  name: string
  type: "basic" | "standard" | "premium"

  defaultSelect: number
  data: { option: string, value: number }[]
  handler: (e: any, value: string, name: string, type: "basic" | "standard" | "premium") => void
}

export default function PlansSelectOptionsInput({
  name,
  type,
  defaultSelect,
  data = [],
  handler,
}: IPlansSelectOptionsInput) {
  return (
    <>
      <div className="form-style1">
        {/* <label className="heading-color ff-heading fw500 mb10">{label}</label> */}
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
                    {defaultSelect}
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
                        onClick={(e) => handler(e, item.value, name, type)}
                        className={`dropdown-item ${defaultSelect !== null &&
                            item.value === defaultSelect
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
    </>
  );
}
