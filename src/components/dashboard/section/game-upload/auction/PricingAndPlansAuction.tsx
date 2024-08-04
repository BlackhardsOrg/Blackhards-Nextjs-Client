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
import PackagePlans from "../fixed/PackagePlans";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess } from "@/redux/features/gametitle/slices/gameTitleSlice";
import PublishNavBtnGroup from "../fixed/PublishNavBtnGroup";

export default function PricingAndPlansAuction
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

                            <div className="col-sm-12 d-flex">
                                <div className="mb20 ">
                                    <label className="heading-color ff-heading fw500 mb10">
                                        Reserved Price
                                    </label>
                                    <input
                                        onChange={handleFormattedChange}
                                        value={gameTitle ? gameTitle.price : 0}
                                        name="reservedprice"
                                        type="number"
                                        className="form-control"
                                        placeholder="Reserved Price"
                                    />
                                </div>
                                <span>{formatPriceToDollars(gameTitle ? Number(gameTitle.price) : 0)}</span>
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
