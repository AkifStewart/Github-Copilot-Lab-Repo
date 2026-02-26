import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import CartPage from './components/CartPage';
import PromotionPage from './components/PromotionPage';
import AboutPage from './components/AboutPage';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/promotions" element={<PromotionPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </CartProvider>
    );
}

export default App;