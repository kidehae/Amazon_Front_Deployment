import React, { useEffect, useState } from "react";
import Layout from "../../componenets/Layout/Layout";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../assets/API/endpoints";
import Product from "../../componenets/product/Product";
import ProductCard from "../../componenets/product/ProductCard";
import Loading from "../../componenets/Loading/Loading";
function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${apiUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <section
          style={{
            color: "black",
            padding: "20px",
            fontWeight: "bolder",
            fontSize: "25px",
          }}
        >
          <h1>Results</h1>
          <p> Category / {categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
                flex={false}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Results;
