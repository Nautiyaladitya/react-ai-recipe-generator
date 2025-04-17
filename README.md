 REACT BASED RECEPIE RECOMMENDATION APPLICATION     [   ctrl+c to stop and run commands are written below   ]     

Here are client and server folder so that we can protect our API key behind server , so we just cannot use react only.

IN BASH
 
 1. cd client ->
  npx create-react-app recepie-gen
 
 (b) Run Command ->
 npm start

 (c) React-Icons ->
 npm install react-icons

 (d) Animation and motion ->
 npm install framer-motion



 2. cd server ->
  npm init -y  (this will setup a basic appln)

 (b) (in server directory) ->
  npm install express cors openai   (installing all dependencies)

  (c) Run Command ->
  node server.js

  (d) Yeh suggestion system tabhi kaam karega jab hum string-similarity package install karenge. Yeh dependency fuzzy matching ke liye zaroori hai.
  npm install string-similarity

  (e) Getting unvalid output
 we need to add ingredient validation before we send the API request

  (f) API security ->
  API keys ko .env file me rakhna secure practice hai. Agar kisi ne tera code dekh liya (jaise GitHub pe push kiya), 
  to hamari OpenAI API key leak ho sakta hai. 

  (i). Install Dependency
.env file ko use karne ke liye dotenv package install karna padega:

npm install dotenv

 (ii). Create .env File
Project ke root folder (i.e. server/ folder) me .env file banale aur usme ye likh:

OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

 Update server.js File
Tere current code me OpenAI API key direct likhi hai:

require("dotenv").config(); // ✅ Add at the very top

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Use env variable
});

 (iii). Update .gitignore
Make sure .env file git me push na ho, so .gitignore me ye line likh:

.env




