export default function SelectInput({
  label,
  defaultSelect,
  data = [],
  handler,
  isCompulsory,
  isEmptyError
}: any) {
  return (
    <>
      <div className="form-style1">
        <label className="heading-color ff-heading fw500 mb10">{label} {isCompulsory && <i className="text-danger">*</i>}</label>
        <div className={`bootselect-multiselect ${isEmptyError ? "border border-danger" : ""}`}>
          <div className="dropdown bootstrap-select">
            <button
              type="button"
              className="btn dropdown-toggle btn-light"
              data-bs-toggle="dropdown"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">
                    {defaultSelect.option}
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
                        onClick={() => handler(item.option, item.value)}
                        className={`dropdown-item ${defaultSelect.value !== null &&
                            item.value === defaultSelect.value
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
