import React, { useState } from 'react';

export default function WeatherBanner({ onSelectWeather }) {
  const [selectedMood, setSelectedMood] = useState('rainy');

  const weatherMoods = [
    {
      id: 'rainy',
      icon: '🌧️',
      title: 'Monsoon & Rainy Specials',
      badge: 'RAINY CRAVING ALERT',
      headline: 'Raining Outside? Sizzling Kulhad Chai & Golden Pakoras Are Calling!',
      desc: 'Nothing hits harder than piping hot ginger tea, extra-crispy samosas, and spicy momos when it rains!',
      tag: '🔥 18-Min Hot Delivery'
    },
    {
      id: 'chilly',
      icon: '❄️',
      title: 'Chilly Winter Comforts',
      badge: 'WINTER HEATER SPECIAL',
      headline: 'Chilly Breeze? Dive into Steaming Soups & Molten Cheese Lava!',
      desc: 'Warm up your soul with sizzling hot noodle bowls, melting garlic bread, and piping hot Desi Ghee Jalebi!',
      tag: '🍲 Steaming Hot'
    },
    {
      id: 'sunny',
      icon: '☀️',
      title: 'Summer Beat-The-Heat',
      badge: 'SUMMER COOLER DEAL',
      headline: 'Too Hot Outside? Slurp Thick Cold Shakes & Ice-Cold Mocktails!',
      desc: 'Beat the scorching sun with chilled thick mango shakes, icy cold coffee, and refreshing fruit bowls.',
      tag: '🥤 Ultra Chilled'
    }
  ];

  const current = weatherMoods.find(m => m.id === selectedMood) || weatherMoods[0];

  const handleBannerClick = () => {
    if (onSelectWeather) {
      onSelectWeather('Weather Specials');
    }
  };

  return (
    <div className="weather-banner-wrapper animate-fade-in">
      {/* Mood Selector Tabs */}
      <div className="weather-mood-tabs flex-center">
        {weatherMoods.map(m => (
          <button
            key={m.id}
            className={`weather-mood-btn ${selectedMood === m.id ? 'active' : ''}`}
            onClick={() => setSelectedMood(m.id)}
          >
            <span>{m.icon}</span>
            <span>{m.title}</span>
          </button>
        ))}
      </div>

      {/* Main Banner Card */}
      <div className="weather-banner-card">
        <div className="weather-banner-content">
          <div className="weather-badge">
            <span className="live-pulsing-dot"></span>
            <span>{current.badge}</span>
          </div>

          <h2 className="weather-headline">{current.headline}</h2>
          <p className="weather-desc">{current.desc}</p>

          <div className="weather-cta-row">
            <button className="weather-cta-btn" onClick={handleBannerClick}>
              <span>⚡ Order {current.title} Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <span className="weather-tag-pill">{current.tag}</span>
          </div>
        </div>

        <div className="weather-banner-graphic">
          <div className="graphic-circle">
            <span className="emoji-hero">{current.icon}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
