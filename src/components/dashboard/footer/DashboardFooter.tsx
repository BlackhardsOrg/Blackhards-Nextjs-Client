import FooterSelect1 from "@/components/footer/FooterSelect1";

export default function DashboardFooter() {
  return (
    <>
      <footer className="dashboard_footer pt30 pb30">
        <div className="container">
          <div className="row align-items-center justify-content-center justify-content-md-between">
            <div className="col-auto">
              <div className="copyright-widget">
                <p className="mb-md-0">
                  © Blackhards. {new Date().getFullYear()}. All
                  rights reserved.
                </p>
              </div>
            </div>
    
          </div>
        </div>
      </footer>
    </>
  );
}
