import React from 'react';
import { filters } from '../utils/filters';

const FilterControls = ({ currentFilter, onFilterChange, editing, onEditChange }) => {
    return (
        <div className="filter-controls">
            <h3>Filters</h3>
            <div className="filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {filters.map((f) => (
                    <button
                        key={f.name}
                        onClick={() => onFilterChange(f)}
                        style={{
                            background: currentFilter.name === f.name ? '#ff4081' : '#444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        {f.name}
                    </button>
                ))}
            </div>

            <h3>Edit</h3>
            <div className="edit-sliders" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                    Brightness: {editing.brightness}%
                    <input
                        type="range"
                        min="50"
                        max="150"
                        value={editing.brightness}
                        onChange={(e) => onEditChange({ ...editing, brightness: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </label>
                <label>
                    Contrast: {editing.contrast}%
                    <input
                        type="range"
                        min="50"
                        max="150"
                        value={editing.contrast}
                        onChange={(e) => onEditChange({ ...editing, contrast: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </label>
            </div>
        </div>
    );
};

export default FilterControls;
