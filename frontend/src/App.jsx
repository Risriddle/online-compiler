


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CodeEditor from './components/CodeEditor';
import CodeRoulette from './components/ChallengeGenerator';
import CodeShare from './components/CodeShare';
import Home from './components/Home';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://online-compiler-backend-vjkg.onrender.com/snippets',{ method: 'GET', 
        headers: {
            'Content-Type': 'application/json', // Ensure this matches backend allowed headers
        },});
      const data = await response.json();
      setSnippets(data);
      // Simulate a loading delay
      setTimeout(() => setLoading(false), 7000); // 2 seconds delay
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>🎭 Funky Code Compiler</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/compiler">Code Compiler</Link>
            <Link to="/roulette">Code Roulette</Link>
            <Link to="/share">Code Sharer</Link>
          </nav>
        </header>

        <main>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compiler" element={<CodeEditor snippets={snippets} />} />
              <Route path="/roulette" element={<CodeRoulette />} />
              <Route path="/share" element={<CodeShare />} />
              <Route path="/share/:id" element={<CodeShare />} />
            </Routes>
          )}
        </main>
        <footer>
          <p>© 2024 Funky Code Compiler. May your bugs be few and your laughs be many! 🎉</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
