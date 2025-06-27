import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import Amazon from "../../assets/images/amazon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../utility/firebase";
import { ClipLoader } from "react-spinners";

import { DataContext } from "../../componenets/Dataprovider/DataProvider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Type } from "../../utility/actiontype";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState({
    signin: false,
    signup: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  {
    console.log(user);
  }

  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "signin") {
      setIsLoading({ ...isLoading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setIsLoading({ ...isLoading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading({ ...isLoading, signin: false });
        });
    } else {
      setIsLoading({ ...isLoading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setIsLoading({ ...isLoading, signup: false });
          navigate("/");
        })

        .catch((err) => {
          setError(err.message);
          setIsLoading({ ...isLoading, signup: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      <Link>
        <img src={Amazon} />
      </Link>

      <div className={classes.login__container}>
        <h1> Sign In </h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={authHandler} name="signin">
            {isLoading.signin ? <ClipLoader color="#f8f3f3" /> : "Sign in"}
          </button>
        </form>
        <p className={classes.policy}>
          {" "}
          By continuing, you agree to fake Amazon clone's Conditions of Use and
          Privacy Notice.
        </p>

        <button type="submit" onClick={authHandler} name="signup">
          {isLoading.signup ? (
            <ClipLoader color="#f8f3f3" />
          ) : (
            " Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ color: "red", fontSize: "14px", padding: "5px" }}>
            {" "}
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Signup;
