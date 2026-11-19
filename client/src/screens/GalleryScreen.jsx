import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';

const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const GalleryScreen = ({ onBack }) => {
    const [captures, setCaptures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCaptures = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.listCaptures();
            setCaptures(data.captures || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadCaptures(); }, [loadCaptures]);

    const handleDelete = async (filename) => {
        if (!window.confirm(`Delete ${filename}? This cannot be undone.`)) return;
        const previous = captures;
        setCaptures((prev) => prev.filter((c) => c.filename !== filename));
        try {
            await api.deleteCapture(filename);
        } catch (err) {
            setCaptures(previous); // roll back on failure
            setError(`Delete failed: ${err.message}`);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#FFF0F5' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 30px' }}>
                <button onClick={onBack} style={{ padding: '10px 20px', borderRadius: '50px', border: 'none', background: '#eee', cursor: 'pointer' }}>
                    ← Back
                </button>
                <h2 style={{ margin: 0, color: '#FF6F61' }}>Gallery ({captures.length})</h2>
                <button onClick={loadCaptures} style={{ padding: '10px 20px', borderRadius: '50px', border: 'none', background: '#FF6F61', color: 'white', cursor: 'pointer' }}>
                    ↻ Refresh
                </button>
            </header>

            <main style={{ flex: 1, overflowY: 'auto', padding: '0 30px 30px' }}>
                {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading captures…</p>}
                {error && <p style={{ textAlign: 'center', color: '#e53935' }}>Could not load gallery: {error}</p>}
                {!loading && !error && captures.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#888' }}>No photos yet — go take some!</p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                    {captures.map((c) => (
                        <figure key={c.filename} style={{ margin: 0, background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                            <img
                                src={api.captureFileUrl(c.filename)}
                                alt={c.filename}
                                loading="lazy"
                                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                            />
                            <figcaption style={{ padding: '8px 10px', fontSize: '0.75rem', color: '#666', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                                <span>{new Date(c.createdAt).toLocaleString()} · {formatSize(c.sizeBytes)}</span>
                                <button
                                    onClick={() => handleDelete(c.filename)}
                                    title="Delete photo"
                                    style={{ border: 'none', background: '#ffebee', color: '#e53935', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                    Delete
                                </button>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default GalleryScreen;
