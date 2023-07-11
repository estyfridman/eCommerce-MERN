
import './App.css';
import axios from 'axios';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Products from './pages/products'
import Cart from './pages/cart'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Newproduct from './pages/newproduct';
import Logout from './pages/logout';




axios.defaults.baseURL = 'http://localhost:8040';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='app'>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newproduct" element={<Newproduct />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
