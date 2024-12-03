import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="ui-abstergo">
      <div className="abstergo-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="ui-text">
        Synchronization
        <div className="ui-dot"></div>
        <div className="ui-dot"></div>
        <div className="ui-dot"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
