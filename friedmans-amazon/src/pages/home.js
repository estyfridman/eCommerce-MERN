import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Products from "./products";
import { HomePageReducer, initState } from "../Reduser/HomePageReducer";
import { GET_SUCCESS, GET_FAIL } from "../Reduser/Actions";
import Loading from "../components/Loading/Loading";
import MessageBox from "../components/MessageBox/MessageBox";

export default function Home() {

  const [{loading, error, products}, dispatch] = useReducer(HomePageReducer, initState);

    useEffect(() => {
      axios
      .get("/products")
      .then((res) => {
        dispatch({ type: GET_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: GET_FAIL, payload: error.message });
      });
      },[]);

    return (
        <>
        <h1>Welcome</h1>
        
        <div className="products">
          {loading ? (<Loading/>) 
          : error? ( <MessageBox variant="danger">{error}</MessageBox>) 
          : (<Products products={products}></Products>)}
          
          </div>
        </>
    );
};