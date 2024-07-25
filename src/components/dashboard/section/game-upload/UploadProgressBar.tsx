interface IUploadProgressBar {
    currentUploadPageText: string
    percentage: string
}
function getPercentageRangeColor(value: number) {
    // Ensure the value is a number between 0 and 100
    if (value < 0 || value > 100) {
        "";
    }

    switch (true) {
        case (value >= 0 && value <= 30):
            return "";
        case (value >= 31 && value <= 60):
            return "bg-secondary";
        case (value >= 61 && value <= 90):
            return "bg-info";
        case (value >= 91 && value <= 100):
            return "bg-success";
        default:
            return "Invalid percentage range";
    }
}
export default function UploadProgressBar({ currentUploadPageText, percentage }: IUploadProgressBar) {
    return (
        <>
            <div className="ui-content">
                <h5 className="title">Publish Progress</h5>
                <div className="progressbar-style1">
                    <div className="progressbar-bg" />
                    <div className={`progressd-bar ${getPercentageRangeColor(Number(percentage))}`} style={{ width: `${percentage}%` }}>
                        <span>{currentUploadPageText}{" "}{percentage}%</span>
                    </div>
                </div>
            </div>
        </>
    );
}
