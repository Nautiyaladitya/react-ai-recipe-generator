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

-------------------------------------------------------------------------------------------------------------------------------

# 🍳 AI Recipe Generator

An AI-powered recipe suggestion web app that generates creative and personalized recipes based on the ingredients you have.

Live Demo: [Visit AI Recipe Generator](https://your-netlify-site-url.netlify.app) <!-- Replace with your Netlify URL -->

---

## 📁 Project Structure

```
react-ai-recipe-generator/
│
├── client/                   # React frontend (Vite based)
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/                  # Node.js backend with Express
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── .gitignore               # Ignores node_modules, .env etc.
├── package.json
└── README.md
```

---

## 🚀 Features

- 🧠 AI-generated recipe suggestions using OpenAI.
- 🧾 Ingredient validation with smart suggestions.
- 🔄 Live text streaming from backend to frontend.
- 🎨 Beautiful modern UI with background video.
- ☁️ CI/CD with GitHub + Netlify.

---

## 🛠️ Tech Stack

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express.js  
**AI:** OpenAI API  
**Deployment:** Netlify (Frontend), Railway/Render (optional for Backend)

---

## 🧑‍💻 Local Development Setup

### 1. Clone the repo
```bash
git clone https://github.com/Nautiyaladitya/react-ai-recipe-generator.git
cd react-ai-recipe-generator
```

### 2. Frontend Setup (Client)
```bash
cd client
npm install
 npm start / npm run dev 
```

### 3. Backend Setup (Server)
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
OPENAI_API_KEY=your_openai_key_here
```

Then run the server:
```bash
node server.js
```

> ⚠️ Note: `.env` and `node_modules` are ignored by GitHub using `.gitignore`.

---

## 🌐 Deployment

### Frontend on Netlify
1. Go to [Netlify](https://netlify.com) and log in.
2. Click **"New site from Git"**.
3. Connect your GitHub repo.
4. Set build command as: `npm run build`
5. Set publish directory: `client/dist`
6. Deploy!

### Backend (Optional)
If needed, deploy the backend to [Render](https://render.com) or [Railway](https://railway.app):
- Set environment variable `OPENAI_API_KEY`
- Use `node server.js` as start command

---

## 🌟 Credits
Built with ❤️ by [Aditya Nautiyal](https://github.com/Nautiyaladitya)

---

## 📃 License
MIT License


---------------------------------------------------------------------------------------------------------------------------------------------------

# 🍽️ AI Recipe Generator

> Your AI-powered kitchen assistant that suggests creative recipes based on the ingredients you have! Built with React and OpenAI's API, beautifully hosted on Netlify.

---

## 🔗 Live Demo
🌐 [Visit the Live App](https://your-netlify-site.netlify.app) *(replace this with your Netlify link)*

---

## 📂 Project Structure
```
react-ai-recipe-generator/
│
├── public/                # Static assets
├── src/                   # Main React app
│   ├── components/        # UI components
│   ├── assets/            # Images, icons
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── .env                  # API key config (not pushed to GitHub)
├── package.json
└── vite.config.js         # Vite config
```

---

## 💡 Features
- 🔎 Ingredient Validation
- 🧠 AI-generated Recipes (OpenAI-powered)
- ⚡ Streamed Recipe Output (Real-time responses)
- 🌌 Beautiful Animated UI
- ✅ Responsive & Clean Layout

---

## 🛠️ Tech Stack
- React + Vite
- Tailwind CSS for UI
- OpenAI API for AI recipes
- Node.js (for the backend)
- Netlify (for frontend hosting)

---

## 🚀 Deployment (Frontend on Netlify)
1. Fork and clone this repo.
2. Push your frontend to GitHub.
3. Visit [Netlify](https://www.netlify.com/)
4. Click **“Add New Site” > “Import from GitHub”**
5. Select your repo > Deploy.
6. Done 🎉

**Want a backend too?**
- Host it on [Render](https://render.com), [Railway](https://railway.app), or [Vercel](https://vercel.com).
- Create a `.env` file:
```
OPENAI_API_KEY=your-key-here
```

---

## 📸 UI Screenshots
> _(Add screenshots here in markdown!)_

```
![Home Page](link-to-screenshot)
![Live Suggestions](link-to-screenshot)
```

---

## 🎬 Demo Video
> _(Add demo walkthrough video if available)_

```
[![Watch Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
```

---

## 📦 Backend Details
- The backend (Node.js API) is ignored in this repo (`/server` folder).
- You need to clone the backend separately if you want to run locally.
- Backend validates ingredients and streams AI responses.

---

## 🔐 API Key
- Get your OpenAI API key from [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
- Create a `.env` file in root and add:
```
VITE_OPENAI_API_KEY=your-key
```

---

## 🧑‍💻 How It Works (Flow)
1. User adds ingredients ➡️
2. Ingredients validated ➡️
3. Sent to backend ➡️
4. Backend hits OpenAI ➡️
5. Recipe streamed to UI

---

## 📝 License
[MIT](LICENSE)

---

## 🙌 Credits
- UI: Inspired by LushLoom theme
- Icons: [Lucide](https://lucide.dev/), [Heroicons](https://heroicons.com/)
- Background Video: Free stock galaxy loop

---

Made with ❤️ by [Aditya Nautiyal](https://github.com/Nautiyaladitya)

