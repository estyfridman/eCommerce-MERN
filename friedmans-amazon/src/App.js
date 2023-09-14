import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Newproduct from "./pages/newproduct";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentPage from "./pages/PaymentPage";
import Account from "./pages/Account";
import ProductInfo from "./pages/productInfo";
import OrderPage from "./pages/OrderPage";
import SubmitOrderPage from './pages/SubmitOrderPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { Store } from "./context/Store";
import { Container } from "react-bootstrap";
import Nav from "./components/uiitems/Nav/Nav";
import SearchPage from "./pages/SearchPage";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage minWidth">
        <ToastContainer
          position="top-center"
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Nav cart={cart}/>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:token" element={<ProductInfo />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/newproduct" element={<Newproduct />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/placeorder" element={<SubmitOrderPage />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;


