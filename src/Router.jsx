import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Auth/Signup";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoutes from "./componenets/ProtectedRoutes";

const stripePromise = loadStripe(
  "pk_test_51RVLNOF5BV9uovddFeUdSImovJta20XdyjyYlzZBadU6MWNclhDsoBaMUQFzPwv3ZsegU4cHA0uB9BXCdBsaNRg100HGT4jH1x"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Auth",
    element: <Signup />,
  },
  {
    path: "/Payments",
    element: (
      <ProtectedRoutes msg={"You must login to pay"} redirect={"/Payments"}>
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/Orders",
    element: (
      <ProtectedRoutes
        msg={"You must log in to see your orders"}
        redirect={"/Orders"}
      >
        <Orders />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/Cart",
    element: <Cart />,
  },
  {
    path: "/category/:categoryName",
    element: <Results />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
