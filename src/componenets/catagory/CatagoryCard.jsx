import React from "react";
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.title}`}>
        <span>
          <h2>{data.name}</h2>
        </span>
        <img src={data.image} alt="Item image" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
