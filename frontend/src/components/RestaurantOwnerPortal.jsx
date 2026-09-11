import React, { useState, useEffect } from 'react';
import ApiClient from '../services/api';
import { getSocket, joinPartnerRoom } from '../services/socket';

export default function RestaurantOwnerPortal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'analytics' | 'dishes' | 'orders' | 'offers' | 'profile' | 'support'
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [isStoreOnline, setIsStoreOnline] = useState(true);

  // Profile Edit Form States
  const [resName, setResName] = useState('');
  const [resCuisines, setResCuisines] = useState('');
  const [resImage, setResImage] = useState('');
  const [resPrice, setResPrice] = useState(400);
  const [resTime, setResTime] = useState('25-35 mins');

  // Add Dish Modal Form States
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishDesc, setDishDesc] = useState('');
  const [dishVeg, setDishVeg] = useState(true);
  const [dishCategory, setDishCategory] = useState('Recommended Specials');
  const [dishImage, setDishImage] = useState('');

  // Add Offer Modal Form States
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [offerCode, setOfferCode] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDiscount, setOfferDiscount] = useState('50');
  const [offerMaxCap, setOfferMaxCap] = useState('100');
  const [offerMinOrder, setOfferMinOrder] = useState('199');
  const [offerTagline, setOfferTagline] = useState('');
  const [offerExpiry, setOfferExpiry] = useState('2026-12-31');

  // Partner Support Chat & Ticket States
  const [partnerSupportMessages, setPartnerSupportMessages] = useState([
    {
      sender: 'bot',
      text: `Hello Partner! 🏪 Welcome to Zomato Merchant Priority Support. How can we assist your business today?`,
      time: 'Just now'
    }
  ]);
  const [partnerInputText, setPartnerInputText] = useState('');
  const [partnerTicketSubject, setPartnerTicketSubject] = useState('');
  const [partnerTicketCategory, setPartnerTicketCategory] = useState('Payouts & Settlement');
  const [partnerTicketDetails, setPartnerTicketDetails] = useState('');
  const [partnerTickets, setPartnerTickets] = useState([
    {
      id: 'MERCHANT-901',
      subject: 'Weekly settlement payout verification',
      category: 'Payouts',
      status: 'In Progress',
      date: '2026-09-09'
    }
  ]);

  const restaurantId = user?.restaurantId || 'res_1';
  const [analyticsData, setAnalyticsData] = useState(null);

  // Fetch restaurant details & dishes
  const fetchRestaurantData = () => {
    setLoading(true);
    ApiClient.get(`/api/restaurants/${restaurantId}`)
      .then(data => {
        setRestaurant(data);
        setResName(data.name || '');
        setResCuisines(data.cuisines ? data.cuisines.join(', ') : '');
        setResImage(data.imageUrl || '');
        setResPrice(data.priceForTwo || 400);
        setResTime(data.deliveryTime || '25-35 mins');
        setLoading(false);
      })
      .catch(err => {
        console.error('[OWNER PORTAL RESTAURANT ERROR]:', err);
        setLoading(false);
      });
  };

  // Fetch incoming orders
  const fetchOrdersData = () => {
    ApiClient.get('/api/orders')
      .then(data => {
        const orderList = data.orders || (Array.isArray(data) ? data : []);
        setOrders(orderList);
      })
      .catch(err => console.error('[OWNER PORTAL ORDERS ERROR]:', err));
  };

  // Fetch backend restaurant analytics
  const fetchAnalyticsData = () => {
    ApiClient.get(`/api/restaurants/${restaurantId}/analytics`)
      .then(data => {
        setAnalyticsData(data);
      })
      .catch(err => console.error('[OWNER PORTAL ANALYTICS ERROR]:', err));
  };

  // Fetch active offers
  const fetchOffersData = () => {
    ApiClient.get(`/api/restaurants/${restaurantId}/offers`)
      .then(data => {
        const offerList = data.offers || (Array.isArray(data) ? data : []);
        setOffers(offerList);
      })
      .catch(err => console.error('[OWNER PORTAL OFFERS ERROR]:', err));
  };

  // WebSockets Connection & Real-Time Partner Alerts
  useEffect(() => {
    if (!isOpen) return;

    fetchRestaurantData();
    fetchOrdersData();
    fetchAnalyticsData();
    fetchOffersData();

    // Join Partner Room for instant order pushes
    joinPartnerRoom(restaurantId);
    const socket = getSocket();

    const handleNewOrderAlert = (eventData) => {
      console.log('🚨 [LIVE PARTNER ALERT WEBSOCKET]:', eventData);
      
      // 1. Play Audio Chime Sound Alert
      playPartnerOrderChime();

      // 2. Set Live Popup Banner Alert
      setLiveNewOrderAlert(eventData.order);

      // 3. Refresh Orders & Analytics Data instantly without polling!
      fetchOrdersData();
      fetchAnalyticsData();
    };

    const handlePartnerOrderStatusChanged = (updatedOrder) => {
      fetchOrdersData();
      fetchAnalyticsData();
    };

    socket.on('new_order_placed', handleNewOrderAlert);
    socket.on('partner_order_status_changed', handlePartnerOrderStatusChanged);

    return () => {
      socket.off('new_order_placed', handleNewOrderAlert);
      socket.off('partner_order_status_changed', handlePartnerOrderStatusChanged);
    };
  }, [isOpen, restaurantId]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Update Profile Details
  const handleSaveProfile = (e) => {
    e.preventDefault();
    ApiClient.put(`/api/restaurants/${restaurantId}`, {
      name: resName,
      cuisines: resCuisines,
      imageUrl: resImage,
      priceForTwo: resPrice,
      deliveryTime: resTime
    })
      .then(data => {
        showToast('✓ Restaurant business profile updated!');
        fetchRestaurantData();
      })
      .catch(err => {
        console.error(err);
        alert(err.message || 'Failed to update profile.');
      });
  };

  // Add New Dish
  const handleAddDishSubmit = (e) => {
    e.preventDefault();
    if (!dishName || !dishPrice) {
      alert('Please fill in dish name and price.');
      return;
    }

    const dishPayload = {
      name: dishName,
      price: dishPrice,
      description: dishDesc,
      isVeg: dishVeg,
      imageUrl: dishImage,
      category: dishCategory
    };

    ApiClient.post(`/api/restaurants/${restaurantId}/dishes`, dishPayload)
      .then(data => {
        showToast(`🎉 "${dishName}" added to menu!`);
        setShowAddDishModal(false);
        setDishName('');
        setDishPrice('');
        setDishDesc('');
        setDishImage('');
        fetchRestaurantData();
      })
      .catch(err => {
        console.error(err);
        alert(err.message || 'Error adding dish.');
      });
  };

  // Delete Dish
  const handleDeleteDish = (dishId, dName) => {
    if (!window.confirm(`Are you sure you want to remove "${dName}" from menu?`)) return;

    ApiClient.delete(`/api/restaurants/${restaurantId}/dishes/${dishId}`)
      .then(data => {
        showToast(`🗑️ "${dName}" removed from menu.`);
        fetchRestaurantData();
      })
      .catch(err => console.error(err));
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    ApiClient.put(`/api/orders/${orderId}/status`, { status: newStatus })
      .then(data => {
        showToast(`📦 Order status updated to "${newStatus}"!`);
        fetchOrdersData();
      })
      .catch(err => console.error(err));
  };

  // Add New Offer
  const handleAddOfferSubmit = (e) => {
    e.preventDefault();
    if (!offerCode || !offerTitle) {
      alert('Please fill in Offer Code and Title.');
      return;
    }

    const offerPayload = {
      code: offerCode,
      title: offerTitle,
      discountPercent: Number(offerDiscount) || 20,
      maxDiscount: Number(offerMaxCap) || 100,
      minOrder: Number(offerMinOrder) || 199,
      tagline: offerTagline,
      expiry: offerExpiry
    };

    ApiClient.post(`/api/restaurants/${restaurantId}/offers`, offerPayload)
      .then(data => {
        showToast(`🎉 Offer Coupon "${offerCode.toUpperCase()}" launched!`);
        setShowAddOfferModal(false);
        setOfferCode('');
        setOfferTitle('');
        setOfferTagline('');
        fetchOffersData();
      })
      .catch(err => alert(err.message || 'Error creating offer coupon.'));
  };

  // Delete Offer
  const handleDeleteOffer = (offerId, code) => {
    if (!window.confirm(`Are you sure you want to delete offer "${code}"?`)) return;

    ApiClient.delete(`/api/restaurants/${restaurantId}/offers/${offerId}`)
      .then(data => {
        showToast(`🗑️ Offer "${code}" deleted.`);
        fetchOffersData();
      })
      .catch(err => console.error(err));
  };

  // Partner AI Chat Handler
  const handleSendPartnerSupportMessage = (textToSend) => {
    const query = textToSend || partnerInputText;
    if (!query.trim()) return;

    const msg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPartnerSupportMessages(prev => [...prev, msg]);
    if (!textToSend) setPartnerInputText('');

    setTimeout(() => {
      let botReply = "Thank you! Our merchant relationship manager has received your priority request.";
      const qLower = query.toLowerCase();
      if (qLower.includes('payout') || qLower.includes('settlement') || qLower.includes('money') || qLower.includes('bank')) {
        botReply = "💸 Merchant payouts are settled automatically every Tuesday to your registered bank account. You can view detailed breakdowns under Revenue & Demand tab!";
      } else if (qLower.includes('cancellation') || qLower.includes('order') || qLower.includes('cancel')) {
        botReply = "📦 Orders cancelled after preparation starts are fully compensated by Zomato partner protection guarantee.";
      } else if (qLower.includes('menu') || qLower.includes('dish') || qLower.includes('price')) {
        botReply = "🍲 You can edit prices, add new items, or delete out-of-stock items anytime in your 'Menu Management' tab!";
      } else if (qLower.includes('offer') || qLower.includes('coupon') || qLower.includes('discount')) {
        botReply = "🎟️ Partner promo coupons increase store orders by up to 35%. Manage them anytime in your 'Ongoing Offers' tab!";
      }

      setPartnerSupportMessages(prev => [...prev, {
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  // Submit Partner Ticket
  const handlePartnerTicketSubmit = (e) => {
    e.preventDefault();
    if (!partnerTicketSubject || !partnerTicketDetails) return;
    const newT = {
      id: `MERCHANT-${Math.floor(100 + Math.random() * 900)}`,
      subject: partnerTicketSubject,
      category: partnerTicketCategory,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    setPartnerTickets(prev => [newT, ...prev]);
    setPartnerTicketSubject('');
    setPartnerTicketDetails('');
    showToast(`🎉 Priority Ticket #${newT.id} created!`);
  };

  const allDishes = restaurant?.categories ? restaurant.categories.flatMap(cat => cat.items || []) : [];

  // Analytics Calculations
  const calculateTotalIncome = () => {
    if (analyticsData?.totalIncome !== undefined) return analyticsData.totalIncome;
    return orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  };

  const calculateAOV = () => {
    if (analyticsData?.averageOrderValue !== undefined) return analyticsData.averageOrderValue;
    if (orders.length === 0) return 0;
    return Math.round(calculateTotalIncome() / orders.length);
  };

  const getTopDemandDishes = () => {
    if (analyticsData?.topDemandDishes && analyticsData.topDemandDishes.length > 0) {
      return analyticsData.topDemandDishes;
    }
    const demandMap = {};
    orders.forEach(order => {
      if (Array.isArray(order.items)) {
        order.items.forEach(item => {
          const name = item.name || 'Unknown Dish';
          const qty = Number(item.quantity) || 1;
          const price = Number(item.price) || 0;
          if (!demandMap[name]) {
            demandMap[name] = {
              name,
              totalQuantity: 0,
              totalRevenue: 0,
              isVeg: item.isVeg ?? true,
              imageUrl: item.imageUrl || ''
            };
          }
          demandMap[name].totalQuantity += qty;
          demandMap[name].totalRevenue += price * qty;
        });
      }
    });

    const sortedDishes = Object.values(demandMap).sort((a, b) => b.totalQuantity - a.totalQuantity);
    const maxQty = sortedDishes[0]?.totalQuantity || 1;

    return sortedDishes.map((dish, index) => ({
      ...dish,
      rank: index + 1,
      demandPercent: Math.round((dish.totalQuantity / maxQty) * 100)
    }));
  };

  return (
    <div className="owner-fullscreen-page animate-fade-in">
      
      {/* Real-time WebSocket Live Order Alert Banner */}
      {liveNewOrderAlert && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #E23744, #C62431)',
          color: '#FFFFFF',
          padding: '16px 22px',
          borderRadius: '16px',
          boxShadow: '0 16px 40px rgba(226, 55, 68, 0.6), 0 0 25px rgba(255, 192, 67, 0.4)',
          border: '2px solid #FFC043',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          animation: 'pulseGlow 1s infinite alternate',
          maxWidth: '420px'
        }}>
          <div style={{ fontSize: '28px' }}>🔔</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFC043', textTransform: 'uppercase' }}>
              🚨 NEW INCOMING ORDER ALERT!
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px' }}>
              Order ID: #{liveNewOrderAlert.id || liveNewOrderAlert.orderId} • Total: ₹{liveNewOrderAlert.total}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '2px' }}>
              Address: {liveNewOrderAlert.address || liveNewOrderAlert.deliveryAddress}
            </div>
          </div>
          <button
            onClick={() => setLiveNewOrderAlert(null)}
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginLeft: 'auto'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* FULL PAGE HEADER CONTROL BAR */}
      <header className="owner-page-header flex-between">
        <div className="owner-page-brand flex-center" style={{ gap: '14px' }}>
          <div className="owner-brand-logo flex-center">
            🏪
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 className="owner-page-title">{restaurant?.name || 'Partner Business Portal'}</h1>
              <span className={`store-status-badge ${isStoreOnline ? 'online' : 'offline'}`}>
                {isStoreOnline ? '● ACCEPTING ORDERS' : '○ STORE PAUSED'}
              </span>
            </div>
            <p className="owner-page-sub">
              {restaurant?.address || 'Restaurant Partner Central'} • ID: <strong>{restaurantId}</strong>
            </p>
          </div>
        </div>

        <div className="owner-header-actions flex-center" style={{ gap: '14px' }}>
          {/* Store Online Toggle Switch */}
          <button
            className={`online-toggle-btn ${isStoreOnline ? 'online' : 'offline'}`}
            onClick={() => {
              setIsStoreOnline(!isStoreOnline);
              showToast(isStoreOnline ? '⏸️ Store orders paused.' : '🟢 Store is live online!');
            }}
          >
            {isStoreOnline ? '🟢 Live Online' : '⏸️ Paused'}
          </button>

          {/* Switch back to Customer App */}
          <button className="return-customer-btn" onClick={onClose}>
            ← Back to Customer App
          </button>
        </div>
      </header>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="owner-page-toast animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* MAIN LAYOUT: SIDEBAR + CONTENT AREA */}
      <div className="owner-main-body">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="owner-sidebar">
          <div className="owner-sidebar-nav">
            <button
              className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard Overview</span>
            </button>

            <button
              className={`sidebar-nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <span className="nav-icon">📈</span>
              <span className="nav-label">Revenue & Demand</span>
            </button>

            <button
              className={`sidebar-nav-btn ${activeTab === 'dishes' ? 'active' : ''}`}
              onClick={() => setActiveTab('dishes')}
            >
              <span className="nav-icon">🍲</span>
              <span className="nav-label">Menu Management</span>
              <span className="sidebar-count">{allDishes.length}</span>
            </button>

            <button
              className={`sidebar-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-label">Live Orders</span>
              <span className="sidebar-count highlight">{orders.length}</span>
            </button>

            <button
              className={`sidebar-nav-btn ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveTab('offers')}
            >
              <span className="nav-icon">🎟️</span>
              <span className="nav-label">Ongoing Offers</span>
              <span className="sidebar-count offer-badge">{offers.length}</span>
            </button>

            <button
              className={`sidebar-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">🏪</span>
              <span className="nav-label">Business Profile</span>
            </button>

            <button
              className={`sidebar-nav-btn ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => setActiveTab('support')}
            >
              <span className="nav-icon">🎧</span>
              <span className="nav-label">Partner Support</span>
            </button>
          </div>

          <div className="sidebar-footer-card">
            <div className="footer-card-title">💡 Partner Tip</div>
            <p className="footer-card-desc">
              Adding promotional coupons increases customer repeat orders by 35%!
            </p>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="owner-content-panel">
          {loading ? (
            <div className="flex-center" style={{ minHeight: '50vh', color: '#9CA3AF', gap: '12px' }}>
              <div className="loading-spinner"></div>
              <span>Fetching partner portal metrics...</span>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'overview' && (
                <div className="animate-fade-in">
                  <div className="dashboard-welcome-banner flex-between">
                    <div>
                      <h2>Welcome Back, {restaurant?.name || 'Partner'} 👋</h2>
                      <p>Here is your real-time performance summary and live store operations.</p>
                    </div>
                    <button className="add-dish-trigger-btn" onClick={() => setShowAddOfferModal(true)}>
                      + Launch New Coupon 🎟️
                    </button>
                  </div>

                  {/* Summary Metric Widgets */}
                  <div className="owner-analytics-grid" style={{ marginTop: '20px' }}>
                    <div className="analytics-stat-card income">
                      <div className="stat-card-label">💰 Total Order Income</div>
                      <div className="stat-card-value">₹{calculateTotalIncome().toLocaleString('en-IN')}</div>
                      <div className="stat-card-subtitle">Gross revenue earned</div>
                    </div>

                    <div className="analytics-stat-card orders-count">
                      <div className="stat-card-label">📦 Active & Total Orders</div>
                      <div className="stat-card-value">{orders.length}</div>
                      <div className="stat-card-subtitle">Completed order count</div>
                    </div>

                    <div className="analytics-stat-card aov">
                      <div className="stat-card-label">📊 Avg Order Value</div>
                      <div className="stat-card-value">₹{calculateAOV().toLocaleString('en-IN')}</div>
                      <div className="stat-card-subtitle">Per order basket size</div>
                    </div>
                  </div>

                  {/* Quick Sections Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
                    
                    {/* Active Offers Quick View */}
                    <div className="owner-card-box">
                      <div className="flex-between" style={{ marginBottom: '14px' }}>
                        <h3 className="card-box-title">🎟️ Active Ongoing Offers</h3>
                        <button className="view-link-btn" onClick={() => setActiveTab('offers')}>View All ({offers.length}) →</button>
                      </div>
                      {offers.length === 0 ? (
                        <p style={{ color: '#9CA3AF', fontSize: '13px' }}>No promotional offers active right now.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {offers.slice(0, 2).map((off) => (
                            <div key={off.id} className="offer-mini-card flex-between">
                              <div>
                                <span className="offer-code-tag">{off.code}</span>
                                <div style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700, marginTop: '4px' }}>{off.title}</div>
                              </div>
                              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>ACTIVE</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Top Seller Quick View */}
                    <div className="owner-card-box">
                      <div className="flex-between" style={{ marginBottom: '14px' }}>
                        <h3 className="card-box-title">🔥 Best Seller Dish</h3>
                        <button className="view-link-btn" onClick={() => setActiveTab('analytics')}>Demand Analytics →</button>
                      </div>
                      {getTopDemandDishes().length === 0 ? (
                        <p style={{ color: '#9CA3AF', fontSize: '13px' }}>No order demand data available yet.</p>
                      ) : (
                        <div className="offer-mini-card flex-between">
                          <div>
                            <div style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 800 }}>{getTopDemandDishes()[0]?.name}</div>
                            <div style={{ fontSize: '12px', color: '#FFC043', marginTop: '2px' }}>₹{getTopDemandDishes()[0]?.totalRevenue} Revenue</div>
                          </div>
                          <span className="demand-count-badge">🔥 {getTopDemandDishes()[0]?.totalQuantity} Orders</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: REVENUE & DEMAND ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="animate-fade-in">
                  <div className="owner-analytics-grid">
                    <div className="analytics-stat-card income">
                      <div className="stat-card-label">💰 Total Order Income</div>
                      <div className="stat-card-value">₹{calculateTotalIncome().toLocaleString('en-IN')}</div>
                      <div className="stat-card-subtitle">Gross revenue from {orders.length} orders</div>
                    </div>

                    <div className="analytics-stat-card orders-count">
                      <div className="stat-card-label">📦 Total Orders</div>
                      <div className="stat-card-value">{orders.length}</div>
                      <div className="stat-card-subtitle">Total completed & live orders</div>
                    </div>

                    <div className="analytics-stat-card aov">
                      <div className="stat-card-label">📊 Avg Order Value</div>
                      <div className="stat-card-value">₹{calculateAOV().toLocaleString('en-IN')}</div>
                      <div className="stat-card-subtitle">Average earnings per basket</div>
                    </div>
                  </div>

                  <div className="demand-section" style={{ marginTop: '24px' }}>
                    <div className="flex-between" style={{ marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: 800, margin: 0 }}>
                        🔥 Most Demanded Dishes (Best Sellers)
                      </h3>
                      <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Ranked by customer order demand</span>
                    </div>

                    {getTopDemandDishes().length === 0 ? (
                      <div style={{ padding: '40px', color: '#9CA3AF', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        No dish order analytics data available yet.
                      </div>
                    ) : (
                      <div className="demand-dishes-list">
                        {getTopDemandDishes().map((dish) => (
                          <div key={dish.name} className="demand-dish-card">
                            <div className="demand-dish-header flex-between">
                              <div className="flex-center" style={{ gap: '12px' }}>
                                <span className={`demand-rank-badge rank-${dish.rank}`}>
                                  #{dish.rank}
                                </span>
                                <div>
                                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                                    {dish.name}
                                  </div>
                                  <div style={{ fontSize: '13px', color: '#FFC043', fontWeight: 600 }}>
                                    Revenue Generated: ₹{dish.totalRevenue.toLocaleString('en-IN')}
                                  </div>
                                </div>
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <span className="demand-count-badge">
                                  🔥 {dish.totalQuantity} {dish.totalQuantity === 1 ? 'Order' : 'Orders'}
                                </span>
                              </div>
                            </div>

                            <div className="demand-meter-box">
                              <div className="demand-meter-bar">
                                <div
                                  className="demand-meter-fill"
                                  style={{ width: `${dish.demandPercent}%` }}
                                ></div>
                              </div>
                              <div className="demand-meter-label">{dish.demandPercent}% customer demand share</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: MENU & DISHES MANAGEMENT */}
              {activeTab === 'dishes' && (
                <div className="animate-fade-in">
                  <div className="flex-between" style={{ marginBottom: '20px' }}>
                    <div>
                      <h2 className="section-tab-title">Menu Management</h2>
                      <p style={{ color: '#9CA3AF', fontSize: '13px' }}>Total Active Dishes: <strong>{allDishes.length}</strong></p>
                    </div>
                    <button
                      className="add-dish-trigger-btn"
                      onClick={() => setShowAddDishModal(true)}
                    >
                      + Add New Dish to Menu 🍲
                    </button>
                  </div>

                  <div className="owner-dishes-grid" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                    {allDishes.map((dish, idx) => (
                      <div key={idx} className="owner-dish-card flex-between">
                        <div className="dish-card-left flex-center" style={{ gap: '14px' }}>
                          <img src={dish.imageUrl} alt={dish.name} className="owner-dish-img" />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className={`veg-nonveg-badge ${dish.isVeg ? 'veg' : 'nonveg'}`}></span>
                              <span className="owner-dish-name">{dish.name}</span>
                            </div>
                            <div className="owner-dish-price">₹{dish.price} • <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{dish.category || 'Specials'}</span></div>
                          </div>
                        </div>

                        <button
                          className="delete-dish-btn"
                          onClick={() => handleDeleteDish(dish.id, dish.name)}
                          title="Remove dish from menu"
                        >
                          🗑️ Delete Dish
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LIVE PARTNER ORDERS */}
              {activeTab === 'orders' && (
                <div className="animate-fade-in">
                  <div className="flex-between" style={{ marginBottom: '20px' }}>
                    <div>
                      <h2 className="section-tab-title">Live Orders Center</h2>
                      <p style={{ color: '#9CA3AF', fontSize: '13px' }}>Incoming & Active Orders: <strong>{orders.length}</strong></p>
                    </div>
                  </div>

                  <div className="owner-orders-list" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                    {orders.length === 0 ? (
                      <div style={{ padding: '50px', color: '#9CA3AF', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '14px' }}>
                        No live customer orders received yet.
                      </div>
                    ) : (
                      orders.map((ord) => (
                        <div key={ord.id} className="owner-order-card">
                          <div className="order-card-header flex-between">
                            <div>
                              <strong>Order #{ord.id.slice(-6)}</strong> • <span style={{ color: '#FFC043' }}>₹{ord.total}</span>
                            </div>
                            <span className={`status-pill ${ord.status?.toLowerCase()}`}>
                              {ord.status}
                            </span>
                          </div>

                          <div className="order-customer-info">
                            👤 {ord.customerName} ({ord.customerPhone}) • 🏠 {ord.address}
                          </div>

                          <div className="order-items-summary">
                            {ord.items.map((i, k) => (
                              <span key={k} className="order-item-tag">
                                {i.name} x{i.quantity}
                              </span>
                            ))}
                          </div>

                          <div className="order-status-actions flex-gap" style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                            <button
                              className="status-change-btn"
                              onClick={() => handleUpdateOrderStatus(ord.id, 'Preparing')}
                            >
                              👨‍🍳 Preparing
                            </button>
                            <button
                              className="status-change-btn"
                              onClick={() => handleUpdateOrderStatus(ord.id, 'Out for Delivery')}
                            >
                              🛵 Out for Delivery
                            </button>
                            <button
                              className="status-change-btn success"
                              onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                            >
                              🎉 Delivered
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: ONGOING OFFERS & PROMOTIONS */}
              {activeTab === 'offers' && (
                <div className="animate-fade-in">
                  <div className="flex-between" style={{ marginBottom: '20px' }}>
                    <div>
                      <h2 className="section-tab-title">Ongoing Offers & Coupons</h2>
                      <p style={{ color: '#9CA3AF', fontSize: '13px' }}>Create and manage customer discount vouchers & promotions.</p>
                    </div>
                    <button
                      className="add-dish-trigger-btn"
                      onClick={() => setShowAddOfferModal(true)}
                    >
                      + Launch New Coupon 🎟️
                    </button>
                  </div>

                  <div className="offers-grid">
                    {offers.length === 0 ? (
                      <div style={{ padding: '50px', color: '#9CA3AF', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '14px' }}>
                        No ongoing promotional offers created yet. Click "+ Launch New Coupon" to create one!
                      </div>
                    ) : (
                      offers.map((off) => (
                        <div key={off.id} className="partner-offer-card flex-between">
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span className="offer-code-tag">{off.code}</span>
                              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 800 }}>
                                {off.discountPercent}% OFF (Max ₹{off.maxDiscount})
                              </span>
                            </div>
                            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginTop: '8px', fontWeight: 700 }}>{off.title}</h4>
                            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{off.tagline}</p>
                            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>
                              Min Order: ₹{off.minOrder} • Valid till: {off.expiry}
                            </div>
                          </div>

                          <button
                            className="delete-dish-btn"
                            onClick={() => handleDeleteOffer(off.id, off.code)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: BUSINESS PROFILE DETAILS */}
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="section-tab-title" style={{ marginBottom: '16px' }}>Business Profile & Settings</h2>
                  <form onSubmit={handleSaveProfile} className="owner-form-grid" style={{ maxWidth: '600px' }}>
                    <div className="auth-form-group">
                      <label className="auth-form-label">Restaurant Business Name</label>
                      <input
                        type="text"
                        className="auth-form-input"
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="auth-form-group">
                      <label className="auth-form-label">Cuisines (comma separated)</label>
                      <input
                        type="text"
                        className="auth-form-input"
                        value={resCuisines}
                        onChange={(e) => setResCuisines(e.target.value)}
                      />
                    </div>

                    <div className="auth-form-group">
                      <label className="auth-form-label">Cover Image Photo URL</label>
                      <input
                        type="url"
                        className="auth-form-input"
                        value={resImage}
                        onChange={(e) => setResImage(e.target.value)}
                      />
                    </div>

                    <div className="flex-gap" style={{ display: 'flex', gap: '12px' }}>
                      <div className="auth-form-group" style={{ flex: 1 }}>
                        <label className="auth-form-label">Price for Two (₹)</label>
                        <input
                          type="number"
                          className="auth-form-input"
                          value={resPrice}
                          onChange={(e) => setResPrice(e.target.value)}
                        />
                      </div>

                      <div className="auth-form-group" style={{ flex: 1 }}>
                        <label className="auth-form-label">Est. Delivery Time</label>
                        <input
                          type="text"
                          className="auth-form-input"
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <button type="submit" className="claim-reward-btn" style={{ marginTop: '10px' }}>
                      Save Business Profile Updates 💾
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 7: PARTNER SUPPORT & HELP DESK */}
              {activeTab === 'support' && (
                <div className="animate-fade-in">
                  <div className="flex-between" style={{ marginBottom: '20px' }}>
                    <div>
                      <h2 className="section-tab-title">Merchant Partner Support & Help Center</h2>
                      <p style={{ color: '#9CA3AF', fontSize: '13px' }}>24/7 Priority desk for payouts, order disputes, menu updates & business growth.</p>
                    </div>
                  </div>

                  <div className="helpline-cards-grid" style={{ marginBottom: '20px' }}>
                    <div className="helpline-card">
                      <div style={{ fontSize: '26px', marginBottom: '4px' }}>📞</div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700 }}>PARTNER PRIORITY HOTLINE</div>
                      <div style={{ fontSize: '16px', color: '#FFC043', fontWeight: 800, marginTop: '2px' }}>1800-PARTNER-HELP</div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>(1800-727-8637) • Toll Free</div>
                    </div>

                    <div className="helpline-card">
                      <div style={{ fontSize: '26px', marginBottom: '4px' }}>✉️</div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700 }}>PARTNER HELP DESK EMAIL</div>
                      <div style={{ fontSize: '14px', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>partner-help@zomato-clone.com</div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Priority SLA: 10 mins</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    
                    {/* Partner AI Assistant Chat */}
                    <div className="owner-card-box flex-column" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
                      <h3 className="card-box-title" style={{ marginBottom: '10px' }}>🤖 Partner AI Assistant</h3>

                      {/* Quick Chips */}
                      <div className="chat-quick-chips">
                        <button className="chip-btn" onClick={() => handleSendPartnerSupportMessage("Payouts, Commission & Settlement")}>
                          💸 Payouts
                        </button>
                        <button className="chip-btn" onClick={() => handleSendPartnerSupportMessage("Order Status & Cancellation Help")}>
                          📦 Cancelled Orders
                        </button>
                        <button className="chip-btn" onClick={() => handleSendPartnerSupportMessage("Menu & Price Update Inquiry")}>
                          🍲 Menu Help
                        </button>
                        <button className="chip-btn" onClick={() => handleSendPartnerSupportMessage("Offer & Coupon Promotion Help")}>
                          🎟️ Promotions
                        </button>
                      </div>

                      {/* Messages Feed */}
                      <div className="chat-messages-feed" style={{ flex: 1 }}>
                        {partnerSupportMessages.map((msg, idx) => (
                          <div key={idx} className={`chat-message-row ${msg.sender}`}>
                            <div className={`chat-message-bubble ${msg.sender}`}>
                              {msg.text}
                              <div className="chat-message-time">{msg.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input */}
                      <form onSubmit={(e) => { e.preventDefault(); handleSendPartnerSupportMessage(); }} className="chat-input-wrapper">
                        <input
                          type="text"
                          className="chat-input-field"
                          placeholder="Type partner query..."
                          value={partnerInputText}
                          onChange={(e) => setPartnerInputText(e.target.value)}
                        />
                        <button type="submit" className="chat-send-btn">
                          Send 🚀
                        </button>
                      </form>
                    </div>

                    {/* Raise Partner Ticket */}
                    <div className="owner-card-box">
                      <h3 className="card-box-title" style={{ marginBottom: '12px' }}>Raise Partner Priority Ticket 🎫</h3>
                      <form onSubmit={handlePartnerTicketSubmit} className="owner-form-grid">
                        <div className="auth-form-group">
                          <label className="auth-form-label">Ticket Subject / Title</label>
                          <input
                            type="text"
                            className="auth-form-input"
                            placeholder="e.g. Weekly settlement delay query"
                            value={partnerTicketSubject}
                            onChange={(e) => setPartnerTicketSubject(e.target.value)}
                            required
                          />
                        </div>

                        <div className="auth-form-group">
                          <label className="auth-form-label">Category</label>
                          <select
                            className="auth-form-input"
                            value={partnerTicketCategory}
                            onChange={(e) => setPartnerTicketCategory(e.target.value)}
                          >
                            <option value="Payouts & Settlement">Payouts & Weekly Settlement</option>
                            <option value="Order Disputes">Order Disputes & Compensations</option>
                            <option value="Menu & Pricing">Menu & Pricing Support</option>
                            <option value="Promotions & Coupons">Promotions & Coupon Ads</option>
                          </select>
                        </div>

                        <div className="auth-form-group">
                          <label className="auth-form-label">Details & Notes</label>
                          <textarea
                            className="auth-form-input"
                            rows="3"
                            placeholder="Describe your query in detail..."
                            value={partnerTicketDetails}
                            onChange={(e) => setPartnerTicketDetails(e.target.value)}
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="claim-reward-btn" style={{ width: '100%', marginTop: '6px' }}>
                          Submit Partner Ticket 🚀
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
              )}

            </>
          )}
        </main>
      </div>

      {/* MODAL 1: ADD NEW DISH POPUP */}
      {showAddDishModal && (
        <div className="scratch-overlay animate-fade-in" style={{ zIndex: 1200 }}>
          <div className="scratch-modal-card animate-slide-in" style={{ maxWidth: '460px', textAlign: 'left' }}>
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: '#FFFFFF' }}>+ Add New Dish Item 🍲</h3>
              <button className="scratch-close-x" onClick={() => setShowAddDishModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddDishSubmit}>
              <div className="auth-form-group">
                <label className="auth-form-label">Dish Name</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="e.g. Paneer Tikka Masala"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  required
                />
              </div>

              <div className="flex-gap" style={{ display: 'flex', gap: '12px' }}>
                <div className="auth-form-group" style={{ flex: 1 }}>
                  <label className="auth-form-label">Price (₹)</label>
                  <input
                    type="number"
                    className="auth-form-input"
                    placeholder="290"
                    value={dishPrice}
                    onChange={(e) => setDishPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group" style={{ flex: 1 }}>
                  <label className="auth-form-label">Category</label>
                  <select
                    className="auth-form-input"
                    value={dishCategory}
                    onChange={(e) => setDishCategory(e.target.value)}
                  >
                    <option value="Recommended Specials">Recommended Specials</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Starters & Snacks">Starters & Snacks</option>
                    <option value="Breads & Biryani">Breads & Biryani</option>
                    <option value="Desserts & Beverages">Desserts & Beverages</option>
                  </select>
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Dietary Preference</label>
                <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                  <label style={{ color: '#10B981', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="veg"
                      checked={dishVeg === true}
                      onChange={() => setDishVeg(true)}
                    /> 🟢 Pure Veg
                  </label>
                  <label style={{ color: '#E23744', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="veg"
                      checked={dishVeg === false}
                      onChange={() => setDishVeg(false)}
                    /> 🔴 Non-Veg
                  </label>
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Description</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="Delicious description"
                  value={dishDesc}
                  onChange={(e) => setDishDesc(e.target.value)}
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Image URL</label>
                <input
                  type="url"
                  className="auth-form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={dishImage}
                  onChange={(e) => setDishImage(e.target.value)}
                />
              </div>

              <button type="submit" className="claim-reward-btn" style={{ marginTop: '14px', width: '100%' }}>
                Save Dish to Menu 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE NEW OFFER POPUP */}
      {showAddOfferModal && (
        <div className="scratch-overlay animate-fade-in" style={{ zIndex: 1200 }}>
          <div className="scratch-modal-card animate-slide-in" style={{ maxWidth: '460px', textAlign: 'left' }}>
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: '#FFFFFF' }}>+ Launch Promotional Coupon 🎟️</h3>
              <button className="scratch-close-x" onClick={() => setShowAddOfferModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddOfferSubmit}>
              <div className="auth-form-group">
                <label className="auth-form-label">Coupon Code (e.g. WEEKEND30)</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="SUMMER50"
                  value={offerCode}
                  onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Offer Headline Title</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="50% OFF on all Starters"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex-gap" style={{ display: 'flex', gap: '12px' }}>
                <div className="auth-form-group" style={{ flex: 1 }}>
                  <label className="auth-form-label">Discount %</label>
                  <input
                    type="number"
                    className="auth-form-input"
                    value={offerDiscount}
                    onChange={(e) => setOfferDiscount(e.target.value)}
                  />
                </div>

                <div className="auth-form-group" style={{ flex: 1 }}>
                  <label className="auth-form-label">Max Cap (₹)</label>
                  <input
                    type="number"
                    className="auth-form-input"
                    value={offerMaxCap}
                    onChange={(e) => setOfferMaxCap(e.target.value)}
                  />
                </div>

                <div className="auth-form-group" style={{ flex: 1 }}>
                  <label className="auth-form-label">Min Order (₹)</label>
                  <input
                    type="number"
                    className="auth-form-input"
                    value={offerMinOrder}
                    onChange={(e) => setOfferMinOrder(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Promo Tagline / Description</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="Special weekend deal for all foodies!"
                  value={offerTagline}
                  onChange={(e) => setOfferTagline(e.target.value)}
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Expiry Date</label>
                <input
                  type="date"
                  className="auth-form-input"
                  value={offerExpiry}
                  onChange={(e) => setOfferExpiry(e.target.value)}
                />
              </div>

              <button type="submit" className="claim-reward-btn" style={{ marginTop: '14px', width: '100%' }}>
                Publish Offer Coupon 🚀
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
