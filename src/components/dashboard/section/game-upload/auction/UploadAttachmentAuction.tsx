import FLyLoad from "@/components/loading/FLyLoad";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { auctionCreateSuccess } from "@/redux/features/auction/slices/auctionSlice";
import { IUploadAttachments } from "@/types";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";

export default function UploadAttachmentAuction({ id,
  //  gameTitle, setGameTitle, 
  getPageProgress,
  setGetPageProgress,
  getCurrentPageState,
  setCurrentPageState,
  setCurrentTab }: IUploadAttachments) {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any;
  const [loading, setLoading] = useState(false)

  const auctionData = useAppSelector(state => state.auction.auction)
  const [auction] = useState(auctionData)
  const dispatch = useAppDispatch()
  // upload handler
  const handleFileUpload = (event: ChangeEventHandler<HTMLInputElement> | any) => {
    const newFiles = Array.from(event.target.files);

    const isFileDuplicate = (file: any, fileList: any) => {
      return fileList.some((existingFile: any) => existingFile.name === file.name);
    };

    const uniqueNewFiles = newFiles.filter(
      (file) => !isFileDuplicate(file, uploadedFiles)
    );

    setUploadedFiles((prevFiles: any) => [...prevFiles, ...uniqueNewFiles]);
  };

  // delete handler
  const handleFileDelete = (fileName: any) => {
    setUploadedFiles((prevFiles: any) =>
      prevFiles.filter((file: any) => file.name !== fileName)
    );
  };

  // content
  let content = uploadedFiles.map((item: any, i: any) => (
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

  const handleInputFormChange = (e: any) => {
    // setGameTitle((old) => {
    //   return { ...old, [e.target.name]: e.target.value }
    // })
    dispatch(auctionCreateSuccess({ ...auction, [e.target.name]: e.target.value }))

  }
  return (
    <form onSubmit={handleGameSubmit}>
      <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Upload Game Play Photos</h5>
        </div>
        <div className="row">
          {content}
          <div className="col-6 col-xl-3">
            <label>
              <a className="upload-img">
                photos
                <input
                  type="file"
                  accept="application/pdf"
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
          <Link className="ud-btn btn-thm" href="/contact">
            Upload
            <i className="fas fa-upload" />
          </Link>
        </div>
      </div>

      <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Upload Game Videos</h5>
        </div>
        <div className="row">
          {/* {content} */}
          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb10">
                A Video Link to your Trailer or game play(<i className="text-info">Note your game must be live</i>)
              </label>
              <input
                onChange={handleInputFormChange}
                value={auction ? auction.gamePlayVideo : ""}
                name="gamePlayVideo"
                type="text"
                className="form-control"
                placeholder="youtube, vimeo, etc"
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb10">
                A Link to Your Playable Demo
              </label>
              <input
                onChange={handleInputFormChange}
                value={auction ? auction.gameFileLink : ""}
                name="gameFileLink"
                type="text"
                className="form-control"
                placeholder="app store, steam, itch.io link"
              />
            </div>
          </div>
        </div>
        <p className="text">Maximum file size: 10 MB</p>
        <div className="text-start">
          <Link className="ud-btn btn-thm" href="/contact">
            Upload
            <i className="fas fa-upload" />
          </Link>
        </div>
      </div>

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
