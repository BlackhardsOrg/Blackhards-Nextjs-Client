import { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import SelectInputMultiple from "../option/SelectInputMultiple";
import TagSelect from "../option/TagSelect";
import { IBasicInformation, IGameTitle } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";

export default function BasicInformation({ gameTitle,
  setGameTitle }: any) {

  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    setPlatform({
      options: toggleElementInArray<string>(getPlatform.options, option),
      values: toggleElementInArray<string>(getPlatform.values, value),
    });


  };


  const handleInputFormChange = (e: any) => {
    setGameTitle((old: any) => {
      return { ...old, [e.target.name]: e.target.value }
    })
  }

  const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove leading zeros unless it is '0' before a decimal point
    if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
      value = value.replace(/^0+/, '');
    }

    e = { ...e, target: { ...e.target, value } }

    setGameTitle((old: any) => {
      return { ...old, price: Number(value) }
    })
  };

  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    console.log(gameTitle)
    setTimeout(() => setLoading(false), 3000)
  }

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

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Game Title Information</h5>
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
                        option: "Graphics & Design",
                        value: "graphics-design",
                      },
                      {
                        option: "Digital Marketing",
                        value: "digital-marketing",
                      },
                      {
                        option: "Writing & Translation",
                        value: "writing-translation",
                      },
                      {
                        option: "Video & Animation",
                        value: "video-animation",
                      },
                      {
                        option: "Music & Audio",
                        value: "music-audio",
                      },
                      {
                        option: "Programming & Tech",
                        value: "programming-tech",
                      },
                      {
                        option: "Business",
                        value: "business",
                      },
                      {
                        option: "Lifestyle",
                        value: "lifestyle",
                      },
                      {
                        option: "Trending",
                        value: "trending",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="col-sm-12 d-flex">
                <div className="mb20 ">
                  <label className="heading-color ff-heading fw500 mb10">
                    Game Price
                  </label>
                  <input
                    onChange={handleFormattedChange}
                    value={gameTitle.price}
                    name="price"
                    type="number"
                    className="form-control"
                    placeholder="Game Price ($)"
                  />
                </div>
                <span>{formatPriceToDollars(Number(gameTitle.price))}</span>
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

              <div className="col-sm-12">

                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                    <span>
                      Would you like to customize purchased game projects on request?
                    </span>
                    <Tooltip anchorSelect="#bottom" className="ui-tooltip" place="bottom">
                      Your clients may need customization for aspects of the game projects they purchase from you.
                    </Tooltip>
                    <button id="bottom" type={"button"} className="fas fa-info-circle text-info cursor-pointer border-none" />
                  </label>
                  <div className="d-flex gap-3 align-items-center">

                    <GameUploadRadio i={1} checked={true} text="Yes" value="" onClick={handleInputFormChange} />
                    <GameUploadRadio i={1} checked={false} text="Yes" value="" onClick={handleInputFormChange} />
                  </div>

                </div>
              </div>
              <div className="col-sm-6 ">

                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                    How much would you like to charge for the service?
                  </label>
                  <div className="d-flex align-items-center gap-1">
                    <input
                      onChange={handleInputFormChange}
                      value={gameTitle.releaseDate}
                      name="releaseDate"
                      type="number"
                      className="form-control"
                      placeholder="Amout($)"
                    />
                    <span>{gameTitle.price}</span>

                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-start d-flex gap-1">
                  <button type="submit" style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-dark" >
                    {loading ? <FLyLoad /> :
                      <>
                        <span>Save</span>
                        <i className="fal fa-arrow-right-long" />
                      </>}
                  </button>

                  <button type="submit" style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-thm" >
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
