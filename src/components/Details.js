import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  state = {
    inCart: false
  }
  render() {

    return (
      <ProductConsumer>
        {value => {
          const { id,inCart, company, info, title, img, price } = value.detProduct;
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
                {/* end of title */}

                {/* start of product info */}
                <div className="row">
                  <div className="col-10 col-md-6 mx-auto my-3">
                    <img src={img} alt="Mobile" />
                  </div>
                  <div className="col-10 col-md-6 mx-auto my-3 text-capitalize">
                    <h3>Model: {title}</h3>
                    <h4 className="text-title text-uppercase text-muted my-3">
                      Made By: {company}
                    </h4>
                    <h4 className="text-blue">Price: ${price}</h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0" />
                    <p className="text-muted lead">{info}</p>
                    {/* buttons */}
                    <Link to="/">
                      <ButtonContainer>Back to Product</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      onClick={() => {
                        value.addToCart(id, true);
                        value.openModal(id)
                      }}
                      disabled={inCart}
                    >
                      {inCart ? "In Cart" : "Add To cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
              {/* <button className='btn btn-outline-warning font-weight-bold fa-8x'><i className="fas fa-cart-plus" /> Cart</button> */}
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
