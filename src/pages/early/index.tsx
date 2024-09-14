import BrowserCategory3 from "@/components/early/BrowserCategory3";
import CounterInfo from "@/components/early/CounterInfo1";
import ForClient from "@/components/early/ForClient";
import HeaderEarly from "@/components/early/HeaderEarly";
import Hero from "@/components/early/Hero";
import MetaComponent from "@/components/early/MetaComponent";
import NeedSomething from "@/components/early/NeedSomething18";
import Testimonials from "@/components/early/Testimonials18";

const metadata = {
  title: "Blackhards - AI-Powered Game Marketplace | Home",
};

export default function EarlyAccess() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <HeaderEarly />
      <div className="body_content">
        <Hero />
        <BrowserCategory3 />
        {/* <TrendingService3 /> */}
        {/* <TrendingAuctions1 /> */}

        <NeedSomething />
        <CounterInfo />
        {/* <HighestRated18 /> */}
        <Testimonials />
        <ForClient />
      </div>
    </>
  );
}
