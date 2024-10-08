import { IBasicInformation, IGameTabs, IGameTitle, IPageProgress } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import BasicInfo from "./BasicInfo";
import PricingAndPlans from "./PricingAndPlans";
import UploadAttachment from "./UploadAttachment";
import SummaryAndPublish from "./SummaryAndPublish";
import { useAppSelector } from "@/redux/app/hooks";

const tab = ["Basic Info", "Pricing", "Upload Game Files", "Summary & Publish"];

export default function GameTabs({
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
                            <BasicInfo
                                id={0}
                            
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
                            <PricingAndPlans
                                id={1}
                            
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
                            <UploadAttachment
                             
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
                            <SummaryAndPublish
                                id={3}
                             
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
