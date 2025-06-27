// import React from "react";
// import Header from "./componenets/Header/Header";
// import Carousel from "./componenets/Carousel/Carousel";
// import Catagory from "./componenets/catagory/Catagory";
// import Product from "./componenets/Product/Product";

// function App() {
//   return (
//     <>
//       <Header />
//       <Carousel />
//       <Catagory />
//       <Product />
//     </>
//   );
// }

// export default App;

import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./componenets/Dataprovider/DataProvider";
import { Type } from "./utility/actiontype";
import { auth } from "./utility/firebase";

export default function App() {
  const [user, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <>
      <Routing />
    </>
  );
}
