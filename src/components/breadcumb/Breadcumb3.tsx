import Link from "next/link";

interface Breadcumb3Props {
  path: string[] | undefined;
}

const Breadcumb3: React.FC<Breadcumb3Props> = ({ path }) => {
  return (
    <section className="breadcumb-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-style1">
              <div className="breadcumb-list">
                {path?.map((item, i) => (
                  <Link href={"/"+item} key={i}>{item}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcumb3;
