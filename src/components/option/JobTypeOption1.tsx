import { jobType } from "@/data/listing";
import listingStore from "@/store/listingStore";

export default function JobTypeOption1() {
  const getJobType = listingStore((state: any) => state.getJobType);
  const setJobType = listingStore((state: any) => state.setJobType);

  // handler
  const jobTypeHandlere = (data: any) => {
    setJobType(data);
  };

  return (
    <>
      <div className="widget-wrapper pr20">
        {jobType.map((item, i) => (
          <div key={i} className="switch-style1">
            <div className="form-check form-switch mb20">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexSwitchCheckDefault5${item.id}`}
                checked={getJobType.includes(item.title)}
                onChange={() => jobTypeHandlere(item.title)}
              />
              <label
                className="form-check-label"
                htmlFor={`flexSwitchCheckDefault5${item.id}`}
              >
                {item.title}
              </label>
              <span className="right-tags">({item.total})</span>
            </div>
          </div>
        ))}
      </div>
      <a className="text-thm">+20 more</a>
    </>
  );
}
