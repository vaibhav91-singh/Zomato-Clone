import React, { useState, useEffect, useRef } from 'react';

const REWARD_POOL = [
  {
    id: 'reward_1',
    title: '🎉 ₹50 Zomato Cash & FREE Lava Cake!',
    desc: '₹50 credited to wallet + Free Chocolate Lava Cake on next order.',
    code: 'LAVA50',
    cash: 50,
    badge: '🔥 Bestseller Reward',
    color: '#E23744'
  },
  {
    id: 'reward_2',
    title: '🔥 60% OFF up to ₹200 on Next Order!',
    desc: 'Special post-order voucher code LUCKY60 unlocked for you.',
    code: 'LUCKY60',
    cash: 0,
    badge: '⚡ Mega Savings',
    color: '#F59E0B'
  },
  {
    id: 'reward_3',
    title: '👑 1 Month FREE Zomato Gold VIP Pass!',
    desc: 'Unlock 0 Delivery Fees on all restaurants above ₹199.',
    code: 'GOLDVIP',
    cash: 100,
    badge: '💎 VIP Gold Pass',
    color: '#3B82F6'
  },
  {
    id: 'reward_4',
    title: '🍧 FREE Hot Gulab Jamun Coupon Added!',
    desc: 'Claim 2pcs Hot Gulab Jamun free on any order above ₹249.',
    code: 'SWEET26',
    cash: 0,
    badge: '🎁 Sweet Delight',
    color: '#10B981'
  }
];

export default function ScratchCardModal({ orderData, onClose, onClaimReward }) {
  const [reward, setReward] = useState(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Pick a random reward on mount
  useEffect(() => {
    const randomItem = REWARD_POOL[Math.floor(Math.random() * REWARD_POOL.length)];
    setReward(randomItem);
  }, []);

  // Initialize metallic foil overlay on HTML5 Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fill with metallic silver/gold gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E5E7EB');
    gradient.addColorStop(0.3, '#9CA3AF');
    gradient.addColorStop(0.5, '#F3F4F6');
    gradient.addColorStop(0.7, '#6B7280');
    gradient.addColorStop(1, '#D1D5DB');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw decorative foil pattern & text
    ctx.fillStyle = 'rgba(17, 24, 39, 0.7)';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎁 SCRATCH HERE FOR YOUR REWARD!', canvas.width / 2, canvas.height / 2 - 8);
    
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = 'rgba(55, 65, 81, 0.8)';
    ctx.fillText('Drag mouse or finger over card', canvas.width / 2, canvas.height / 2 + 16);
  }, [reward]);

  // Scratch handler
  const scratchAt = (x, y) => {
    if (isScratched || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    if (isScratched || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = Math.round((transparentCount / (pixels.length / 4)) * 100);
    setScratchPercent(percentage);

    if (percentage > 35) {
      triggerFullReveal();
    }
  };

  const triggerFullReveal = () => {
    setIsScratched(true);
    setScratchPercent(100);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    if (e.touches[0]) {
      const rect = canvasRef.current.getBoundingClientRect();
      scratchAt(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current) return;
    if (e.touches[0]) {
      const rect = canvasRef.current.getBoundingClientRect();
      scratchAt(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  };

  const handleCopyCode = () => {
    if (!reward) return;
    navigator.clipboard.writeText(reward.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    // Save claimed reward to localStorage
    const existing = JSON.parse(localStorage.getItem('zomato_rewards') || '[]');
    const newReward = {
      ...reward,
      claimedAt: new Date().toISOString(),
      orderId: orderData?.id
    };
    const updated = [newReward, ...existing];
    localStorage.setItem('zomato_rewards', JSON.stringify(updated));

    if (onClaimReward) {
      onClaimReward(newReward);
    }
  };

  if (!reward) return null;

  return (
    <div className="scratch-overlay animate-fade-in">
      <div className="scratch-modal-card animate-slide-in">
        
        {/* Celebration Confetti Effects when Revealed */}
        {isScratched && (
          <div className="celebration-bg">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${(i * 5) + 2}%`,
                  animationDelay: `${(i % 6) * 0.25}s`,
                  backgroundColor: ['#E23744', '#FFC043', '#10B981', '#38BDF8', '#EC4899', '#A855F7'][i % 6]
                }}
              ></div>
            ))}
          </div>
        )}

        <button className="scratch-close-x flex-center" onClick={onClose}>&times;</button>

        {/* Modal Top Header */}
        <div className="scratch-header">
          <div className="scratch-badge-pill flex-center">
            <span>✨ ORDER DELIGHT REWARD</span>
          </div>
          <h2 className="scratch-title">Scratch & Win Reward! 🎁</h2>
          <p className="scratch-sub">
            Order <strong>#{orderData?.id?.slice(-6) || 'SUCCESS'}</strong> placed! You earned a surprise scratch card.
          </p>
        </div>

        {/* Interactive Scratch Card Box */}
        <div className="scratch-card-box">
          
          {/* Underneath Revealed Reward Card */}
          <div className="revealed-reward-content flex-center">
            <span className="reward-badge-tag" style={{ background: reward.color }}>
              {reward.badge}
            </span>
            <div className="reward-emoji-hero">🎉</div>
            <h3 className="reward-title">{reward.title}</h3>
            <p className="reward-desc">{reward.desc}</p>
            
            <div className="reward-code-box flex-between">
              <span className="reward-code-label">CODE: <strong>{reward.code}</strong></span>
              <button className="copy-code-btn" onClick={handleCopyCode}>
                {copied ? 'Copied! ✓' : 'Copy Code 📋'}
              </button>
            </div>
          </div>

          {/* Overlaid Scratch Foil Canvas */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              width={320}
              height={190}
              className="scratch-foil-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            />
          )}
        </div>

        {/* Controls & Action Buttons */}
        {!isScratched ? (
          <div className="scratch-controls">
            <div className="scratch-progress-text">
              Scratch Progress: <strong>{scratchPercent}%</strong>
            </div>
            <button className="scratch-all-btn" onClick={triggerFullReveal}>
              ✨ Scratch All Instantly
            </button>
          </div>
        ) : (
          <div className="claim-actions-box animate-fade-in">
            <button className="claim-reward-btn" onClick={handleClaim}>
              Claim Reward & Track Order 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
