import React, { useEffect, useState } from "react";
import Layout from "../../componenets/Layout/Layout";
import classes from "./productDetail.module.css";
import { useParams } from "react-router-dom";
import apiUrl from "../../assets/API/endpoints";
import ProductCard from "../../componenets/product/ProductCard";
import Loading from "../../componenets/Loading/Loading";
import axios from "axios";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initialize as true since we load immediately

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        // You might want to set some error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Add productId as dependency

  return (
    <Layout>
      <div className={classes.productDetailContainer}>
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <Loading />
          </div>
        ) : (
          <ProductCard
            product={product}
            flex={true}
            renderDesc={true}
            renderAdd={true}
          />
        )}
      </div>
    </Layout>
  );
}

export default ProductDetail;
