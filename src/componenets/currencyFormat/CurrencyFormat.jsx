import React from "react";
import numeral from "numeral";

const currencyFormat = ({ amount }) => {
  const formattedAmount = numeral(amount).format("$0, 0.0");
  return <div>{formattedAmount}</div>;
};

export default currencyFormat;
