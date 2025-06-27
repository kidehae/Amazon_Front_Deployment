// // import React, { useContext, useEffect, useState } from "react";
// // import Layout from "../../componenets/Layout/Layout";
// // import Classes from "./Orders.module.css";
// // import { db } from "../../utility/firebase";
// // import { DataContext } from "../../componenets/Dataprovider/DataProvider";

// // function Orders() {
// //   const [{ user }, dispatch] = useContext(DataContext);
// //   const [orders, setOrders] = useState([]);
// //   useEffect(() => {
// //     if (user) {
// //       db.collection("users")
// //         .doc(user.uid)
// //         .collection("orders")
// //         .orderby("created", "desc")
// //         .onSnapshot((snapshot) => {
// //           console.log(snapshot);
// //           setOrders(snapshot.docs.map((doc)=>({
// //             id: doc.id,
// //             data: doc:data()
// //           }));
// //         });
// //     } else {
// //       setOrders([]);
// //     }
// //   }, []);
// //   return (
// //     <Layout>
// //       <section className={Classes.container}>
// //         <div className={Classes.Orders__container}>
// //           {" "}
// //           <h2> Your Orders</h2>
// //           <div></div>
// //         </div>
// //       </section>
// //     </Layout>
// //   );
// // }

// // export default Orders;

// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../../componenets/Layout/Layout";
// import Classes from "./Orders.module.css";
// import { db } from "../../utility/firebase";
// import { DataContext } from "../../componenets/Dataprovider/DataProvider";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";
// import ProductCard from "../../componenets/product/ProductCard";

// function Orders() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user?.uid) {
//       setOrders([]);
//       return;
//     }

//     const ordersRef = collection(db, "users", user.uid, "orders");
//     const q = query(ordersRef, orderBy("created", "desc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const ordersData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         data: doc.data(),
//       }));
//       setOrders(ordersData);
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, [user?.uid]); // Only re-run if user.uid changes

//   return (
//     <Layout>
//       <section className={Classes.container}>
//         <div className={Classes.Orders__container}>
//           <h2>Your Orders</h2>
//           <div>
//             {orders?.map((eachorder, i) => {
//               return (
//                 <div key={i}>
//                   <hr />
//                   <p> Order ID: {eachorder?.id}</p>
//                   {eachorder?.data?.basket?.map((order) => {
//                     <ProductCard flex={true} product={order} key={order.id} />;
//                   })}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Orders;
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../componenets/Layout/Layout";
import Classes from "./Orders.module.css";
import { db } from "../../utility/firebase";
import { DataContext } from "../../componenets/Dataprovider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../componenets/product/ProductCard";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <Layout>
      <section className={Classes.container}>
        <div className={Classes.Orders__container}>
          <h2>Your Orders</h2>
          <div>
            {orders.length > 0 ? (
              orders.map((eachorder) => (
                <div key={eachorder.id}>
                  <hr />
                  <p>Order ID: {eachorder.id}</p>
                  <div className={Classes.products__container}>
                    {eachorder.data.basket?.map((product) => (
                      <ProductCard
                        flex={true}
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
