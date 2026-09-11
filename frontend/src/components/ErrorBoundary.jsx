import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ERROR BOUNDARY CAUGHT UNHANDLED EXCEPTION]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFF7F7',
          color: '#111827',
          padding: '24px',
          fontFamily: "'Outfit', sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E23744, #C62431)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            color: '#FFFFFF',
            boxShadow: '0 12px 30px rgba(226, 55, 68, 0.4)',
            marginBottom: '20px'
          }}>
            ⚠️
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 10px 0', color: '#111827' }}>
            Oops! Something went wrong
          </h2>
          
          <p style={{ fontSize: '15px', color: '#6B7280', maxWidth: '480px', marginBottom: '24px', lineHeight: '1.5' }}>
            An unexpected error occurred in the application view. Don't worry, your cart and session data are safe!
          </p>

          <button
            onClick={this.handleReload}
            style={{
              background: 'linear-gradient(135deg, #E23744 0%, #C62431 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(226, 55, 68, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            🔄 Refresh Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
