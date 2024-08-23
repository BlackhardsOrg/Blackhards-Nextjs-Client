import { USER_GAME_TITLES } from "@/graphql";
import { IGameTitleGQL } from "@/types";
import { timeAgo } from "@/utils";
import { formatPriceToDollars } from "@/utils/priceFormatter";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";

export default function ManageProjectCard({gametitle}:{gametitle?: IGameTitleGQL}) {

  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
            <div className="d-lg-flex px-0">
              <div className="details mb15-md-md">
                <h5 className="title mb10">{gametitle?.title}</h5>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-video-file fz16 vam text-thm2 me-1" />{" "}
                  {gametitle?.gamePlays} plays
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {gametitle && gametitle.updatedAt &&  timeAgo(gametitle.updatedAt) }
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm text-thm">
                  <i className="flaticon-contract fz16 vam me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {gametitle?.isOnSale ? "On Sale": "Pending"}
                </p>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span className="fz15 fw400">{gametitle?.genre.map(stringText => {
            return `${stringText}, `
          })}</span>
        </td>
        <td className="vam">
          <span className="fz14 fw400">{gametitle && gametitle.plans && formatPriceToDollars(gametitle.plans.basic.price)}/Basic</span>
        </td>
        <td>
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
