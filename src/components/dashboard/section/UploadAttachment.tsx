import Link from "next/link";
import { ChangeEventHandler, useState } from "react";

export default function UploadAttachment() {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any;

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

  return (
    <>
      <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Upload Attachments</h5>
        </div>
        <div className="row">
          {content}
          <div className="col-6 col-xl-3">
            <label>
              <a className="upload-img">
                Upload Files
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
            Save &amp; Publish
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
