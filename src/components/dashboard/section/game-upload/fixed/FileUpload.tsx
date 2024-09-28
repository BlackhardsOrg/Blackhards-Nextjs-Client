import FLyLoad from "@/components/loading/FLyLoad";
import { useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess } from "@/redux/features/gametitle/slices/gameTitleSlice";
import { uploadImages } from "@/utils/imageUploader";
import { ChangeEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const FileUpload = () => {

    const dispatch = useDispatch()
    const [imageLoading, setImageLoading] = useState(false)

    const [uploadedImageFiles, setUploadedImageFiles] = useState([]) as any;
    const gameTitleData = useAppSelector(state => state.gametitle.gameTitle)

    // delete handler
    const handleFileDelete = (fileName: any) => {
        setUploadedImageFiles((prevFiles: any) =>
            prevFiles.filter((file: any) => file.name !== fileName)
        );
    };

    // upload handler
    const handleFileUpload = (event: ChangeEventHandler<HTMLInputElement> | any) => {
        const newFiles = Array.from(event.target.files);

        const isFileDuplicate = (file: any, fileList: any) => {
            return fileList.some((existingFile: any) => existingFile.name === file.name);
        };

        const uniqueNewFiles = newFiles.filter(
            (file) => !isFileDuplicate(file, uploadedImageFiles)
        );

        setUploadedImageFiles((prevFiles: any) => [...prevFiles, ...uniqueNewFiles]);
        console.log(uploadedImageFiles, "Uploaded FIles")
    };

    const handleFileServerUpload = async (e) => {
        setImageLoading(true)
        const data = await uploadImages(uploadedImageFiles)
        console.log(data, "HAUL")
        if (data) {
            dispatch(gameTitleCreateSuccess({ ...gameTitleData, gamePlayScreenShots: data.map(item => item.url) }))
            toast("File(s) Uploaded successfully!")
        }
        setImageLoading(false)
    }
    // content
    let content = uploadedImageFiles.map((item: any, i: any) => (
        <div key={i} className="col-6 col-xl-2 position-relative">
            <div className="project-attach">
                <h6 className="title">{item.name.split(".")[0].substring(0, 15)}</h6>
                <p className="text-uppercase">{item.name.split(".").pop()}</p>
                <span className="icon flaticon-page" />
            </div>
            <button
                className="position-absolute ui-delete-btn"
                onClick={() => handleFileDelete(item.name)}
            >
                x
            </button>
        </div>
    ));
    return (
        <>
            <div className="row">
                {content}
                <div className="col-6 col-xl-3">
                    <label>
                        <a className="upload-img">
                            Project(zip)
                            <input
                                type="file"
                                accept=".zip"
                                className="d-none"
                                // onChange={handleFileUpload}
                                multiple
                            />
                        </a>
                    </label>
                </div>
            </div>
            <p className="text">Maximum file size: 5GB</p>
            <div className="text-start">
                <button type="button"
                    // onClick={handleFileServerUpload}
                    className="ud-btn btn-thm" >
                    {imageLoading ? <FLyLoad /> : <>
                        <span>Upload</span>
                        <i className="fas fa-upload" />
                    </>}

                </button>
            </div>
        </>
    )
}

export default FileUpload