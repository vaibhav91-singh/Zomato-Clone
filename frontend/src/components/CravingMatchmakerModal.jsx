import React, { useState } from 'react';

const WHEEL_COMBOS = [
  {
    id: 'combo_pizza',
    title: '🍕 Ultimate Pizza Feast Combo',
    badge: '🔥 20% OFF Combo Deal',
    desc: '10" Farmhouse Cheese Pizza + Cheesy Garlic Bread + 500ml Chilled Pepsi',
    price: 540,
    originalPrice: 675,
    items: [
      { id: 'cm_p1', name: '10" Farmhouse Cheese Pizza', price: 390, isVeg: true },
      { id: 'cm_p2', name: 'Cheesy Garlic Breadsticks', price: 105, isVeg: true },
      { id: 'addon_coke', name: 'Chilled Pepsi 500ml', price: 45, isVeg: true }
    ]
  },
  {
    id: 'combo_biryani',
    title: '🍗 Royal Hyderabadi Biryani Combo',
    badge: '👑 Chef Choice',
    desc: 'Hyderabadi Chicken Dum Biryani + Mirchi Ka Salan + 2pcs Gulab Jamun',
    price: 480,
    originalPrice: 590,
    items: [
      { id: 'cm_b1', name: 'Hyderabadi Dum Biryani', price: 380, isVeg: false },
      { id: 'cm_b2', name: 'Mirchi Ka Salan & Raita', price: 45, isVeg: true },
      { id: 'addon_jamun', name: 'Hot Gulab Jamun 2pcs', price: 55, isVeg: true }
    ]
  },
  {
    id: 'combo_burger',
    title: '🍔 Double Cheese Burger Craving Box',
    badge: '⚡ Fast Delivery Favorite',
    desc: 'Double Patty Monster Cheese Burger + Large Peri Peri Fries + Cold Coffee Shake',
    price: 390,
    originalPrice: 485,
    items: [
      { id: 'cm_bg1', name: 'Monster Double Cheese Burger', price: 240, isVeg: true },
      { id: 'cm_bg2', name: 'Large Peri Peri French Fries', price: 95, isVeg: true },
      { id: 'cm_bg3', name: 'Thick Cold Coffee Shake', price: 55, isVeg: true }
    ]
  },
  {
    id: 'combo_italian',
    title: '🍝 Creamy Alfredo Pasta & Tiramisu',
    badge: '✨ Gourmet Combo',
    desc: 'Penne Alfredo in White Sauce + Herb Garlic Toast + Classic Tiramisu Dessert',
    price: 520,
    originalPrice: 650,
    items: [
      { id: 'cm_it1', name: 'Penne Alfredo White Sauce Pasta', price: 340, isVeg: true },
      { id: 'cm_it2', name: 'Herb Butter Garlic Toast (4pcs)', price: 90, isVeg: true },
      { id: 'cm_it3', name: 'Classic Coffee Tiramisu Slice', price: 90, isVeg: true }
    ]
  },
  {
    id: 'combo_asian',
    title: '🍱 Sizzling Asian Dimsum & Noodles',
    badge: '🌶️ Spicy & Crunchy',
    desc: 'Steamed Veg Dimsums 6pcs + Veg Hakka Noodles + Paneer Chilli Bowl',
    price: 460,
    originalPrice: 560,
    items: [
      { id: 'cm_as1', name: 'Steamed Veg Dimsums 6pcs', price: 160, isVeg: true },
      { id: 'cm_as2', name: 'Wok Tossed Veg Hakka Noodles', price: 180, isVeg: true },
      { id: 'cm_as3', name: 'Paneer Chilli Gravy Bowl', price: 120, isVeg: true }
    ]
  },
  {
    id: 'combo_dessert',
    title: '🍰 Sweet Tooth Overload Box',
    badge: '🍧 Pure Happiness',
    desc: 'Hot Choc Lava Cake + Gulab Jamun + Oreo Thick Fudge Shake',
    price: 320,
    originalPrice: 410,
    items: [
      { id: 'addon_lava', name: 'Choc Lava Cake', price: 65, isVeg: true },
      { id: 'addon_jamun', name: 'Hot Gulab Jamun 2pcs', price: 55, isVeg: true },
      { id: 'cm_ds1', name: 'Oreo Thick Fudge Shake', price: 200, isVeg: true }
    ]
  }
];

export default function CravingMatchmakerModal({ isOpen, onClose, onAddComboToCart }) {
  const [activeTab, setActiveTab] = useState('wheel'); // 'wheel' or 'quiz'
  
  // Wheel state
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [matchedCombo, setMatchedCombo] = useState(null);

  // Quiz state
  const [quizMood, setQuizMood] = useState(null);
  const [quizParty, setQuizParty] = useState(null);

  if (!isOpen) return null;

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setMatchedCombo(null);

    // Pick random index 0 to 5
    const randomIndex = Math.floor(Math.random() * WHEEL_COMBOS.length);
    const sliceAngle = 360 / WHEEL_COMBOS.length;
    // Target angle calculation: 5 full spins (1800) + offset for winning slice
    const targetDeg = rotationDeg + 1800 + (360 - (randomIndex * sliceAngle + sliceAngle / 2));
    
    setRotationDeg(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setMatchedCombo(WHEEL_COMBOS[randomIndex]);
    }, 3200);
  };

  const handleQuizSubmit = () => {
    if (!quizMood || !quizParty) return;
    
    let comboIndex = 0;
    if (quizMood === 'spicy' && quizParty === 'solo') comboIndex = 1; // Biryani
    else if (quizMood === 'spicy' && quizParty !== 'solo') comboIndex = 4; // Asian Dimsum
    else if (quizMood === 'sweet') comboIndex = 5; // Dessert
    else if (quizMood === 'crispy' && quizParty === 'solo') comboIndex = 2; // Burger
    else if (quizMood === 'crispy' && quizParty !== 'solo') comboIndex = 0; // Pizza
    else comboIndex = 3; // Italian

    setMatchedCombo(WHEEL_COMBOS[comboIndex]);
  };

  const handleAddCombo = () => {
    if (!matchedCombo) return;
    onAddComboToCart(matchedCombo.items);
    onClose();
  };

  return (
    <div className="matchmaker-overlay animate-fade-in" onClick={onClose}>
      <div className="matchmaker-modal-card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        
        <button className="matchmaker-close-x" onClick={onClose}>&times;</button>

        {/* Modal Header */}
        <div className="matchmaker-header">
          <div className="matchmaker-badge-pill">🤖 AI CRAVING MATCHMAKER</div>
          <h2 className="matchmaker-title">Can't Decide What to Eat? 🍽️</h2>
          <p className="matchmaker-sub">Spin the food wheel or answer 2 quick questions for your perfect meal!</p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="matchmaker-tabs-row flex-center">
          <button
            className={`matchmaker-tab-btn ${activeTab === 'wheel' ? 'active' : ''}`}
            onClick={() => { setActiveTab('wheel'); setMatchedCombo(null); }}
          >
            🎡 Spin the Food Wheel
          </button>
          <button
            className={`matchmaker-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => { setActiveTab('quiz'); setMatchedCombo(null); }}
          >
            🤖 2-Question AI Quiz
          </button>
        </div>

        {/* TAB 1: SPINNING WHEEL */}
        {activeTab === 'wheel' && (
          <div className="wheel-section flex-center">
            <div className="wheel-wrapper">
              <div className="wheel-pointer">▼</div>
              <div
                className="wheel-circle"
                style={{ transform: `rotate(${rotationDeg}deg)` }}
              >
                {WHEEL_COMBOS.map((combo, idx) => {
                  const angle = idx * 60;
                  return (
                    <div
                      key={combo.id}
                      className="wheel-slice"
                      style={{
                        transform: `rotate(${angle}deg)`
                      }}
                    >
                      <span className="slice-text">{combo.title.split(' ')[0]} {combo.title.split(' ')[1]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="spin-action-btn"
              onClick={handleSpinWheel}
              disabled={isSpinning}
            >
              {isSpinning ? '🎡 Spinning Wheel...' : '✨ SPIN NOW!'}
            </button>
          </div>
        )}

        {/* TAB 2: 2-QUESTION AI QUIZ */}
        {activeTab === 'quiz' && (
          <div className="quiz-section">
            <div className="quiz-step">
              <label className="quiz-label">1. What's your craving mood?</label>
              <div className="quiz-options-grid">
                {[
                  { id: 'spicy', label: '🌶️ Spicy & Bold' },
                  { id: 'sweet', label: '🍰 Sweet & Indulgent' },
                  { id: 'crispy', label: '🍔 Fast & Crispy' },
                  { id: 'healthy', label: '🍝 Creamy & Comforting' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    className={`quiz-option-chip ${quizMood === opt.id ? 'selected' : ''}`}
                    onClick={() => setQuizMood(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-step" style={{ marginTop: '16px' }}>
              <label className="quiz-label">2. Who are you ordering for?</label>
              <div className="quiz-options-grid">
                {[
                  { id: 'solo', label: '👤 Just Me (Solo)' },
                  { id: 'duo', label: '👥 Date Night / Duo' },
                  { id: 'party', label: '🎉 Family / Group Feast' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    className={`quiz-option-chip ${quizParty === opt.id ? 'selected' : ''}`}
                    onClick={() => setQuizParty(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="spin-action-btn"
              style={{ marginTop: '20px', width: '100%' }}
              disabled={!quizMood || !quizParty}
              onClick={handleQuizSubmit}
            >
              🤖 Find My Perfect AI Combo
            </button>
          </div>
        )}

        {/* MATCHED COMBO RESULT DISPLAY */}
        {matchedCombo && (
          <div className="matched-result-box animate-fade-in" style={{ marginTop: '20px' }}>
            <div className="result-badge-row flex-between">
              <span className="result-badge">{matchedCombo.badge}</span>
              <span className="result-savings">Save ₹{matchedCombo.originalPrice - matchedCombo.price}</span>
            </div>

            <h3 className="result-title">{matchedCombo.title}</h3>
            <p className="result-desc">{matchedCombo.desc}</p>

            <div className="combo-items-list">
              {matchedCombo.items.map((item, idx) => (
                <div key={idx} className="combo-item-row flex-between">
                  <span>
                    <span className={`veg-nonveg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}></span>
                    {item.name}
                  </span>
                  <span className="combo-item-price">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="combo-pricing-bar flex-between">
              <div>
                <div className="total-label">Combo Offer Price:</div>
                <div className="total-amount">
                  ₹{matchedCombo.price}{' '}
                  <span className="original-strike">₹{matchedCombo.originalPrice}</span>
                </div>
              </div>

              <button className="add-combo-btn" onClick={handleAddCombo}>
                Add Craving Combo to Cart 🛒
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
