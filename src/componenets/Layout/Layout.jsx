import React from "react";
import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <div>
      <Header /> {/* Header at the top */}
      <main>{children}</main> {/* Content below the header */}
    </div>
  );
}

export default Layout;
