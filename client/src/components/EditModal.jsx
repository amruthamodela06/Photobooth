import React from 'react';

const EditModal = ({ isOpen, onClose, photo, editing, onEditChange, onSave }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 100,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div className="glass-panel" style={{ padding: '30px', maxWidth: '500px', width: '90%' }}>
                <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', color: '#FF6F61' }}>Adjust Photo</h2>

                <div style={{ marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                        src={photo}
                        alt="Editing"
                        style={{
                            width: '100%',
                            filter: `brightness(${editing.brightness}%) contrast(${editing.contrast}%)`
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label>
                        Brightness: {editing.brightness}%
                        <input
                            type="range" min="50" max="150" value={editing.brightness}
                            onChange={(e) => onEditChange({ ...editing, brightness: e.target.value })}
                            style={{ width: '100%', accentColor: '#FF6F61' }}
                        />
                    </label>
                    <label>
                        Contrast: {editing.contrast}%
                        <input
                            type="range" min="50" max="150" value={editing.contrast}
                            onChange={(e) => onEditChange({ ...editing, contrast: e.target.value })}
                            style={{ width: '100%', accentColor: '#FF6F61' }}
                        />
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button onClick={onClose} style={{ flex: 1, padding: '10px', background: '#ccc', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={onSave} className="btn-primary" style={{ flex: 1, padding: '10px', fontSize: '1rem' }}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
