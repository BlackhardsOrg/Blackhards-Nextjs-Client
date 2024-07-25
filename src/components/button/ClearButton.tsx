import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";

export default function ClearButton() {
  // set handlers
  const setDeliveryTime = listingStore((state: any) => state.setDeliveryTime);
  const setLevel = listingStore((state: any) => state.setLevel);
  const setLocation = listingStore((state: any) => state.setLocation);
  const setBestSeller = listingStore((state: any) => state.setBestSeller);
  const setDesginTool = listingStore((state: any) => state.setDesginTool);
  const setSpeak = listingStore((state: any) => state.setSpeak);
  const setPriceRange = priceStore((state: any) => state.priceRangeHandler);
  const setSearch = listingStore((state: any) => state.setSearch);
  const setCategory = listingStore((state: any) => state.setCategory);
  const setProjectType = listingStore((state: any) => state.setProjectType);
  const setEnglishLevel = listingStore((state: any) => state.setEnglishLevel);
  const setJobType = listingStore((state: any) => state.setJobType);
  const setNoOfEmployee = listingStore((state: any) => state.setNoOfEmployee);

  // get state
  const getDeliveryTime = listingStore((state: any) => state.getDeliveryTime);
  const getLevel = listingStore((state: any) => state.getLevel);
  const getLocation = listingStore((state: any) => state.getLocation);
  const getBestSeller = listingStore((state: any) => state.getBestSeller);
  const getDesginTool = listingStore((state: any) => state.getDesginTool);
  const getSpeak = listingStore((state: any) => state.getSpeak);
  const getPriceRange = priceStore((state: any) => state.priceRange);
  const getSearch = listingStore((state: any) => state.getSearch);
  const getCategory = listingStore((state: any) => state.getCategory);
  const getProjectType = listingStore((state: any) => state.getProjectType);
  const getEnglishLevel = listingStore((state: any) => state.getEnglishLevel);
  const getJobType = listingStore((state: any) => state.getJobType);
  const getNoOfEmployee = listingStore((state: any) => state.getNoOfEmployee);

  // clear handler
  const clearHandler = () => {
    setDeliveryTime("");
    setLevel([]);
    setLocation([]);
    setBestSeller("best-seller");
    setDesginTool([]);
    setSpeak([]);
    setPriceRange(0, 100000);
    setSearch("");
    setCategory([]);
    setProjectType([]);
    setEnglishLevel([]);
    setJobType([]);
    setNoOfEmployee([]);
  };

  return (
    <>
      {getDeliveryTime !== "" ||
        getLevel?.length !== 0 ||
        getLocation?.length !== 0 ||
        getSearch !== "" ||
        getBestSeller !== "best-seller" ||
        getDesginTool?.length !== 0 ||
        getSpeak?.length !== 0 ||
        getPriceRange.min !== 0 ||
        getPriceRange.max !== 100000 ||
        getCategory?.length !== 0 ||
        getProjectType?.length !== 0 ||
        getEnglishLevel?.length !== 0 ||
        getJobType?.length !== 0 ||
        getNoOfEmployee?.length !== 0 ? (
        <button
          onClick={clearHandler}
          className="ud-btn btn-thm ui-clear-btn w-100"
        >
          Clear
          <i className="fal fa-arrow-right-long"></i>
        </button>
      ) : (
        ""
      )}
    </>
  );
}
