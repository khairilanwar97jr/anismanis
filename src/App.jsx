import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Provisions from './pages/Provisions'; // Make sure this file exists in /pages
import ProductDetail from './pages/ProductDetail'; // Make sure this file exists in /pages
// In App.jsx
import CheckoutSummary from './pages/CheckoutSummary';
import OurStoryPage from './pages/OurStoryPage';
import GiftBox from './pages/GiftBox'; //

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/gift-box" element={<GiftBox />} />
        <Route path="/provisions" element={<Provisions />} />
        {/* In App.jsx */}
        <Route path="/provisions/:id" element={<ProductDetail />} />
        <Route path="/checkout-summary" element={<CheckoutSummary />} />
      </Routes>
    </Router>
  );
}

export default App;