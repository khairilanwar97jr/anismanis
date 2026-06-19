import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 1. Import the providers
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';

import HomePage from './pages/HomePage';
import Provisions from './pages/Provisions';
import ProductDetail from './pages/ProductDetail';
import CheckoutSummary from './pages/CheckoutSummary';
import OurStoryPage from './pages/OurStoryPage';
import GiftBox from './pages/GiftBox';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import PackageDetail from './pages/PackageDetail';
import BookingForm from './pages/BookingForm';
import BookingSummary from './pages/BookingSummary';

function App() {
  return (
    // 2. Wrap everything in the Providers
    <CartProvider>
      <BookingProvider>
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
            <Route path="/package/:packageName/booking" element={<BookingForm />} />
            <Route path="/package/:packageName/summary" element={<BookingSummary />} />
          </Routes>
        </Router>
      </BookingProvider>
    </CartProvider>
  );
}

export default App;
