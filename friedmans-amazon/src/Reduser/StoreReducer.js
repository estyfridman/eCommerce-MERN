import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  USER_SIGNIN,
  USER_SIGNOUT,
} from "./Actions";

export const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const newItem = payload;
      const existingItem = state.cart.cartItem.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existingItem
        ? state.cart.cartItem.map((item) =>
            item.id === existingItem.id ? newItem : item
          )
        : [...state.cart.cartItem, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case REMOVE_FROM_CART: {
      const cartItems = state.cart.cartItem.filter(
        (item) => item._id !== payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case CLEAR_CART: {
      localStorage.removeItem("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }
    case USER_SIGNIN: {
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return {
        ...state,
        userInfo: payload,
      };
    }
    case USER_SIGNOUT: {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem('cartItems');
      localStorage.removeItem("paymentMethod");
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    }
    case SAVE_SHIPPING_ADDRESS: {
        localStorage.setItem("shippingAddress", JSON.stringify(payload));
        return { ...state, cart: { ...state.cart, shippingAddress: payload }};
    }
    case SAVE_PAYMENT_METHOD: {
        localStorage.setItem("paymentMethos", JSON.stringify(payload));
        return { ...state, cart: { ...state.cart, paymentMethos: payload }};
    }
    default:
      return state;
  }
};
