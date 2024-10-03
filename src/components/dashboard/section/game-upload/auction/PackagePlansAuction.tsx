
import { useEffect, useState } from "react";
import SelectInput from "../../../option/SelectInput";
import SelectInputPrice from "../../../option/SelectInputPrice";
import GameUploadRadio from "@/components/ui-elements/radios/GameUploadRadio";
import GameUploadCheck from "@/components/ui-elements/radios/GameUploadCheck";
import { IPackagePlans, IPlans } from "@/types";
import PlansSelectOptionsInput from "../../../option/PlanSelectOptionsInput";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess } from "@/redux/features/gametitle/slices/gameTitleSlice";


const data = {
    howLongToLaunch:
        [
            { option: "1 day", value: 1 },
            { option: "2 days", value: 2 },
            { option: "3 days", value: 3 },
            { option: "4 days", value: 4 },
            { option: "5 days", value: 5 },
            { option: "6 days", value: 6 },
            { option: "7 days", value: 7 }

        ],

    howManyCustomizations: [
        { option: "1 Customization Request", value: 1 },
        { option: "2 Customization Request", value: 2 },
        { option: "3 Customization Request", value: 3 },
        { option: "4 Customization Request", value: 4 },
        { option: "5 Customization Request", value: 5 },
        { option: "6 Customization Request", value: 6 },
        { option: "7 Customization Request", value: 7 }

    ],
    customizationCharge: [
        { option: "1$", value: 1 },
        { option: "2$", value: 2 },
        { option: "5$", value: 5 },
        { option: "7$", value: 7 },
        { option: "10$", value: 10 },
        { option: "15$", value: 15 },
        { option: "20$", value: 20 },
        { option: "30$", value: 30 },
        { option: "40$", value: 40 },
        { option: "50$", value: 50 },
        { option: "100$", value: 100 },
        { option: "150$", value: 150 },
        { option: "200$", value: 200 },
        { option: "300$", value: 300 },
        { option: "300$", value: 300 },
        { option: "500$", value: 500 },
        { option: "600$", value: 600 },
        { option: "1000$", value: 1000 },



    ],
    howManyLevels: [
        { option: "1 Level", value: 1 },
        { option: "2 Levels", value: 2 },
        { option: "3 Levels", value: 3 },
        { option: "4 Levels", value: 4 },
        { option: "5 Levels", value: 5 },
        { option: "6 Levels", value: 6 },
        { option: "7 Levels", value: 7 }

    ]
}
export default function PackagePlansAuction({
    // gameTitle, setGameTitle
}: IPackagePlans) {
    const [getGenre, setGenre] = useState<{
        option: string,
        value: string
    }>({
        option: "",
        value: "",
    });
    const gameTitle = useAppSelector(state => state.gametitle.gameTitle)
    const dispatch = useAppDispatch()
    const [plans, setPlans] = useState<IPlans>(gameTitle && gameTitle.plans ? gameTitle.plans : {
        basic: {
            type: "basic",
            price: 0,
            title: "",
            howLongToLaunch: 0,
            howManyCustomizations: 0,
            description: "",

            howManyLevels: 0,
            hasDocumentation: false,
            hasAdminPanel: false,
            customizationCharge: 0
        },
        standard: {
            type: "basic",
            price: 0,
            title: "",
            howLongToLaunch: 0,
            description: "",

            howManyCustomizations: 0,
            howManyLevels: 0,
            hasDocumentation: false,
            hasAdminPanel: false,
            customizationCharge: 0
        },
        premium: {
            type: "basic",
            price: 0,
            title: "",
            description: "",
            howLongToLaunch: 0,
            howManyCustomizations: 0,
            howManyLevels: 0,
            hasDocumentation: false,
            hasAdminPanel: false,
            customizationCharge: 0
        }

    })

    // #region Select Handlers
    // handlers
    const planOptionsHandler = (e: any, value: string, name: string, type: "basic" | "standard" | "premium") => {
        setPlans((old) => ({ ...old, [type]: { ...old[type], [name]: value } }))
    };

    useEffect(() => {
        // setGameTitle(old => ({ ...old, plans: plans }))
        if(gameTitle)
        dispatch(gameTitleCreateSuccess({ ...gameTitle, plans: plans }))

    }, [plans])

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
                                    <input
                                        onChange={(e) => {
                                            setPlans((old) => {
                                                return { ...old, basic: { ...old.basic, price: Number(e.target.value) } }
                                            })
                                        }}
                                        value={plans.basic.price}
                                        name="releaseDate"
                                        type="number"
                                        className="form-control"
                                        placeholder="Amout($)"
                                    />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            setPlans((old) => {
                                                return { ...old, standard: { ...old.standard, price: Number(e.target.value) } }
                                            })
                                        }}
                                        value={plans.standard.price}
                                        name="releaseDate"
                                        type="number"
                                        className="form-control"
                                        placeholder="Amout($)"
                                    />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            setPlans((old) => {
                                                return { ...old, premium: { ...old.premium, price: Number(e.target.value) } }
                                            })
                                        }}
                                        value={plans.premium.price}
                                        name="releaseDate"
                                        type="number"
                                        className="form-control"
                                        placeholder="Amout($)"
                                    />
                                </td>

                            </tr>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            setPlans((old) => {
                                                return { ...old, basic: { ...old.basic, title: e.target.value } }
                                            })
                                        }}
                                        value={plans.basic.title}
                                        name="releaseDate"
                                        type="text"
                                        className="form-control"
                                        placeholder="Basic"
                                    />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            setPlans((old) => {
                                                return { ...old, standard: { ...old.standard, title: e.target.value } }
                                            })
                                        }}
                                        value={plans.standard.title}
                                        name="releaseDate"
                                        type="text"
                                        className="form-control"
                                        placeholder="Standard"
                                    />
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            setPlans((old) => {
                                                return { ...old, premium: { ...old.premium, title: e.target.value } }
                                            })
                                        }}
                                        value={plans.premium.title}
                                        name="releaseDate"
                                        type="text"
                                        className="form-control"
                                        placeholder="Premium"
                                    />
                                </td>

                            </tr>
                            <tr>
                                <td>How long to launch game project?</td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="howLongToLaunch"
                                        type="basic"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.basic.howLongToLaunch}
                                        data={data.howLongToLaunch}
                                    />
                                </td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="howLongToLaunch"
                                        type="standard"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.standard.howLongToLaunch}
                                        data={data.howLongToLaunch} />
                                </td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="howLongToLaunch"
                                        type="premium"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.premium.howLongToLaunch}
                                        data={data.howLongToLaunch} />
                                </td>

                            </tr>

                            <tr>
                                <td>Customization</td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="howManyCustomizations"
                                        type="basic"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.basic.howManyCustomizations}
                                        data={data.howManyCustomizations} />
                                </td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="howManyCustomizations"
                                        type="standard"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.standard.howManyCustomizations}
                                        data={data.howManyCustomizations} /></td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="howManyCustomizations"
                                        type="premium"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.premium.howManyCustomizations}
                                        data={data.howManyCustomizations} /></td>

                            </tr>

                            <tr>
                                <td>Customization Charge($)</td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="customizationCharge"
                                        type="basic"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.basic.customizationCharge}
                                        data={data.customizationCharge} />
                                </td>
                                <td>
                                    <PlansSelectOptionsInput
                                        name="customizationCharge"
                                        type="standard"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.standard.customizationCharge}
                                        data={data.customizationCharge} /></td>
                                <td >
                                    <PlansSelectOptionsInput
                                        name="customizationCharge"
                                        type="premium"
                                        handler={planOptionsHandler}
                                        defaultSelect={plans.premium.customizationCharge}
                                        data={data.customizationCharge} />

                                </td>

                            </tr>

                            <tr>
                                <td>How Many levels does the game have?</td>
                                <td><PlansSelectOptionsInput
                                    name="howManyLevels"
                                    type="basic"
                                    handler={planOptionsHandler}
                                    defaultSelect={plans.basic.howManyLevels}
                                    data={data.howManyLevels} /></td>
                                <td><PlansSelectOptionsInput
                                    name="howManyLevels"
                                    type="standard"
                                    handler={planOptionsHandler}
                                    defaultSelect={plans.standard.howManyLevels}
                                    data={data.howManyLevels} /></td>
                                <td><PlansSelectOptionsInput
                                    name="howManyLevels"
                                    type="premium"
                                    handler={planOptionsHandler}
                                    defaultSelect={plans.premium.howManyLevels}
                                    data={data.howManyLevels} /></td>

                            </tr>

                            <tr>
                                <td>Has got Documentation</td>
                                <td>
                                    <GameUploadCheck
                                        i={1}
                                        name="AiPricing"
                                        checked={plans.basic.hasDocumentation}
                                        text="Yes"
                                        // value={"yes"}
                                        onChange={(e: any) => {
                                            setPlans(old => ({ ...old, basic: { ...old["basic"], hasDocumentation: e.target.checked } }))
                                        }} />
                                </td>
                                <td>
                                    <GameUploadCheck
                                        i={1}
                                        name="AiPricing"
                                        checked={plans.standard.hasDocumentation}
                                        text="Yes"
                                        // value={"yes"}
                                        onChange={(e: any) => {
                                            setPlans(old => ({ ...old, standard: { ...old["standard"], hasDocumentation: e.target.checked } }))
                                        }} />
                                </td>
                                <td>
                                    <GameUploadCheck
                                        i={1}
                                        name="AiPricing"
                                        checked={plans.premium.hasDocumentation}
                                        text="Yes"
                                        // value={"yes"}
                                        onChange={(e: any) => {
                                            setPlans(old => ({ ...old, premium: { ...old["premium"], hasDocumentation: e.target.checked } }))
                                        }} />
                                </td>

                            </tr>

                            <tr>
                                <td>Has Admin Panel</td>
                                <td>
                                    <GameUploadCheck
                                        i={1}
                                        name="AiPricing"
                                        checked={plans.basic.hasAdminPanel}
                                        text="Yes"
                                        // value={"yes"}
                                        onChange={(e: any) => {
                                            setPlans(old => ({ ...old, basic: { ...old["basic"], hasAdminPanel: e.target.checked } }))
                                        }} />
                                </td>
                                <td>
                                    <GameUploadCheck
                                        i={1}
                                        name="AiPricing"
                                        checked={plans.standard.hasAdminPanel}
                                        text="Yes"
                                        // value={"yes"}
                                        onChange={(e: any) => {
                                            setPlans(old => ({ ...old, standard: { ...old["standard"], hasAdminPanel: e.target.checked } }))
                                        }} />
                                </td>
                                <td>
                                    <GameUploadCheck
                                        i={1}
                                        name="AiPricing"
                                        checked={plans.premium.hasAdminPanel}
                                        text="Yes"
                                        // value={"yes"}
                                        onChange={(e: any) => {
                                            setPlans(old => ({ ...old, premium: { ...old["premium"], hasAdminPanel: e.target.checked } }))
                                        }} />
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}