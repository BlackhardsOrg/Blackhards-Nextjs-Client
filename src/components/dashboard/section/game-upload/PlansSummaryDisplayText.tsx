import { IGameTitle } from "@/types"

interface IPlansSummaryDisplayText{
    text: string| number | boolean | undefined
}
export function PlansSummaryDisplayText({text}: IPlansSummaryDisplayText) {
    return (
        <div className="message-alart-style1">
            <div
                className="alert alart_style_one alert-dismissible fade show mb20"
                role="alert"
            >
                {text}

                {/* {gameTitle && gameTitle.plans && gameTitle.plans.basic.price} */}

            </div>
        </div>
    )
}