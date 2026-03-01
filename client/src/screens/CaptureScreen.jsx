import React, { useRef } from 'react';
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

    const filterStyle = {
        filter: `${currentFilter.style.filter || ''} brightness(${editing.brightness}%) contrast(${editing.contrast}%)`
    };

    const handleCapture = (dataUrl) => {
        setPhotos(prev => [...prev, dataUrl]);
    };

    const triggerCaptureSequence = () => {
        setPhotos([]); // Clear previous
        if (cameraRef.current) {
            // Dynamic photo count based on layout
            cameraRef.current.startSequence(layout?.photoCount || 3).then(() => {
                // Optional: Auto advance to review? For now let user click 'Done'
            });
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
                </div>

                {/* Filter Drawer */}
                <div style={{ height: '120px', marginTop: '10px' }}>
                    <FilterDrawer currentFilter={currentFilter} onSelect={setCurrentFilter} />
                </div>

                {/* Big Pulse Button */}
                <div style={{
                    position: 'absolute', bottom: '150px', left: '50%', transform: 'translateX(-50%)', zIndex: 20
                }}>
                    <button
                        onClick={triggerCaptureSequence}
                        style={{
                            width: '90px', height: '90px', borderRadius: '50%',
                            background: '#FF6F61', border: '5px solid white',
                            boxShadow: '0 0 20px rgba(0,0,0,0.2)', cursor: 'pointer',
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
