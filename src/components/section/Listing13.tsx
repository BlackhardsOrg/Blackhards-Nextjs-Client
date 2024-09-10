import listingStore from "@/store/listingStore";
import FreelancerCard1 from "../card/FreelancerCard1";
import ListingOption6 from "../element/ListingOption6";
import Pagination from "./Pagination";
import { freelancer1 } from "@/data/product";
import priceStore from "@/store/priceStore";
import ListingSidebarModal5 from "../modal/ListingSidebarModal5";

export default function Listing13() {
  const getCategory = listingStore((state: any) => state.getCategory);
  const priceRange = priceStore((state: any) => state.priceRange);
  const getLocation = listingStore((state: any) => state.getLocation);
  const getSearch = listingStore((state: any) => state.getSearch);
  const getLevel = listingStore((state: any) => state.getLevel);
  const getSpeak = listingStore((state: any) => state.getSpeak);
  const getBestSeller = listingStore((state: any) => state.getBestSeller);

  // category filter
  const categoryFilter = (item: any) =>
    getCategory?.length !== 0 ? getCategory.includes(item.skill) : item;

  // salary filter
  const priceFilter = (item: any) =>
    priceRange.min <= item.price && priceRange.max >= item.price;

  // location filter
  const locationFilter = (item: any) =>
    getLocation?.length !== 0
      ? getLocation.includes(item.location.split(" ").join("-").toLowerCase())
      : item;

  const searchFilter = (item: any) =>
    getSearch !== ""
      ? item.location.split("-").join(" ").includes(getSearch.toLowerCase())
      : item;

  // level filter
  const levelFilter = (item: any) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : item;

  // speak filter
  const languageFilter = (item: any) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language.toLowerCase())
      : item;

  // sort by filter
  const sortByFilter = (item: any) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <ListingOption6 />
          <div className="row">
            {freelancer1
              .slice(0, 12)
              .filter(categoryFilter)
              .filter(priceFilter)
              .filter(locationFilter)
              .filter(searchFilter)
              .filter(levelFilter)
              .filter(languageFilter)
              .filter(sortByFilter)
              .map((item, i) => (
                <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                  <FreelancerCard1 data={item} />
                </div>
              ))}
          </div>
          <div className="row mt30">
            <Pagination />
          </div>
        </div>
      </section>
      <ListingSidebarModal5 />
    </>
  );
}
