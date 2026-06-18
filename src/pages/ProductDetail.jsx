import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { apiFetch } from '../api';

const ProductDetail = () => {
  const { addToCart, items, updateItem } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const editIndex = location.state?.editIndex;
  const isEditing = editIndex !== undefined;
  const returnToCartState = location.state?.returnToCartState;

  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState([]);
  const [selectedAddonId, setSelectedAddonId] = useState('');
  const [giftNote, setGiftNote] = useState('');

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const res = await apiFetch('/api/addons');
        const data = await res.json();
        setAddons(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddons();
  }, []);


  // FETCH PRODUCT FROM API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiFetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // PREFILL WHEN EDITING CART ITEM
  useEffect(() => {
    if (isEditing && items[editIndex]) {
      const item = items[editIndex];
      setQuantity(item.quantity);
      setSelectedAddonId(item.addOns?.[0]?.id ? String(item.addOns[0].id) : '');
      setGiftNote(item.giftNote || '');
    }
  }, [isEditing, editIndex, items]);

  const handleProceed = () => {

    const selectedAddon = addons.find(a => String(a.id) === selectedAddonId);
    const productData = {
      product_id: product.id,
      productName: product.name,
      price: Number(product.price),
      quantity,
      image_url: product.image_url,
      addOns: selectedAddon ? [{ ...selectedAddon, quantity }] : [],
      giftNote
    };

    if (isEditing) {
      updateItem(editIndex, productData);
    } else {
      addToCart(productData);
    }

    navigate('/cart', { state: returnToCartState });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#4a3728]">
        <Navbar />
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-16 animate-pulse">
            <div className="aspect-[3/4] bg-[#f9f5f2] border border-[#4a3728]/10" />
            <div className="flex flex-col">
              <div className="h-12 w-3/4 bg-[#f9f5f2] mb-4" />
              <div className="h-8 w-32 bg-[#f9f5f2] mb-8" />
              <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-[#f9f5f2]" />
                <div className="h-4 w-5/6 bg-[#f9f5f2]" />
              </div>
              <div className="h-12 w-full bg-[#f9f5f2] mb-6" />
              <div className="h-12 w-full bg-[#f9f5f2] mb-6" />
              <div className="h-24 w-full bg-[#f9f5f2] mb-6" />
              <div className="h-14 w-full bg-[#4a3728]/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-[#4a3728]">
        <Navbar />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-black uppercase mb-3">Product Not Found</h1>
          <p className="text-sm font-medium opacity-70 mb-8">This item could not be loaded.</p>
          <button
            onClick={() => navigate('/provisions')}
            className="bg-[#4a3728] text-white px-8 py-4 font-black uppercase"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#4a3728]">
      <Navbar />

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">

          {/* IMAGE */}
          <div className="aspect-[3/4] bg-[#f9f5f2] border border-[#4a3728]/10 overflow-hidden">
            <img
              src={product.image_url || "https://via.placeholder.com/400x500"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-black mb-2">{product.name}</h1>

            <p className="text-2xl font-black text-[#d87a7a] mb-6">
              RM {Number(product.price).toFixed(2)}
            </p>

            <p className="text-[#4a3728]/70 mb-8">
              {product.description}
            </p>

            {/* QUANTITY */}
            <div className="mb-6">
              <label className="block font-bold text-xs uppercase mb-2">
                Quantity
              </label>

              {/* Desktop: numeric input */}
              <div className="hidden md:block">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
                  className="border p-3 w-full"
                />
              </div>

              {/* Mobile: explicit +/- controls for better touch UX */}
              <div className="flex items-center gap-3 md:hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, Number(q) - 1))}
                  className="w-12 h-12 bg-[#f9f5f2] border border-[#4a3728]/10 rounded-full flex items-center justify-center text-2xl font-black text-[#4a3728]"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <div className="flex-1 text-center font-black text-lg">{quantity}</div>

                <button
                  type="button"
                  onClick={() => setQuantity(q => Number(q) + 1)}
                  className="w-12 h-12 bg-[#d87a7a] text-white rounded-full flex items-center justify-center text-2xl font-black"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD ONS */}
            <div className="mb-6">
              <label className="block font-bold text-xs uppercase mb-2">
                Add-ons
              </label>
              <select
                value={selectedAddonId}
                onChange={(e) => setSelectedAddonId(e.target.value)}
                className="border p-3 w-full"
              >
                <option value="">No Add-on</option>

                {addons.map((addon) => (
                  <option key={addon.id} value={addon.id}>
                    {addon.name} (+RM {addon.price})
                  </option>
                ))}
              </select>
            </div>

            {/* GIFT NOTE */}
            <div className="mb-6">
              <label className="block font-bold text-xs uppercase mb-2">
                Gift Note
              </label>
              <textarea
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="border p-3 w-full h-24"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleProceed}
              className="w-full bg-[#4a3728] text-white py-4 font-black uppercase"
            >
              {isEditing ? 'Save Changes' : 'Add to Cart'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
