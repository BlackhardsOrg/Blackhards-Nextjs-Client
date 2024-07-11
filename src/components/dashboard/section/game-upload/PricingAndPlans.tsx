import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation, IGameTitle, IPricingAndPlans } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import TagSelect from "../../option/TagSelect";
import SelectInputMultiple from "../../option/SelectInputMultiple";
import PackagePlans from "./PackagePlans";

export default function PricingAndPlans
    ({ gameTitle,
        id,
        setGameTitle, getPageProgress,
        setGetPageProgress,
        getCurrentPageState,
        setCurrentPageState,
        setCurrentTab }: IPricingAndPlans) {

    const [loading, setLoading] = useState(false)
    const [isAIPricingChosen, setIsAIPricingChosen] = useState("yes")

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


    return (
        <>
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="bdrb1 pb15 mb25">
                    <h5 className="list-title">Pricing & Plans</h5>
                </div>
                <div className="col-xl-8">
                    <form onSubmit={handleGameSubmit} className="form-style1">
                        <div className="row">


                            <div className="col-sm-12">

                                <div className="mb20">
                                    <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                                        <span>
                                            Would you like our AI to dynamically price your games?
                                        </span>
                                        <Tooltip anchorSelect="#ai" className="ui-tooltip" place="top">
                                            If your game project&apos;s price aligns with market trends, you are more likely to achieve a faster turnover.
                                        </Tooltip>
                                        <button id="ai" type={"button"} className="fas fa-info-circle text-info cursor-pointer border-none" />
                                    </label>
                                    <div className="d-flex gap-3 align-items-center">
                                        <GameUploadRadio
                                            i={1}
                                            name="AiPricing"
                                            checked={isAIPricingChosen === "yes"}
                                            text="Yes"
                                            value={"yes"}
                                            onChange={(e: any) => {
                                                setIsAIPricingChosen(e.target.value)
                                            }} />
                                        <GameUploadRadio
                                            i={1}
                                            name="AiPricing"
                                            checked={isAIPricingChosen === "no"}
                                            text="No"
                                            value="no"
                                            onChange={(e: any) => {
                                                setIsAIPricingChosen(e.target.value)
                                            }} />
                                    </div>

                                </div>
                            </div>



                            {isAIPricingChosen !== "yes"
                                &&
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
                                </div>}

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

                                        <GameUploadRadio i={1} checked={true} text="Yes" value="" onChange={handleInputFormChange} />
                                        <GameUploadRadio i={1} checked={false} text="Yes" value="" onChange={handleInputFormChange} />
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

                            {/* Package Plans */}
                            <div className="col-md-6">

                                <PackagePlans />
                            </div>

                            <div className="col-md-12">
                                <div className="text-start d-flex gap-1">
                                    <button
                                        type={"button"}
                                        onClick={handlePrevious}
                                        style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-dark" >
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
