import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";

export default class Modal extends Component {
  /*"modalHandler" this function used to stop click event from bubling to the
    div(HTML element) ancentors so it prevents executing the click event of the
    parents when we click on a specific child, so we should 
    invoke it in the particular HTML element that we wanna 
    it only to make an event */
  modalHandler = event => {
    event.stopPropagation();
  };
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;

          if (!modalOpen) return null;
          else {
            return (
              <ModalContainer>
                <div className="container" onClick={e => closeModal(e)}>
                  <div className="row">
                    <div
                      onClick={e => this.modalHandler(e)}
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5"
                    >
                      <h1>An Item Selected!</h1>
                      <img className="img-fluid" src={img} alt="Mobile" />
                      <h5>{title}</h5>
                      <h5 className="text-muted">price : ${price}</h5>
                      <Link to="/">
                        <ButtonContainer onClick={e => closeModal(e)}>
                          store
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer onClick={e => closeModal(e)}>
                          go to cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  transition: opacity 2s all;
  #modal:hover {
    background: var(--mainWhite);
    opacity: 1;
  }
`;
