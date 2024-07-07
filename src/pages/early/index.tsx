import BrowserCategory3 from "@/components/early/BrowserCategory3";
import CounterInfo1 from "@/components/early/CounterInfo1";
import ForClient from "@/components/early/ForClient";
import Header19 from "@/components/early/Header19";
import Hero18 from "@/components/early/Hero18";
import MetaComponent from "@/components/early/MetaComponent";
import NeedSomething18 from "@/components/early/NeedSomething18";
import Testimonials13 from "@/components/early/Testimonials18";

const metadata = {
  title: "Blackhards - AI-Powered Game Marketplace | Home",
};

export default function EarlyAccess() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header19 />
      <div className="body_content">
        <Hero18 />
        <BrowserCategory3 />
        {/* <TrendingService3 /> */}
        {/* <TrendingAuctions1 /> */}

        <NeedSomething18 />
        <CounterInfo1 />
        {/* <HighestRated18 /> */}
        <Testimonials13 />
        <ForClient />
        {/* <OurBlog1 /> */}
      </div>
    </>
  );
}
