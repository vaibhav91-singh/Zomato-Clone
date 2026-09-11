import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RestaurantCard from './components/RestaurantCard';
import RestaurantDetail from './components/RestaurantDetail';
import CartDrawer from './components/CartDrawer';
import OrderTracker from './components/OrderTracker';
import AuthModal from './components/AuthModal';
import WeatherBanner from './components/WeatherBanner';
import ScratchCardModal from './components/ScratchCardModal';
import CravingMatchmakerModal from './components/CravingMatchmakerModal';
import RestaurantOwnerPortal from './components/RestaurantOwnerPortal';
import CustomerSupportModal from './components/CustomerSupportModal';
import CustomerAiChatbot from './components/CustomerAiChatbot';
import VoiceSearchModal from './components/VoiceSearchModal';
import ApiClient from './services/api';
import './styles/ScratchCardModal.css';
import './styles/CravingMatchmakerModal.css';
import './styles/RestaurantOwnerPortal.css';
import './styles/CustomerSupportModal.css';
import './styles/CustomerAiChatbot.css';
import './styles/VoiceSearchModal.css';

export default function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('delivery'); // 'delivery', 'dining', 'nightlife'
  
  // Theme State ('dark' or 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('zomato_theme') || 'dark';
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('zomato_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isOwnerPortalOpen, setIsOwnerPortalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [rewardsList, setRewardsList] = useState([]);

  const handleApplyVoiceSearch = (intent) => {
    if (!intent) return;
    if (intent.searchWord) {
      setSearchQuery(intent.searchWord);
    }
    if (intent.minRating) {
      setRatingFilter(intent.minRating);
    }
    if (intent.isVeg) {
      setSelectedCuisine('Healthy Bowls');
    }
    setSelectedRestaurantId(null);
  };

  // Filtering and Chip states
  const [ratingFilter, setRatingFilter] = useState(null); // e.g. 4.6 for High Rating
  const [featuredFilter, setFeaturedFilter] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Selected Restaurant
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active Order State
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [pendingScratchOrder, setPendingScratchOrder] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Synchronize Theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zomato_theme', theme);
  }, [theme]);

  // Restore JWT Session on App Mount
  useEffect(() => {
    ApiClient.get('/api/auth/me')
      .then(res => {
        if (res.user) {
          setUser(res.user);
          localStorage.setItem('zomato_user', JSON.stringify(res.user));
        }
      })
      .catch(err => {
        // Guest user or session expired
      });
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('zomato_user', JSON.stringify(userData));
    if (userData?.role === 'restaurant_owner') {
      setIsOwnerPortalOpen(true);
    }
  };

  const handleLogout = () => {
    ApiClient.post('/api/auth/logout')
      .catch(err => console.error('[LOGOUT ERROR]:', err));
    setUser(null);
    localStorage.removeItem('zomato_user');
  };

  // Fetch restaurants from backend based on filters
  useEffect(() => {
    setLoading(true);
    let queryParams = [];

    if (searchQuery) {
      queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
    }

    if (ratingFilter) {
      queryParams.push(`minRating=${ratingFilter}`);
    }

    if (featuredFilter) {
      queryParams.push(`featured=true`);
    }

    if (selectedCuisine) {
      queryParams.push(`cuisine=${encodeURIComponent(selectedCuisine)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    ApiClient.get(`/api/restaurants${queryString}`)
      .then(data => {
        setRestaurants(Array.isArray(data) ? data : (data.restaurants || []));
        setLoading(false);
      })
      .catch(err => {
        console.error('[RESTAURANTS FETCH ERROR]:', err);
        setLoading(false);
      });
  }, [searchQuery, ratingFilter, featuredFilter, selectedCuisine]);

  // When searching, automatically navigate back to list view to show search results
  useEffect(() => {
    if (searchQuery && selectedRestaurantId) {
      setSelectedRestaurantId(null);
    }
  }, [searchQuery]);

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const match = prev.find(c => c.id === item.id);
      if (match) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => {
      const match = prev.find(c => c.id === itemId);
      if (!match) return prev;
      if (match.quantity === 1) {
        return prev.filter(c => c.id !== itemId);
      } else {
        return prev.map(c => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c);
      }
    });
  };

  const handleAddComboToCart = (comboItems) => {
    comboItems.forEach(item => {
      handleAddToCart(item);
    });
    setIsCartOpen(true);
  };

  const handlePlaceOrder = (orderData) => {
    setCartItems([]); // Clear cart items
    setIsCartOpen(false); // Close cart panel
    setPendingScratchOrder(orderData); // Trigger post-order Scratch Card Modal first!
  };

  const handleClaimScratchReward = (claimedReward) => {
    if (pendingScratchOrder) {
      setActiveOrderId(pendingScratchOrder.id); // Open Live GPS Tracker!
    }
    setPendingScratchOrder(null);
  };

  const handleOpenRewards = () => {
    const saved = JSON.parse(localStorage.getItem('zomato_rewards') || '[]');
    setRewardsList(saved);
    setIsRewardsOpen(true);
  };

  const handleLogoOrBackClick = () => {
    setSelectedRestaurantId(null);
    setSearchQuery('');
    setRatingFilter(null);
    setFeaturedFilter(false);
    setSelectedCuisine('');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Header */}
      <Header
        cartItems={cartItems}
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoClick={handleLogoOrBackClick}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
        onOpenRewards={handleOpenRewards}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenVoiceSearch={() => setIsVoiceSearchOpen(true)}
      />

      {/* Main Container */}
      <main style={{ flexGrow: 1 }}>
        {selectedRestaurantId ? (
          /* Restaurant Detail View */
          <div style={{ marginTop: '30px' }}>
            <RestaurantDetail
              restaurantId={selectedRestaurantId}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onBackClick={handleLogoOrBackClick}
            />
          </div>
        ) : (
          /* Homepage Listings View */
          <>
            {/* Hero search and navigation banner */}
            <Hero
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onCravingClick={(query) => setSelectedCuisine(query)}
            />

            <div className="container" style={{ paddingBottom: '80px' }}>
              
              {/* Weather Special Ad Banner ("Craving Booster") */}
              <WeatherBanner
                onSelectWeather={(cuisine) => setSelectedCuisine(cuisine)}
              />

              {/* Dynamic Tab Heading */}
              <div className="section-header">
                <h2 className="section-title">
                  {activeTab === 'delivery' && 'Popular Delivery Restaurants'}
                  {activeTab === 'dining' && 'Best Dining Out Spots'}
                  {activeTab === 'nightlife' && 'Sensational Nightlife Venues'}
                </h2>
                <p className="section-subtitle">
                  {activeTab === 'delivery' && 'Superfast delivery, delicious, and carefully packaged.'}
                  {activeTab === 'dining' && 'Premium ambiance, world-class chefs, and table reservations.'}
                  {activeTab === 'nightlife' && 'Sizzling music, custom cocktails, and late-night eats.'}
                </p>
              </div>

              {/* Filter Chips Toolbar */}
              <div className="filter-bar">
                <button
                  className={`filter-chip ${selectedCuisine === '' && ratingFilter === null && !featuredFilter ? 'active' : ''}`}
                  onClick={handleLogoOrBackClick}
                >
                  🌟 All Dishes
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Weather Specials' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Weather Specials' ? '' : 'Weather Specials')}
                >
                  ⛈️ Weather Specials
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Dinner & Celebrations' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Dinner & Celebrations' ? '' : 'Dinner & Celebrations')}
                >
                  🕯️ Dinner & Celebrations
                </button>


                <button
                  className={`filter-chip ${ratingFilter === 4.6 ? 'active' : ''}`}
                  onClick={() => setRatingFilter(prev => prev === 4.6 ? null : 4.6)}
                >
                  ⭐ Top Rated (4.6+)
                </button>


                <button
                  className={`filter-chip ${featuredFilter ? 'active' : ''}`}
                  onClick={() => setFeaturedFilter(prev => !prev)}
                >
                  💎 Premium (Featured)
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'North Indian' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'North Indian' ? '' : 'North Indian')}
                >
                  🍛 North Indian
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Chinese' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Chinese' ? '' : 'Chinese')}
                >
                  🥢 Chinese & Asian
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Italian' || selectedCuisine === 'Pizza' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Italian' ? '' : 'Italian')}
                >
                  🍕 Pizza & Italian
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Fast Food' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Fast Food' ? '' : 'Fast Food')}
                >
                  🍔 Fast Food
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Desserts' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Desserts' ? '' : 'Desserts')}
                >
                  🍰 Desserts
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'South Indian' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'South Indian' ? '' : 'South Indian')}
                >
                  🥞 South Indian
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Healthy Bowls' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Healthy Bowls' ? '' : 'Healthy Bowls')}
                >
                  🥗 Healthy Bowls
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Street Food' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Street Food' ? '' : 'Street Food')}
                >
                  🍢 Street Food
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Biryani' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Biryani' ? '' : 'Biryani')}
                >
                  🍲 Biryani & Kebabs
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Mexican' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Mexican' ? '' : 'Mexican')}
                >
                  🌮 Mexican
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Japanese' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Japanese' ? '' : 'Japanese')}
                >
                  🍣 Japanese & Sushi
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Beverages' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Beverages' ? '' : 'Beverages')}
                >
                  🥤 Beverages & Shakes
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Seafood' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Seafood' ? '' : 'Seafood')}
                >
                  🦐 Seafood
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Middle Eastern' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Middle Eastern' ? '' : 'Middle Eastern')}
                >
                  🥙 Middle Eastern
                </button>

                <button
                  className={`filter-chip ${selectedCuisine === 'Breakfast' ? 'active' : ''}`}
                  onClick={() => setSelectedCuisine(prev => prev === 'Breakfast' ? '' : 'Breakfast')}
                >
                  🍳 Breakfast & Waffles
                </button>
              </div>

              {/* Loading Indicator */}
              {loading ? (
                <div className="flex-center" style={{ minHeight: '30vh', flexDirection: 'column', gap: '15px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#E23744',
                    borderRadius: '50%',
                    animation: 'progressGlow 1s linear infinite'
                  }}></div>
                  <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Querying best options for you...</p>
                </div>
              ) : restaurants.length === 0 ? (
                /* Empty state */
                <div style={{ textAlign: 'center', padding: '60px', background: '#121824', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No matches found</h3>
                  <p style={{ color: '#9CA3AF', marginBottom: '20px' }}>Try adjusting your filters, cuisines, or typing a different search word.</p>
                  <button
                    className="back-btn"
                    onClick={handleLogoOrBackClick}
                    style={{ margin: 0 }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Restaurant Cards Grid */}
                  <div className="grid-responsive">
                    {restaurants.map((res) => (
                      <RestaurantCard
                        key={res.id}
                        restaurant={res}
                        onClick={() => setSelectedRestaurantId(res.id)}
                      />
                    ))}
                  </div>

                  {/* Direct Food Items & Delicacies Grid */}
                  {(() => {
                    const allDishesRaw = restaurants.flatMap(r => r.dishes || []);
                    // Filter matching dishes if cuisine is active
                    const matchingDishes = selectedCuisine
                      ? allDishesRaw.filter(d => 
                          (d.category && d.category.toLowerCase().includes(selectedCuisine.toLowerCase())) ||
                          (d.name && d.name.toLowerCase().includes(selectedCuisine.toLowerCase()))
                        )
                      : allDishesRaw;
                    
                    const dishesToRender = matchingDishes.length > 0 ? matchingDishes : allDishesRaw;

                    if (dishesToRender.length === 0) return null;

                    return (
                      <div className="direct-dishes-section animate-fade-in">
                        <div className="direct-dishes-header">
                          <h3 className="direct-dishes-title">
                            <span>🍲 Order Food Items Directly</span>
                            <span className="dishes-count-badge">{dishesToRender.length} Items</span>
                          </h3>
                        </div>

                        <div className="direct-dishes-grid">
                          {dishesToRender.map((item, idx) => {
                            const cartMatch = cartItems.find(c => c.id === item.id);
                            const quantity = cartMatch ? cartMatch.quantity : 0;

                            return (
                              <div key={idx} className="dish-card-tile">
                                <div className="dish-card-img-wrapper">
                                  <img
                                    src={item.imageUrl || item.image}
                                    alt={item.name}
                                    className="dish-card-img"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
                                    }}
                                  />
                                  <div className="dish-veg-tag">
                                    <span className={`veg-nonveg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                                  </div>
                                </div>

                                <div className="dish-card-body">
                                  <h4 className="dish-card-name">{item.name}</h4>
                                  <p className="dish-card-desc">{item.description}</p>

                                  <div className="dish-card-footer">
                                    <span className="dish-card-price">₹{item.price}</span>

                                    {quantity === 0 ? (
                                      <button
                                        className="add-control-btn craving-add-btn"
                                        onClick={() => handleAddToCart(item)}
                                      >
                                        ADD +
                                      </button>
                                    ) : (
                                      <div className="qty-counter active">
                                        <button
                                          className="qty-btn"
                                          onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                          -
                                        </button>
                                        <span className="qty-value">{quantity}</span>
                                        <button
                                          className="qty-btn"
                                          onClick={() => handleAddToCart(item)}
                                        >
                                          +
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}

            </div>
          </>
        )}

      </main>

      {/* Floating Bottom Quick Cart Bar */}
      {cartItems.length > 0 && !isCartOpen && (
        <div className="floating-cart-toast" onClick={() => setIsCartOpen(true)}>
          <div className="toast-left">
            <div className="toast-count flex-center">
              {cartItems.reduce((acc, c) => acc + c.quantity, 0)}
            </div>
            <div className="toast-info">
              <div className="toast-title">Item(s) in Cart</div>
              <div className="toast-price">₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)} subtotal</div>
            </div>
          </div>

          <div className="toast-action flex-center">
            <span>View Cart & Checkout</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      )}


      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        user={user}
      />

      {/* Post-Order Scratch Card & Loyalty Rewards Modal */}
      {pendingScratchOrder && (
        <ScratchCardModal
          orderData={pendingScratchOrder}
          onClose={() => {
            setActiveOrderId(pendingScratchOrder.id);
            setPendingScratchOrder(null);
          }}
          onClaimReward={handleClaimScratchReward}
        />
      )}

      {/* Order Tracker Modal */}
      {activeOrderId && (
        <OrderTracker
          orderId={activeOrderId}
          onClose={() => setActiveOrderId(null)}
        />
      )}

      {/* Floating AI Craving Matchmaker Widget Button */}
      <button
        className="floating-matchmaker-btn"
        onClick={() => setIsMatchmakerOpen(true)}
        title="Spin the Food Wheel / AI What to Eat Matchmaker"
      >
        <span style={{ fontSize: '14px' }}>🎡</span>
        <span>What to Eat?</span>
      </button>

      {/* AI Craving Matchmaker Modal */}
      <CravingMatchmakerModal
        isOpen={isMatchmakerOpen}
        onClose={() => setIsMatchmakerOpen(false)}
        onAddComboToCart={handleAddComboToCart}
      />

      {/* Floating Circular Customer AI Chatbot (Bottom Right) */}
      <CustomerAiChatbot user={user} />

      {/* Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Loyalty Rewards Wallet Modal */}
      {isRewardsOpen && (
        <div className="scratch-overlay animate-fade-in" onClick={() => setIsRewardsOpen(false)}>
          <div className="scratch-modal-card animate-slide-in" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <button className="scratch-close-x" onClick={() => setIsRewardsOpen(false)}>&times;</button>

            <div className="scratch-header" style={{ marginBottom: '16px' }}>
              <div className="scratch-badge-pill" style={{ background: 'rgba(255, 192, 67, 0.15)', color: '#FFC043', borderColor: 'rgba(255, 192, 67, 0.3)' }}>
                🎁 LOYALTY REWARDS WALLET
              </div>
              <h2 className="scratch-title" style={{ fontSize: '20px', marginTop: '6px' }}>Your Earned Rewards 🏆</h2>
              <p className="scratch-sub">
                Earned from post-order scratch cards. Apply these codes at checkout!
              </p>
            </div>

            {rewardsList.length === 0 ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px dashed rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '32px 16px',
                margin: '16px 0 20px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ fontSize: '42px', marginBottom: '4px' }}>🎁</div>
                <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '700' }}>No rewards claimed yet</h4>
                <p style={{ color: '#9CA3AF', fontSize: '12px', maxWidth: '280px', margin: 0, lineHeight: '1.4' }}>
                  Place an order to unlock instant post-order scratch cards & win Zomato Cash or discount vouchers!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', margin: '16px 0' }}>
                {rewardsList.map((item, idx) => (
                  <div key={idx} className="reward-code-box flex-between" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', padding: '12px 14px', borderRadius: '12px' }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>{item.title}</div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>Code: <strong style={{ color: '#FFC043' }}>{item.code}</strong></div>
                    </div>
                    <button
                      className="copy-code-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(item.code);
                        alert(`Copied voucher code ${item.code}!`);
                      }}
                    >
                      Copy Code
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button className="claim-reward-btn" style={{ width: '100%', marginTop: '8px' }} onClick={() => setIsRewardsOpen(false)}>
              Close Wallet
            </button>
          </div>
        </div>
      )}

      {/* Restaurant Owner Partner Portal Modal */}
      {isOwnerPortalOpen && (
        <RestaurantOwnerPortal
          isOpen={isOwnerPortalOpen}
          onClose={() => setIsOwnerPortalOpen(false)}
          user={user}
        />
      )}

      {/* Customer Support & Help Center Modal */}
      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        user={user}
      />

      {/* Hands-Free Voice AI Craving Search Modal */}
      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
        onApplyVoiceSearch={handleApplyVoiceSearch}
      />
      
      {/* Premium Footer */}
      <footer style={{
        background: '#070A11',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '30px 0',
        textAlign: 'center',
        color: '#6B7280',
        fontSize: '13px'
      }}>
        <div className="container">
          <div style={{
            fontFamily: 'Outfit',
            fontWeight: 800,
            fontSize: '22px',
            color: '#FFFFFF',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#E23744' }}>Zomato</span>Clone
          </div>
          <p>© 2026 Zomato Clone Fullstack build. All rights reserved.</p>
          <p style={{ marginTop: '4px', fontSize: '11px', color: '#4B5563' }}>
            Handcrafted with Express, React & CSS Variables (No inline styling).
          </p>
        </div>
      </footer>

    </div>
  );
}
