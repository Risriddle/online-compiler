// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './CodeShare.css';

// export default function CodeShare() {
//   const [code, setCode] = useState('');
//   const [sharedUrl, setSharedUrl] = useState('');
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       fetchSharedCode(id);
//     }
//   }, [id]);

//   const fetchSharedCode = async (shareId) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/share/${shareId}`);
//       setCode(response.data.code);
//     } catch (error) {
//       console.error('Error fetching shared code:', error);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/share', { code });
//       setSharedUrl(`${window.location.origin}/share/${response.data.id}`);
//     } catch (error) {
//       console.error('Error sharing code:', error);
//     }
//   };

//   const handleCodeChange = (e) => {
//     setCode(e.target.value);
//     setSharedUrl('');
//   };

//   return (
//     <div className="code-share">
//       <h2>📋 Code Sharing</h2>
//       <textarea
//         value={code}
//         onChange={handleCodeChange}
//         placeholder="Paste your code here..."
//       />
//       <div className="button-group">
//         <button onClick={handleShare} disabled={!code}>Share Code</button>
//         <button onClick={() => navigate('/')} className="secondary">Back to Editor</button>
//       </div>
//       {sharedUrl && (
//         <div className="shared-url">
//           <p>Your shared code URL:</p>
//           <input type="text" value={sharedUrl} readOnly />
//           <button onClick={() => navigator.clipboard.writeText(sharedUrl)}>
//             Copy URL
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CodeShare.css';

export default function CodeShare() {
  const [code, setCode] = useState('');
  const [sharedUrl, setSharedUrl] = useState('');
  const [copyConfirmation, setCopyConfirmation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchSharedCode(id);
    }
  }, [id]);

  const fetchSharedCode = async (shareId) => {
    try {
      const response = await axios.get(`https://online-compiler-backend-vjkg.onrender.com/share/${shareId}`);
      setCode(response.data.code);
    } catch (error) {
      console.error('Error fetching shared code:', error);
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post('https://online-compiler-backend-vjkg.onrender.com/share', { code });
      setSharedUrl(`${window.location.origin}/share/${response.data.id}`);
    } catch (error) {
      console.error('Error sharing code:', error);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setSharedUrl('');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(sharedUrl);
    setCopyConfirmation(true);
    setTimeout(() => setCopyConfirmation(false), 2000); // Hide confirmation after 2 seconds
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(sharedUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="code-share">
      <h2>📋 Code Sharing</h2>
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Paste your code here..."
      />
      <div className="button-group">
        <button onClick={handleShare} disabled={!code}>Share Code</button>
        <button onClick={() => navigate('/')} className="secondary">Back to Editor</button>
      </div>
      {sharedUrl && (
        <div className="shared-url">
          <p>Your shared code URL:</p>
          <input type="text" value={sharedUrl} readOnly />
          <div className="url-buttons">
            <button onClick={handleCopyUrl}>Copy URL</button>
            <button onClick={handleShareWhatsApp}>Share</button>
          </div>
          {copyConfirmation && (
            <p className="copy-confirmation">URL copied to clipboard!</p>
          )}
        </div>
      )}
    </div>
  );
}


