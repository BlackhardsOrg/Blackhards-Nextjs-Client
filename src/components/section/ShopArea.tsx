import { shopProduct1 } from "@/data/product";
import ShopListCard1 from "../card/ShopListCard1";
import ShopListInfo1 from "../element/ShopListInfo1";
import ShopAreaSidebar1 from "../sidebar/ShopAreaSidebar1";
import Pagination from "./Pagination";
import priceStore from "@/store/priceStore";
import listingStore from "@/store/listingStore";

export default function ShopArea() {
  const getCategory = listingStore((state: any) => state.getCategory);
  const priceRange = priceStore((state: any) => state.priceRange);
  const getBestSeller = listingStore((state: any) => state.getBestSeller);
  const getSearch = listingStore((state: any) => state.getSearch);

  // category filter
  const categoryFilter = (item: any) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : item;

  // salary filter
  const salaryFilter = (item: any) =>
    priceRange.min <= item.price && priceRange.max >= item.price;

  // sort by filter
  const sortByFilter = (item: any) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  const searchFilter = (item: any) =>
    getSearch !== ""
      ? item.title.toLowerCase().includes(getSearch.toLowerCase())
      : item;

  const content = shopProduct1
    .slice(0, 9)
    .filter(categoryFilter)
    .filter(salaryFilter)
    .filter(sortByFilter)
    .filter(searchFilter)
    .map((item, i) => (
      <div key={i} className="col-sm-6 col-xl-4">
        <ShopListCard1 data={item} />
      </div>
    ));

  return (
    <>
      <section className="shop-checkout pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-3">
              <ShopAreaSidebar1 />
            </div>
            <div className="col-lg-9">
              <ShopListInfo1 length={content?.length} />
              <div className="row">{content}</div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
