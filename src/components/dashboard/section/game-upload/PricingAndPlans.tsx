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
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess } from "@/redux/features/gametitle/slices/gameTitleSlice";

export default function PricingAndPlans
    ({
        id,
        getPageProgress,
        setGetPageProgress,
        getCurrentPageState,
        setCurrentPageState,
        setCurrentTab }: IPricingAndPlans) {

    const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [isOfferingPackagedPlans, setIsOfferingPackagedPlans] = useState(true)

    // #region Form Handlers
    const handleInputFormChange = (e: any) => {
        dispatch(gameTitleCreateSuccess({ ...gameTitle, [e.target.name]: e.target.value }))

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
        dispatch(gameTitleCreateSuccess({ ...gameTitle, price: Number(value) }))


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
                                            Allow AI dynamically price your games?
                                        </span>
                                        <Tooltip anchorSelect="#ai" className="ui-tooltip" place="top">
                                            If your game project&apos;s price aligns with market trends based on our AI predictions, you are more likely to achieve a faster turnover.
                                        </Tooltip>
                                        <button id="ai" type={"button"} className="fas fa-info-circle text-info cursor-pointer border-none" />
                                    </label>
                                    <div className="d-flex gap-3 align-items-center">
                                        <GameUploadRadio
                                            i={1}
                                            name="AiPricing"
                                            checked={gameTitle ? gameTitle.isAIAllowedPricing : false}
                                            text="Yes"
                                            value={"yes"}
                                            onClick={(e: any) => {

                                                dispatch(gameTitleCreateSuccess({
                                                    ...gameTitle, isAIAllowedPricing: true
                                                }))


                                            }} />
                                        <GameUploadRadio
                                            i={2}
                                            name="AiPricing"
                                            checked={gameTitle ? !gameTitle.isAIAllowedPricing : true}
                                            text="No"
                                            value="no"
                                            onClick={(e: any) => {


                                                dispatch(gameTitleCreateSuccess({
                                                    ...gameTitle, isAIAllowedPricing: false
                                                }))

                                            }} />
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 d-flex">
                                <div className="mb20 ">
                                    <label className="heading-color ff-heading fw500 mb10">
                                        Game Price
                                    </label>
                                    <input
                                        onChange={handleFormattedChange}
                                        value={gameTitle ? gameTitle.price : 0}
                                        name="price"
                                        type="number"
                                        className="form-control"
                                        placeholder="Game Price ($)"
                                    />
                                </div>
                                <span>{formatPriceToDollars(gameTitle ? Number(gameTitle.price) : 0)}</span>
                            </div>

                            <div className="col-sm-12">

                                <div className="mb20">
                                    <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                                        <span>
                                            Offer plans or packages to make your game affordable?
                                        </span>
                                        <Tooltip anchorSelect="#studies" className="ui-tooltip" place="top">
                                            Studies have shown that making your games affordable by Breaking your games into packages can increase revenue.
                                        </Tooltip>
                                        <button id="studies" type={"button"} className="fas fa-info-circle text-info cursor-pointer border-none" />
                                    </label>
                                    <div className="d-flex gap-3 align-items-center">
                                        <GameUploadRadio
                                            i={1}
                                            name="packages"
                                            checked={isOfferingPackagedPlans}
                                            text="Yes"
                                            value={"yes"}
                                            onClick={(e: any) => {
                                                setIsOfferingPackagedPlans(true)
                                            }} />
                                        <GameUploadRadio
                                            i={1}
                                            name="packages"
                                            checked={!isOfferingPackagedPlans}
                                            text="No"
                                            value="no"
                                            onClick={(e: any) => {
                                                setIsOfferingPackagedPlans(false)
                                            }} />
                                    </div>

                                </div>
                            </div>


                            {/* Package Plans */}
                            <div className="col-md-12">

                                {isOfferingPackagedPlans && <PackagePlans

                                />}
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
