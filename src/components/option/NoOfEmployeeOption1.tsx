import { noOfEmployee } from "@/data/listing";
import listingStore from "@/store/listingStore";

export default function NoOfEmployeeOption1() {
  const getNoOfEmployee = listingStore((state: any) => state.getNoOfEmployee);
  const setNoOfEmployee = listingStore((state: any) => state.setNoOfEmployee);

  return (
    <>
      <div className="checkbox-style1">
        {noOfEmployee.map((item, i) => (
          <label key={i} className="custom_checkbox">
            {item.totalEmployee}
            <input
              type="checkbox"
              checked={getNoOfEmployee.includes(item.totalEmployee)}
              onChange={() => setNoOfEmployee(item.totalEmployee)}
            />
            <span className="checkmark" />
            <span className="right-tags">({item.total})</span>
          </label>
        ))}
      </div>
    </>
  );
}
