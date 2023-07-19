import { createContext } from "react";
import { useReducer } from "react";
import { StoreReducer } from "../Reduser/StoreReducer";

export const Store = createContext();

const initState = {
  cart: {
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shipping"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export function StoreProvider({ props }) {
    const [state, dispatch] = useReducer(StoreReducer, initState);
    const body = {state, dispatch};

    return (
    <Store.Provider value={body}>{props.children}</Store.Provider>
    );
}
