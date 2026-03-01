import React from 'react';
import { layouts } from '../utils/layouts';

const LayoutSelectionScreen = ({ onSelectLayout }) => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fff0f0 0%, #ffe9e9 100%)' // Soft pink bg
        }}>
            <h1 style={{
                fontSize: '3rem', margin: '0 0 40px 0', color: '#FF6F61',
                textTransform: 'lowercase', letterSpacing: '-2px'
            }}>choose your layout</h1>

            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                {layouts.map((layout) => (
                    <div
                        key={layout.id}
                        onClick={() => onSelectLayout(layout)}
                        className="layout-card"
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '20px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '200px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {/* Minimal Representation of the Layout */}
                        <div style={{
                            width: '100px',
                            height: layout.id.includes('grid') ? '100px' : '200px',
                            background: '#eee',
                            marginBottom: '20px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '2px',
                            padding: '5px',
                            boxSizing: 'border-box'
                        }}>
                            {Array.from({ length: layout.photoCount }).map((_, i) => (
                                <div key={i} style={{
                                    flex: layout.id.includes('grid') ? '1 0 40%' : '1 0 100%',
                                    background: '#ddd',
                                    borderRadius: '2px'
                                }} />
                            ))}
                        </div>

                        <h3 style={{ margin: '10px 0 5px', color: '#333' }}>{layout.name}</h3>
                        <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>{layout.photoCount} Poses</p>

                        {/* "Try It Now" Badge */}
                        <span style={{
                            marginTop: '15px',
                            background: '#FFD700',
                            color: '#333',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            SELECT
                        </span>
                    </div>
                ))}
            </div>

            <div style={{ position: 'absolute', bottom: '30px', color: '#aaa' }}>
                Select a style to begin
            </div>
        </div>
    );
};

export default LayoutSelectionScreen;
