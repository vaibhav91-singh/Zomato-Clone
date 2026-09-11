import React from 'react';

export default function RestaurantCard({ restaurant, onClick }) {
  const {
    id,
    name,
    cuisines = [],
    rating,
    deliveryTime,
    deliveryFee,
    costForTwo,
    imageUrl,
    featured,
    ratingCount
  } = restaurant;

  const isRatingHigh = rating >= 4.6;
  // Calculate dynamic popularity proof
  const orderCountText = ratingCount ? `${ratingCount * 2}+` : '1.2k+';

  return (
    <div className="restaurant-card animate-fade-in" onClick={onClick}>
      <div className="card-img-wrapper">
        <img
          src={imageUrl}
          alt={name}
          className="card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
          }}
        />
        
        {featured ? (
          <span className="card-badge-featured">💎 Premium</span>
        ) : (
          <span className="card-badge-offer">🔥 50% OFF</span>
        )}

        <span className="card-time-tag">⚡ {deliveryTime} mins</span>
        
        {/* Bottom image gradient overlay deal ticker */}
        <div className="card-img-deal-strip">
          <span className="deal-sparkle">✨</span> 50% OFF up to ₹100 | Code ZOMATO50
        </div>
      </div>
      
      <div className="card-info">
        <div className="card-meta-row">
          <h3 className="card-title">{name}</h3>
          <div className={`rating-badge ${isRatingHigh ? '' : 'yellow'}`}>
            <span>{rating}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        </div>
        
        <p className="card-cuisines">{cuisines.join(', ')}</p>
        
        <div className="card-social-proof">
          <span className="proof-icon">🔥</span> {orderCountText} recent foodies ordered from here
        </div>

        <div className="card-divider"></div>
        
        <div className="card-bottom-row">
          <div>
            Delivery: <span className="highlight-green">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
          </div>
          <div>
            Cost: <span>₹{costForTwo} for two</span>
          </div>
        </div>

        <div className="card-explore-btn">
          <span>Explore Delicious Menu</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

