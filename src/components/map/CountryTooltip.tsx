import React from 'react';

interface CountryTooltipProps {
  countryName: string;
  position: { x: number; y: number };
}

const CountryTooltip: React.FC<CountryTooltipProps> = ({ countryName, position }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: position.x + 10,
        top: position.y - 40,
        backgroundColor: 'white',
        color: '#333',
        padding: '8px 16px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        fontSize: '14px',
        fontWeight: '500',
        pointerEvents: 'none',
        zIndex: 1000,
        transition: 'opacity 0.2s ease',
        border: '1px solid #e0e0e0',
      }}
    >
      {countryName}
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: 8,
          height: 8,
          backgroundColor: 'white',
          borderRight: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
        }}
      />
    </div>
  );
};

export default CountryTooltip;