import React from 'react';

export default function Hero({ activeTab, setActiveTab, onCravingClick }) {
  const popularCravings = [
    { label: '🕯️ Candlelight Dinner', query: 'Dinner & Celebrations' },
    { label: '🎂 Birthday Party Meal', query: 'Dinner & Celebrations' },
    { label: '🍗 Butter Chicken', query: 'North Indian' },
    { label: '🍕 Cheese Pizza', query: 'Italian' },
    { label: '🍲 Hyderabadi Biryani', query: 'Biryani' },
    { label: '🍰 Chocolate Cakes', query: 'Desserts' },
    { label: '🥤 Cold Coffee & Shakes', query: 'Beverages' }
  ];


  return (
    <section className="hero-section">

      {/* Top Scrolling Deal Marquee */}
      <div className="hero-deal-marquee">
        <div className="marquee-content">
          <span>🔥 <strong>FLASH SALE:</strong> 50% OFF up to ₹100 using code <code>ZOMATO50</code></span>
          <span className="marquee-divider">•</span>
          <span>⚡ <strong>SUPERFAST DELIVERY:</strong> Hot & Fresh within 20-30 Mins</span>
          <span className="marquee-divider">•</span>
          <span>🎁 <strong>FREE DELIVERY:</strong> On all orders above ₹299 with code <code>FREEDEL</code></span>
          <span className="marquee-divider">•</span>
          <span>⭐ <strong>100% QUALITY GUARANTEE:</strong> Top rated hygienic kitchens</span>
          <span className="marquee-divider">•</span>
          <span>🔥 <strong>FLASH SALE:</strong> 50% OFF up to ₹100 using code <code>ZOMATO50</code></span>
        </div>
      </div>

      <div className="hero-overlay">
        <div className="hero-badge-pill">
          <span className="live-dot"></span> Over 10,000+ Craving Items Available Right Now!
        </div>

        <h1 className="hero-title animate-fade-in">
          Craving Something <span className="text-highlight">Delicious?</span>
        </h1>
        <p className="hero-subtitle animate-fade-in">
          Savor sizzling gourmet dishes, authentic local street eats, and heavenly desserts delivered burning hot to your doorstep.
        </p>

        {/* Popular Craving Quick Pills */}
        <div className="hero-cravings-list">
          <span className="cravings-label">🔥 Quick Craving Picks:</span>
          {popularCravings.map((item, idx) => (
            <button
              key={idx}
              className="craving-pill-btn"
              onClick={() => onCravingClick && onCravingClick(item.query)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab System (Delivery, Dining Out, Nightlife) */}
        <div className="tab-container animate-fade-in">
          <button
            className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            Delivery
          </button>
          
          <button
            className={`tab-btn ${activeTab === 'dining' ? 'active' : ''}`}
            onClick={() => setActiveTab('dining')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Dining Out
          </button>
          
          <button
            className={`tab-btn ${activeTab === 'nightlife' ? 'active' : ''}`}
            onClick={() => setActiveTab('nightlife')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2-4-3.5c-.5 1.5-2 2-4 3.5S5 13 5 15a7 7 0 0 0 7 7z"></path>
            </svg>
            Nightlife
          </button>
        </div>
      </div>
    </section>
  );
}

