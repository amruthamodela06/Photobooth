import React from 'react';
import { filters } from '../utils/filters';

/**
 * FilterDrawer — Horizontal scrollable filter selector.
 * Includes a filter intensity slider that scales the CSS filter strength
 * between 0% (no effect) and 100% (full effect) using opacity on a tinted overlay.
 */
const FilterDrawer = ({ currentFilter, onSelect, intensity = 100, onIntensityChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
            {/* Filter chip row */}
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '15px',
                flex: 1,
                alignItems: 'center',
                padding: '0 10px'
            }}>
                {filters.map((f) => (
                    <div
                        key={f.name}
                        onClick={() => onSelect(f)}
                        style={{
                            flexShrink: 0,
                            width: '70px',
                            height: '70px',
                            borderRadius: '12px',
                            background: '#eee',
                            border: currentFilter.name === f.name ? '3px solid #ff4081' : '3px solid transparent',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'transform 0.15s ease',
                            transform: currentFilter.name === f.name ? 'scale(1.08)' : 'scale(1)'
                        }}
                    >
                        <div style={{
                            width: '100%', height: '100%',
                            background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
                            ...f.style
                        }} />
                        <span style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'rgba(0,0,0,0.5)', color: 'white',
                            fontSize: '10px', textAlign: 'center', padding: '2px'
                        }}>
                            {f.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Intensity slider — only shown when a filter is active */}
            {currentFilter.name !== 'Original' && onIntensityChange && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px' }}>
                    <span style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap' }}>Intensity</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={intensity}
                        onChange={(e) => onIntensityChange(Number(e.target.value))}
                        style={{ flex: 1, accentColor: '#ff4081' }}
                    />
                    <span style={{ fontSize: '11px', color: '#888', minWidth: '30px' }}>{intensity}%</span>
                </div>
            )}
        </div>
    );
};

export default FilterDrawer;
