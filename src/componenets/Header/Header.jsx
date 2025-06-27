import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import Amazon from "../../assets/images/nav_log.png";
import USAFlag from "../../assets/images/usa_flag.png";
import LowerHeader from "./LowerHeader";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { DataContext } from "../Dataprovider/DataProvider";
import { auth } from "../../utility/firebase";

function Header() {
  const [state, dispatch] = useContext(DataContext);
  const user = state?.user; // Access user from state
  const totalItem = state.basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <>
      <section className={classes.fixed}>
        <section className="">
          <section className={classes.header__container}>
            <div className={classes.logo__container}>
              {/* logo */}
              <Link to="/">
                <img src={Amazon} alt="Amazon logo" />
              </Link>
              <div className={classes.delivery}>
                {/* delivery */}
                <span>
                  <IoLocationOutline />
                </span>
                <div>
                  <p>Deliver to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            <div className={classes.search}>
              {/* search */}
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" name="" is="" placeholder="Search product" />
              <FaSearch />
            </div>
            <div className={classes.order__container}>
              <Link to="" className={classes.language}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCqp0PmwFtZEpjeDal112PkqbQjmzYlXI-5A&s"
                  alt="American flag"
                />
                <section>
                  <option value="">EN</option>
                </section>
              </Link>

              {/* Three componenets */}
              <Link to={!user && "/Auth"}>
                <div>
                  {user ? (
                    <>
                      <p> Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={() => auth.signOut()}> Sign out </span>
                    </>
                  ) : (
                    <>
                      <p> Hello, Sign In</p>
                      <span>Account & Lists </span>
                    </>
                  )}
                </div>
              </Link>
              {/* orders */}
              <Link to="/Orders">
                <p>returns</p>
                <span>& Orders</span>
              </Link>
            </div>
            {/* cart */}
            {/* <a to={"/cart"}> */}
            <Link to="/Cart" className={classes.cart}>
              <CgShoppingCart size={35} />
              <span> {totalItem} </span>
            </Link>
          </section>
        </section>
        <LowerHeader />
      </section>
    </>
  );
}

export default Header;
