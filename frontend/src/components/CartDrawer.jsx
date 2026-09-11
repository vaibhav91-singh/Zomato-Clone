import React, { useState, useEffect } from 'react';
import ApiClient from '../services/api';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onPlaceOrder,
  user = null
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [maxDiscountCap, setMaxDiscountCap] = useState(0);
  const [freeDeliveryCoupon, setFreeDeliveryCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponStatus, setCouponStatus] = useState(''); // 'success' or 'error'

  const [deliveryAddress, setDeliveryAddress] = useState('Flat 405, Block B, Cyber Heights, Gurugram');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [checkingOut, setCheckingOut] = useState(false);

  // Auto fill user details when drawer opens or user changes
  useEffect(() => {
    if (user) {
      setContactName(user.name || '');
      setContactPhone(user.phone || '+91 98765 43210');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // Exact Arithmetic Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount amount with cap if applicable
  let calculatedDiscount = 0;
  if (discountPercent > 0) {
    calculatedDiscount = (subtotal * discountPercent) / 100;
    if (maxDiscountCap > 0 && calculatedDiscount > maxDiscountCap) {
      calculatedDiscount = maxDiscountCap;
    }
  }
  const discountAmount = parseFloat(calculatedDiscount.toFixed(2));

  // Delivery fee logic: Free if subtotal > ₹500 or freeDeliveryCoupon active, else ₹30
  const isFreeDelivery = subtotal > 500 || freeDeliveryCoupon;
  const deliveryFee = subtotal === 0 ? 0 : (isFreeDelivery ? 0 : 30);
  
  // Platform & Packaging charge
  const platformFee = subtotal === 0 ? 0 : 10;
  
  // 5% GST calculation on discounted subtotal
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstTax = subtotal === 0 ? 0 : parseFloat((taxableAmount * 0.05).toFixed(2));
  
  // Grand Total calculation
  const grandTotal = subtotal === 0 ? 0 : parseFloat((taxableAmount + deliveryFee + platformFee + gstTax).toFixed(2));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.toUpperCase().trim();
    if (code === 'ZOMATO50') {
      setDiscountPercent(50);
      setMaxDiscountCap(150);
      setFreeDeliveryCoupon(false);
      setCouponMessage('ZOMATO50 applied! 50% OFF up to ₹150');
      setCouponStatus('success');
    } else if (code === 'FREEDEL') {
      setDiscountPercent(0);
      setMaxDiscountCap(0);
      setFreeDeliveryCoupon(true);
      setCouponMessage('FREEDEL applied! Free Delivery unlocked');
      setCouponStatus('success');
    } else {
      setDiscountPercent(0);
      setMaxDiscountCap(0);
      setFreeDeliveryCoupon(false);
      setCouponMessage('Invalid coupon. Try ZOMATO50 or FREEDEL');
      setCouponStatus('error');
    }
  };

  const handlePlaceOrderSubmit = () => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address.');
      return;
    }

    setCheckingOut(true);

    const targetRestaurantId = cartItems.find(i => i.restaurantId)?.restaurantId || '1';

    const orderPayload = {
      restaurantId: targetRestaurantId,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurantId: item.restaurantId || targetRestaurantId
      })),
      subtotal,
      discount: discountAmount,
      deliveryFee,
      platformFee,
      tax: gstTax,
      total: grandTotal,
      customerName: contactName || (user ? user.name : 'Valued Customer'),
      customerPhone: contactPhone || (user ? user.phone : '+91 98765 43210'),
      address: deliveryAddress,
      deliveryAddress,
      paymentMethod
    };

    ApiClient.post('/api/orders', orderPayload)
      .then(resData => {
        const orderData = resData.order || resData;
        setCheckingOut(false);
        setCouponCode('');
        setDiscountPercent(0);
        setMaxDiscountCap(0);
        setFreeDeliveryCoupon(false);
        setCouponMessage('');
        setCouponStatus('');
        onPlaceOrder(orderData);
      })
      .catch(err => {
        console.error('[CHECKOUT ERROR]:', err);
        setCheckingOut(false);
        alert(err.message || 'Order processing error. Please try again.');
      });
  };

  return (
    <div className="cart-overlay animate-fade-in" onClick={onClose}>
      <div className="cart-panel animate-slide-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Cart Header */}
        <div className="cart-header flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 className="cart-title">Your Cart</h2>
            {cartItems.length > 0 && (
              <button
                className="cart-clear-btn"
                onClick={onClearCart}
                title="Clear all items from cart"
              >
                Clear Cart
              </button>
            )}
          </div>
          <button className="cart-close-btn flex-center" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Cart Contents */}
        {cartItems.length === 0 ? (
          <div className="cart-empty-view flex-center" style={{ flexDirection: 'column', minHeight: '60vh' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E23744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Your cart is empty</h3>
            <p style={{ color: 'var(--text-gray-400)', fontSize: '13px', textAlign: 'center', maxWidth: '280px' }}>
              Good food is always waiting for you! Add dishes to your cart to place an order.
            </p>
          </div>
        ) : (
          <div className="cart-body">
            {/* Free Delivery Goal Bar */}
            <div className="free-delivery-goal-box">

              {subtotal >= 500 || freeDeliveryCoupon ? (
                <div className="goal-unlocked">
                  <span className="goal-icon">🎉</span>
                  <span><strong>CONGRATS!</strong> You unlocked FREE Delivery!</span>
                </div>
              ) : (
                <div>
                  <div className="goal-text flex-between">
                    <span>Add <strong>₹{500 - subtotal}</strong> more for <strong>FREE Delivery!</strong> 🚚</span>
                    <span>{Math.round((subtotal / 500) * 100)}%</span>
                  </div>
                  <div className="goal-progress-track">
                    <div className="goal-progress-fill" style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable list of items */}
            <div className="cart-items-list">
              {cartItems.map((item, idx) => (
                <div key={idx} className="cart-item-row">
                  <div className="cart-item-details">
                    <div className="cart-item-title-line">
                      <span className={`veg-nonveg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                      <span className="cart-item-name">{item.name}</span>
                    </div>
                    <div className="cart-item-price">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</div>
                  </div>

                  <div className="qty-counter">
                    <button className="qty-btn" onClick={() => onRemoveFromCart(item.id)}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onAddToCart(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Meal Upsell Drinks & Desserts */}
            <div className="cart-upsell-box">
              <div className="upsell-title">🥤 Craving a Drink or Sweet Treat?</div>
              <div className="upsell-items">
                <div
                  className="upsell-chip"
                  onClick={() => onAddToCart({ id: 'addon_coke', name: 'Chilled Pepsi 500ml', price: 45, isVeg: true })}
                >
                  <span>🥤 Chilled Pepsi +</span>
                  <span className="upsell-price">₹45</span>
                </div>

                <div
                  className="upsell-chip"
                  onClick={() => onAddToCart({ id: 'addon_lava', name: 'Choc Lava Cake', price: 65, isVeg: true })}
                >
                  <span>🍰 Choc Lava Cake +</span>
                  <span className="upsell-price">₹65</span>
                </div>

                <div
                  className="upsell-chip"
                  onClick={() => onAddToCart({ id: 'addon_jamun', name: 'Hot Gulab Jamun 2pcs', price: 55, isVeg: true })}
                >
                  <span>🍧 Gulab Jamun +</span>
                  <span className="upsell-price">₹55</span>
                </div>
              </div>
            </div>

            {/* Promo Coupon Module with 1-Tap Coupon Pills */}
            <div className="cart-summary-section" style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Available Offers & Coupons:</div>
              <div className="quick-coupons-row">
                <button
                  type="button"
                  className="quick-coupon-pill"
                  onClick={() => {
                    setCouponCode('ZOMATO50');
                    setDiscountPercent(50);
                    setMaxDiscountCap(150);
                    setFreeDeliveryCoupon(false);
                    setCouponMessage('ZOMATO50 applied! 50% OFF up to ₹150');
                    setCouponStatus('success');
                  }}
                >
                  🔥 ZOMATO50 (50% OFF)
                </button>

                <button
                  type="button"
                  className="quick-coupon-pill"
                  onClick={() => {
                    setCouponCode('FREEDEL');
                    setDiscountPercent(0);
                    setMaxDiscountCap(0);
                    setFreeDeliveryCoupon(true);
                    setCouponMessage('FREEDEL applied! Free Delivery unlocked');
                    setCouponStatus('success');
                  }}
                >
                  🎁 FREEDEL (Free Shipping)
                </button>
              </div>

              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Enter code: ZOMATO50 or FREEDEL"
                  className="auth-form-input"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="auth-trigger-btn"
                  style={{ padding: '8px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
                >
                  Apply
                </button>
              </form>
              {couponMessage && (
                <div style={{
                  fontSize: '12px',
                  marginTop: '8px',
                  fontWeight: '600',
                  color: couponStatus === 'success' ? 'var(--rating-green)' : 'var(--primary-red)'
                }}>
                  {couponMessage}
                </div>
              )}
            </div>


            {/* Delivery & Customer Details */}
            <div className="cart-summary-section" style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Delivery Information</h4>
              
              <div className="auth-form-group" style={{ marginBottom: '10px' }}>
                <label className="auth-form-label">Full Name</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="Recipient Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                />
              </div>

              <div className="auth-form-group" style={{ marginBottom: '10px' }}>
                <label className="auth-form-label">Phone Number</label>
                <input
                  type="tel"
                  className="auth-form-input"
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                />
              </div>

              <div className="auth-form-group" style={{ marginBottom: '10px' }}>
                <label className="auth-form-label">Delivery Address</label>
                <input
                  type="text"
                  className="auth-form-input"
                  placeholder="House No., Street, City"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  required
                />
              </div>

              <div className="auth-form-group" style={{ marginBottom: '0' }}>
                <label className="auth-form-label">Payment Method</label>
                <select
                  className="auth-form-input"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer' }}
                >
                  <option value="UPI">GooglePay / PhonePe / PayTM UPI</option>
                  <option value="CARD">Credit / Debit Card</option>
                  <option value="COD">Cash on Delivery (COD)</option>
                </select>
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="cart-summary-section" style={{ marginTop: '16px', marginBottom: '80px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Bill Details</h4>
              
              <div className="summary-row">
                <span>Item Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row" style={{ color: 'var(--rating-green)' }}>
                  <span>Coupon Discount</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--rating-green)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="summary-row">
                <span>Packaging & Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              <div className="summary-row">
                <span>GST Taxes & Govt Charges (5%)</span>
                <span>₹{gstTax}</span>
              </div>

              <div className="summary-row total">
                <span>To Pay</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Sticky Checkout Button at bottom of drawer */}
            <div className="cart-footer">
              <button
                className="checkout-btn"
                onClick={handlePlaceOrderSubmit}
                disabled={checkingOut}
              >
                <span>{checkingOut ? 'Placing Order...' : 'Place Order'}</span>
                <span>₹{grandTotal}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
