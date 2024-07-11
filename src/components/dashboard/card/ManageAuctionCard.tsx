import Link from "next/link";
import { Tooltip } from "react-tooltip";

interface IManageServiceCard1 {
  data: any
}
export default function ManageAuctionCard({ data }: IManageServiceCard1) {
  return (
    <>
      <tr>
        <th className="dashboard-img-service" scope="row">
          <div className="listing-style1 list-style d-block d-xl-flex align-items-start border-0 mb-0">
            <div className="list-thumb flex-shrink-0 bdrs4 mb10-lg">
              <img className="w-100" src={data.img} alt="thumb" />
            </div>
            <div className="list-content flex-grow-1 py-0 pl15 pl0-lg">
              <h6 className="list-title mb-0">
                <Link href="/service-single">{data.title}</Link>
              </h6>
              <ul className="list-style-type-bullet ps-3 dashboard-style mb-0">
                {data.list.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </th>
        <td className="align-top">
          <span className="fz15 fw400">{data.category}</span>
        </td>
        <td className="align-top">
          <span className="fz14 fw400">${data.cost.toFixed(2)}/Fixed</span>
        </td>
        <td className="align-top">
          <div className="d-flex">
            <a
              className="icon me-2"
              id="edit"
              data-bs-toggle="modal"
              data-bs-target="#proposalModal"
            >
              <Tooltip anchorSelect="#edit" className="ui-tooltip" place="top">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </a>
            <a
              className="icon"
              id="delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <Tooltip
                anchorSelect="#delete"
                place="top"
                className="ui-tooltip"
              >
                Delete
              </Tooltip>
              <span className="flaticon-delete" />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}
