import React from "react";
import Layout from "../../componenets/Layout/Layout";
import Catagory from "../../componenets/catagory/Catagory";
import Product from "../../componenets/product/Product";
import Carousel from "../../componenets/Carousel/Carousel";

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing;
