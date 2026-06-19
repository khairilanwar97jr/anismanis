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
import PaymentSuccess from './pages/PaymentSuccess';
import PackageDetail from './pages/PackageDetail'; // Import the new PackageDetail component

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
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/package/:packageName" element={<PackageDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
