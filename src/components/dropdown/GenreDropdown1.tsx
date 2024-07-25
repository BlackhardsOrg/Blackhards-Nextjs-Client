import { genre } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";

export default function GenreDropdown1() {
  const [getGenre, setGenre] = useState<any[]>([]);
  const getOurGenre = listingStore((state: any) => state.getGenre);
  const setOurGenre = listingStore((state: any) => state.setGenre);

  const genreHandler = (data: any) => {
    console.log(getGenre, "GENRE")
    const isExist = getGenre.includes(data);
    if (!isExist) {
      return setGenre((item: any) => [...item, data]);
    }
    const deleted = getGenre.filter((item) => item !== data);
    setGenre(deleted);
  };

  useEffect(() => {
    setGenre(getOurGenre);
  }, [getOurGenre]);

  return (
    <>
      <div className="widget-wrapper pr20">
        <div className="checkbox-style1">
          {genre.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                // checked={getGenre.includes(item.value)}
                onChange={() => {
                  console.log(item, getGenre)
                  genreHandler(item.value)}}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setOurGenre([]);
          getGenre.forEach((item) => {
            setOurGenre(item);
          });
        }}
        className="done-btn ud-btn btn-thm drop_btn4"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
