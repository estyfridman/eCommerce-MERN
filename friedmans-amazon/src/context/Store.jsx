import { createContext } from "react";
import { useReducer } from "react";
import { storeReducer } from "../Reduser/StoreReducer";

export const Store = createContext();

const initState = {
  cart: {
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initState);
    const body = {state, dispatch};

    return (
    <Store.Provider value={body}>{children}</Store.Provider>
    );
}
