import React from "react";
import { PuffLoader } from "react-spinners";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "centre",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <PuffLoader color="#dd8f43" />
    </div>
  );
}

export default Loading;
