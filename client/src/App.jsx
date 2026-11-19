import React, { useState } from 'react'
import './App.css'
import { filters } from './utils/filters'
import { layouts } from './utils/layouts'
import WelcomeScreen from './screens/WelcomeScreen'
import LayoutSelectionScreen from './screens/LayoutSelectionScreen'
import CaptureScreen from './screens/CaptureScreen'
import CustomizeScreen from './screens/CustomizeScreen'
import GalleryScreen from './screens/GalleryScreen'

function App() {
    const [screen, setScreen] = useState('WELCOME');
    const [photos, setPhotos] = useState([]);
    const [currentLayout, setCurrentLayout] = useState(layouts[1]); // Default to 4-cut
    const [currentFilter, setCurrentFilter] = useState(filters[0]);
    const [editing, setEditing] = useState({ brightness: 100, contrast: 100 });

    const handleStart = () => setScreen('LAYOUT');

    const handleLayoutSelect = (layout) => {
        setCurrentLayout(layout);
        setScreen('CAPTURE');
    };

    const handleCaptureComplete = () => {
        setScreen('CUSTOMIZE');
    };

    const handleFinish = () => {
        // Save/Download logic handled inside CustomizeScreen for now
        setPhotos([]);
        setScreen('WELCOME');
    };

    return (
        <div className="app-container" style={{ padding: 0, height: '100vh', background: 'transparent' }}>
            {screen === 'WELCOME' && (
                <WelcomeScreen onStart={handleStart} onOpenGallery={() => setScreen('GALLERY')} />
            )}

            {screen === 'GALLERY' && (
                <GalleryScreen onBack={() => setScreen('WELCOME')} />
            )}

            {screen === 'LAYOUT' && (
                <LayoutSelectionScreen onSelectLayout={handleLayoutSelect} />
            )}

            {screen === 'CAPTURE' && (
                <CaptureScreen
                    layout={currentLayout}
                    onNext={handleCaptureComplete}
                    photos={photos}
                    setPhotos={setPhotos}
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                    editing={editing}
                    setEditing={setEditing}
                />
            )}

            {screen === 'CUSTOMIZE' && (
                <CustomizeScreen
                    photos={photos}
                    layout={currentLayout}
                    onBack={() => setScreen('CAPTURE')}
                    onFinish={handleFinish}
                />
            )}
        </div>
    )
}

export default App
