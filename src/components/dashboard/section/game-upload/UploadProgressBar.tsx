interface IUploadProgressBar {
    currentUploadPageText: string
    percentage: string
}
export default function UploadProgressBar({ currentUploadPageText, percentage }: IUploadProgressBar) {
    return (
        <>
            <div className="ui-content">
                <h5 className="title">Publish Progress</h5>
                <div className="progressbar-style1">
                    <div className="progressbar-bg" />
                    <div className="progressd-bar" style={{ width: `${percentage}%` }}>
                        <span>{currentUploadPageText}{" "}{percentage}%</span>
                    </div>
                </div>


            </div>
        </>
    );
}
