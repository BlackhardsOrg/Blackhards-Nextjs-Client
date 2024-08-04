
import { useEffect, useState } from "react";
import SelectInput from "../../../option/SelectInput";
import SelectInputPrice from "../../../option/SelectInputPrice";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import GameUploadCheck from "@/components/ui-elements/radios/GameUploadCheck";
import { IGameTitle, IPackagePlans, IPlans } from "@/types";
import PlansSelectOptionsInput from "../../../option/PlanSelectOptionsInput";
import { PlansSummaryDisplayText } from "./PlansSummaryDisplayText";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";

interface IPackagePlansSummaryTable {
    gameTitle: IGameTitle
}
export default function PackagePlansSummaryTable({
    //  gameTitle
}: IPackagePlansSummaryTable) {
    const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
    // const dispatch = useAppDispatch()
    return (
        <>
            <div className="ui-content">
                <h5 className="title">Plans</h5>
                <div className="table-style1 table-responsive mb-4 mb-lg-5">
                    <table className="table table-borderless">
                        <thead className="thead-light">
                            <tr>
                                <th className="fz15 fw500" scope="col">
                                    S/N
                                </th>
                                <th className="fz15 fw500" scope="col">
                                    Basic
                                </th>
                                <th className="fz15 fw500" scope="col">
                                    Standard
                                </th>
                                <th className="fz15 fw500" scope="col">
                                    Premium
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Price</td>
                                <td>

                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.price} />

                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.price} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.price} />
                                </td>

                            </tr>
                            <tr>

                                <td>Title</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.title} />

                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.title} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.title} />
                                </td>

                            </tr>
                            <tr>
                                <td>How long to launch game project?</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.howLongToLaunch + "days"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.howLongToLaunch + "days"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.howLongToLaunch + "days"} />
                                </td>

                            </tr>

                            <tr>
                                <td>Customization</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.howManyCustomizations + "x"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.howManyCustomizations + "x"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.howManyCustomizations + "x"} />
                                </td>

                            </tr>

                            <tr>
                                <td>Customization Charge($)</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.customizationCharge + "$"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.customizationCharge + "$"} />
                                </td>
                                <td >
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.customizationCharge + "$"} />
                                </td>

                            </tr>

                            <tr>
                                <td>How Many levels does the game have?</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.howManyLevels + "Levels"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.howManyLevels + "Levels"} />
                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.howManyLevels + "Levels"} />
                                </td>

                            </tr>

                            <tr>
                                <td>Has got Documentation</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.hasDocumentation ? "Yes" : "No"} />

                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.hasDocumentation ? "Yes" : "No"} />

                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.hasDocumentation ? "Yes" : "No"} />

                                </td>

                            </tr>

                            <tr>
                                <td>Has Admin Panel</td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.basic.hasAdminPanel ? "Yes" : "No"} />

                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.standard.hasAdminPanel ? "Yes" : "No"} />

                                </td>
                                <td>
                                    <PlansSummaryDisplayText text={gameTitle && gameTitle.plans && gameTitle.plans.premium.hasAdminPanel ? "Yes" : "No"} />

                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}