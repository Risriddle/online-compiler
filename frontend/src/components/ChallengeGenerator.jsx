







import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wheel from './Wheel.jsx';
import './ChallengeGenerator.css';

const topics = [
  'Algorithms',
  'Machine Learning',
  'Web Development',
  'Data Structures',
  'Mobile Development',
  'Database Design'
];

function ChallengeGenerator() {
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();

  const generateChallenge = async (topic) => {
    setLoading(true);
    setSelectedTopic(topic);
    try {
      // console.log(topic,"-------------------------")
      const response = await axios.post('https://online-compiler-backend-vjkg.onrender.com/generate-challenge',{topic:selectedTopic});
      setChallenge(response.data.challenge);
    } catch (error) {
      console.error('Error generating challenge:', error);
    }
    setLoading(false);
  };

  return (
    <div className="challenge-generator">
      <h2>🎡 Code Roulette</h2>
      
      <Wheel segments={topics} onSelectSegment={generateChallenge} />
      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : challenge ? (
        <div className="challenge-output">
          <h3>Programming Challenge: {selectedTopic}</h3>
          <pre>{challenge}</pre>
          <button onClick={() => navigate('/')} className="secondary">Back to Editor</button>
        </div>
      ) : null}
    </div>
  );
}

export default ChallengeGenerator;



