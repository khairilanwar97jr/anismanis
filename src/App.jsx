import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 1. Import the provider
import { CartProvider } from './context/CartContext'; 

import HomePage from './pages/HomePage';
import Provisions from './pages/Provisions';
import ProductDetail from './pages/ProductDetail';
import CheckoutSummary from './pages/CheckoutSummary';
import OurStoryPage from './pages/OurStoryPage';
import GiftBox from './pages/GiftBox';
import Cart from './pages/Cart';

function App() {
  return (
    // 2. Wrap everything in the Provider
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/gift-box" element={<GiftBox />} />
          <Route path="/provisions" element={<Provisions />} />
          <Route path="/provisions/:id" element={<ProductDetail />} />
          <Route path="/checkout-summary" element={<CheckoutSummary />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;