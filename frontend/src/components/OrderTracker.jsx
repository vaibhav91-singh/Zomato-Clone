import React, { useState, useEffect } from 'react';
import ApiClient from '../services/api';
import { getSocket, joinOrderRoom } from '../services/socket';

export default function OrderTracker({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tipping and Driver state
  const [selectedTip, setSelectedTip] = useState(0);
  const [tipToast, setTipToast] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(1120);

  const driver = {
    name: 'Ramesh Kumar',
    rating: '4.9 ⭐',
    vehicle: 'TVS Jupiter • HR 26 DH 4821',
    phone: '+91 98765 00112',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    hygiene: '🛡️ Temperature 98.6°F • Mask & Sanitizer Verified'
  };

  // Connect to Socket.io for Real-Time Zero-Latency Status Pushes
  useEffect(() => {
    if (!orderId) return;

    // Fetch initial order state
    ApiClient.get(`/api/orders/${orderId}`)
      .then(resData => {
        const data = resData.order || resData;
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('[ORDER TRACKER INITIAL FETCH ERROR]:', err);
        setLoading(false);
      });

    // Join Socket.io Room for instant updates
    joinOrderRoom(orderId);
    const socket = getSocket();

    const handleStatusUpdate = (updatedOrder) => {
      console.log('⚡ [SOCKET.IO TRACKER EVENT]:', updatedOrder);
      setOrder(updatedOrder);
      setLoading(false);
      if (updatedOrder.status === 'Delivered') {
        setRemainingSeconds(0);
      }
    };

    socket.on('order_status_updated', handleStatusUpdate);

    return () => {
      socket.off('order_status_updated', handleStatusUpdate);
    };
  }, [orderId]);

  // Real-time ticking countdown timer
  useEffect(() => {
    if (loading || !order || order.status === 'Delivered') return;
    const timer = setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, order]);

  const formatCountdown = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApplyTip = (amount) => {
    setSelectedTip(amount);
    setTipToast(`🎉 Thank you! ₹${amount} tip added for ${driver.name}.`);
  };

  if (loading) {
    return (
      <div className="tracker-overlay">
        <div className="tracker-modal-card flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTopColor: '#E23744',
            borderRadius: '50%',
            animation: 'progressGlow 1s linear infinite'
          }}></div>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Connecting to Live GPS Delivery Satellites...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="tracker-overlay">
        <div className="tracker-modal-card">
          <h2>Order tracking error</h2>
          <button className="tracker-close-btn" onClick={onClose} style={{ marginTop: '20px' }}>
            Close Tracking Screen
          </button>
        </div>
      </div>
    );
  }

  const { status, total, address, estimatedDeliveryTime } = order;

  // Calculate rider position along curved GPS path (0% to 100%)
  let activeStepIndex = 0;
  let progressLinePercentage = 15;
  let statusTitleText = 'Order Confirmed';
  let statusDescText = 'The kitchen is accepting your order!';

  if (status === 'Confirmed') {
    activeStepIndex = 0;
    progressLinePercentage = 20;
    statusTitleText = 'Order Received & Confirmed!';
    statusDescText = 'Chef has accepted your order and preparing fresh ingredients.';
  } else if (status === 'Preparing') {
    activeStepIndex = 1;
    progressLinePercentage = 50;
    statusTitleText = 'Chef is Preparing Your Dish!';
    statusDescText = 'Your food is sizzling hot on the fire and being packed in sealed containers.';
  } else if (status === 'Out for Delivery') {
    activeStepIndex = 2;
    progressLinePercentage = 80;
    statusTitleText = 'Rider is Speeding to You!';
    statusDescText = `${driver.name} has picked up your order and is driving toward your location.`;
  } else if (status === 'Delivered') {
    activeStepIndex = 3;
    progressLinePercentage = 100;
    statusTitleText = 'Order Delivered Hot & Fresh!';
    statusDescText = 'Bon appétit! Enjoy your delicious meal.';
  }

  // Calculate coordinates along curved SVG path M 40 50 Q 200 15 360 50
  const t = progressLinePercentage / 100;
  const riderX = (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 200 + t * t * 360;
  const riderY = (1 - t) * (1 - t) * 50 + 2 * (1 - t) * t * 15 + t * t * 50;

  return (
    <div className="tracker-overlay">
      <div className="tracker-modal-card animate-fade-in">
        
        {/* Celebration Confetti */}
        {status === 'Delivered' && (
          <div className="celebration-bg">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${(i * 6.5) + 2}%`,
                  animationDelay: `${(i % 5) * 0.3}s`,
                  backgroundColor: ['#E23744', '#FFC043', '#10B981', '#38BDF8', '#EC4899'][i % 5]
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Modal Top Bar */}
        <div className="tracker-modal-header flex-between">
          <div className="tracker-live-badge">
            <span className="pulse-green-dot"></span> LIVE GPS TRACKING
          </div>
          <button className="tracker-close-x-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Live Animated GPS Map Simulation Canvas */}
        <div className="gps-map-container">
          <svg className="gps-route-svg" viewBox="0 0 400 90">
            {/* Curved background road track */}
            <path
              d="M 40 50 Q 200 15 360 50"
              fill="none"
              stroke="#1D2636"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Active glowing green GPS route */}
            <path
              d="M 40 50 Q 200 15 360 50"
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="animated-dash-line"
            />

            {/* Restaurant Origin Marker */}
            <g transform="translate(30, 36)">
              <circle cx="10" cy="10" r="14" fill="#E23744" />
              <text x="10" y="14" fontSize="13" textAnchor="middle" fill="#FFF">🏪</text>
            </g>

            {/* Home Destination Marker */}
            <g transform="translate(350, 36)">
              <circle cx="10" cy="10" r="14" fill="#FF9F0D" />
              <text x="10" y="14" fontSize="13" textAnchor="middle" fill="#FFF">🏠</text>
            </g>
          </svg>

          {/* Moving Delivery Rider Marker */}
          <div
            className="gps-rider-marker"
            style={{ left: `${riderX}px`, top: `${riderY - 18}px` }}
          >
            <div className="rider-beacon-aura"></div>
            <div className="rider-icon-circle flex-center">🛵</div>
          </div>

          <div className="gps-labels-row flex-between">
            <span className="gps-label-tag">Kitchen</span>
            <span className="gps-label-tag">Your Home</span>
          </div>
        </div>

        {/* Real-Time Countdown Timer Banner */}
        <div className="tracker-countdown-box">
          <div className="countdown-title">
            {status === 'Delivered' ? '🎉 Order Completed' : '⏱️ Estimated Arrival In:'}
          </div>
          <div className="countdown-timer">
            {status === 'Delivered' ? 'Delivered Hot!' : formatCountdown(remainingSeconds)}
          </div>
          <div className="countdown-sub">
            {status === 'Delivered' ? 'Enjoy your food!' : `Target Delivery Time: ${estimatedDeliveryTime} Mins`}
          </div>
        </div>

        {/* Driver Profile Card */}
        <div className="driver-profile-card flex-between">
          <div className="driver-info-left flex-center" style={{ gap: '12px' }}>
            <img src={driver.avatar} alt={driver.name} className="driver-avatar-img" />
            <div className="driver-details">
              <div className="driver-name-row">
                <span className="driver-name">{driver.name}</span>
                <span className="driver-rating-badge">{driver.rating}</span>
              </div>
              <div className="driver-vehicle">{driver.vehicle}</div>
              <div className="driver-hygiene-tag">{driver.hygiene}</div>
            </div>
          </div>

          <div className="driver-actions flex-center" style={{ gap: '8px' }}>
            <a href={`tel:${driver.phone}`} className="driver-call-btn flex-center" title="Call Driver">
              📞 Call
            </a>
          </div>
        </div>

        {/* 1-Tap Delivery Partner Tipping Selector */}
        <div className="tipping-section">
          <div className="tipping-header flex-between">
            <span className="tipping-title">🛵 Tip your delivery partner</span>
            <span className="tipping-sub">100% of tip goes to {driver.name.split(' ')[0]}</span>
          </div>

          <div className="tipping-pills-row flex-center">
            {[20, 30, 50].map((amount) => (
              <button
                key={amount}
                className={`tip-pill-btn ${selectedTip === amount ? 'selected' : ''}`}
                onClick={() => handleApplyTip(amount)}
              >
                <span>₹{amount}</span>
                {amount === 30 && <span className="popular-badge">Popular</span>}
              </button>
            ))}
          </div>

          {tipToast && (
            <div className="tip-success-toast animate-fade-in">
              {tipToast}
            </div>
          )}
        </div>

        {/* Delivery Address Details */}
        <div className="tracker-address-box">
          <div className="address-label">Delivering order worth <strong>₹{total}</strong> to:</div>
          <div className="address-value">{address}</div>
        </div>

        <button className="tracker-close-btn" onClick={onClose}>
          {status === 'Delivered' ? 'Close & Order Again 🚀' : 'Track in Background'}
        </button>
      </div>
    </div>
  );
}


