import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation, IGameTitle } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import TagSelect from "../../option/TagSelect";
import SelectInputMultiple from "../../option/SelectInputMultiple";

export default function BasicInfo({ id, gameTitle,
  setGameTitle,
  getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IBasicInformation) {

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

  const [getSkill, setSkill] = useState({
    option: "Nothing selected",
    value: null,
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

    setGameTitle({ ...gameTitle, [e.target.name]: getGenre.values })
  };

  // handlers
  const tagsHandler = (option: string, value: string, e: any) => {
    setTags({
      options: toggleElementInArray<string>(getTags.options, option),
      values: toggleElementInArray<string>(getTags.values, value),
    });

    setGameTitle({ ...gameTitle, [e.target.name]: getGenre.values })
  };

  const platformHandler = (option: string, value: string, e: any) => {
    console.log(e)
    setPlatform({
      options: toggleElementInArray<string>(getPlatform.options, option),
      values: toggleElementInArray<string>(getPlatform.values, value),
    });


  };

  // #endregion Select Handlers


  // #region Form Handlers
  const handleInputFormChange = (e: any) => {
    setGameTitle((old) => {
      return { ...old, [e.target.name]: e.target.value }
    })
  }

  const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, e.target.name, "SHouut")
    let value = e.target.value;

    // Remove leading zeros unless it is '0' before a decimal point
    if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
      value = value.replace(/^0+/, '');
    }

    e = { ...e, target: { ...e.target, value } }
    console.log(e.target.value, "After")

    setGameTitle((old) => {
      return { ...old, price: Number(value) }
    })
  };

  // #endregion Form Handlers


  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log(gameTitle)
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
    console.log(id, "WhatsaAAAAA")
    let prevPageNumber = id - 1 >= 0 ? id - 1 : id
    setCurrentPageState(prevPageNumber)
    setCurrentTab(prevPageNumber)
  }
  // #endregion Handlers

  // #region UseEffects
  useEffect(() => {
    setGameTitle({ ...gameTitle, targetPlatform: getPlatform.values })

  }, [getPlatform.values])

  useEffect(() => {
    setGameTitle({ ...gameTitle, tags: getTags.values })

  }, [getTags.values])

  useEffect(() => {
    setGameTitle({ ...gameTitle, genre: getGenre.values })

  }, [getGenre.values])

  useEffect(() => {
    setGameTitle({ ...gameTitle, tags: selectedTags })

  }, [selectedTags])
  // #endregion MyRegion

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Basic Info</h5>
        </div>
        <div className="col-xl-8">
          <form onSubmit={handleGameSubmit} className="form-style1">
            <div className="row">
              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Game Title
                  </label>
                  <input
                    onChange={handleInputFormChange}
                    value={gameTitle.title}
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Call of Guns"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Game Title Description
                  </label>
                  <textarea
                    onChange={handleInputFormChange}
                    value={gameTitle.description}
                    name="description"
                    cols={30}
                    rows={6}
                    placeholder="Game Title Description" />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Game Demo Link
                  </label>
                  <input
                    onChange={handleInputFormChange}
                    value={gameTitle.gameFileLink}
                    name="gameFileLink"
                    type="text"
                    className="form-control"
                    placeholder="https://itche.io/my-game-link"
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Tags
                  </label>
                  <TagSelect selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags} />
                </div>
              </div>

              {/* GAME GENRE */}
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInputMultiple
                    label="Genre"
                    defaultSelect={getGenre}
                    handler={genreHandler}
                    name="genre"
                    data={[

                      {
                        option: "Action",
                        value: "action",
                      },
                      {
                        option: "Adventure",
                        value: "adventure",
                      },
                      {
                        option: "Simulation",
                        value: "simulation",
                      },
                      {
                        option: "Strategy",
                        value: "strategy",
                      },
                      {
                        option: "Sports",
                        value: "sports",
                      },
                      {
                        option: "Puzzle",
                        value: "puzzle",
                      },
                      {
                        option: "Racing",
                        value: "racing",
                      },
                      {
                        option: "Fighting",
                        value: "fighting",
                      },
                      {
                        option: "Platformer",
                        value: "platformer",
                      },
                      {
                        option: "Role-Playing",
                        value: "role-playing"
                      }
                    ]}
                  />
                </div>
              </div>

              


              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInputMultiple
                    label="Target Platform"
                    defaultSelect={getPlatform}
                    handler={platformHandler}
                    name="targetPlatform"
                    data={[
                      {
                        option: "Web",
                        value: "web",
                      },
                      {
                        option: "Windows",
                        value: "windows",
                      },
                      {
                        option: "Linux",
                        value: "linux",
                      },
                      {
                        option: "Android",
                        value: "android",
                      },
                      {
                        option: "IOS",
                        value: "ios",
                      }
                    ]}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Release Date
                  </label>
                  <input
                    onChange={handleInputFormChange}
                    value={gameTitle.releaseDate}
                    name="releaseDate"
                    type="date"
                    className="form-control"
                    placeholder="Your Email or Company Email"
                  />

                </div>
              </div>

              
              
              <div className="col-md-12">
                <div className="text-start d-flex gap-1">
                  <button
                    disabled={loading || (id == 0 && true)}
                    type={"button"}
                    onClick={handlePrevious}
                    style={{ opacity: id == 0 && true || loading ? .5 : 1 }} className="ud-btn btn-dark" >
                    {loading ? <FLyLoad /> :
                      <>
                        <span>Prev</span>
                        <i className="fal fa-arrow-left-long" />
                      </>}
                  </button>

                  <button
                    type="submit"
                    style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-thm" >
                    {loading ? <FLyLoad /> :
                      <>
                        <span>Save & Continue</span>
                        <i className="fal fa-arrow-right-long" />
                      </>}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
