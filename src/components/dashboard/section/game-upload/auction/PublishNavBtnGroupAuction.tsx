import { useAppSelector } from "@/redux/app/hooks"
import FLyLoad from "@/components/loading/FLyLoad";
import { IPageProgress } from "@/types";

interface IPublishNavBtnGroup {
    loading: boolean
    getCurrentPageState: number
    handlePrevious: () => void
    handleGameSubmit: (e: any) => void
    getPageProgress: IPageProgress[]
    className?: string
}

const PublishNavBtnGroupAuction = ({
    className,
    loading,
    getCurrentPageState,
    handlePrevious,
    handleGameSubmit,
    getPageProgress }: IPublishNavBtnGroup) => {
    const gameTitleLoad = useAppSelector(state => state.gametitle)


    return (
        <div className={`col-md-6`}>
            <div className={`text-start d-flex gap-1 ${className}`}>
                <button
                    disabled={loading || (getCurrentPageState == 0 && true)}
                    type={"button"}
                    onClick={handlePrevious}
                    style={{ opacity: getCurrentPageState == 0 && true || loading ? .5 : 1 }}
                    className="ud-btn btn-dark p-2 px-3" >

                    <span>Prev</span>
                    <i className="fal fa-arrow-left-long" />

                </button>

                <button onClick={(e) => {
                    handleGameSubmit(e)
                }}
                    type="submit"
                    style={{ opacity: gameTitleLoad.loading.gameTitleCreate ? .5 : 1 }}
                    disabled={gameTitleLoad.loading.gameTitleCreate}
                    className="ud-btn btn-thm p-2 px-3" >
                    {gameTitleLoad.loading.gameTitleCreate ? <FLyLoad /> :
                        <>
                            <span>{getCurrentPageState == getPageProgress.length - 1 ? "Publish" : "Save & Continue"}</span>
                            <i className="fal fa-arrow-right-long" />
                        </>}
                </button>
            </div>
        </div>
    )
}

export default PublishNavBtnGroupAuction