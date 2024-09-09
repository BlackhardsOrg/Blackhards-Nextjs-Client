import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setGameRating, setPriceRange, setTag } from "@/redux/features/sitepages/slices/pageSlice";

export default function ClearButton() {


  const dispatch = useAppDispatch()

  const rating = useAppSelector(state => state.pages.games.rating)
  const priceRange = useAppSelector(state => state.pages.games.priceRange)
  const tag = useAppSelector(state => state.pages.games.tag)

  // clear handler
  const clearHandler = () => {
    dispatch(setGameRating({ rating: null }))
    dispatch(setPriceRange({priceRange: { min: null, max: null} }))
    dispatch(setTag({tag:{value: null, title: null} }))

  };

  return (
    <>
      {rating && rating > 0 ||
        priceRange && priceRange.min !== 0 ||
        priceRange && priceRange.max !== 2000 ||
        tag && tag.value?.length != 0
        ? (
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
