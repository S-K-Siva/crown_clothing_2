import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";
import NavigationComponent from "./components/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.components";
import { Shop } from "./routes/shop/shop.component";
import { CheckOutPage } from "./routes/checkout/checkout.component";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "./store/user/user.action";
const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    },[dispatch]);

  return <Routes>
    <Route path="/" element={<NavigationComponent />}>
      <Route index element={<Home />} />
      <Route path="/shop/*" element={<Shop />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/checkout" element={<CheckOutPage />} />
    </Route>
  </Routes>
};

export default App;