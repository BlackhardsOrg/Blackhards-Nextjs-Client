import { useAppSelector } from "@/redux/app/hooks"
import TagSelect from "../../../option/TagSelect"
import SelectInputMultiple from "../../../option/SelectInputMultiple"
import PublishNavBtnGroup from "../fixed/PublishNavBtnGroup"


const BasicInfoFormAuction = ({
    handleInputFormChange,
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
    const auction = useAppSelector(state => state.auction.auction)
    const auctionLoading = useAppSelector(state => state.auction.loading.auctionStart)
    return (

        <form onSubmit={handleGameSubmit} className="form-style1">
            <div className="row">
                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Game Title
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={auction ? auction.title : ""}
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
                            value={auction ? auction.description : ""}
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
                            value={auction ? auction.gameFileLink : ""}
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

                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Release Date
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={auction ? auction.releaseDate : ""}
                            name="releaseDate"
                            type="date"
                            className="form-control"
                            placeholder="Your Email or Company Email"
                        />

                    </div>
                </div>


                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            Select the auction Start Date
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={auction ? auction.startTime : ""}
                            name="startTime"
                            type="date"
                            className="form-control"
                            placeholder="Your Email or Company Email"
                        />

                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                            select the auction End Date
                        </label>
                        <input
                            onChange={handleInputFormChange}
                            value={auction ? auction.endTime : ""}
                            name="endTime"
                            type="date"
                            className="form-control"
                            placeholder="Your Email or Company Email"
                        />

                    </div>
                </div>

                <PublishNavBtnGroup
                    loading={auctionLoading}
                    getCurrentPageState={getCurrentPageState}
                    handlePrevious={handlePrevious}
                    handleGameSubmit={handleGameSubmit}
                    getPageProgress={getPageProgress} />
            </div>
        </form>
    )
}


export default BasicInfoFormAuction