import React, { Component } from "react";

import { storeProducts, detailProduct } from "./data";

const productContext = React.createContext(); // step (3), create a react context
// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detProduct: detailProduct,
    cart: [],
    modalProduct: detailProduct,
    modalOpen: false,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];

    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };
  getItem = id => this.state.products.find(item => item.id === id);

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({ detProduct: product });
  };
  addToCart = (id, fromDetail) => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    // console.log("[addTocart]: index", index);
    const selectedProduct = {
      ...tempProducts[index],
      inCart: true,
      count: 1,
      total: tempProducts[index].price
    };

    // const chosenproduct = tempProducts[index]; // => using this line insdead of the previous one MUTATE the 'tempPRoduct' array
    // chosenproduct.inCart = true;

    tempProducts.splice(index, 1, selectedProduct);
    this.setState(
      {
        products: tempProducts,
        cart: [...this.state.cart, selectedProduct]
      },
      () => console.log("[context], cart products: ", this.state.cart)
    );
      if(fromDetail)
        this.setState({detProduct: selectedProduct});
  };
  openModal = id => {
    const selectedProduct = this.getItem(id);
    this.setState({ modalProduct: selectedProduct, modalOpen: true });
  };
  closeModal = (e) => {
    this.setState({ modalOpen: false });
    console.log('closeModal method invoked!')
  };
  increment = id => {
    console.log('the items incremented!');
  }
  decrement = id => {
    console.log('the items decremented!');
  }
  removeItem = id => {
    console.log('an item removed!');
  }
  clearCart = id => {
    console.log('the cart removed!');
  }


  render() {
    return (
      <productContext.Provider // step (2), create the context provider
        value={{
          // step (3), pass the data that will be used by the components that use the context API
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </productContext.Provider>
    );
  }
}

const ProductConsumer = productContext.Consumer; // step (1), create a consumer

export { ProductProvider, ProductConsumer };
