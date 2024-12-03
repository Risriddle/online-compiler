
// import React, { useState } from 'react';
// import axios from 'axios';
// import './ChallengeGenerator.css';
// import  {useNavigate } from 'react-router-dom';
// function ChallengeGenerator() {
//   const [challenge, setChallenge] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const generateChallenge = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/generate-challenge');
//       setChallenge(response.data.challenge);
//     } catch (error) {
//       console.error('Error generating challenge:', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="challenge-generator">

//       <h2>🎡 Code Roulette</h2>
 
//       <button onClick={generateChallenge} className="generate-challenge-button">
//       Spin the Wheel of Code!
//       </button>
//       {loading ? (
//         <div className="loading-spinner"></div>
//       ) : (
//         <div className="challenge-output">
//           <h3>Programming Challenge:</h3>
//           <pre>{challenge}</pre>
         
//           <button onClick={() => navigate('/')} className="secondary">Back to Editor</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChallengeGenerator;





// import React, { useState } from 'react';
// import axios from 'axios';
// import './ChallengeGenerator.css';
// import { useNavigate } from 'react-router-dom';

// function ChallengeGenerator() {
//   const [challenge, setChallenge] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [wheelSpinning, setWheelSpinning] = useState(false);
//   const navigate = useNavigate();

//   const generateChallenge = async () => {
//     setLoading(true);
//     setWheelSpinning(true);
//     try {
//       // Simulate a delay to mimic the spinning effect
//       setTimeout(async () => {
//         const response = await axios.post('http://localhost:3000/generate-challenge');
//         setChallenge(response.data.challenge);
//         setWheelSpinning(false);
//       }, 3000); // Adjust the delay as needed
//     } catch (error) {
//       console.error('Error generating challenge:', error);
//       setWheelSpinning(false);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="challenge-generator">
//       <h2>🎡 Code Roulette</h2>

//       <button onClick={generateChallenge} className="generate-challenge-button" disabled={wheelSpinning}>
//         {wheelSpinning ? 'Spinning...' : 'Spin the Wheel of Code!'}
//       </button>

//       <div className="wheel-container">
//         {/* Spinning wheel animation */}
//         <div className={`wheel ${wheelSpinning ? 'spinning' : ''}`}>
//           <div className="segment">Algorithm</div>
//           <div className="segment">Data Structures</div>
//           <div className="segment">System Design</div>
//           <div className="segment">Web Development</div>
//           <div className="segment">Machine Learning</div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading-spinner"></div>
//       ) : (
//         <div className="challenge-output">
//           <h3>Programming Challenge:</h3>
//           <pre>{challenge}</pre>
          
//           <button onClick={() => navigate('/')} className="secondary">Back to Editor</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChallengeGenerator;





// import React, { useState } from 'react';
// import axios from 'axios';
// import './ChallengeGenerator.css';
// import { useNavigate } from 'react-router-dom';

// function ChallengeGenerator() {
//   const [challenge, setChallenge] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [wheelSpinning, setWheelSpinning] = useState(false);
//   const navigate = useNavigate();

//   const generateChallenge = async () => {
//     setLoading(true);
//     setWheelSpinning(true);
//     try {
//       // Simulate a delay to mimic the spinning effect
//       setTimeout(async () => {
//         const response = await axios.post('http://localhost:3000/generate-challenge');
//         setChallenge(response.data.challenge);
//         setWheelSpinning(false);
//       }, 3000); // Adjust the delay as needed
//     } catch (error) {
//       console.error('Error generating challenge:', error);
//       setWheelSpinning(false);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="challenge-generator">
//       <h2>🎡 Code Roulette</h2>

//       <button onClick={generateChallenge} className="generate-challenge-button" disabled={wheelSpinning}>
//         {wheelSpinning ? 'Spinning...' : 'Spin the Wheel of Code!'}
//       </button>

//       <div className="wheel-container">
//         <div className={`wheel ${wheelSpinning ? 'spinning' : ''}`}>
//           <div className="segment">Algorithm</div>
//           <div className="segment">Data Structures</div>
//           <div className="segment">System Design</div>
//           <div className="segment">Web Development</div>
//           <div className="segment">Machine Learning</div>
//         </div>
//         <div className="arrow"></div>
//       </div>

//       {loading ? (
//         <div className="loading-spinner"></div>
//       ) : (
//         <div className="challenge-output">
//           <h3>Programming Challenge:</h3>
//           <pre>{challenge}</pre>
          
//           <button onClick={() => navigate('/')} className="secondary">Back to Editor</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChallengeGenerator;



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
      const response = await axios.post('online-compiler-gquu9orzr-risriddles-projects.vercel.app/generate-challenge',{topic:selectedTopic});
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



