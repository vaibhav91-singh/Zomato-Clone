import React, { useState } from 'react';
import ApiClient from '../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('customer'); // 'customer' | 'restaurant_owner'
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [cuisines, setCuisines] = useState('');
  
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (activeTab === 'signup' && (!name || !phone)) {
      setError('Please provide your name and phone number for sign up.');
      return;
    }

    if (activeTab === 'signup' && role === 'restaurant_owner' && !restaurantName) {
      setError('Please enter your restaurant business name.');
      return;
    }

    const authPayload = {
      email,
      password,
      name,
      phone,
      role,
      restaurantName,
      cuisines
    };

    const endpoint = activeTab === 'signup' ? '/api/auth/signup' : '/api/auth/login';

    ApiClient.post(endpoint, authPayload)
      .then(data => {
        if (data.user) {
          onLoginSuccess(data.user);
          onClose();
        } else {
          setError(data.message || 'Authentication failed');
        }
      })
      .catch(err => {
        console.error('[AUTH ERROR]:', err);
        setError(err.message || 'Connection failed. Please check backend API.');
      });
  };

  const handleDemoCustomerLogin = () => {
    const demoUser = {
      name: 'Vaibhav Sharma',
      email: 'vaibhav.sharma@example.com',
      phone: '+91 98765 12345',
      role: 'customer',
      avatarLetter: 'V',
      joinedDate: new Date().toLocaleDateString()
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleDemoOwnerLogin = () => {
    const demoOwner = {
      name: 'Rajesh Sharma (Owner)',
      email: 'owner@punjabidhabha.com',
      phone: '+91 98111 22334',
      role: 'restaurant_owner',
      restaurantId: 'res_1', // Links to Punjabi Angithi
      avatarLetter: 'R',
      joinedDate: new Date().toLocaleDateString()
    };
    onLoginSuccess(demoOwner);
    onClose();
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="auth-modal-card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="auth-modal-header">
          <h3 className="auth-modal-title">
            {role === 'restaurant_owner' ? '🏪 Partner Portal Sign In' : '🍔 Foodie Account Login'}
          </h3>
          <button className="auth-modal-close" onClick={onClose}>&times;</button>
        </div>

        {/* Role Selection Switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.05)',
          padding: '4px',
          borderRadius: '12px',
          margin: '0 24px 16px 24px',
          gap: '6px'
        }}>
          <button
            type="button"
            className={`auth-tab-btn ${role === 'customer' ? 'active' : ''}`}
            style={{ borderRadius: '8px', padding: '8px' }}
            onClick={() => setRole('customer')}
          >
            🍔 Customer
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${role === 'restaurant_owner' ? 'active' : ''}`}
            style={{ borderRadius: '8px', padding: '8px' }}
            onClick={() => setRole('restaurant_owner')}
          >
            🏪 Restaurant Partner
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="auth-tabs-bar">
          <button
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setError(''); }}
          >
            Log In
          </button>
          <button
            className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signup'); setError(''); }}
          >
            Register Partner Account
          </button>
        </div>

        {/* Modal Body / Form */}
        <div className="auth-modal-body">
          {error && (
            <div style={{
              background: 'rgba(226, 55, 68, 0.15)',
              border: '1px solid var(--primary-red)',
              color: 'var(--primary-red)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <>
                <div className="auth-form-group">
                  <label className="auth-form-label">Full Name</label>
                  <input
                    type="text"
                    className="auth-form-input"
                    placeholder="e.g. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="auth-form-group">
                  <label className="auth-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="auth-form-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {role === 'restaurant_owner' && (
                  <>
                    <div className="auth-form-group">
                      <label className="auth-form-label">Restaurant Business Name</label>
                      <input
                        type="text"
                        className="auth-form-input"
                        placeholder="e.g. Royal Punjabi Dhaba"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-form-label">Cuisines Served (comma separated)</label>
                      <input
                        type="text"
                        className="auth-form-input"
                        placeholder="North Indian, Tandoori, Chinese"
                        value={cuisines}
                        onChange={(e) => setCuisines(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <div className="auth-form-group">
              <label className="auth-form-label">Email Address</label>
              <input
                type="email"
                className="auth-form-input"
                placeholder="name@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-form-label">Password</label>
              <input
                type="password"
                className="auth-form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              {activeTab === 'login' ? `Log In as ${role === 'restaurant_owner' ? 'Owner' : 'Customer'}` : 'Register Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR QUICK DEMO ACCESS</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="auth-demo-btn" style={{ flex: 1, fontSize: '12px' }} onClick={handleDemoCustomerLogin}>
              🍔 Demo Foodie
            </button>
            <button className="auth-demo-btn" style={{ flex: 1, fontSize: '12px', background: 'rgba(255, 192, 67, 0.15)', borderColor: '#FFC043', color: '#FFC043' }} onClick={handleDemoOwnerLogin}>
              🏪 Demo Owner
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

