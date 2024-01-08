import './App.css'
import Home from './components/pages/Home.jsx';
import Product from './components/pages/Product.jsx';
import Login from './components/pages/Login.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Routes,
  Route
} from "react-router-dom";
import Register from './components/pages/Register.jsx';
import Products from './components/table/Products.jsx';
import ProductUpdate from './components/pages/ProductUpdate.jsx';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<Product />} />
            <Route path="/products/update/:id" element={<ProductUpdate />} />
        </Routes>
      </UserProvider>
    </ Router>
  )
}

export default App
