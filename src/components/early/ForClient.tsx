import { links } from "@/data/links";
import Link from "next/link";
import React from "react";

export default function ForClient() {
  return (
    <section className="pb120 pb60-sm">
      <div className="container">
        <div className="row align-items-center wow fadeInUp mb100 mb0-md">
          <div className="col-md-6 col-xl-6">
            <div className="text-center mb30-sm">
              <img
                className="w-100 bdrs12"
                src="/images/about/Humanoidman.png"
                alt=" image "
              />
            </div>
          </div>
          <div className="col-md-6 col-xl-4 offset-xl-1">
            <div className="main-title">
              <h5 className="text-thm">For clients</h5>
              <h2 className="title">
                80% cut in Game Development time{" "}
                <br className="d-none d-lg-block" />
                with Blackhards
              </h2>
              <p className="paragraph">
                The African B2B marketplace where you can{" "}
                <span className="text-success font-weight-bold h5">Buy,</span>
                <span className="text-success h5">Sell</span>, and{" "}
                <span className="text-success h5">
                  Auction high-quality game codes and assets.
                </span>
                Elevate your games with lightning speed using{" "}
                <span className="text-success h5">AI-powered tools</span> for{" "}
                <span className="text-success h5">2D/3D animation</span> and{" "}
                <span className="text-success h5">Modeling</span>, alongside{" "}
                <span className="text-success h5">
                  Customizable sound effects
                </span>{" "}
                generated effortlessly from text prompts.
              </p>
            </div>
            <Link href={links.registerEarly} className="ud-btn btn-white2 bdrs60">
              Get Early Access <i className="fal fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
        <div className="row align-items-center wow fadeInUp mt20">
          <div className="col-md-6 col-xl-4">
            <div className="main-title">
              <h5 className="text-thm">For Developers</h5>
              <h2 className="title">
                Unlimited Access to Our <br className="d-none d-lg-block" />
                AI-Powered Dynamic Pricing Marketplace
              </h2>
              <p className="paragraph">
                <span className="text-success h5">Dynamically price</span> your{" "}
                <span className="text-success h5">Game Projects</span> to{" "}
                <span className="text-success h5">supercharge</span> revenue,{" "}
                <span className="text-success h5">skyrocket</span> sales,
                <span className="text-success h5">optimize profit margins</span>
                , instantly adapt to market changes, personalize pricing, and
                beyond.
              </p>
            </div>
            <Link href={links.registerEarly} className="ud-btn btn-white2 bdrs60">
              Join Early <i className="fal fa-arrow-right-long"></i>
            </Link>
          </div>
          <div className="col-md-6 col-xl-6 offset-xl-1">
            <div className="text-center mt30-sm">
              <img
                className="w-100 bdrs12"
                src="/images/about/cybdownload1.png"
                alt=" image "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
