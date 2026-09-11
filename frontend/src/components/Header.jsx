import React, { useState, useEffect, useRef } from 'react';

// Catalog of popular recommendations for autocomplete dropdown
const SEARCH_RECOMMENDATION_CATALOG = {
  dishes: [
    { name: "Hyderabadi Dum Biryani", category: "Dish", icon: "🍛" },
    { name: "Butter Chicken & Naan", category: "Dish", icon: "🍗" },
    { name: "Cheese Pepperoni Pizza", category: "Dish", icon: "🍕" },
    { name: "Dal Makhani Royal", category: "Dish", icon: "🍲" },
    { name: "Paneer Tikka Masala", category: "Dish", icon: "🧆" },
    { name: "Gourmet Cheeseburger", category: "Dish", icon: "🍔" },
    { name: "Steamed Dim Sum & Momos", category: "Dish", icon: "🥟" },
    { name: "Crispy Masala Dosa", category: "Dish", icon: "🥞" },
    { name: "Chow Mein & Hakka Noodles", category: "Dish", icon: "🍜" },
    { name: "Samosa & Hot Masala Chai", category: "Dish", icon: "☕" },
    { name: "Chocolate Lava Cake", category: "Dish", icon: "🍰" },
    { name: "Cold Brew & Milkshakes", category: "Dish", icon: "🥤" },
    { name: "Chicken Shawarma Roll", category: "Dish", icon: "🌯" }
  ],
  cuisines: [
    { name: "North Indian", category: "Cuisine", icon: "🌶️" },
    { name: "Chinese & Asian", category: "Cuisine", icon: "🥢" },
    { name: "Italian & Pizza", category: "Cuisine", icon: "🍕" },
    { name: "South Indian", category: "Cuisine", icon: "🥥" },
    { name: "Fast Food & Burgers", category: "Cuisine", icon: "🍟" },
    { name: "Street Food & Chaat", category: "Cuisine", icon: "🥟" },
    { name: "Japanese & Sushi", category: "Cuisine", icon: "🍱" },
    { name: "Desserts & Bakery", category: "Cuisine", icon: "🧁" },
    { name: "Weather Specials", category: "Cuisine", icon: "⛈️" }
  ],
  restaurants: [
    { name: "Spice Symphony", category: "Restaurant", icon: "🏪" },
    { name: "Noodle Ninja", category: "Restaurant", icon: "🏪" },
    { name: "Piazza Paradiso", category: "Restaurant", icon: "🏪" },
    { name: "Burger & Co.", category: "Restaurant", icon: "🏪" },
    { name: "Sweet Retreat", category: "Restaurant", icon: "🏪" },
    { name: "Dakshin Express", category: "Restaurant", icon: "🏪" },
    { name: "Biryani Darbar", category: "Restaurant", icon: "🏪" },
    { name: "Rainy & Monsoon Craving Junction", category: "Restaurant", icon: "🏪" }
  ]
};

export default function Header({
  cartItems = [],
  onCartOpen,
  searchQuery,
  setSearchQuery,
  onLogoClick,
  theme = 'dark',
  onToggleTheme,
  user = null,
  onOpenAuth,
  onLogout,
  onOpenMatchmaker,
  onOpenRewards,
  onOpenOwnerPortal,
  onOpenSupport,
  onOpenVoiceSearch
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery || '');
  
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);

  const cartQtyCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Synchronize local input state if parent searchQuery changes externally
  useEffect(() => {
    setInputValue(searchQuery || '');
  }, [searchQuery]);

  // Debounce main page search query update so re-filtering happens smoothly when user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== (searchQuery || '')) {
        setSearchQuery(inputValue);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, searchQuery, setSearchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute matching autocomplete recommendations
  const getSuggestions = () => {
    const q = inputValue.toLowerCase().trim();
    if (!q) return null;

    const matchedDishes = SEARCH_RECOMMENDATION_CATALOG.dishes.filter(d => d.name.toLowerCase().includes(q));
    const matchedCuisines = SEARCH_RECOMMENDATION_CATALOG.cuisines.filter(c => c.name.toLowerCase().includes(q));
    const matchedRestaurants = SEARCH_RECOMMENDATION_CATALOG.restaurants.filter(r => r.name.toLowerCase().includes(q));

    const totalCount = matchedDishes.length + matchedCuisines.length + matchedRestaurants.length;
    return { matchedDishes, matchedCuisines, matchedRestaurants, totalCount };
  };

  const suggestions = getSuggestions();

  const handleSelectSuggestion = (value) => {
    setInputValue(value);
    setSearchQuery(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="header-navbar">
      <div className="container flex-between">
        {/* Logo */}
        <div className="header-logo" onClick={onLogoClick}>
          <span>Zomato</span>Clone
        </div>

        {/* Real-time Search Box & Autocomplete Recommendations */}
        {setSearchQuery && (
          <div className="search-wrapper" ref={searchContainerRef}>
            <span className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search for restaurants, cuisines or dishes..."
              className="search-input"
              value={inputValue}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
            />
            
            {inputValue && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-gray-400)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '0 6px'
                }}
                onClick={() => {
                  setInputValue('');
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                title="Clear Search"
              >
                ✕
              </button>
            )}

            {onOpenVoiceSearch && (
              <button
                className="header-voice-btn flex-center"
                onClick={onOpenVoiceSearch}
                title="Hands-Free Voice AI Craving Search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
            )}

            {/* Smart Autocomplete Recommendation Dropdown */}
            {showSuggestions && inputValue.trim().length > 0 && suggestions && (
              <div className="search-suggestions-dropdown animate-fade-in">
                <div className="search-suggestions-header flex-between">
                  <span>💡 SUGGESTED MATCHES ({suggestions.totalCount})</span>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>Press Enter ↵ to search</span>
                </div>

                {suggestions.totalCount === 0 ? (
                  <div className="search-no-suggestions">
                    No exact matches found for "<strong>{inputValue}</strong>". Press Enter to search anyway!
                  </div>
                ) : (
                  <div className="search-suggestions-body">
                    {/* Matching Dishes */}
                    {suggestions.matchedDishes.length > 0 && (
                      <div className="suggestion-section">
                        <div className="suggestion-section-title">🍲 CRAVING DISHES</div>
                        {suggestions.matchedDishes.map((item, idx) => (
                          <div
                            key={`dish_${idx}`}
                            className="suggestion-item"
                            onClick={() => handleSelectSuggestion(item.name)}
                          >
                            <span className="suggestion-icon">{item.icon}</span>
                            <span className="suggestion-name">{item.name}</span>
                            <span className="suggestion-badge">Dish</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Cuisines */}
                    {suggestions.matchedCuisines.length > 0 && (
                      <div className="suggestion-section">
                        <div className="suggestion-section-title">🥗 CUISINES & CATEGORIES</div>
                        {suggestions.matchedCuisines.map((item, idx) => (
                          <div
                            key={`cuis_${idx}`}
                            className="suggestion-item"
                            onClick={() => handleSelectSuggestion(item.name)}
                          >
                            <span className="suggestion-icon">{item.icon}</span>
                            <span className="suggestion-name">{item.name}</span>
                            <span className="suggestion-badge cuisine">Cuisine</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Restaurants */}
                    {suggestions.matchedRestaurants.length > 0 && (
                      <div className="suggestion-section">
                        <div className="suggestion-section-title">🏪 RESTAURANTS</div>
                        {suggestions.matchedRestaurants.map((item, idx) => (
                          <div
                            key={`rest_${idx}`}
                            className="suggestion-item"
                            onClick={() => handleSelectSuggestion(item.name)}
                          >
                            <span className="suggestion-icon">{item.icon}</span>
                            <span className="suggestion-name">{item.name}</span>
                            <span className="suggestion-badge rest">Partner</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Actions Bar */}
        <div className="header-actions">

          {/* Rewards Wallet Trigger */}
          <button
            className="rewards-trigger-btn"
            onClick={onOpenRewards}
            title="View Earned Loyalty Rewards & Coupons"
          >
            <span style={{ fontSize: '15px' }}>🎁</span>
            <span className="rewards-btn-text">Rewards</span>
          </button>

          {/* Day / Dark Theme Switcher */}
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Day (Light)' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              /* Sun Icon for Light Mode Switch */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              /* Moon Icon for Dark Mode Switch */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Cart Button */}
          <button className="cart-trigger" onClick={onCartOpen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart</span>
            {cartQtyCount > 0 && (
              <span className="cart-badge flex-center">{cartQtyCount}</span>
            )}
          </button>

          {/* Account Section */}
          {user ? (
            <div className="account-dropdown-wrapper" ref={dropdownRef}>
              <div
                className="account-user-chip"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                <div className="user-avatar-circle">
                  {user.avatarLetter || user.name[0].toUpperCase()}
                </div>
                <span>{user.name.split(' ')[0]}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {dropdownOpen && (
                <div className="account-menu-dropdown">
                  <div className="account-info-header">
                    <div className="account-info-name">{user.name}</div>
                    <div className="account-info-email">{user.email}</div>
                  </div>

                  <button
                    className="account-menu-item"
                    onClick={() => { setDropdownOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    My Profile
                  </button>

                  {user.role === 'restaurant_owner' && (
                    <button
                      className="account-menu-item"
                      style={{ color: '#FFC043', fontWeight: '700' }}
                      onClick={() => {
                        setDropdownOpen(false);
                        if (onOpenOwnerPortal) onOpenOwnerPortal();
                      }}
                    >
                      🏪 Owner Partner Portal
                    </button>
                  )}

                  <button
                    className="account-menu-item logout"
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-trigger-btn" onClick={onOpenAuth}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Log In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}

