import { toast } from "react-toastify";
import { GET_FAIL, ADD_TO_CART } from "../Reduser/Actions";
import axios from "axios";

export const AddToCartHandler = async (product, cartItems, ctxDispatch) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    try {
        const { data } = await axios.get(`/products/id/${product._id}`);
        if (data.countinstock < quantity) {
            toast.error("Sorry, you don't have enough in stock");
            return;
        }
        ctxDispatch({type: ADD_TO_CART, payload: { ...product, quantity }});
    } catch (error) {
        ctxDispatch({type: GET_FAIL, payload: error.message });
    }
};