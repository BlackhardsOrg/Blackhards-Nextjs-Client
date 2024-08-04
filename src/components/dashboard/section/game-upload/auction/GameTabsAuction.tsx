import { IBasicInformation, IGameTabs, IGameTitle, IPageProgress } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import BasicInfo from "../fixed/BasicInfo";
import PricingAndPlans from "../fixed/PricingAndPlans";
import UploadAttachment from "../fixed/UploadAttachment";
import SummaryAndPublish from "../fixed/SummaryAndPublish";
import { useAppSelector } from "@/redux/app/hooks";
import BasicInfoAuction from "./BasicInfoAuction";
import PricingAndPlansAuction from "./PricingAndPlansAuction";
import UploadAttachmentAuction from "./UploadAttachmentAuction";
import SummaryAndPublishAuction from "./SummaryAndPublishAuction";

const tab = ["Basic Info", "Pricing", "Upload Game Files", "Summary & Publish"];

export default function GameTabsAuction({
    // gameTitle,
    // setGameTitle,
    getPageProgress,
    setGetPageProgress,
    getCurrentPageState,
    setCurrentPageState,
    currentTab,
    setCurrentTab,

}: IGameTabs) {

    return (
        <>
            <div className="ui-content">
                {/* <h5 className="title">Tabs</h5> */}
                <div className="navpill-style1 mb70">
                    <ul className="nav nav-pills mb30">
                        {tab.map((item, i) => (
                            <li key={i} className="nav-item">
                                <button
                                    // onClick={() => {
                                    //     setCurrentTab(i)
                                    //     setCurrentPageState(i)
                                    // }}
                                    className={`nav-link fw500 ${getPageProgress[i].isDone ? "text-success" : " dark-color"}  ${currentTab === i ? "active" : ""
                                        }`}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content">
                        <div
                            className={`tab-pane fade fz15 text ${currentTab === 0 ? "show active" : ""
                                }`}
                        >
                            {/* Basic Informations */}
                            <BasicInfoAuction
                                id={0}
                                // gameTitle={gameTitle}
                                // setGameTitle={setGameTitle}
                                getPageProgress={getPageProgress}
                                setGetPageProgress={setGetPageProgress}
                                getCurrentPageState={getCurrentPageState}
                                setCurrentPageState={setCurrentPageState}
                                setCurrentTab={setCurrentTab}
                            />
                        </div>
                        <div
                            className={`tab-pane fade fz15 text ${currentTab === 1 ? "show active" : ""
                                }`}
                        >
                            {/* Pricing */}
                            <PricingAndPlansAuction
                                id={1}
                                // gameTitle={gameTitle}
                                // setGameTitle={setGameTitle}
                                getPageProgress={getPageProgress}
                                setGetPageProgress={setGetPageProgress}
                                getCurrentPageState={getCurrentPageState}
                                setCurrentPageState={setCurrentPageState}
                                setCurrentTab={setCurrentTab} />
                        </div>
                        <div
                            className={`tab-pane fade fz15 text ${currentTab === 2 ? "show active" : ""
                                }`}
                        >
                            {/* File Uploads */}
                            <UploadAttachmentAuction
                                // gameTitle={gameTitle}
                                // setGameTitle={setGameTitle}
                                id={2}
                                getPageProgress={getPageProgress}
                                setGetPageProgress={setGetPageProgress}
                                getCurrentPageState={getCurrentPageState}
                                setCurrentPageState={setCurrentPageState}
                                setCurrentTab={setCurrentTab} />
                        </div>

                        <div
                            className={`tab-pane fade fz15 text ${currentTab === 3 ? "show active" : ""
                                }`}
                        >
                            {/* Summary and Publish */}
                            <SummaryAndPublishAuction id={3}
                                // gameTitle={gameTitle}
                                // setGameTitle={setGameTitle}
                                getPageProgress={getPageProgress}
                                setGetPageProgress={setGetPageProgress}
                                getCurrentPageState={getCurrentPageState}
                                setCurrentPageState={setCurrentPageState}
                                setCurrentTab={setCurrentTab} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
