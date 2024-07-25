import { categor2 } from "@/data/listing";
import listingStore from "@/store/listingStore";

export default function CategoryOption2() {
  const getCategory = listingStore((state: any) => state.getCategory);
  const setCategory = listingStore((state: any) => state.setCategory);

  // handler
  const categoryHandler = (data: any) => {
    setCategory(data);
  };

  return (
    <>
      <div className="checkbox-style1 mb15">
        {categor2.map((item, i) => (
          <label key={i} className="custom_checkbox">
            {item.title}
            <input
              type="checkbox"
              onChange={() => categoryHandler(item.title)}
              checked={getCategory.includes(item.title)}
            />
            <span className="checkmark" />
            <span className="right-tags">({item.total})</span>
          </label>
        ))}
      </div>
    </>
  );
}
