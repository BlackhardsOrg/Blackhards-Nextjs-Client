import priceStore from "@/store/priceStore";
import ReactSlider from "react-slider";

export default function PriceRange1() {
  const priceRange = priceStore((state: any) => state.priceRange);
  const priceRangeHandler = priceStore((state: any) => state.priceRangeHandler);

  // price range handler
  const rangeHandler = (e: any) => {
    priceRangeHandler(e[0], e[1]);
  };

  return (
    <>
      <div className="price__range__box">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={[priceRange.min, priceRange.max]}
          min={0}
          max={100000}
          onChange={rangeHandler}
          minDistance={10}
        />
      </div>
    </>
  );
}
