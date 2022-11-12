//import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import {onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth} from "./utils/firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentUser } from "./store/userReducer/user-action";
import { checkUserSession } from "./store/userReducer/user-action";

const App = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(checkUserSession());
   }, []);
  // useEffect(() => {
  //   const check = async () => {
  //     const unsubscribe = await onAuthStateChangedListener((user) => {
  //       if (user) {
  //         createUserDocumentFromAuth(user);
  //       }
  //       dispatch(setCurrentUser(user));
  //     });
  //     return unsubscribe;
  //   };
  //   check();
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
