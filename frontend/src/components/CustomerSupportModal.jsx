import React, { useState } from 'react';

export default function CustomerSupportModal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'faq' | 'contact' | 'tickets'
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${user ? user.name.split(' ')[0] : 'there'}! 👋 Welcome to Zomato Care 24/7. How can I assist you today?`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // New Support Ticket Form State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Order Issues');
  const [ticketDetails, setTicketDetails] = useState('');

  // Sample Saved Tickets State
  const [ticketsList, setTicketsList] = useState([
    {
      id: 'TK-89420',
      subject: 'Delayed delivery status inquiry',
      category: 'Order Delivery',
      status: 'In Progress',
      date: '2026-09-10'
    },
    {
      id: 'TK-81205',
      subject: 'Scratch Card coupon code query',
      category: 'Rewards & Coupons',
      status: 'Resolved',
      date: '2026-09-08'
    }
  ]);

  if (!isOpen) return null;

  // AI Chat Response Generator
  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate intelligent AI bot reply
    setTimeout(() => {
      let botResponse = "Thank you for reaching out! Our support executive has received your query and will assist you shortly.";

      const qLower = query.toLowerCase();
      if (qLower.includes('order') || qLower.includes('where') || qLower.includes('delivery')) {
        botResponse = "🚚 For live order tracking, click on your active order banner at the top of the app to view real-time GPS rider movement and ETA updates!";
      } else if (qLower.includes('refund') || qLower.includes('payment') || qLower.includes('money')) {
        botResponse = "💳 Refunds for cancelled orders are processed automatically within 24-48 hours back to your original payment method (UPI / Card).";
      } else if (qLower.includes('wrong') || qLower.includes('missing') || qLower.includes('food') || qLower.includes('item')) {
        botResponse = "🍲 We apologize for the inconvenience! Please submit a quick ticket under 'My Support Tickets' tab and attach order ID for instant resolution & refund.";
      } else if (qLower.includes('partner') || qLower.includes('restaurant') || qLower.includes('owner') || qLower.includes('login')) {
        botResponse = "🏪 Restaurant owners can access their dedicated portal by clicking 'Owner Partner Portal' in the account dropdown menu or logging in with partner credentials!";
      } else if (qLower.includes('coupon') || qLower.includes('reward') || qLower.includes('scratch')) {
        botResponse = "🎁 All earned post-order rewards & scratch card codes are saved under your 'Rewards Wallet' in the top header menu!";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  // Submit New Support Ticket
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDetails) {
      alert('Please fill in ticket subject and details.');
      return;
    }

    const newTicket = {
      id: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
      subject: ticketSubject,
      category: ticketCategory,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };

    setTicketsList(prev => [newTicket, ...prev]);
    setTicketSubject('');
    setTicketDetails('');
    setActiveTab('tickets');
    alert(`🎉 Support Ticket #${newTicket.id} created successfully! Our team will respond shortly.`);
  };

  const faqsData = [
    {
      q: "How do I track my delivery in real-time?",
      a: "Once an order is confirmed by the restaurant, an interactive Live GPS Driver Tracker pops up on your screen showing the moving delivery partner, route updates, and ETA countdown."
    },
    {
      q: "How does the Post-Order Scratch Card work?",
      a: "Every time you complete a food checkout, an interactive Scratch Card opens. Rub the card to instantly win Zomato Cash, discount vouchers, or free dessert rewards!"
    },
    {
      q: "What should I do if an item is missing from my order?",
      a: "Go to the 'Contact Us' tab in this support center, raise a quick support ticket with your Order ID, and our team will issue an instant refund or replacement."
    },
    {
      q: "How can I register my restaurant on Zomato Partner Portal?",
      a: "Click on 'Log In' in the header menu, select 'Restaurant Owner Partner', sign up with your business details, and manage your menu, live orders, and offers in full-page mode!"
    },
    {
      q: "What payment methods are supported?",
      a: "We support UPI (GPay, PhonePe, Paytm), Credit & Debit Cards, Net Banking, Zomato Wallet Cash, and Cash on Delivery."
    }
  ];

  return (
    <div className="scratch-overlay animate-fade-in" style={{ zIndex: 1200 }} onClick={onClose}>
      <div className="support-modal-card animate-slide-in" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="support-header flex-between">
          <div className="flex-center" style={{ gap: '12px' }}>
            <div className="support-header-icon flex-center">
              🎧
            </div>
            <div>
              <h2 className="support-header-title">Zomato Customer Care 24/7</h2>
              <p className="support-header-sub">Help Center & AI Support Assistant</p>
            </div>
          </div>
          <button className="scratch-close-x" onClick={onClose}>&times;</button>
        </div>

        {/* Support Tabs Bar */}
        <div className="support-tabs-nav">
          <button
            className={`support-nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            🤖 AI Live Chat
          </button>

          <button
            className={`support-nav-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            ❓ FAQs
          </button>

          <button
            className={`support-nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            📞 Contact Us
          </button>

          <button
            className={`support-nav-btn ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            🎫 My Tickets ({ticketsList.length})
          </button>
        </div>

        {/* TAB 1: AI LIVE CHAT ASSISTANT */}
        {activeTab === 'chat' && (
          <div className="support-chat-container flex-column">
            {/* Quick Topic Chips */}
            <div className="chat-quick-chips">
              <button className="chip-btn" onClick={() => handleSendMessage("Where is my order?")}>
                🚚 Where is my order?
              </button>
              <button className="chip-btn" onClick={() => handleSendMessage("Payment & Refund status")}>
                💳 Payment & Refund
              </button>
              <button className="chip-btn" onClick={() => handleSendMessage("Wrong item or missing food")}>
                🍲 Item Missing
              </button>
              <button className="chip-btn" onClick={() => handleSendMessage("Restaurant partner onboarding help")}>
                🏪 Partner Help
              </button>
            </div>

            {/* Chat Messages Feed */}
            <div className="chat-messages-feed">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message-row ${msg.sender}`}>
                  <div className={`chat-message-bubble ${msg.sender}`}>
                    {msg.text}
                    <div className="chat-message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input-field"
                placeholder="Ask Zomato AI Support a question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">
                Send 🚀
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: FREQUENTLY ASKED QUESTIONS */}
        {activeTab === 'faq' && (
          <div className="support-faq-container">
            <h3 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '14px' }}>Frequently Asked Questions</h3>
            <div className="faq-accordion-list">
              {faqsData.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button
                    className="faq-question-btn flex-between"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <span>{expandedFaq === idx ? '▲' : '▼'}</span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="faq-answer-box animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT & HELPLINE */}
        {activeTab === 'contact' && (
          <div className="support-contact-container">
            <div className="helpline-cards-grid">
              <div className="helpline-card">
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>📞</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700 }}>24/7 TOLL-FREE HELPLINE</div>
                <div style={{ fontSize: '16px', color: '#FFC043', fontWeight: 800, marginTop: '2px' }}>1800-ZOMATO-HELP</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>(1800-966-286)</div>
              </div>

              <div className="helpline-card">
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>✉️</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700 }}>EMAIL SUPPORT</div>
                <div style={{ fontSize: '14px', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>support@zomato-clone.com</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Avg response: 15 mins</div>
              </div>
            </div>

            {/* Raise a Support Ticket Form */}
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '12px' }}>Raise a New Support Ticket 🎫</h3>
              <form onSubmit={handleTicketSubmit} className="owner-form-grid">
                <div className="auth-form-group">
                  <label className="auth-form-label">Ticket Subject / Title</label>
                  <input
                    type="text"
                    className="auth-form-input"
                    placeholder="e.g. Issue with order #ORD_942"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label className="auth-form-label">Category</label>
                  <select
                    className="auth-form-input"
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                  >
                    <option value="Order Issues">Order & Delivery Issues</option>
                    <option value="Payment & Refund">Payment & Refund</option>
                    <option value="Rewards & Coupons">Rewards & Coupons</option>
                    <option value="Partner Inquiry">Restaurant Partner Inquiry</option>
                  </select>
                </div>

                <div className="auth-form-group">
                  <label className="auth-form-label">Detailed Description</label>
                  <textarea
                    className="auth-form-input"
                    rows="3"
                    placeholder="Describe your issue in detail..."
                    value={ticketDetails}
                    onChange={(e) => setTicketDetails(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="claim-reward-btn" style={{ width: '100%', marginTop: '6px' }}>
                  Submit Support Ticket 🚀
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: MY TICKETS TRACKER */}
        {activeTab === 'tickets' && (
          <div className="support-tickets-container">
            <h3 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '14px' }}>Your Support Tickets</h3>
            {ticketsList.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '13px' }}>No active support tickets created.</p>
            ) : (
              <div className="tickets-list">
                {ticketsList.map((t) => (
                  <div key={t.id} className="ticket-card flex-between">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, color: '#FFC043', fontSize: '13px' }}>{t.id}</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>• {t.category}</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: 700, marginTop: '4px' }}>{t.subject}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>Created on {t.date}</div>
                    </div>

                    <span className={`ticket-status-pill ${t.status.toLowerCase().replace(' ', '-')}`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
