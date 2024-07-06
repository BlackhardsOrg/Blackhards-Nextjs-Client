import Link from "next/link";
import { useRouter } from "next/router";

interface IData {
  icon: string;
  skill: string;
  title: string;
  brif: string;
}

interface IBrowserCategoryCard1Props {
  data: IData;
}

const BrowserCategoryCard1: React.FC<IBrowserCategoryCard1Props> = ({ data }) => {
  const { pathname } = useRouter();

  return (
    <>
      <div
        className={`iconbox-style1 ${
          pathname === "/home-8" || pathname === "/help" ? "bdr1" : ""
        }`}
      >
        <div className="icon">
          <span className={data.icon} />
        </div>
        <div className="details mt20">
          <p className="text mb5">{data.skill} skills</p>
          <h4 className="title">
            <Link href="/service-1">
              <>{data.title}</>
            </Link>
          </h4>
          <p className="mb-0">{data.brif}</p>
        </div>
      </div>
    </>
  );
}

export default BrowserCategoryCard1;
