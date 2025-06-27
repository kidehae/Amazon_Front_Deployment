import React, { useContext } from "react";
import Layout from "../../componenets/Layout/Layout";
import { DataContext } from "../../componenets/Dataprovider/DataProvider";
import ProductCard from "../../componenets/product/ProductCard";
import { Link } from "react-router-dom";
//import CurrencyFormat from "../../componenets/currencyFormat/currencyFormat";
import CurrencyFormat from "../../componenets/currencyFormat/CurrencyFormat.jsx";
import classes from "./Cart.module.css";
import { Type } from "../../utility/actiontype";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

function Cart() {
  const [{ basket, user }, dispath] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const incerement = (item) => {
    dispath({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const Decrement = (id) => {
    dispath({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Cart</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket.length == 0 ? (
            <p> Opps ! No item in your cart </p>
          ) : (
            basket.map((item) => {
              return (
                <section className={classes.cart__product} key={item.id}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btnContainer}>
                    <button
                      className={classes.btn}
                      onClick={() => {
                        incerement(item);
                      }}
                    >
                      <RiArrowDropUpLine size={30} />
                    </button>
                    <span className={classes.amount}> {item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => {
                        Decrement(item.id);
                      }}
                    >
                      <RiArrowDropDownLine size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        <div>
          <div className={classes.subtotal}>
            <p> Subtotal ({basket?.length} items) </p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small> This order contains a gift</small>
          </span>
        </div>
        <Link to="/payments"> Continue to checkout </Link>
      </section>
    </Layout>
  );
}
export default Cart;
