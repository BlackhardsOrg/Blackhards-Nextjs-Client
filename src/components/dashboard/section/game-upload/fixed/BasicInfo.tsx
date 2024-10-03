import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation, IGameTitle } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import TagSelect from "../../../option/TagSelect";
import SelectInputMultiple from "../../../option/SelectInputMultiple";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess } from "@/redux/features/gametitle/slices/gameTitleSlice";
import PublishNavBtnGroup from "./PublishNavBtnGroup";
import BasicInfoForm from "./BasicInfoForm";
import { toast } from "react-toastify";

const genreData = [

  {
    option: "Adventure",
    value: "Adventure",
  },
  {
    option: "Simulation",
    value: "Simulation",
  },
  {
    option: "Strategy",
    value: "Strategy",
  },
  {
    option: "Horror",
    value: "Horror",
  },
  {
    option: "Fighting",
    value: "Fighting",
  },
  {
    option: "Sports",
    value: "Sports",
  },
  {
    option: "Racing",
    value: "Racing",
  },
  {
    option: "Casual",
    value: "Casual",
  },
  {
    option: "MOBA",
    value: "MOBA",
  },
  {
    option: "Sandbox",
    value: "Sandbox"
  }
]


const targetPlatformData = [
  {
    option: "PC",
    value: "PC",
  },
  {
    option: "PlayStation",
    value: "PlayStation",
  },
  {
    option: "Xbox",
    value: "Xbox",
  },
  {
    option: "Mobile",
    value: "Mobile",
  },
  {
    option: "Switch",
    value: "Switch",
  },
  {
    option: "VR",
    value: "VR",
  },
  {
    option: "Web",
    value: "Web",
  }
]

export default function BasicInfo({
  id,
  getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IBasicInformation) {

  const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // #region useStates
  const [getGenre, setGenre] = useState<{
    options: string[] | never[],
    values: string[] | never[]
  }>({
    options: [],
    values: [],
  });

  const [getTags, setTags] = useState<{
    options: string[] | never[],
    values: string[] | never[]
  }>({
    options: [],
    values: [],
  });

  const [getPlatform, setPlatform] = useState<{
    options: string[] | never[],
    values: string[] | never[]
  }>({
    options: [],
    values: [],
  });

  // #endregion useStates


  function toggleElementInArray<T>(array: T[], element: T): T[] {
    const index = array.indexOf(element);

    if (index === -1) {
      // Element does not exist in the array, add it
      return [...array, element];
    } else {
      // Element exists in the array, remove it
      return array.filter((_, i) => i !== index);
    }
  }

  // #region Select Handlers
  // handlers
  const genreHandler = (option: string, value: string, e: any) => {
    setGenre({
      options: toggleElementInArray<string>(getGenre.options, option),
      values: toggleElementInArray<string>(getGenre.values, value),
    });


    // setGameTitle({ ...gameTitle, [e.target.name]: getGenre.values })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, [e.target.name]: getGenre.values }))
  };

  const platformHandler = (option: string, value: string, e: any) => {
    setPlatform({
      options: toggleElementInArray<string>(getPlatform.options, option),
      values: toggleElementInArray<string>(getPlatform.values, value),
    });


  };

  // #endregion Select Handlers


  // #region Form Handlers
  const handleInputFormChange = (e: any) => {
    // setGameTitle((old) => {
    //   return { ...old, [e.target.name]: e.target.value }
    // })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, [e.target.name]: e.target.value }))

  }

  const handleAuctionInputFormChange = (e: any) => {
    // setGameTitle((old) => {
    //   return { ...old, [e.target.name]: e.target.value }
    // })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, auction: { ...gameTitle.auction, [e.target.name]: e.target.value } }))
  }

  // #endregion Form Handlers


  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    setGetPageProgress((old) => {
      const pageList = [...old]
      pageList[id].isDone = true
      return pageList
    })
    let nextPageNumber = id + 1 < getPageProgress.length ? id + 1 : id

    setCurrentPageState(nextPageNumber)
    setCurrentTab(nextPageNumber)
    setLoading(false)

  }

  const handlePrevious = () => {
    let prevPageNumber = id - 1 >= 0 ? id - 1 : id
    setCurrentPageState(prevPageNumber)
    setCurrentTab(prevPageNumber)
  }
  // #endregion Handlers


  //innitialize
  useEffect(() => {
    if (gameTitle && gameTitle.tags) {
      setSelectedTags(gameTitle.tags)
    }

    if (gameTitle && gameTitle.genre) {
      setGenre(old => ({ options: gameTitle.genre, values: gameTitle.genre }))
    }

    if (gameTitle && gameTitle.targetPlatform) {
      setPlatform(old => ({ options: gameTitle.targetPlatform, values: gameTitle.targetPlatform }))
    }

  }, [gameTitle])

  // #region UseEffects
  useEffect(() => {
    // setGameTitle({ ...gameTitle, targetPlatform: getPlatform.values })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, targetPlatform: getPlatform.values }))


  }, [getPlatform.values])

  useEffect(() => {
    // setGameTitle({ ...gameTitle, tags: getTags.values })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, tags: getTags.values }))


  }, [getTags.values])

  useEffect(() => {
    // setGameTitle({ ...gameTitle, genre: getGenre.values })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, genre: getGenre.values }))


  }, [getGenre.values])

  useEffect(() => {
    // setGameTitle({ ...gameTitle, tags: selectedTags })
    dispatch(gameTitleCreateSuccess({ ...gameTitle, tags: selectedTags }))


  }, [selectedTags])
  // #endregion MyRegion

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Basic Info</h5>
        </div>
        <div className="col-xl-8">
          <BasicInfoForm
            handleInputFormChange={handleInputFormChange}
            handleAuctionInputFormChange={handleAuctionInputFormChange}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            getGenre={getGenre}
            genreHandler={genreHandler}
            genreData={genreData}
            getPlatform={getPlatform}
            platformHandler={platformHandler}
            targetPlatformData={targetPlatformData}
            loading={loading}
            getCurrentPageState={getCurrentPageState}
            handlePrevious={handlePrevious}
            handleGameSubmit={handleGameSubmit}
            getPageProgress={getPageProgress} />
        </div>
      </div>
    </>
  );
}
