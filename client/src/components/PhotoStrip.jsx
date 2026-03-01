import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import html2canvas from 'html2canvas';

const PhotoStrip = forwardRef(({ photos, filterStyle, layout, frameStyle, stickers = [], onStickerMouseDown, selectedId, stripText, textFont, textColor, textAlign }, ref) => {
    const stripRef = useRef(null);

    const downloadStrip = async () => {
        if (!stripRef.current) return;
        try {
            const canvas = await html2canvas(stripRef.current, { useCORS: true, scale: 3 }); // High Res
            const link = document.createElement('a');
            link.download = `cute-snap-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("Failed to generate strip", err);
        }
    };

    useImperativeHandle(ref, () => ({
        download: downloadStrip,
        getElement: () => stripRef.current
    }));

    // Ensure we have the correct number of slots based on layout
    const count = layout?.photoCount || 3;
    const slots = Array.from({ length: count }, (_, i) => i);

    return (
        <div className="photo-strip-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div
                ref={stripRef}
                className="photo-strip"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    padding: '25px',
                    background: '#fff', // Default fallback
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '2px',
                    width: '100%',
                    maxWidth: '280px',
                    position: 'relative', // needed for absolute sticker positioning
                    ...frameStyle // Apply custom patterns/colors here
                }}
            >
                <div style={{ textAlign: 'center', color: '#ff6f61', fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'Cursive, sans-serif' }}>
                    Photobooth
                </div>

                {slots.map((idx) => {
                    const img = photos[idx];
                    return (
                        <div key={idx} style={{
                            flex: 1,
                            background: '#f0f0f0',
                            border: '2px dashed #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {img ? (
                                <img
                                    src={img}
                                    alt={`Slot ${idx}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', ...filterStyle }}
                                />
                            ) : (
                                <span style={{ color: '#ccc', fontSize: '24px' }}>+</span>
                            )}
                        </div>
                    );
                })}

                {stripText ? (
                    <div style={{
                        textAlign: textAlign || 'center',
                        color: textColor || '#333',
                        fontFamily: textFont || 'inherit',
                        fontSize: '1rem',
                        padding: '4px 0',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {stripText}
                    </div>
                ) : null}

                {stickers.map(s => (
                    <div
                        key={s.id}
                        onMouseDown={(e) => { e.stopPropagation(); onStickerMouseDown?.(s.id); }}
                        style={{
                            position: 'absolute',
                            top: `${s.y}%`,
                            left: `${s.x}%`,
                            transform: `translate(-50%, -50%) scale(${s.scale || 1})`,
                            fontSize: '40px',
                            cursor: 'grab',
                            userSelect: 'none',
                            zIndex: 100,
                            border: selectedId === s.id ? '2px dashed #000' : 'none',
                            borderRadius: '8px',
                            padding: '5px'
                        }}
                    >
                        {s.emoji}
                    </div>
                ))}
            </div>

            {/* If we're on the review screen (or just want the button here) */}
            {photos.length > 0 && !ref && (
                <button
                    onClick={downloadStrip}
                    className="btn-primary"
                    style={{ width: '100%', fontSize: '1rem', padding: '10px', marginTop: '10px' }}
                >
                    Download
                </button>
            )}
        </div>
    );
});

export default PhotoStrip;
