import { useAppDispatch, useAppSelector } from "@/redux/app/hooks"
import TagSelect from "../../../option/TagSelect"
import SelectInputMultiple from "../../../option/SelectInputMultiple"
import PublishNavBtnGroup from "./PublishNavBtnGroup"
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio"
import { Tooltip } from "react-tooltip"
import { gameTitleCreateSuccess, updateGameUploadType } from "@/redux/features/gametitle/slices/gameTitleSlice"
import { useEffect, useState } from "react"
import { capitalize } from "@/utils"


const BasicInfoForm = ({
    handleInputFormChange,
    handleAuctionInputFormChange,
    selectedTags,
    setSelectedTags,
    getGenre,
    genreHandler,
    genreData,
    getPlatform,
    platformHandler,
    targetPlatformData,
    loading,
    getCurrentPageState,
    handlePrevious,
    handleGameSubmit,
    getPageProgress }: any) => {
    const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
    const gameTitleUploadTypeParam = useAppSelector(state => state.gametitle.gameUploadType)
    const [gameTitleUploadType, setgameTitleUploadType] = useState(gameTitleUploadTypeParam ? gameTitleUploadTypeParam : "title")

    useEffect(() => {
        if (gameTitleUploadType) {
            setgameTitleUploadType(gameTitleUploadTypeParam)
        }

    }, [gameTitleUploadTypeParam])

    const gameTitleLoading = useAppSelector(state => state.gametitle.loading.gameTitleCreate)
    const dispatch = useAppDispatch()
    return (

        <form onSubmit={handleGameSubmit} className="form-style1">
            <div className="row">

                <div className="col-sm-12">

                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                            <span>
                                What do you want to publish?
                            </span>
                            <Tooltip anchorSelect="#ai" className="ui-tooltip" place="top">
                                you can choose to publish a Game Title code or a Game Tool code (tools, that  help manage, organize, build games)
                            </Tooltip>
                            <button id="ai" type={"button"} className="fas fa-info-circle text-info cursor-pointer border-none" />
                        </label>
                        <div className="d-flex gap-3 align-items-center">
                            <GameUploadRadio
                                i={1}
                                name="AiPricing"
                                checked={gameTitleUploadType === "title" ? true : false}
                                text="Game Title Code"
                                value={"title"}
                                onClick={(e: any) => {
                                    dispatch(updateGameUploadType("title"))
                                }} />
                            <GameUploadRadio
                                i={2}
                                name="AiPricing"
                                checked={gameTitleUploadType === "tool" ? true : false}
                                text="Game Tool Code"
                                value="tool"
                                onClick={(e: any) => {
                                    dispatch(updateGameUploadType("tool"))
                                }} />
                        </div>
                    </div>
                </div>

                <div className="col-sm-12">

                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                            <span>
                                Sale Type
                            </span>
                            <Tooltip anchorSelect="#sale" className="ui-tooltip" place="top">
                                You can choose to <b>Auction</b> you game code once, or have recurrent sale by selecting <b>Fixed</b>
                            </Tooltip>
                            <button id="sale" type={"button"} className="fas fa-info-circle text-info cursor-pointer border-none" />
                        </label>
                        <div className="d-flex gap-3 align-items-center">
                            <GameUploadRadio
                                i={1}
                                name="sale"
                                checked={gameTitle && gameTitle.saleType === "fixed" ? true : false}
                                text="Fixed Sale"
                                value={"fixed"}
                                onClick={(e: any) => {
                                    dispatch(gameTitleCreateSuccess({ ...gameTitle, saleType: "fixed" }))
                                }} />
                            <GameUploadRadio
                                i={2}
                                name="sale"
                                checked={gameTitle && gameTitle.saleType === "auction" ? true : false}
                                text="Auction Sale"
                                value={"auction"}
                                onClick={(e: any) => {
                                    dispatch(gameTitleCreateSuccess({ ...gameTitle, saleType: "auction" }))
                                }} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Game {gameTitleUploadType ? capitalize(gameTitleUploadType) : "Title"}
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={gameTitle ? gameTitle.title : ""}
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
                            Game {gameTitleUploadType ? capitalize(gameTitleUploadType) : "Title"} Description
                        </label>
                        <textarea
                            onChange={handleInputFormChange}
                            value={gameTitle ? gameTitle.description : ""}
                            name="description"
                            cols={30}
                            rows={6}
                            placeholder="Game Title Description" />
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            {gameTitleUploadType ? capitalize(gameTitleUploadType) : "Title"} Demo Link
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={gameTitle ? gameTitle.demoLink : ""}
                            name="demoLink"
                            type="text"
                            className="form-control"
                            placeholder={gameTitleUploadType == "title" ? "https://itche.io/my-playable-demo-game-link" : "https://toolkit-runnable-link.app"}
                        />
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Tags
                        </label>
                        <TagSelect
                            selectedTags={selectedTags}
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
                            data={genreData}
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
                            data={targetPlatformData}
                        />
                    </div>
                </div>

                {gameTitleUploadType == "title" && gameTitle && gameTitle.saleType == "fixed" && <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Release Date
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={gameTitle ? gameTitle.releaseDate : ""}
                            name="releaseDate"
                            type="date"
                            className="form-control"
                            placeholder="Your Email or Company Email"
                        />

                    </div>
                </div>}

                {gameTitle && gameTitle.saleType == "auction" && <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Auction Start Date
                        </label>
                        <input
                            onChange={handleAuctionInputFormChange}
                            value={gameTitle && gameTitle.auction ? gameTitle.auction.startTime : ""}
                            name="startTime"
                            type="datetime-local"
                            className="form-control"
                        />

                    </div>
                </div>}

                {gameTitle && gameTitle.saleType == "auction" && <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Auction End Date
                        </label>
                        <input
                            onChange={handleAuctionInputFormChange}
                            value={gameTitle && gameTitle.auction ? gameTitle.auction.endTime : ""}
                            name="endTime"
                            type="datetime-local"
                            className="form-control"
                        />

                    </div>
                </div>}



                <PublishNavBtnGroup
                    loading={gameTitleLoading}
                    getCurrentPageState={getCurrentPageState}
                    handlePrevious={handlePrevious}
                    handleGameSubmit={handleGameSubmit}
                    getPageProgress={getPageProgress} />
            </div>
        </form>
    )
}


export default BasicInfoForm