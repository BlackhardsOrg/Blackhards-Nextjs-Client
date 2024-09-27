import { useAppSelector } from "@/redux/app/hooks"
import FileUpload from "./FileUpload"
import { useEffect, useState } from "react"


const FileUploadTablePlans = () => {

    const gameTitleUploadTypeParam = useAppSelector(state => state.gametitle.gameUploadType)
    const [gameTitleUploadType, setgameTitleUploadType] = useState(gameTitleUploadTypeParam ? gameTitleUploadTypeParam : "title")

    const isOfferingPackagedPlans = useAppSelector(state => state.gametitle.isOfferingPackagedPlans)
    const [getIsOfferingPackagedPlans, setIsOfferingPackagedPlans] = useState(isOfferingPackagedPlans ? isOfferingPackagedPlans : true)


    useEffect(() => {
        if (gameTitleUploadType) {
            setgameTitleUploadType(gameTitleUploadTypeParam)
        }

        if (isOfferingPackagedPlans) {
            setIsOfferingPackagedPlans(isOfferingPackagedPlans)
        }

    }, [gameTitleUploadTypeParam, isOfferingPackagedPlans])

    return (
        <div className="ui-content mt-4 p-0">
            <h5>Game Files Upload</h5>
            <hr />
            <div className="row">
                <section className="d-flex gap-2 d-flex flex-column pt-4 p-0">
                    {
                        getIsOfferingPackagedPlans == "yes" ? <ul className="d-flex flex-column justify-content-between w-100 gap-5">
                            <li>
                                <h5>Basic</h5>
                                <FileUpload />
                            </li>
                            <li>
                                <h5>Standard</h5>
                                <FileUpload />
                            </li>
                            <li>
                                <h5>Premium</h5>
                                <FileUpload />
                            </li>
                        </ul>: <FileUpload/>
                    }
                </section>
            </div>
        </div>
    )
}

export default FileUploadTablePlans