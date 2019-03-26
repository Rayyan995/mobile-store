import React, { Component } from "react";

import { storeProducts, detailProduct } from "./data";

const productContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: storeProducts,
    detailProduct: detailProduct
  };
  handleDetail = () => {
    console.log("hello from habdle details!");
  };
  addToCart = () => {
    console.log("hello from add to Cart!");
  };
  render() {
    return (
      <productContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </productContext.Provider>
    );
  }
}

const ProductConsumer = productContext.Consumer;

export { ProductProvider, ProductConsumer };
