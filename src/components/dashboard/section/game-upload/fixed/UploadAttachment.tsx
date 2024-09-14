import FLyLoad from "@/components/loading/FLyLoad";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { gameTitleCreateSuccess } from "@/redux/features/gametitle/slices/gameTitleSlice";
import { IUploadAttachments } from "@/types";
import { uploadImages, uploadZip } from "@/utils/imageUploader";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { toast } from "react-toastify";

export default function UploadAttachment({ id,
  //  gameTitle, setGameTitle, 
  getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IUploadAttachments) {
  const [uploadedImageFiles, setUploadedImageFiles] = useState([]) as any;
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [gameProjLoading, setGameProjLoading] = useState(false)


  const [gamefiles, setGameFiles] = useState([]) as any;
  const [uploading, setUploading] = useState(false);

  const gameTitleData = useAppSelector(state => state.gametitle.gameTitle)
  const dispatch = useAppDispatch()
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

  //handle file upload for Game project
  const handleFileUploadGameProj = (event: ChangeEventHandler<HTMLInputElement> | any) => {
    const newFiles = Array.from(event.target.files);

    const isFileDuplicate = (file: any, fileList: any) => {
      return fileList.some((existingFile: any) => existingFile.name === file.name);
    };

    const uniqueNewFiles = newFiles.filter(
      (file) => !isFileDuplicate(file, uploadedImageFiles)
    );

    setGameFiles((prevFiles: any) => [...prevFiles, ...uniqueNewFiles]);
    console.log(uploadedImageFiles, "Uploaded FIles")
  };

  // delete handler
  const handleFileDelete = (fileName: any) => {
    setUploadedImageFiles((prevFiles: any) =>
      prevFiles.filter((file: any) => file.name !== fileName)
    );
  };

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

  // content
  let gameProjContent = gamefiles.map((item: any, i: any) => (
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


  const handleFileServerUploadGameProj = async (e) => {
    setGameProjLoading(true)
    const data = await uploadZip(gamefiles)
    console.log(data, "HAUL")
    if (data) {
      dispatch(gameTitleCreateSuccess({ ...gameTitleData, gamePlayScreenShots: data.map(item => item.url) }))
      toast("File(s) Uploaded successfully!")
    }
    setGameProjLoading(false)
  }

  // #region Submit Handlers
  const handleGameSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
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
    let prevPageNumber = id - 1 >= 0 ? id - 1 : id
    setCurrentPageState(prevPageNumber)
    setCurrentTab(prevPageNumber)
  }
  // #endregion Handlers


  return (
    <form onSubmit={handleGameSubmit}>
      <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Upload Game Play Photos</h5>
        </div>

        <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden position-relative d-flex gap-2 flex-column">
          <div className="bdrb1 pb15 mb25">
            <h5 className="list-title">Game Play Video url (youtube)</h5>
          </div>
          <div className="row">
            {/* {content} */}
            <div className="col-6 col-xl-3">
              <label>
                <a className="">
                  <input
                    type="text"
                    placeholder="http://youtube.com/"
                    // accept="application/pdf"
                    className="form-control"
                    onChange={(e) => {
                      dispatch(gameTitleCreateSuccess({ ...gameTitleData, gamePlayVideo: e.target.value }))
                    }}
                    multiple
                  />
                </a>
              </label>
            </div>
          </div>

        </div>
        <div className="row">
          {content}
          <div className="col-6 col-xl-3">
            <label>
              <a className="upload-img">
                photos
                <input
                  type="file"
                  accept="application/image"
                  className="d-none"
                  onChange={handleFileUpload}
                  multiple
                />
              </a>
            </label>
          </div>
        </div>
        <p className="text">Maximum file size: 10 MB</p>
        <div className="text-start">
          <button type="button" onClick={handleFileServerUpload} className="ud-btn btn-thm" >
            {imageLoading ? <FLyLoad /> : <>
              <span>Upload</span>
              <i className="fas fa-upload" />
            </>}

          </button>
        </div>
      </div>



      {/* <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Upload Game Project</h5>
        </div>
        <div className="row">
          {gameProjContent}
          <div className="col-6 col-xl-3">
            <label>
              <a className="upload-img">
                zip
                <input
                  type="file"
                  accept="application/zip"
                  className="d-none"
                  onChange={handleFileUploadGameProj}
                  multiple
                />
              </a>
            </label>
          </div>
        </div>
        <p className="text">Maximum file size: 500 MB</p>
        <div className="text-start">
          <button onClick={handleFileServerUploadGameProj} type={"button"} className="ud-btn btn-thm" >
            {gameProjLoading ? <FLyLoad /> : <>
              <span>Upload</span>
              <i className="fas fa-upload" />
            </>}
          </button>
        </div>
      </div> */}

      <div className="col-md-12">
        <div className="text-start d-flex gap-1">
          <button
            type={"button"}
            onClick={handlePrevious}
            style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-dark" >
            {loading ? <FLyLoad /> :
              <>
                <span>Prev</span>
                <i className="fal fa-arrow-left-long" />
              </>}
          </button>

          <button
            type="submit"
            style={{ opacity: loading ? .5 : 1 }} disabled={loading} className="ud-btn btn-thm" >
            {loading ? <FLyLoad /> :
              <>
                <span>Save & Continue</span>
                <i className="fal fa-arrow-right-long" />
              </>}
          </button>
        </div>
      </div>


    </form>
  );
}
