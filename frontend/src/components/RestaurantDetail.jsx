import React, { useState, useEffect } from 'react';
import ApiClient from '../services/api';

export default function RestaurantDetail({
  restaurantId,
  cartItems = [],
  onAddToCart,
  onRemoveFromCart,
  onBackClick
}) {
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  // Fetch single restaurant details
  useEffect(() => {
    ApiClient.get(`/api/restaurants/${restaurantId}`)
      .then(data => {
        setRestaurant(data);
        if (data.categories && data.categories.length > 0) {
          setActiveCategory(data.categories[0].name);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('[RESTAURANT DETAIL FETCH ERROR]:', err);
        setLoading(false);
      });
  }, [restaurantId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      setReviewError('Please fill out all fields.');
      return;
    }

    setReviewError('');
    setReviewSuccess('');

    ApiClient.post(`/api/restaurants/${restaurantId}/reviews`, {
      userName: reviewName,
      rating: reviewRating,
      comment: reviewComment
    })
      .then(data => {
        setReviewSuccess('Thank you! Your review has been added.');
        setReviewName('');
        setReviewComment('');
        setReviewRating(5);

        return ApiClient.get(`/api/restaurants/${restaurantId}`);
      })
      .then(data => {
        setRestaurant(data);
      })
      .catch(err => {
        console.error('[REVIEW SUBMIT ERROR]:', err);
        setReviewError(err.message || 'Error submitting review. Please try again.');
      });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveCategory(id);
    }
  };

  if (loading) {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '15px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255,255,255,0.1)',
          borderTopColor: '#E23744',
          borderRadius: '50%',
          animation: 'progressGlow 1s linear infinite'
        }}></div>
        <p style={{ color: '#9CA3AF' }}>Loading restaurant delicacies...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Restaurant not found</h2>
        <button className="back-btn" onClick={onBackClick}>Go Back Home</button>
      </div>
    );
  }

  const {
    name,
    cuisines = [],
    rating,
    ratingCount,
    deliveryTime,
    deliveryFee,
    costForTwo,
    imageUrl,
    address,
    phone,
    categories = [],
    reviewsList = []
  } = restaurant;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Back button */}
      <button className="back-btn" onClick={onBackClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Restaurants
      </button>

      {/* Real-Restaurant Storefront Hero */}
      <div className="detail-hero">
        <div className="detail-hero-banner-wrapper">
          <img
            src={imageUrl}
            alt={name}
            className="detail-hero-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="detail-hero-gradient-overlay"></div>

          <div className="detail-hero-status-strip">
            <span className="live-status-badge">
              <span className="pulse-green-dot"></span> OPEN NOW (10:00 AM - 11:30 PM)
            </span>
            <span className="hygiene-badge">
              🛡️ 100% Hygienic Kitchen Certified
            </span>
          </div>
        </div>

        <div className="detail-hero-body">
          <div className="detail-title-row">
            <div>
              <h1 className="detail-title">{name}</h1>
              <div className="detail-cuisine-list">
                {cuisines.map((c, i) => (
                  <span key={i} className="cuisine-tag">{c}</span>
                ))}
              </div>
            </div>

            {/* Real Rating Card Box */}
            <div className="detail-rating-card-box">
              <div className="rating-badge-large flex-center">
                <span>{rating}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="detail-rating-reviews">{ratingCount}+ Foodie Ratings</div>
              <div className="detail-rating-sub">Delighted Customers</div>
            </div>
          </div>

          {/* Restaurant Key Highlights Strip */}
          <div className="detail-highlights-strip">
            <div className="highlight-item">
              <span className="highlight-icon">⚡</span>
              <div>
                <div className="highlight-title">{deliveryTime} Mins</div>
                <div className="highlight-sub">Delivery Time</div>
              </div>
            </div>

            <div className="highlight-divider"></div>

            <div className="highlight-item">
              <span className="highlight-icon">💰</span>
              <div>
                <div className="highlight-title">₹{costForTwo}</div>
                <div className="highlight-sub">Cost for Two</div>
              </div>
            </div>

            <div className="highlight-divider"></div>

            <div className="highlight-item">
              <span className="highlight-icon">📍</span>
              <div>
                <div className="highlight-title">{address.split(',')[0]}</div>
                <div className="highlight-sub">{address}</div>
              </div>
            </div>

            <div className="highlight-divider"></div>

            <div className="highlight-item">
              <span className="highlight-icon">📞</span>
              <div>
                <div className="highlight-title">{phone}</div>
                <div className="highlight-sub">Direct Call</div>
              </div>
            </div>
          </div>

          {/* Active Deals & Coupons Banner inside Restaurant */}
          <div className="detail-offers-marquee">
            <div className="offer-pill-card">
              <span className="offer-icon">🔥</span>
              <div>
                <div className="offer-code-title">50% OFF up to ₹100</div>
                <div className="offer-code-sub">Use code <strong>ZOMATO50</strong> | Above ₹199</div>
              </div>
            </div>

            <div className="offer-pill-card">
              <span className="offer-icon">🎁</span>
              <div>
                <div className="offer-code-title">FREE DELIVERY</div>
                <div className="offer-code-sub">Use code <strong>FREEDEL</strong> | On all orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Detail Tabs */}
      <div className="detail-tabs">
        <button
          className={`detail-tab ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Order Online
        </button>
        <button
          className={`detail-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviewsList.length})
        </button>
      </div>

      {/* TAB CONTENT: ORDER ONLINE (MENU) */}
      {activeTab === 'menu' && (
        <div className="menu-section-layout">
          {/* Sidebar */}
          <aside className="menu-sidebar">
            <h3 className="menu-sidebar-title">Categories</h3>
            <ul className="menu-sidebar-list">
              <li
                className={`menu-sidebar-item ${activeCategory === 'ALL' || !activeCategory ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('ALL');
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
              >
                🌟 All Categories
              </li>
              {categories.map((cat, i) => (
                <li
                  key={i}
                  className={`menu-sidebar-item ${activeCategory === cat.name ? 'active' : ''}`}
                  onClick={() => scrollToSection(cat.name)}
                >
                  {cat.name} ({cat.items ? cat.items.length : 0})
                </li>
              ))}
            </ul>
          </aside>

          {/* Menu Items Content */}
          <div className="menu-content">
            {categories && categories.length > 0 ? (
              categories.map((cat, catIdx) => (
                <div key={catIdx} id={cat.name} className="category-group">
                  <h2 className="category-title">
                    {cat.name} <span className="cat-count-badge">{cat.items ? cat.items.length : 0} items</span>
                  </h2>
                  <div>
                    {cat.items && cat.items.map((item, itemIdx) => {
                      const cartMatch = cartItems.find(c => c.id === item.id);
                      const quantity = cartMatch ? cartMatch.quantity : 0;
                      
                      // Craving tags logic
                      const isSpicy = item.name.toLowerCase().includes('masala') || item.name.toLowerCase().includes('spicy') || item.name.toLowerCase().includes('kadhai') || item.name.toLowerCase().includes('chilli');
                      const isCheesy = item.name.toLowerCase().includes('paneer') || item.name.toLowerCase().includes('cheese') || item.name.toLowerCase().includes('pizza');
                      const isChefSpecial = itemIdx % 4 === 0;
                      const isMustTry = itemIdx % 3 === 1;

                      return (
                        <div key={itemIdx} className="menu-item-tile">
                          <div className="menu-item-info">
                            <div className="item-tag-row">
                              <span className={`veg-nonveg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                              {isChefSpecial && <span className="dish-tag chef">👑 Chef's Special</span>}
                              {isMustTry && <span className="dish-tag must-try">🔥 Must Try</span>}
                              {isSpicy && <span className="dish-tag spicy">🌶️ Spicy</span>}
                              {isCheesy && <span className="dish-tag cheesy">🧀 Cheese Lovers</span>}
                            </div>
                            
                            <div className="menu-item-meta">
                              <h4 className="menu-item-name">{item.name}</h4>
                            </div>

                            <div className="menu-item-price-row">
                              <span className="menu-item-price">₹{item.price}</span>
                              <span className="dish-order-count">🔥 140+ ordered today</span>
                            </div>
                            <p className="menu-item-description">{item.description}</p>
                          </div>

                          <div className="menu-item-actions">
                            <div className="menu-item-img-wrapper">
                              <img
                                src={item.imageUrl || item.image}
                                alt={item.name}
                                className="menu-item-img"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
                                }}
                              />
                            </div>

                            {quantity === 0 ? (
                              <button
                                className="add-control-btn craving-add-btn"
                                onClick={() => onAddToCart(item)}
                              >
                                ADD +
                              </button>
                            ) : (
                              <div className="qty-counter active">
                                <button
                                  className="qty-btn"
                                  onClick={() => onRemoveFromCart(item.id)}
                                >
                                  -
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button
                                  className="qty-btn"
                                  onClick={() => onAddToCart(item)}
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : restaurant.dishes && restaurant.dishes.length > 0 ? (
              <div className="category-group">
                <h2 className="category-title">All Signature Dishes</h2>
                {restaurant.dishes.map((item, itemIdx) => {
                  const cartMatch = cartItems.find(c => c.id === item.id);
                  const quantity = cartMatch ? cartMatch.quantity : 0;
                  const isSpicy = item.name.toLowerCase().includes('masala') || item.name.toLowerCase().includes('spicy');
                  const isCheesy = item.name.toLowerCase().includes('paneer') || item.name.toLowerCase().includes('cheese');

                  return (
                    <div key={itemIdx} className="menu-item-tile">
                      <div className="menu-item-info">
                        <div className="item-tag-row">
                          <span className={`veg-nonveg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                          {itemIdx % 3 === 0 && <span className="dish-tag chef">👑 Chef's Special</span>}
                          {isSpicy && <span className="dish-tag spicy">🌶️ Spicy</span>}
                          {isCheesy && <span className="dish-tag cheesy">🧀 Cheese Lovers</span>}
                        </div>
                        
                        <div className="menu-item-meta">
                          <h4 className="menu-item-name">{item.name}</h4>
                        </div>

                        <div className="menu-item-price-row">
                          <span className="menu-item-price">₹{item.price}</span>
                          <span className="dish-order-count">🔥 120+ ordered today</span>
                        </div>
                        <p className="menu-item-description">{item.description}</p>
                      </div>

                      <div className="menu-item-actions">
                        <div className="menu-item-img-wrapper">
                          <img
                            src={item.image || item.imageUrl}
                            alt={item.name}
                            className="menu-item-img"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
                            }}
                          />
                        </div>

                        {quantity === 0 ? (
                          <button
                            className="add-control-btn craving-add-btn"
                            onClick={() => onAddToCart(item)}
                          >
                            ADD +
                          </button>
                        ) : (
                          <div className="qty-counter active">
                            <button
                              className="qty-btn"
                              onClick={() => onRemoveFromCart(item.id)}
                            >
                              -
                            </button>
                            <span className="qty-value">{quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => onAddToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* TAB CONTENT: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="reviews-section">
          {/* Reviews List */}
          <div className="review-list">
            <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>What customers say</h3>
            {reviewsList.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>No reviews yet for this restaurant. Be the first to add one!</p>
            ) : (
              reviewsList.map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-header">
                    <div>
                      <span className="review-user-name">{rev.userName}</span>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <svg
                            key={sIdx}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={sIdx < rev.rating ? '#FFC043' : 'none'}
                            stroke={sIdx < rev.rating ? '#FFC043' : '#6B7280'}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="review-date">{rev.date}</span>
                  </div>
                  <p className="review-content">{rev.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Sidebar Form */}
          <div className="review-form-panel">
            <h4 className="review-form-title">Write a Review</h4>
            <form onSubmit={handleReviewSubmit}>
              {reviewError && <div style={{ color: '#E23744', fontSize: '13px', marginBottom: '12px' }}>{reviewError}</div>}
              {reviewSuccess && <div style={{ color: '#249B55', fontSize: '13px', marginBottom: '12px' }}>{reviewSuccess}</div>}

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-input"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <div className="stars-selector">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`star-icon-btn ${value <= reviewRating ? 'selected' : ''}`}
                        onClick={() => setReviewRating(value)}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Review Details</label>
                <textarea
                  placeholder="Describe your dining experience, the flavors, and packaging..."
                  className="form-textarea"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
