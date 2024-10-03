import { product1 } from "@/data/product";
import ListingOption1 from "../element/ListingOption1";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination from "./Pagination";
import TrendingGameCard from "../card/TrendingGameCard";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularGameSlideCard from "../card/PopularGameSlideCard";

export default function Listing1() {
  const getDeliveryTime = listingStore((state: any) => state.getDeliveryTime);
  const getPriceRange = priceStore((state: any) => state.priceRange);
  const getLevel = listingStore((state: any) => state.getLevel);
  const getLocation = listingStore((state: any) => state.getLocation);
  const getBestSeller = listingStore((state: any) => state.getBestSeller);
  const getDesginTool = listingStore((state: any) => state.getDesginTool);
  const getSpeak = listingStore((state: any) => state.getSpeak);
  const getSearch = listingStore((state: any) => state.getSearch);

  // delivery filter
  const deliveryFilter = (item: any) =>
    getDeliveryTime === "" || getDeliveryTime === "anytime"
      ? item
      : item.deliveryTime === getDeliveryTime;

  // price filter
  const priceFilter = (item: any) =>
    getPriceRange.min <= item.price && getPriceRange.max >= item.price;

  // level filter
  const levelFilter = (item: any) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : item;

  // location filter
  const locationFilter = (item: any) =>
    getLocation?.length !== 0 ? getLocation.includes(item.location) : item;

  const searchFilter = (item: any) =>
    getSearch !== ""
      ? item.location.split("-").join(" ").includes(getSearch.toLowerCase())
      : item;

  // sort by filter
  const sortByFilter = (item: any) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  // design tool filter
  const designToolFilter = (item: any) =>
    getDesginTool?.length !== 0 ? getDesginTool.includes(item.tool) : item;

  // speak filter
  const speakFilter = (item: any) =>
    getSpeak?.length !== 0 ? getSpeak.includes(item.language) : item;

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <ListingOption1 />
          {/* <div className="row">
            {product1
              .slice(0, 12)
              .filter(deliveryFilter)
              .filter(priceFilter)
              .filter(levelFilter)
              .filter(locationFilter)
              .filter(searchFilter)
              .filter(sortByFilter)
              .filter(designToolFilter)
              .filter(speakFilter)
              .map((item, i) => (
                <div key={i} className="col-sm-6 col-xl-3">
                  {item?.gallery ? (
                    <PopularGameSlideCard data={item} />
                  ) : (
                    <TrendingGameCard data={item} />
                  )}
                </div>
              ))}
          </div> */}
          {/* <Pagination /> */}
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
