
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import Google Generative AI
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'https://online-compiler-frontend-orcin.vercel.app', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const codeSchema = new mongoose.Schema({
  code: String,
  language: String,
  output: String,
});

const sharedCodeSchema = new mongoose.Schema({
  id: String,
  code: String,
});

const Code = mongoose.model('Code', codeSchema);
const SharedCode = mongoose.model('SharedCode', sharedCodeSchema);

// app.post('/compile', async (req, res) => {
//   const { code, language, input } = req.body;
//   let output = '';
//   let fileName = '';
//   let executionCommand = '';

//   try {
//     const tempDir = path.join(__dirname, 'temp');
    
//     // Ensure the temp directory exists
//     await fs.mkdir(tempDir, { recursive: true });

//     switch (language) {
      
//       case 'python':
//         fileName = 'code.py';
//         executionCommand = `python3 ${fileName}`;
//         break;
//       case 'java':
//         const classNameMatch = code.match(/public class (\w+)/);
//         if (classNameMatch) {
//           fileName = `${classNameMatch[1]}.java`;
//           executionCommand = `java ${classNameMatch[1]}`;
//         } else {
//           fileName = 'Main.java';
//           executionCommand = 'java Main';
//           code = `public class Main {
//             public static void main(String[] args) {
//               ${code}
//             }
//           }`;
//         }
//         break;
//       default:
//         throw new Error('Unsupported language');
//     }

//     const filePath = path.join(tempDir, fileName);
//     await fs.writeFile(filePath, code);

//     if (language === 'java') {
//       // Compile Java code first
//       await new Promise((resolve, reject) => {
//         exec(`javac ${filePath}`, (error, stdout, stderr) => {
//           if (error) reject(stderr || error.message);
//           else resolve(stdout);
//         });
//       });
//     }

//     // Execute the code
//     output = await new Promise((resolve, reject) => {
//       const child = exec(`${executionCommand}`, { cwd: tempDir, timeout: 5000 }, (error, stdout, stderr) => {
//         if (error) reject(stderr || error.message);
//         else resolve(stdout);
//       });

//       if (input) {
//         child.stdin.write(input);
//         child.stdin.end();
//       }
//     });






app.post('/compile', async (req, res) => {
  const { code, language, input } = req.body;
  let output = '';
  let fileName = '';
  let executionCommand = '';

  try {
    const tempDir = path.join(__dirname, 'temp');
    
    // Ensure the temp directory exists
    await fs.mkdir(tempDir, { recursive: true });

    switch (language) {
      case 'python':
        fileName = 'code.py';
        executionCommand = `python3 ${fileName}`;
        break;
      case 'java':
        const classNameMatch = code.match(/public class (\w+)/);
        if (classNameMatch) {
          fileName = `${classNameMatch[1]}.java`;
          executionCommand = `java ${classNameMatch[1]}`;
        } else {
          fileName = 'Main.java';
          executionCommand = 'java Main';
          code = `public class Main {
            public static void main(String[] args) {
              ${code}
            }
          }`;
        }
        break;
      default:
        throw new Error('Unsupported language');
    }

    const filePath = path.join(tempDir, fileName);
    await fs.writeFile(filePath, code);

    if (language === 'java') {
      // Compile Java code first
      await new Promise((resolve, reject) => {
        exec(`javac ${filePath}`, (error, stdout, stderr) => {
          if (error) reject(stderr || error.message);
          else resolve(stdout);
        });
      });
    }

    // Execute the code
    output = await new Promise((resolve, reject) => {
      const child = exec(`${executionCommand}`, { cwd: tempDir, timeout: 5000 }, (error, stdout, stderr) => {
        if (error) reject(stderr || error.message);
        else resolve(stdout);
      });

      if (input) {
        const inputs = Array.isArray(input) ? input : input.split(',');
        inputs.forEach((inp) => child.stdin.write(`${inp}\n`));
        child.stdin.end();
      }
    });

    



    // Clean up: remove the temporary file
    await fs.unlink(filePath);
    if (language === 'java') {
      await fs.unlink(path.join(tempDir, fileName.replace('.java', '.class')));
    }
  } catch (error) {
    console.error(`Compilation error: ${error}`);
    output = `Error: ${error}`;
  }

  const newCode = new Code({ code, language, output });
  await newCode.save();

  res.json({ output });
});




// Add a new endpoint to generate programming challenges
app.post('/generate-challenge', async (req, res) => {
  const topic=req.body;
  console.log(topic['topic'],"----------------------");
  const prompt = `
    Generate a programming challenge with the following details:
    1. A coding question related to ${topic}
    2. A hint to solve the question
    3. Sample input and output

  `;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    res.json({ challenge: result.response.text() });
  } catch (error) {
    console.error("Error generating challenge:", error);
    res.status(500).json({ error: "Failed to generate challenge" });
  }
});

// Add a new endpoint to share code
app.post('/share', async (req, res) => {
  const { code } = req.body;
  const id = uuidv4();
  const sharedCode = new SharedCode({ id, code });
  await sharedCode.save();
  res.json({ id });
});

app.get('/share/:id', async (req, res) => {
  const { id } = req.params;
  const sharedCode = await SharedCode.findOne({ id });
  if (sharedCode) {
    res.json({ code: sharedCode.code });
  } else {
    res.status(404).json({ error: 'Shared code not found' });
  }
});



app.get('/snippets', async (req, res) => {
  const snippets = [
    
    { language: 'python', code: 'print("Why do Python developers wear glasses? Because they can\'t C#! ")' },
    { language: 'java', code: 'public class Main{ public static void main(String args[]){System.out.println("Why do Java programmers prefer dark mode? Because light attracts bugs! ");}}' },
  ];
  res.json(snippets);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





