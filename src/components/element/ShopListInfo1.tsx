import SortOption from "../option/SortOption";

export default function ShopListInfo1({ length }: any) {
  return (
    <>
      <div className="row mb20">
        <div className="col-sm-6">
          <div className="text-center text-sm-start">
            <p className="text mb-0">
              <span className="fw500">{length}</span> services available
            </p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
            <SortOption />
          </div>
        </div>
      </div>
    </>
  );
}
