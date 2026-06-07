import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function GiftBox() {
  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    recipientAddress: '',
    giftMessage: '',
    boxType: 'Signature Assortment'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending Gift:', formData);
    alert('Gift details submitted! We will handle the rest.');
  };

  return (
    <section className="min-h-screen bg-white pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-12">
        <h1 className="text-5xl font-black text-[#4a3728] mb-6 tracking-tighter">Send a Gift of Love</h1>
        <p className="text-[#4a3728] opacity-90 mb-10 text-lg">
          Share the magic of AnisManis. Select your favorite box, provide the details below, and we will personally hand-deliver your message and treats to your favorite person.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#f5e6e0] p-8 md:p-12 rounded-[40px] border-4 border-[#4a3728] shadow-[8px_8px_0px_0px_rgba(74,55,40,1)]">
          
          {/* Box Selection */}
          <div>
            <label className="block font-bold text-[#4a3728] mb-2">Select Gift Box</label>
            <select name="boxType" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-[#4a3728] bg-white text-[#4a3728] font-medium">
              <option>Signature Assortment</option>
              <option>Festive Cookie Jar</option>
              <option>Pastry Architecture Box</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-[#4a3728] mb-2">Your Name</label>
              <input type="text" name="senderName" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-[#4a3728]" placeholder="Who is it from?" />
            </div>
            <div>
              <label className="block font-bold text-[#4a3728] mb-2">Recipient Name</label>
              <input type="text" name="recipientName" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-[#4a3728]" placeholder="Who is it for?" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#4a3728] mb-2">Recipient Address</label>
            <textarea name="recipientAddress" required onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-[#4a3728] h-24" placeholder="Where should we deliver?" />
          </div>

          <div>
            <label className="block font-bold text-[#4a3728] mb-2">Personal Message</label>
            <textarea name="giftMessage" onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-[#4a3728] h-32" placeholder="Write a note to go with the gift..." />
          </div>

          <button type="submit" className="w-full py-5 bg-[#d87a7a] text-white font-black text-xl rounded-2xl hover:bg-[#4a3728] transition-all">
            Send Surprise!
          </button>
        </form>
      </div>
    </section>
  );
}

export default GiftBox;