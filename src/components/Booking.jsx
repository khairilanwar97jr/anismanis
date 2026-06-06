import React, { useState } from "react";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    service: "cookies-bulk",
    units: "",
    deliveryDate: ""
  });

  return (
    <section className="relative w-full py-20 px-6 bg-white text-left overflow-hidden">
      
{/* BACKGROUND SVG BLOB: Further right and higher up */}
<div className="absolute -top-20 -right-60 md:-top-10 md:-right-80 z-0 opacity-100">
  <svg 
    viewBox="0 0 900 600" 
    width="1000" 
    height="1000" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(383.4231729789896 248.8469344511007)">
      <path d="M87 -110.9C137.2 -83.2 219.4 -90.6 262.3 -61C305.3 -31.4 309.1 35.1 295.6 102C282.1 168.9 251.2 236.1 199.1 270.7C146.9 305.3 73.5 307.1 1 305.8C-71.5 304.4 -143 299.9 -163 254.9C-183 209.8 -151.4 124.4 -130.7 70.3C-110 16.2 -100.2 -6.6 -91.2 -28.2C-82.2 -49.8 -74 -70.2 -58.9 -109.3C-43.9 -148.4 -21.9 -206.2 -1.8 -203.7C18.4 -201.3 36.7 -138.6 87 -110.9" fill="#e5a9a9"></path>
    </g>
  </svg>
</div>

{/* BACKGROUND SVG BLOB: Top Left Position */}
<div className="absolute -top-120 -left-90 z-0 opacity-100">
  <svg 
    viewBox="0 0 900 600" 
    width="800" 
    height="800" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(410.19855513386676 266.85812421285436)">
      <path d="M149.3 -119.5C210.5 -88.2 288.7 -44.1 310.9 22.2C333.1 88.4 299.1 176.8 237.9 221.3C176.8 265.8 88.4 266.4 27.6 238.8C-33.1 211.1 -66.3 155.3 -111.6 110.8C-157 66.3 -214.5 33.1 -232.1 -17.6C-249.7 -68.4 -227.4 -136.7 -182 -168C-136.7 -199.4 -68.4 -193.7 -12.1 -181.5C44.1 -169.4 88.2 -150.8 149.3 -119.5" fill="#e5a9a9"></path>
    </g>
  </svg>
</div>

      {/* CONTENT - High z-index to stay above the blob */}
      <div className="relative max-w-4xl mx-auto z-10">
        <h2 className="text-4xl md:text-6xl font-black text-[#4a3728] mb-8">
          READY TO <span className="text-[#d87a7a]">ORDER?</span>
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 border-4 border-[#d87a7a] rounded-[20px] shadow-xl">
          <form className="space-y-6">
            <div>
              <label className="block text-[#4a3728] font-black uppercase text-sm mb-2">Your Name</label>
              <input 
                type="text" 
                className="w-full p-4 border-2 border-[#d87a7a] rounded-lg bg-white focus:outline-none"
                placeholder="Enter your name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#4a3728] font-black uppercase text-sm mb-2">Service Type</label>
                <select 
                  className="w-full p-4 border-2 border-[#d87a7a] rounded-lg bg-white focus:outline-none"
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="cookies-bulk">Cookies Bulk Order</option>
                  <option value="event">Event</option>
                  <option value="custom-cake">Custom Cake</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#4a3728] font-black uppercase text-sm mb-2">Quantity (Units)</label>
                <input 
                  type="number" 
                  className="w-full p-4 border-2 border-[#d87a7a] rounded-lg bg-white focus:outline-none"
                  placeholder="e.g. 50"
                  onChange={(e) => setFormData({...formData, units: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4a3728] font-black uppercase text-sm mb-2">Delivery Date</label>
              <input 
                type="date" 
                className="w-full p-4 border-2 border-[#d87a7a] rounded-lg bg-white focus:outline-none"
                onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
              />
            </div>
            
            <button 
              type="button"
              className="w-full py-4 bg-[#d87a7a] text-white font-black uppercase tracking-widest hover:bg-[#c66c6c] transition-all rounded-lg"
            >
              Request Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Booking;