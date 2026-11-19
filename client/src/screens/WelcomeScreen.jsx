import React from 'react';

const WelcomeScreen = ({ onStart, onOpenGallery }) => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative'
        }}>
            {/* Decorative Background Elements */}
            <div style={{
                position: 'absolute', top: '10%', left: '10%', fontSize: '80px',
                animation: 'float 3s ease-in-out infinite'
            }}>🌸</div>
            <div style={{
                position: 'absolute', bottom: '15%', right: '10%', fontSize: '80px',
                animation: 'float 4s ease-in-out infinite reverse'
            }}>✨</div>
            <div style={{
                position: 'absolute', top: '20%', right: '20%', fontSize: '60px',
                animation: 'float 5s ease-in-out infinite'
            }}>📸</div>

            <div className="glass-panel" style={{ padding: '60px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{
                    fontSize: '4rem', margin: '0 0 20px 0', color: '#FF6F61',
                    textShadow: '3px 3px 0px #FFF, 6px 6px 0px rgba(0,0,0,0.1)'
                }}>
                    Photobooth
                </h1>
                <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '40px' }}>
                    Capture your best moments!
                </p>

                <button className="btn-primary" onClick={onStart} style={{ fontSize: '1.5rem', animation: 'pulse 2s infinite' }}>
                    Start Booth
                </button>
                {onOpenGallery && (
                    <button
                        onClick={onOpenGallery}
                        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#FF6F61', fontSize: '1.1rem', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        View Gallery
                    </button>
                )}
            </div>
        </div>
    );
};

export default WelcomeScreen;
