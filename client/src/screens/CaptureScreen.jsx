import React, { useRef, useState } from 'react';
import CameraFeed from '../components/CameraFeed';
import PhotoStrip from '../components/PhotoStrip';
import FilterDrawer from '../components/FilterDrawer';

const CaptureScreen = ({
    layout,
    onNext,
    photos,
    setPhotos,
    currentFilter,
    setCurrentFilter,
    editing,
    setEditing
}) => {
    const cameraRef = useRef(null);
    const [countdownSeconds, setCountdownSeconds] = useState(3);
    const [isCapturing, setIsCapturing] = useState(false);
    const totalShots = layout?.photoCount || 3;

    const filterStyle = {
        filter: `${currentFilter.style.filter || ''} brightness(${editing.brightness}%) contrast(${editing.contrast}%)`
    };

    const handleCapture = (dataUrl) => {
        setPhotos(prev => [...prev, dataUrl]);
    };

    const triggerCaptureSequence = async () => {
        if (isCapturing || !cameraRef.current) return; // ignore double-clicks mid-sequence
        setPhotos([]); // Clear previous
        setIsCapturing(true);
        try {
            // Dynamic photo count based on layout
            await cameraRef.current.startSequence(totalShots, { countdownSeconds });
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}>
            {/* Main Stage (Camera) */}
            <div className="glass-panel" style={{ flex: 3, position: 'relative', overflow: 'hidden', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
                    <CameraFeed
                        ref={cameraRef}
                        filterStyle={filterStyle}
                        onPhotoTaken={handleCapture}
                    />
                    {/* Overlay Grid lines (Optional) */}
                    <div style={{
                        position: 'absolute', top: 0, left: '33%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute', top: 0, left: '66%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none'
                    }} />

                    {/* Countdown timer selector */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', zIndex: 10 }}>
                        {[3, 5, 10].map(s => (
                            <button
                                key={s}
                                onClick={() => setCountdownSeconds(s)}
                                style={{
                                    padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                    background: countdownSeconds === s ? '#FF6F61' : 'rgba(0,0,0,0.45)',
                                    color: 'white', fontWeight: 'bold', fontSize: '0.8rem'
                                }}
                            >
                                {s}s
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Drawer */}
                <div style={{ height: '120px', marginTop: '10px' }}>
                    <FilterDrawer currentFilter={currentFilter} onSelect={setCurrentFilter} />
                </div>

                {/* Big Pulse Button */}
                <div style={{
                    position: 'absolute', bottom: '150px', left: '50%', transform: 'translateX(-50%)', zIndex: 20,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                }}>
                    {isCapturing && (
                        <span style={{ background: 'rgba(0,0,0,0.55)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                            Shot {Math.min(photos.length + 1, totalShots)} of {totalShots}
                        </span>
                    )}
                    <button
                        onClick={triggerCaptureSequence}
                        disabled={isCapturing}
                        aria-label={isCapturing ? 'Capturing…' : 'Start capture'}
                        style={{
                            width: '90px', height: '90px', borderRadius: '50%',
                            background: '#FF6F61', border: '5px solid white',
                            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                            cursor: isCapturing ? 'not-allowed' : 'pointer',
                            opacity: isCapturing ? 0.5 : 1,
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Side Stage (Strip & Actions) */}
            <div className="glass-panel" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <h3 style={{ margin: '0 0 20px 0', textAlign: 'center', color: '#666' }}>Preview</h3>
                <PhotoStrip photos={photos} filterStyle={filterStyle} layout={layout} />

                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', paddingTop: '20px' }}>
                    <button className="btn-primary" onClick={onNext} style={{ width: '100%', background: '#4CAF50' }}>
                        Finish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CaptureScreen;
