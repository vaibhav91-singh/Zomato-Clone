import React, { useState, useRef, useEffect } from 'react';

export default function CustomerAiChatbot({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hi ${user ? user.name.split(' ')[0] : 'there'}! 👋 I am your Zomato AI Foodie Assistant. Ask me anything about food, orders, refunds, or deals!`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Pretrained Knowledge Base Engine (30+ Intent Matchers)
  const getPretrainedAnswer = (query) => {
    const q = query.toLowerCase().trim();

    if (q.includes('where') || q.includes('track') || q.includes('status') || q.includes('gps')) {
      return "🚚 You can track your live order with our real-time GPS driver map! Click on your active order tracker banner at the top of the app to see rider movements and ETA updates.";
    }
    if (q.includes('refund') || q.includes('money back') || q.includes('failed payment')) {
      return "💳 Refunds for cancelled or failed orders are automatically credited back to your UPI/Card account within 24 to 48 hours.";
    }
    if (q.includes('cancel') || q.includes('cancellation')) {
      return "🚫 Orders can be cancelled within 60 seconds of placement directly from your active Order Tracker window.";
    }
    if (q.includes('scratch') || q.includes('loyalty') || q.includes('reward') || q.includes('zomato cash')) {
      return "🎁 Every time you complete a food order, an interactive Scratch Card pops up! Rub it to win instant Zomato Cash or Free Desserts saved in your Rewards Wallet.";
    }
    if (q.includes('coupon') || q.includes('code') || q.includes('discount') || q.includes('offer')) {
      return "🎟️ Active Coupons available right now:\n• FLAT50 - 50% OFF up to ₹100\n• MONSOON50 - Special Rainy Deals\n• FREECHAI - Free Masala Chai on ₹299+ orders.";
    }
    if (q.includes('veg') || q.includes('pure veg') || q.includes('non veg')) {
      return "🥗 Use the green 'Pure Veg' filter chip on the homepage to exclusively browse 100% pure vegetarian dishes and restaurants!";
    }
    if (q.includes('delivery fee') || q.includes('free delivery') || q.includes('surge')) {
      return "🛵 Delivery fees start at just ₹15! Enjoy FREE delivery on orders above ₹299 or during special promotional events.";
    }
    if (q.includes('rain') || q.includes('weather') || q.includes('monsoon') || q.includes('chai') || q.includes('samosa')) {
      return "⛈️ Rain & Monsoon Cravings! Check out our Weather Banner on the homepage for hot Samosas, Masala Chai, Bread Pakodas, and Soups!";
    }
    if (q.includes('min order') || q.includes('minimum')) {
      return "📦 There is NO minimum order value constraint! You can order even a single Samosa or Hot Chai.";
    }
    if (q.includes('payment') || q.includes('gpay') || q.includes('paytm') || q.includes('upi') || q.includes('cod')) {
      return "💳 We accept UPI (GPay, PhonePe, Paytm), Credit & Debit Cards, Net Banking, Zomato Wallet, and Cash on Delivery (COD).";
    }
    if (q.includes('rating') || q.includes('top rated') || q.includes('4.6')) {
      return "⭐ Filter top-rated restaurants (4.6+ rating) using the 'Top Rated' chip on the homepage toolbar.";
    }
    if (q.includes('delivery time') || q.includes('how long') || q.includes('fast')) {
      return "⚡ Our average delivery time is 25-35 minutes, prepared fresh and delivered superfast in thermal-insulated containers.";
    }
    if (q.includes('late night') || q.includes('midnight') || q.includes('3 am')) {
      return "🌙 Craving late-night food? We have 24/7 delivery partners active for midnight cravings till 3:00 AM!";
    }
    if (q.includes('fine dining') || q.includes('candlelight') || q.includes('table') || q.includes('party')) {
      return "🕯️ Click on 'Dinner & Celebrations' on the homepage to explore rooftop fine dining lounges, party combos, and candlelight tables!";
    }
    if (q.includes('rider') || q.includes('call driver') || q.includes('contact rider')) {
      return "📞 Once your order is 'Out for Delivery', a direct 'Call Rider' button appears inside your live GPS Order Tracker.";
    }
    if (q.includes('tip') || q.includes('driver tip')) {
      return "💖 Show appreciation for your delivery partner! You can 1-tap tip ₹20, ₹30, or ₹50 inside the Order Tracker.";
    }
    if (q.includes('healthy') || q.includes('salad') || q.includes('diet') || q.includes('protein')) {
      return "🥗 Click on the 'Healthy Bowls' filter to find fresh Greek salads, quinoa bowls, avocado toast, and protein shakes!";
    }
    if (q.includes('bulk') || q.includes('catering') || q.includes('group')) {
      return "🎉 Use our 'AI Craving Matchmaker' wheel at the bottom-left of your screen to select 'Group Feast' meal combos for bulk orders!";
    }
    if (q.includes('safety') || q.includes('hygiene') || q.includes('clean')) {
      return "✨ All partner kitchens adhere to Zomato 5-Star Hygiene Standards with temperature checks and sanitized packaging.";
    }
    if (q.includes('change address') || q.includes('wrong address')) {
      return "🏠 You can update your delivery address before checkout or inform your rider directly using the Live Tracker call option.";
    }
    if (q.includes('biryani') || q.includes('kebab')) {
      return "🍲 Try our top Biryani spots: 'Biryani Darbar' and 'Spice Symphony' for authentic Mutton Dum & Chicken Hyderabadi Biryani!";
    }
    if (q.includes('pizza') || q.includes('pasta') || q.includes('italian')) {
      return "🍕 Check out 'Piazza Paradiso' for authentic woodfired Truffle Pizzas and Creamy Alfredo Pasta!";
    }
    if (q.includes('dessert') || q.includes('ice cream') || q.includes('cake') || q.includes('sweet')) {
      return "🍰 Indulge your sweet tooth at 'Sweet Retreat' with Choco Lava Cake, Gulab Jamun, and Belgian Waffles!";
    }
    if (q.includes('dosa') || q.includes('idli') || q.includes('south indian')) {
      return "🥞 Order piping hot Butter Masala Dosa, Crispy Vada, and Filter Coffee from 'Dakshin Express'!";
    }
    if (q.includes('sushi') || q.includes('asian') || q.includes('noodle') || q.includes('dimsum')) {
      return "🍣 Explore 'Tokyo Sushi Bar' and 'Noodle Ninja' for fresh Salmon Nigiri, Hakka Noodles, and Steamed Dimsums!";
    }
    if (q.includes('street food') || q.includes('chaat') || q.includes('golgappe')) {
      return "🍢 Craving Dahi Puri or Pav Bhaji? Visit 'Chaat Chowk' for mouthwatering street food delicacies!";
    }
    if (q.includes('profile') || q.includes('account') || q.includes('name') || q.includes('phone')) {
      return "👤 Manage your account details by clicking your user avatar in the top-right header dropdown menu!";
    }
    if (q.includes('dark mode') || q.includes('theme') || q.includes('light mode')) {
      return "🌙 Toggle between Dark and Light mode anytime by clicking the Sun/Moon icon in the top header navbar!";
    }
    if (q.includes('partner') || q.includes('restaurant owner') || q.includes('merchant')) {
      return "🏪 Restaurant partners can access their full business portal by clicking 'Owner Partner Portal' in the account dropdown!";
    }
    if (q.includes('support') || q.includes('helpline') || q.includes('customer care')) {
      return "🎧 For priority support, our team is available 24/7! You can also raise tickets inside your account dashboard.";
    }

    return "🤖 I'm here to help! You can ask me about live orders, refunds, scratch cards, coupons, or food recommendations like Biryani, Pizza, and Weather Specials!";
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = getPretrainedAnswer(query);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 500);
  };

  return (
    <>
      {/* FLOATING CIRCULAR AI CHATBOT BUTTON (BOTTOM RIGHT) */}
      <button
        className="ai-chatbot-circle-btn flex-center animate-bounce-subtle"
        onClick={() => setIsOpen(!isOpen)}
        title="Zomato AI Foodie Chatbot Assistant"
      >
        <span className="chatbot-btn-icon">🤖</span>
        <span className="chatbot-online-dot"></span>
      </button>

      {/* FLOATING CHATBOT WIDGET POPUP */}
      {isOpen && (
        <div className="ai-chatbot-popup-card animate-slide-up">
          {/* Header */}
          <div className="chatbot-card-header flex-between">
            <div className="flex-center" style={{ gap: '10px' }}>
              <div className="chatbot-avatar-circle flex-center">
                🤖
              </div>
              <div>
                <h3 className="chatbot-title">Zomato AI Assistant</h3>
                <span className="chatbot-status-subtitle">● Online • 30+ Pretrained Q&A</span>
              </div>
            </div>
            <button className="scratch-close-x" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          {/* Quick Chip Prompts */}
          <div className="chatbot-chips-scroll flex-gap">
            <button className="chat-chip-btn" onClick={() => handleSendMessage("Where is my order?")}>
              🚚 Order Track
            </button>
            <button className="chat-chip-btn" onClick={() => handleSendMessage("Active promo coupons")}>
              🎟️ Coupons
            </button>
            <button className="chat-chip-btn" onClick={() => handleSendMessage("Monsoon chai samosa specials")}>
              ⛈️ Rainy Specials
            </button>
            <button className="chat-chip-btn" onClick={() => handleSendMessage("Refund process")}>
              💳 Refunds
            </button>
            <button className="chat-chip-btn" onClick={() => handleSendMessage("Scratch card rewards")}>
              🎁 Rewards
            </button>
          </div>

          {/* Messages Feed */}
          <div className="chatbot-messages-feed">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-row ${msg.sender}`}>
                <div className={`chat-bubble ${msg.sender}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                  <div className="chat-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-row bot">
                <div className="chat-bubble bot typing flex-center" style={{ gap: '6px' }}>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="chatbot-input-bar flex-gap">
            <input
              type="text"
              className="chatbot-input-field"
              placeholder="Ask Zomato AI a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn flex-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
