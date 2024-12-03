



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaSun, FaMoon } from 'react-icons/fa';
// import './CodeEditor.css';

// function CodeEditor() {
//   const [code, setCode] = useState('');
//   const [language, setLanguage] = useState('choose language');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [explanation, setExplanation] = useState('');
//   const [darkMode, setDarkMode] = useState(false);
//   const [snippets, setSnippets] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   useEffect(() => {
//     document.body.className = darkMode ? 'dark-mode' : 'light-mode';
//     fetchSnippets();
//   }, [darkMode]);

//   useEffect(() => {
//     if (language === 'java') {
//       setCode(`public class Main {
//         public static void main(String[] args) {
//           //write code here
//         }
//       }`);
//     } else if (language === 'python') {
//       setCode('# Write your Python code here');
//     } else {
//       setCode('');
//     }
//   }, [language]);

//   const fetchSnippets = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/snippets');
//       setSnippets(response.data);
//     } catch (error) {
//       console.error('Error fetching snippets:', error);
//     }
//   };

//   const compileCode = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/compile', { code, language, input });
//       setOutput(response.data.output);
//     } catch (error) {
//       setOutput('Error compiling code');
//     }
//     setLoading(false);
//   };

// const explainCode = () => {
//  const explanations = [
//         "This code is like spaghetti - a tangled mess, but it works! 🍝",
//         "If this code were a superhero, its power would be confusion! 🦸‍♂️🤯",
//         "This code is a great example of why coffee is essential for debugging. ☕🐞",
//         "If this code had a theme song, it would be 'Oops!...I Did It Again.' 🎵",
//         "This code runs like a charm... a cursed one! 🧙‍♂️",
//         "Reading this code feels like solving a mystery novel with missing pages. 🔍📖",
//         "This code is what happens when optimism meets reality. 🌈💥",
//         "If this code were a painting, it would be modern art - abstract and open to interpretation. 🎨",
//         "This code is a time machine - it sends you back to square one! ⏳🔁",
//         "Debugging this code feels like taming a wild beast. 🐉",
//         "This code is the epitome of 'if it ain't broke, don't fix it.' 🛠️",
//         "This code is the Bermuda Triangle of logic - things disappear without explanation. 🌊🔺",
//         "This code is like a joke you don’t quite get, but you laugh anyway. 😂",
//         "This code is like a puzzle where none of the pieces fit together. 🧩",
//         "If this code were a person, it would be the class clown - always causing trouble! 🤡",
//         "This code could be a contestant on 'Who Wants to Confuse a Developer?' 🏆",
//         "If this code were a recipe, it would call for 'a dash of chaos.' 🥄",
//         "This code has more mysteries than an Agatha Christie novel. 🕵️‍♀️",
//         "This code is like a roller coaster - full of twists, turns, and unexpected drops. 🎢",
//         "If this code were a meme, it would be 'Everything is fine.' 🔥🐶",
//         "This code is a magician - it works, but nobody knows how or why. 🎩✨",
//         "This code is what happens when 'YOLO' becomes a programming philosophy. 😎",
//         "If bugs were currency, this code would make you a billionaire! 💰🐛",
//         "This code is like an onion - the deeper you go, the more it makes you cry. 🧅😭",
//     ];
//     setExplanation(explanations[Math.floor(Math.random() * explanations.length)]);
// };

//   const resetCode = () => { setCode(''); }; 
//   const resetOutput = () => { setOutput(''); setExplanation(''); };

//   return (
//     <div className="code-editor">
//       <div className="header">
//         <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
//           <option value="choose language" disabled>Choose Language</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//         </select>
//         <button onClick={() => setDarkMode(!darkMode)} className="mode-switch">
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>
//       </div>
//       <div className="editor-container">
//         <div className="code-section">
//           <textarea
//             className="code-area"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Write your code here..."
//           />
//           <div className="button-group">
//             <button onClick={compileCode} className="compile-button">Compile</button>
//             <button onClick={explainCode} className="explain-button">Explain Code</button>
//             <button onClick={resetCode} className="explain-button">Reset</button>
//           </div>
//         </div>
//         <div className="input-section">
//           <textarea
//             className="input-area"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Provide inputs separated by commas, e.g., 'input1,input2'"
//           />
//         </div>
//         <div className="output-section">
//           {loading ? (
//             <div className="loading-spinner"></div>
//           ) : (
//             <div className="output">
//               <h3>Output</h3>
//               <pre>{output}</pre>
//             </div>
//           )}
//           <div className="button-group"> <button onClick={resetOutput} className="reset-button">Clear Output</button> </div>
//           {explanation && (
//             <div className="explanation">
//               <h3>Code Explanation:</h3>
//               <p>{explanation}</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="snippets">
//         <h3>Funny Snippets:</h3>
//         {snippets.map((snippet, index) => (
//           <div key={index} className="snippet" onClick={() => setCode(snippet.code)}>
//             <strong>{snippet.language}</strong>
//             <pre>{snippet.code}</pre>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CodeEditor;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import './CodeEditor.css';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('choose language');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    fetchSnippets();
  }, [darkMode]);

  useEffect(() => {
    if (language === 'java') {
      setCode(`public class Main {
        public static void main(String[] args) {
          //write code here
        }
      }`);
    } else if (language === 'python') {
      setCode('# Write your Python code here');
    } else {
      setCode('');
    }
  }, [language]);

  const fetchSnippets = async () => {
    try {
      const response = await axios.get('online-compiler-gquu9orzr-risriddles-projects.vercel.app/snippets');
      setSnippets(response.data);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    }
  };

  const compileCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('online-compiler-gquu9orzr-risriddles-projects.vercel.app/compile', { code, language, input });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error compiling code');
    }
    setLoading(false);
  };

const explainCode = () => {
 const explanations = [
        "This code is like spaghetti - a tangled mess, but it works! 🍝",
        "If this code were a superhero, its power would be confusion! 🦸‍♂️🤯",
        "This code is a great example of why coffee is essential for debugging. ☕🐞",
        "If this code had a theme song, it would be 'Oops!...I Did It Again.' 🎵",
        "This code runs like a charm... a cursed one! 🧙‍♂️",
        "Reading this code feels like solving a mystery novel with missing pages. 🔍📖",
        "This code is what happens when optimism meets reality. 🌈💥",
        "If this code were a painting, it would be modern art - abstract and open to interpretation. 🎨",
        "This code is a time machine - it sends you back to square one! ⏳🔁",
        "Debugging this code feels like taming a wild beast. 🐉",
        "This code is the epitome of 'if it ain't broke, don't fix it.' 🛠️",
        "This code is the Bermuda Triangle of logic - things disappear without explanation. 🌊🔺",
        "This code is like a joke you don’t quite get, but you laugh anyway. 😂",
        "This code is like a puzzle where none of the pieces fit together. 🧩",
        "If this code were a person, it would be the class clown - always causing trouble! 🤡",
        "This code could be a contestant on 'Who Wants to Confuse a Developer?' 🏆",
        "If this code were a recipe, it would call for 'a dash of chaos.' 🥄",
        "This code has more mysteries than an Agatha Christie novel. 🕵️‍♀️",
        "This code is like a roller coaster - full of twists, turns, and unexpected drops. 🎢",
        "If this code were a meme, it would be 'Everything is fine.' 🔥🐶",
        "This code is a magician - it works, but nobody knows how or why. 🎩✨",
        "This code is what happens when 'YOLO' becomes a programming philosophy. 😎",
        "If bugs were currency, this code would make you a billionaire! 💰🐛",
        "This code is like an onion - the deeper you go, the more it makes you cry. 🧅😭",
    ];
    setExplanation(explanations[Math.floor(Math.random() * explanations.length)]);
};

  const resetCode = () => { setCode(''); }; 
  const resetOutput = () => { setOutput(''); setExplanation(''); };
  const resetInput = () => { setInput(''); };

  return (
    <div className="code-editor">
      <div className="header">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
          <option value="choose language" disabled>Choose Language</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <button onClick={() => setDarkMode(!darkMode)} className="mode-switch">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="editor-container">
        <div className="code-section">
          <textarea
            className="code-area"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
          <div className="button-group">
            <button onClick={compileCode} className="compile-button">Compile</button>
            <button onClick={explainCode} className="explain-button">Explain Code</button>
            <button onClick={resetCode} className="reset-button">Reset Code</button>
          </div>
        </div>
        <div className="input-section">
          <textarea
            className="input-area"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Provide inputs separated by commas, e.g., 'input1,input2'"
          />
          <button onClick={resetInput} className="reset-button">Clear Input</button>
        </div>
        <div className="output-section">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="output">
              <h3>Output</h3>
              <pre>{output}</pre>
            </div>
          )}
          <div className="button-group">
            <button onClick={resetOutput} className="reset-button">Clear Output</button>
          </div>
          {explanation && (
            <div className="explanation">
              <h3>Code Explanation:</h3>
              <p>{explanation}</p>
            </div>
          )}
        </div>
      </div>
      <div className="snippets">
        <h3>Funny Snippets:</h3>
        {snippets.map((snippet, index) => (
          <div key={index} className="snippet" onClick={() => setCode(snippet.code)}>
            <strong>{snippet.language}</strong>
            <pre>{snippet.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeEditor;
