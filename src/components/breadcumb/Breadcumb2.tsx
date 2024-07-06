import { useRouter } from "next/router";

interface Breadcumb2Props {
  title: string;
  brief: string;
}

const Breadcumb2: React.FC<Breadcumb2Props> = ({ title, brief }) => {
  const router = useRouter();

  return (
    <section
      className={`breadcumb-section ${
        router.pathname !== "/blog-2" && router.pathname !== "/blog-3"
          ? "mt40"
          : "pt0"
      }`}
    >
      <div className="cta-about-v1 mx-auto maxw1700 pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg">
        <div className="container">
          <div className="row">
            <div className="col-xl-5">
              <div className="position-relative">
                <h2 className="text-white">{title}</h2>
                <p className="text-white mb30">{brief}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcumb2;
