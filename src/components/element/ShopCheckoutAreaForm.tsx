import { IShopCheckoutAreaForm } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";


export default function ShopCheckoutAreaForm({ order,
  setOrder }: IShopCheckoutAreaForm) {


  const handleInputChange = (e) => {
    setOrder(old => ({ ...old, [e.target.name]: e.target.value }))
  }
  return (
    <>
      <div className="checkout_form">
        <h4 className="title mb30">Billing details</h4>
        <div className="checkout_coupon">
          <form className="form2">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb25">
                  <h6 className="mb15">First Name</h6>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ali"
                    name="firstName"
                    value={order.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb25">
                  <h6 className="mb15">Last Name</h6>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tufan"
                    name="lastName"
                    value={order.lastName}
                    onChange={handleInputChange}

                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h6 className="mb15">Company Name</h6>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ali"
                    name="companyName"
                    value={order.companyName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb25">
                  <h6 className="mb15">Country / Region *</h6>
                  <div className="bootselect-multiselect">
                    <select
                      name="country"
                      value={order.country}
                      onChange={handleInputChange}
                      className="selectpicker">
                      <option>Select</option>
                      <option>Turkey</option>
                      <option>United Kingdom</option>
                      <option>United State</option>
                      <option>Ukraine</option>
                      <option>Uruguay</option>
                      <option>UK</option>
                      <option>Uzbekistan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h6 className="mb15">House number and street name</h6>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ali"
                    name="houseNo"
                    value={order.houseNo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              <div className="col-lg-12">
                <div className="mb25">
                  <h6 className="mb15">Town / City *</h6>
                  <div className="bootselect-multiselect">
                    <select name="town"
                      value={order.town}
                      onChange={handleInputChange}
                      className="selectpicker">
                      <option data-tokens="California">California</option>
                      <option data-tokens="Chicago">Chicago</option>
                      <option data-tokens="LosAngeles">Los Angeles</option>
                      <option data-tokens="Manhattan">Manhattan</option>
                      <option data-tokens="NewJersey">New Jersey</option>
                      <option data-tokens="NewYork">New York</option>
                      <option data-tokens="SanDiego">San Diego</option>
                      <option data-tokens="SanFrancisco">San Francisco</option>
                      <option data-tokens="Texas">Texas</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h6 className="mb15">State *</h6>
                  <input
                    name="state"
                    value={order.state}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Ali"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h6 className="mb15">ZIP *</h6>
                  <input
                    name="zip"
                    value={order.zip}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Ali"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h6 className="mb15">Phone *</h6>
                  <input
                    name="phone"
                    value={order.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Ali"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h6 className="mb15">Email Address</h6>
                  <input
                    name="email"
                    value={order.email}
                    onChange={handleInputChange}
                    className="form-control"
                    type="email"
                    placeholder="Ali"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb25">
                  <h4 className="mb15">Additional information</h4>
                  <h6>Order Notes (optional)</h6>
                  <textarea
                    name="additionalInfo"
                    value={order.additionalInfo}
                    onChange={handleInputChange}
                    rows={7}
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
