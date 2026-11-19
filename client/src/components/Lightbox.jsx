import React, { useEffect } from 'react';

/**
 * Full-screen image preview. Closes on backdrop click or Escape;
 * ArrowLeft / ArrowRight navigate between images.
 */
const Lightbox = ({ src, caption, onClose, onPrev, onNext }) => {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
            if (e.key === 'ArrowRight' && onNext) onNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose, onPrev, onNext]);

    const navBtn = {
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none',
        fontSize: '2rem', width: '56px', height: '56px', borderRadius: '50%', cursor: 'pointer'
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000
            }}
        >
            <img
                src={src}
                alt={caption}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
            />
            {caption && <p style={{ color: '#ddd', marginTop: '12px', fontSize: '0.9rem' }}>{caption}</p>}

            {onPrev && (
                <button aria-label="Previous" style={{ ...navBtn, left: '20px' }} onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
            )}
            {onNext && (
                <button aria-label="Next" style={{ ...navBtn, right: '20px' }} onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
            )}
            <button
                aria-label="Close"
                onClick={onClose}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            >
                ×
            </button>
        </div>
    );
};

export default Lightbox;
