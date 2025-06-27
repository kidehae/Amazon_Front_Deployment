// import React, { Children, useContext, useEffect } from "react";
// import { DataContext } from "./Dataprovider/DataProvider";

// const ProtectedRoutes = ({ childern, msg, redirect }) => {
//   const [{ user }, dispatch] = useContext(DataContext);

//   useEffect(() => {
//     if (!user) {
//       Navigate("/auth", { state: (msg, redirect) });
//     }
//   }, [user]);
//   //   return Children;
// };

// export default ProtectedRoutes;

import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "./Dataprovider/DataProvider";

const ProtectedRoutes = ({ children, msg, redirect }) => {
  const [state, dispatch] = useContext(DataContext);
  const user = state.user;

  if (!user) {
    return <Navigate to="/Auth" state={{ msg, redirect }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
