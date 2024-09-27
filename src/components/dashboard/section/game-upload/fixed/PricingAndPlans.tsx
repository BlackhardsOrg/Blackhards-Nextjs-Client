import { useEffect, useState } from "react";
import Link from "next/link";
import { IBasicInformation, IGameTitle, IPricingAndPlans } from "@/types";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import FLyLoad from "@/components/loading/FLyLoad";
import { Tooltip } from "react-tooltip";
import Radio1 from "@/components/ui-elements/radios/Radio1";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import TagSelect from "../../../option/TagSelect";
import SelectInputMultiple from "../../../option/SelectInputMultiple";
import PackagePlans from "./PackagePlans";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess, updateIsPackagedPlansEnabled } from "@/redux/features/gametitle/slices/gameTitleSlice";
import PublishNavBtnGroup from "./PublishNavBtnGroup";
import { capitalize } from "@/utils";

export default function PricingAndPlans
    ({
        id,
        getPageProgress,
        setGetPageProgress,
        getCurrentPageState,
        setCurrentPageState,
        setCurrentTab }: IPricingAndPlans) {

    const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
    const loading = useAppSelector(state => state.gametitle.loading.gameTitleCreate)

    const gameTitleUploadTypeParam = useAppSelector(state => state.gametitle.gameUploadType)
    const [gameTitleUploadType, setgameTitleUploadType] = useState(gameTitleUploadTypeParam ? gameTitleUploadTypeParam : "title")

    const isOfferingPackagedPlans = useAppSelector(state => state.gametitle.isOfferingPackagedPlans)
    const [getIsOfferingPackagedPlans, setIsOfferingPackagedPlans] = useState<string>(isOfferingPackagedPlans ? isOfferingPackagedPlans : "yes")


    useEffect(() => {
        if (gameTitleUploadType) {
            setgameTitleUploadType(gameTitleUploadTypeParam)
        }

        if (isOfferingPackagedPlans) {
            setIsOfferingPackagedPlans(isOfferingPackagedPlans)
        }

    }, [gameTitleUploadTypeParam, isOfferingPackagedPlans])

    const dispatch = useAppDispatch()



    // #region Form Handlers
    const handleInputFormChange = (e: any) => {
        dispatch(gameTitleCreateSuccess({ ...gameTitle, [e.target.name]: e.target.value }))

    }

    const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove leading zeros unless it is '0' before a decimal point
        if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
            value = value.replace(/^0+/, '');
        }

        e = { ...e, target: { ...e.target, value } }
        dispatch(gameTitleCreateSuccess({ ...gameTitle, price: Number(value) }))


    };

    // #endregion Form Handlers


    // #region Submit Handlers
    const handleGameSubmit = (e: any) => {
        e.preventDefault()
        setGetPageProgress((old) => {
            const pageList = [...old]
            pageList[id].isDone = true
            return pageList
        })
        let nextPageNumber = id + 1 < getPageProgress.length ? id + 1 : id

        setCurrentPageState(nextPageNumber)
        setCurrentTab(nextPageNumber)

    }

    const handlePrevious = () => {
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
                                            Allow AI dynamically price your game {gameTitleUploadType ? gameTitleUploadType : ""}
                                        </span>
                                        <Tooltip anchorSelect="#ai" className="ui-tooltip" place="top">
                                            If your game {gameTitleUploadType ? gameTitleUploadType : ""} project&apos;s price aligns with market trends based on our AI predictions, you are more likely to achieve a faster turnover.
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
                            {!isOfferingPackagedPlans && <div className="col-sm-12 d-flex">
                                <div className="mb20 ">
                                    <label className="heading-color ff-heading fw500 mb10">
                                        Game {gameTitleUploadType ? capitalize(gameTitleUploadType) : ""} Price
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
                                <span>{formatPriceToDollars(gameTitle && gameTitle.price ? Number(gameTitle.price) : 0)}</span>
                            </div>}

                            <div className="col-sm-12">

                                <div className="mb20">
                                    <label className="heading-color ff-heading fw500 mb10 d-flex gap-1">
                                        <span>
                                            would you like to offer plans or packages to make your game {gameTitleUploadType ? gameTitleUploadType : ""} affordable?
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
                                            checked={getIsOfferingPackagedPlans === "yes"}
                                            text="Yes"
                                            value={"yes"}
                                            onClick={(e: any) => {

                                                dispatch(updateIsPackagedPlansEnabled("yes"))
                                            }} />
                                        <GameUploadRadio
                                            i={1}
                                            name="packages"
                                            checked={getIsOfferingPackagedPlans === "no"}
                                            text="No"
                                            value="no"
                                            onClick={(e: any) => {
                                                dispatch(updateIsPackagedPlansEnabled("no"))
                                            }} />
                                    </div>

                                </div>
                            </div>


                            {/* Package Plans */}
                            <div className="col-md-12">

                                {isOfferingPackagedPlans === "yes" && <PackagePlans

                                />}
                            </div>

                            <PublishNavBtnGroup
                                loading={loading}
                                getCurrentPageState={getCurrentPageState}
                                handlePrevious={handlePrevious}
                                handleGameSubmit={handleGameSubmit}
                                getPageProgress={getPageProgress} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
