import React from 'react';
import { filters } from '../utils/filters';

const FilterDrawer = ({ currentFilter, onSelect }) => {
    return (
        <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '15px',
            height: '100%',
            alignItems: 'center',
            padding: '0 10px'
        }}>
            {filters.map((f) => (
                <div
                    key={f.name}
                    onClick={() => onSelect(f)}
                    style={{
                        flexShrink: 0,
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        background: '#eee',
                        border: currentFilter.name === f.name ? '3px solid #ff4081' : '3px solid transparent',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        position: 'relative'
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
    );
};

export default FilterDrawer;
