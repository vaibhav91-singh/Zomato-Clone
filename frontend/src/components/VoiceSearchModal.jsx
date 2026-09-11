import React, { useState, useEffect } from 'react';

export default function VoiceSearchModal({ isOpen, onClose, onApplyVoiceSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [statusMessage, setStatusMessage] = useState('Tap the microphone and speak your craving out loud!');
  const [parsedIntent, setParsedIntent] = useState(null);

  // Web Speech Recognition setup
  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscriptText('');
      setParsedIntent(null);
      setStatusMessage('Tap the microphone and speak your craving out loud!');
    } else {
      // Auto-start listening on modal open
      startListening();
    }
  }, [isOpen]);

  const speakVoiceResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatusMessage('Speech recognition is not supported in this browser. Try Chrome or Edge!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage('🎙️ Listening... Speak your food craving now!');
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscriptText(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setStatusMessage('Could not catch your voice clearly. Tap the mic to try again!');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Parse Voice Transcript for Intent & Filters
  const processVoiceTranscript = (textToProcess) => {
    const query = textToProcess || transcriptText;
    if (!query.trim()) return;

    setIsListening(false);
    const qLower = query.toLowerCase();

    let searchWord = '';
    let minRating = null;
    let isVeg = false;
    let cuisineFilter = '';

    // Extract food keywords
    if (qLower.includes('biryani')) searchWord = 'Biryani';
    else if (qLower.includes('pizza')) searchWord = 'Pizza';
    else if (qLower.includes('burger')) searchWord = 'Burger';
    else if (qLower.includes('dosa') || qLower.includes('idli')) searchWord = 'Dosa';
    else if (qLower.includes('chai') || qLower.includes('samosa') || qLower.includes('pakoda')) searchWord = 'Weather Specials';
    else if (qLower.includes('cake') || qLower.includes('dessert') || qLower.includes('sweet')) searchWord = 'Desserts';
    else if (qLower.includes('coffee') || qLower.includes('shake') || qLower.includes('beverage')) searchWord = 'Beverages';
    else if (qLower.includes('north indian') || qLower.includes('butter chicken') || qLower.includes('thali')) searchWord = 'North Indian';
    else if (qLower.includes('chinese') || qLower.includes('noodle') || qLower.includes('dimsum')) searchWord = 'Chinese';
    else searchWord = query;

    if (qLower.includes('top rated') || qLower.includes('best') || qLower.includes('4.6') || qLower.includes('popular')) {
      minRating = 4.6;
    }
    if (qLower.includes('veg') || qLower.includes('vegetarian')) {
      isVeg = true;
    }

    const intentResult = {
      rawText: query,
      searchWord,
      minRating,
      isVeg
    };

    setParsedIntent(intentResult);

    const voiceFeedback = `Searching for ${searchWord}${minRating ? ' with top rating' : ''}!`;
    setStatusMessage(`🎉 ${voiceFeedback}`);
    speakVoiceResponse(voiceFeedback);

    setTimeout(() => {
      if (onApplyVoiceSearch) {
        onApplyVoiceSearch(intentResult);
      }
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="scratch-overlay animate-fade-in" style={{ zIndex: 1200 }} onClick={onClose}>
      <div className="voice-modal-card animate-slide-in" onClick={e => e.stopPropagation()}>
        <button className="scratch-close-x" onClick={onClose}>&times;</button>

        <div className="voice-modal-header">
          <div className="voice-badge-pill">
            🎙️ HANDS-FREE VOICE AI ASSISTANT
          </div>
          <h2 className="voice-modal-title">Speak Your Craving</h2>
          <p className="voice-modal-sub">{statusMessage}</p>
        </div>

        {/* Pulsing Mic & Multi-Layer Siri/Gemini Sound Wave Equalizer */}
        <div className="voice-visualizer-container flex-center">
          <div className="voice-aura-wrapper flex-center">
            {isListening && (
              <>
                <span className="siri-aura-ring ring1"></span>
                <span className="siri-aura-ring ring2"></span>
                <span className="siri-aura-ring ring3"></span>
              </>
            )}

            <button
              className={`voice-mic-main-btn flex-center ${isListening ? 'listening' : ''}`}
              onClick={startListening}
              title="Click to Speak"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mic-svg-icon">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
          </div>

          {/* Equalizer Wave Bars */}
          {isListening && (
            <div className="equalizer-waves flex-center">
              <span className="eq-bar bar1"></span>
              <span className="eq-bar bar2"></span>
              <span className="eq-bar bar3"></span>
              <span className="eq-bar bar4"></span>
              <span className="eq-bar bar5"></span>
            </div>
          )}
        </div>

        {/* Live Speech Transcript Box */}
        {transcriptText && (
          <div className="voice-transcript-box animate-fade-in">
            <div className="transcript-label">You said:</div>
            <div className="transcript-text">"{transcriptText}"</div>
            <button
              className="claim-reward-btn"
              style={{ marginTop: '10px', width: '100%' }}
              onClick={() => processVoiceTranscript()}
            >
              Search My Craving 🚀
            </button>
          </div>
        )}

        {/* Sample Voice Prompt Chips */}
        <div className="voice-samples-section">
          <div className="voice-samples-title">Try saying or tap a sample prompt:</div>
          <div className="voice-sample-chips">
            <button className="sample-chip-btn" onClick={() => processVoiceTranscript("Spicy Hyderabadi Dum Biryani")}>
              💬 "Spicy Hyderabadi Biryani"
            </button>
            <button className="sample-chip-btn" onClick={() => processVoiceTranscript("Hot Chai & Samosa for monsoon")}>
              💬 "Hot Chai & Samosa"
            </button>
            <button className="sample-chip-btn" onClick={() => processVoiceTranscript("Cheesy Woodfired Pizza")}>
              💬 "Cheesy Pizza"
            </button>
            <button className="sample-chip-btn" onClick={() => processVoiceTranscript("Top rated Butter Chicken")}>
              💬 "Top rated Butter Chicken"
            </button>
            <button className="sample-chip-btn" onClick={() => processVoiceTranscript("Pure Veg Dosa and Sambhar")}>
              💬 "Pure Veg Dosa & Sambhar"
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
