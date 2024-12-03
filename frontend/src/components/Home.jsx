import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      
      <header className="home-header">
        <h1>🎭 Welcome to Funky Code Compiler</h1>
        <p>Where code meets fun and creativity!</p>
      </header>
      <div className="home-content">
        <div className="card">
          <h2>✨ Code Editor</h2>
          <p>Write, compile, and debug your code effortlessly.</p>
          <Link to="/compiler" className="home-button">Get Started</Link>
        </div>
        <div className="card">
          <h2>🎡 Code Roulette</h2>
          <p>Spin the wheel and try random coding challenges.</p>
          <Link to="/roulette" className="home-button">Play Now</Link>
        </div>
        <div className="card">
          <h2>🔗 Code Sharer</h2>
          <p>Share your code with friends and colleagues easily.</p>
          <Link to="/share" className="home-button">Share Code</Link>
        </div>
      </div>
      
    </div>
  );
}

export default Home;

