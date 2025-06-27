import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../componenets/Layout/Layout";
import { DataContext } from "../../componenets/Dataprovider/DataProvider";
import ProductCard from "../../componenets/product/ProductCard";
import { Form } from "react-router-dom";
import CurrencyFormat from "../../componenets/currencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../assets/API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import Orders from "../Orders/Orders";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/actiontype";

function Payment() {
  const [state, dispatch] = useContext(DataContext);
  const user = state?.user || {};
  const basket = state?.basket || [];
  const [cardErr, setCardErr] = useState(null);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    e?.error?.message ? setCardErr(e?.error?.message) : setCardErr();
  };

  const handlePayment = async (e) => {
    setProcessing(true);
    e.preventDefault();

    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      dispatch({
        type: Type.EMPTY_BASKET,
      });
      setProcessing(false);
      navigate("/Orders", { state: { msg: "You have placed new order" } });
      // console.log(confirmation);
    } catch (error) {
      setProcessing(true);
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={classes.Payment__header}>
        {" "}
        Checkout {totalItem} items{" "}
      </div>
      <section className={classes.Payment}>
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <Form onSubmit={handlePayment}>
              {cardErr && <small style={{ color: "red" }}>{cardErr}</small>}
              <CardElement onChange={handleChange} />

              <div>
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <div>Total Order | </div>
                    <div>
                      <CurrencyFormat amount={total} />
                    </div>
                  </span>
                </div>
                <button type="submit">
                  {processing ? (
                    <ClipLoader color="grey" size={12} />
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
