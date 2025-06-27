import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";

function Product() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setproducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className={classes.products_container}>
      {products.map((singleProduct) => {
        return (
          <ProductCard
            product={singleProduct}
            key={singleProduct.id}
            renderAdd={true}
            flex={false}
          />
        );
      })}
    </section>
  );
}

export default Product;
