
interface IPublishSummaryText {
    labelTitle: string
    value: string | string[]
}
const PublishSummaryText = ({ labelTitle = "GameTitle", value = "Call of Guns" }: IPublishSummaryText) => {
    const displaySummaryText = () => {
        if (Array.isArray(value)) {
            return (
                <ul className="list-group">

                    {value.map(item => {
                        return <li className="list-group-item text-capitalize" key={item}>{item}</li>
                    })}
                </ul>)
        }
    }
    return (
        <>
            <h5 className="title">{labelTitle}</h5>
            {/* <p className="mb25 ff-heading text">{gameTitle.title}</p> */}
            <div className="message-alart-style1">
                <div
                    className="alert alart_style_one alert-dismissible fade show mb20"
                    role="alert"
                >
                    {/* {value} */}
                    {typeof value === 'string' ? value : ""}
                    {displaySummaryText()}

                </div>
            </div>
        </>
    )
}

export default PublishSummaryText