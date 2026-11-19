import React, { useState, useRef } from 'react';
import { patterns, stickers } from '../utils/assets';
import PhotoStrip from '../components/PhotoStrip';

const FONTS = [
    { name: 'Pacifico', label: 'Pacifico' },
    { name: 'Dancing Script', label: 'Dancing Script' },
    { name: 'Sacramento', label: 'Sacramento' },
    { name: 'Abril Fatface', label: 'Abril Fatface' },
    { name: 'Playfair Display', label: 'Playfair Display' },
    { name: 'Montserrat', label: 'Montserrat' },
    { name: 'Josefin Sans', label: 'Josefin Sans' },
    { name: 'Poppins', label: 'Poppins' },
];

const TEXT_COLORS = [
    '#333333', '#ffffff', '#FF6F61', '#FF4081', '#9C27B0',
    '#3F51B5', '#00BCD4', '#4CAF50', '#FF9800', '#F44336',
    '#FFD700', '#000000',
];

const CustomizeScreen = ({ photos, layout, onBack, onFinish }) => {
    const [activeTab, setActiveTab] = useState('FRAME');
    const [frameStyle, setFrameStyle] = useState(patterns[0]);
    const [placedStickers, setPlacedStickers] = useState([]);
    const [dragId, setDragId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [stripText, setStripText] = useState('');
    const [textFont, setTextFont] = useState('Pacifico');
    const [textColor, setTextColor] = useState('#FF6F61');
    const [textAlign, setTextAlign] = useState('center');
    const photoStripRef = useRef(null);

    const getMaxZ = () => placedStickers.reduce((max, s) => Math.max(max, s.zIndex || 100), 100);
    const getMinZ = () => placedStickers.reduce((min, s) => Math.min(min, s.zIndex || 100), 100);

    const bringToFront = (id) => {
        const top = getMaxZ() + 1;
        setPlacedStickers(prev => prev.map(s => s.id === id ? { ...s, zIndex: top } : s));
    };

    const sendToBack = (id) => {
        const bottom = Math.max(getMinZ() - 1, 1);
        setPlacedStickers(prev => prev.map(s => s.id === id ? { ...s, zIndex: bottom } : s));
    };

    const addSticker = (sticker) => {
        const newId = Date.now();
        setPlacedStickers([
            ...placedStickers,
            { ...sticker, x: 50, y: 50, id: newId, scale: 1, rotation: 0, zIndex: getMaxZ() + 1 }
        ]);
        setSelectedId(newId);
        setActiveTab('STICKERS');
    };

    const handleMouseDown = (id) => {
        setDragId(id);
        setSelectedId(id);
    };

    const handleMouseMove = (e) => {
        if (dragId) {
            const stripEl = photoStripRef.current?.getElement();
            if (!stripEl) return;
            const container = stripEl.getBoundingClientRect();
            const x = ((e.clientX - container.left) / container.width) * 100;
            const y = ((e.clientY - container.top) / container.height) * 100;

            setPlacedStickers(prev => prev.map(s =>
                s.id === dragId ? { ...s, x, y } : s
            ));
        }
    };

    const handleMouseUp = () => setDragId(null);

    const handleDownload = () => {
        setSelectedId(null);
        setTimeout(() => {
            if (photoStripRef.current) {
                photoStripRef.current.download();
            }
        }, 100);
    };

    const tabStyle = (tab) => ({
        flex: 1,
        padding: '10px',
        borderRadius: '12px',
        border: 'none',
        background: activeTab === tab ? '#FF6F61' : '#EEE',
        color: activeTab === tab ? 'white' : '#666',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '0.75rem'
    });

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#FFF0F5' }} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>

            {/* LEFT PANEL: PREVIEW */}
            <div
                onMouseMove={handleMouseMove}
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#FFE4E1',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: dragId ? 'grabbing' : 'default'
                }}
            >
                <div style={{ position: 'relative', transform: 'scale(0.9)', transformOrigin: 'center' }}>
                    <PhotoStrip
                        ref={photoStripRef}
                        photos={photos}
                        layout={layout}
                        filterStyle={{}}
                        frameStyle={frameStyle.style}
                        stickers={placedStickers}
                        onStickerMouseDown={handleMouseDown}
                        selectedId={selectedId}
                        stripText={stripText}
                        textFont={textFont}
                        textColor={textColor}
                        textAlign={textAlign}
                    />
                </div>
            </div>

            {/* RIGHT PANEL: TOOLS */}
            <div className="glass-panel" style={{
                width: '400px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0',
                borderLeft: '1px solid rgba(255,255,255,0.5)'
            }}>
                <h2 style={{ textAlign: 'center', color: '#FF6F61' }}>Customize</h2>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['FRAME', 'STICKERS', 'TEXT'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>

                    {/* FRAME TAB */}
                    {activeTab === 'FRAME' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            {patterns.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => setFrameStyle(p)}
                                    style={{
                                        height: '80px',
                                        borderRadius: '8px',
                                        border: frameStyle.id === p.id ? '3px solid #FF6F61' : '1px solid #ddd',
                                        cursor: 'pointer',
                                        ...p.style
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* STICKERS TAB */}
                    {activeTab === 'STICKERS' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                {stickers.map(s => (
                                    <div
                                        key={s.id}
                                        onClick={() => addSticker(s)}
                                        style={{
                                            fontSize: '30px',
                                            textAlign: 'center',
                                            padding: '10px',
                                            background: '#fff',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {s.emoji}
                                    </div>
                                ))}
                            </div>

                            {selectedId && (
                                <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>
                                        Sticker Size
                                    </label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="3"
                                        step="0.1"
                                        value={placedStickers.find(s => s.id === selectedId)?.scale || 1}
                                        onChange={(e) => {
                                            const newScale = parseFloat(e.target.value);
                                            setPlacedStickers(prev => prev.map(s => s.id === selectedId ? { ...s, scale: newScale } : s));
                                        }}
                                        style={{ width: '100%', accentColor: '#FF6F61' }}
                                    />
                                    <label style={{ display: 'block', margin: '12px 0 10px', fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>
                                        Rotation ({placedStickers.find(s => s.id === selectedId)?.rotation || 0}°)
                                    </label>
                                    <input
                                        type="range"
                                        min="-180"
                                        max="180"
                                        step="5"
                                        value={placedStickers.find(s => s.id === selectedId)?.rotation || 0}
                                        onChange={(e) => {
                                            const rotation = parseInt(e.target.value, 10);
                                            setPlacedStickers(prev => prev.map(s => s.id === selectedId ? { ...s, rotation } : s));
                                        }}
                                        onDoubleClick={() => setPlacedStickers(prev => prev.map(s => s.id === selectedId ? { ...s, rotation: 0 } : s))}
                                        title="Double-click to reset"
                                        style={{ width: '100%', accentColor: '#FF6F61' }}
                                    />
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                        <button
                                            onClick={() => bringToFront(selectedId)}
                                            style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ddd', background: '#fafafa', cursor: 'pointer', fontSize: '0.8rem' }}
                                        >
                                            ⬆ Bring to Front
                                        </button>
                                        <button
                                            onClick={() => sendToBack(selectedId)}
                                            style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ddd', background: '#fafafa', cursor: 'pointer', fontSize: '0.8rem' }}
                                        >
                                            ⬇ Send to Back
                                        </button>
                                    </div>
                                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                                        <button
                                            onClick={() => {
                                                setPlacedStickers(prev => prev.filter(s => s.id !== selectedId));
                                                setSelectedId(null);
                                            }}
                                            style={{ color: 'white', background: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}
                                        >
                                            Delete Sticker
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TEXT TAB */}
                    {activeTab === 'TEXT' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Text Input */}
                            <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>
                                    Your Text
                                </label>
                                <textarea
                                    value={stripText}
                                    onChange={(e) => setStripText(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) e.preventDefault(); }}
                                    placeholder="e.g. Best Friends Forever ✨"
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '0.95rem',
                                        fontFamily: textFont,
                                        color: textColor,
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        resize: 'none',
                                        lineHeight: '1.5'
                                    }}
                                />
                            </div>

                            {/* Font Picker */}
                            <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>
                                    Font
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                                    {FONTS.map(f => (
                                        <div
                                            key={f.name}
                                            onClick={() => setTextFont(f.name)}
                                            style={{
                                                padding: '10px 14px',
                                                borderRadius: '8px',
                                                border: textFont === f.name ? '2px solid #FF6F61' : '1px solid #eee',
                                                background: textFont === f.name ? '#FFF0EE' : '#fafafa',
                                                cursor: 'pointer',
                                                fontFamily: f.name,
                                                fontSize: '1.1rem',
                                                color: '#333'
                                            }}
                                        >
                                            {f.label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Color Picker */}
                            <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>
                                    Color
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                                    {TEXT_COLORS.map(c => (
                                        <div
                                            key={c}
                                            onClick={() => setTextColor(c)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                background: c,
                                                border: textColor === c ? '3px solid #FF6F61' : '2px solid #ddd',
                                                cursor: 'pointer',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <label style={{ fontSize: '0.85rem', color: '#888' }}>Custom:</label>
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={{ width: '40px', height: '30px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>

                            {/* Alignment */}
                            <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#666', fontSize: '0.9rem' }}>
                                    Alignment
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[
                                        { value: 'left', icon: '⬅' },
                                        { value: 'center', icon: '↔' },
                                        { value: 'right', icon: '➡' }
                                    ].map(a => (
                                        <button
                                            key={a.value}
                                            onClick={() => setTextAlign(a.value)}
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                borderRadius: '8px',
                                                border: 'none',
                                                background: textAlign === a.value ? '#FF6F61' : '#eee',
                                                color: textAlign === a.value ? 'white' : '#666',
                                                cursor: 'pointer',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            {a.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={handleDownload} className="btn-primary" style={{ width: '100%', background: '#4CAF50', animation: 'none' }}>
                        Download Image
                    </button>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={onBack} style={{ flex: 1, padding: '15px', borderRadius: '50px', border: 'none', background: '#ccc' }}>
                            Back
                        </button>
                        <button onClick={onFinish} style={{ flex: 1, padding: '15px', borderRadius: '50px', border: 'none', background: '#FF6F61', color: 'white' }}>
                            Finish (Reset)
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CustomizeScreen;
