import React, { useState, useEffect } from 'react';
import './Wheel.css';

const Wheel = ({ segments, onSelectSegment }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (!spinning) {
      const newRotation = rotation + 360 * 5 + Math.random() * 360;
      setRotation(newRotation);
      setSpinning(true);
    }
  };

  useEffect(() => {
    if (spinning) {
      const timer = setTimeout(() => {
        setSpinning(false);
        const selectedIndex = Math.floor((rotation % 360) / (360 / segments.length));
        onSelectSegment(segments[selectedIndex]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [spinning, rotation, segments, onSelectSegment]);

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {segments.map((segment, index) => (
          <div
            key={index}
            className="segment"
            style={{
              transform: `rotate(${index * (360 / segments.length)}deg)`,
              clipPath: `polygon(0 0, 100% 0, 100% 100%)`,
            }}
          >
            <span>{segment}</span>
          </div>
        ))}
      </div>
      <div className="arrow"></div>
      <button onClick={spinWheel} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
     
    </div>
  );
};

export default Wheel;



