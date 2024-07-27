import React from "react";
import { Colors } from "chart.js";
import Link from "next/link";

export default function Hero18() {
  return (
    <section className="hero-home13 at-home18 m30 overflow-hidden">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7">
            <div className="home18-hero-content">
              <h1 className="banner-title animate-up-1 mb25">
                AI-Powered B2B Game Marketplace{" "}
                <br className="d-none d-xl-block" />
                For Auctions and Trading Game codes
              </h1>
              <p className="text-white text animate-up-2">
                Accelerate Game development with ready-to-use source code &
                assets. <br className="d-none d-lg-block" />
                Earn recurring revenue by selling your own game code.{" "}
                <br/>
                <b style={{ color: "#F9FCAA" }}> Be The first.</b>
              </p>
              <div className="d-sm-flex align-items-center mt30 animate-up-3">
                <Link href="/auth/register-early" className="ud-btn  me-3 bdrs120 btn-1">
                Join Early
                </Link>
                {/* <Link
                  href="/auth-login"
                  className="ud-btn btn-white bdr1 bdrs120 btn-2"
                >
                  Sign In
                </Link> */}
              </div>
            </div>
          </div>
          <div className="col-xl-5 d-none d-xl-block">
            <div className="home18-hero-img text-end animate-up-1">
              <div className="thumb position-relative">
                <img
                  className="img rounded-circle"
                  src="/images/about/cyberlady1.png"
                  alt=" image "
                />
              </div>
              {/* <div className="detail text-start">
                <h5 className="text-white">Legend of Tara</h5>
                <p className="fz13 text-white mb-0">Role Playing Game (RPG)</p>
              </div> */}
              <div className="iconbox-small1 text-start d-flex wow fadeInRight default-box-shadow4 bounce-x">
                <span className="icon flaticon-badge"></span>
                <div className="details pl20">
                  <h6 className="mb-1">Proof of quality</h6>
                  <p className="text fz13 mb-0">
                    The best Games at affordable prices
                  </p>
                </div>
              </div>
              <img
                className="img-1 bounce-y"
                src="/images/about/happy-client-1.png"
                alt=" image "
              />
              <img
                className="img-2 bounce-y"
                src="/images/about/element-15.png"
                alt=" image "
              />
              <img
                className="img-3 spin-right"
                src="/images/about/element-16.png"
                alt=" image "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
