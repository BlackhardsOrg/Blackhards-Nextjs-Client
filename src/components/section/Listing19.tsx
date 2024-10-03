import { project1 } from "@/data/product";
import ProjectCard1 from "../card/ProjectCard1";
import ListingOption2 from "../element/ListingOption2";
import Pagination from "./Pagination";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import ProjectCard2 from "../card/ProjectCard2";
import ProjectCard3 from "../card/ProjectCard3";
import ListingSidebar6 from "../sidebar/ListingSidebar6";

export default function Listing19() {
  const getCategory = listingStore((state: any) => state.getCategory);
  const getProjectType = listingStore((state: any) => state.getProjectType);
  const getPrice = priceStore((state: any) => state.priceRange);
  const getDesginTool = listingStore((state: any) => state.getDesginTool);
  const getLocation = listingStore((state: any) => state.getLocation);
  const getSearch = listingStore((state: any) => state.getSearch);
  const getSpeak = listingStore((state: any) => state.getSpeak);
  const getBestSeller = listingStore((state: any) => state.getBestSeller);
  const getEnglishLevel = listingStore((state: any) => state.getEnglishLevel);

  // category filter
  const categoryFilter = (item: any) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : item;

  // project-type filter
  const projectTypeFilter = (item: any) =>
    getProjectType?.length !== 0
      ? getProjectType.includes(item.projectType)
      : item;

  // price filter
  const priceFilter = (item: any) =>
    getPrice.min <= item.price.min && getPrice.max >= item.price.max;

  // skill filter
  const skillFilter = (item: any) =>
    getDesginTool?.length !== 0
      ? getDesginTool.includes(item.skills.split(" ").join("-").toLowerCase())
      : item;

  // location filter
  const locationFilter = (item: any) =>
    getLocation?.length !== 0
      ? getLocation.includes(item.location.split(" ").join("-").toLowerCase())
      : item;

  // location filter
  const searchFilter = (item: any) =>
    getSearch !== ""
      ? item.location
        .split("-")
        .join(" ")
        .toLowerCase()
        .includes(getSearch.toLowerCase())
      : item;

  // speak filter
  const speakFilter = (item: any) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language.split(" ").join("-").toLowerCase())
      : item;

  // english level filter
  const englishLevelFilter = (item: any) =>
    getEnglishLevel?.length !== 0
      ? getEnglishLevel.includes(item.englishLevel)
      : item;

  // sort by filter
  const sortByFilter = (item: any) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  // content
  let content = project1
    .slice(0, 8)
    .filter(categoryFilter)
    .filter(projectTypeFilter)
    .filter(priceFilter)
    .filter(skillFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(speakFilter)
    .filter(englishLevelFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-md-6 col-xl-12">
        <ProjectCard3 data={item} />
      </div>
    ));
  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar6 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              <div className="row">{content}</div>
              {/* <div className="mt30">
                <Pagination />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal2 />
    </>
  );
}
