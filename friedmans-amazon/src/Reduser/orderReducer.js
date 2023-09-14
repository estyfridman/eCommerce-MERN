import {GET_SUCCESS, GET_FAIL, GET_REQUEST,} from "./Actions";


export const initStateOrder = {
    loading: true,
    error: "",
    order: null,
};

export default function orderReducer(state, { type, payload }) {
    switch (type) {
      case GET_REQUEST:
        return { ...state, loading: true, error: '' };
      case GET_SUCCESS:
        return { ...state, loading: false, order: payload, error: '' };
      case GET_FAIL:
        return { ...state, loading: false, error: payload };
  
      default:
        return state;
    }
  };
  