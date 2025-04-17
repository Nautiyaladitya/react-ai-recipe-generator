
# 🍽️ AI Recipe Generator with Ingredient Intelligence

> 🔮 *Turn your fridge leftovers into delicious meals — powered by AI!*

-----------------------------

## 🚀 Live Demo  
🌐 [Try it Now](https://your-netlify-app-link.netlify.app)

🯬 [Watch Demo Video](https://your-demo-video-link.com)

🖼️ _Add screenshots here_

-----------------------------

## 🧠 Features  
✨ Enter ingredients, get AI-generated recipes in real-time  
🧪 Validates ingredient names and suggests correct alternatives  
⚡ Smooth streaming of recipe steps  
🎨 Milky-theme UI with smooth galaxy animation  
📱 Fully responsive for mobile, tablet, and desktop

-----------------------------

## 📂 Project Structure

```
react-ai-recipe-generator/
├── client/             # React frontend
│   └── src/
│       └── App.jsx
├── server/             # Express backend (API & AI logic)
│   ├── services/
│   └── utils/
├── .env                # API keys (locally)
└── README.md
```

----------------------------

## 🧑‍💻 Tech Stack  
- **Frontend:** React  ⚛️  
- **Backend:** Node.js + Express 🟢  
- **AI Model:** OpenAI GPT API 🤖  
- **Deployment:** Netlify (frontend), Render/Railway (backend)

----------------------------

## ⚙️ Installation & Setup

### 📦 Clone and install

```bash
git clone https://github.com/Nautiyaladitya/react-ai-recipe-generator.git
cd react-ai-recipe-generator
```

### 💖 Frontend Setup (React)

```bash
cd client
npm install
npm start / npm run dev
```

### 🌐 Backend Setup (Express + AI logic)

```bash
cd server
npm install
node server.js
```

> ✅ Make sure to add your OpenAI API key in `.env` file:
```env
OPENAI_API_KEY=your_api_key_here
```

> 💡 You can also create a `.env.example` to guide contributors on required keys.

----------------------------

## 🛠 Install Dependencies After Cloning to Run Effectively
[Ctrl + C to stop and run commands are written below]

Here are client and server folders so that we can protect our API key behind the server; we just cannot use React only.

**IN BASH**

 ### (a)🖥️ Client Setup

1. `cd client`

2. `npx create-react-app recepie-gen`

(b) **🚀 Run Command:**

```bash
npm start

(c) 📦 React-Icons:

npm install react-icons

(d) 🎨 Animation and Motion:

npm install framer-motion

----------------------------

🖧 Server Setup

(a) cd server

npm init -y (this will setup a basic application)

(b) ⚙️ Install Dependencies:

npm install express cors openai

(c) 🚀 Run Command:

node server.js

(d) 🔍 Install Fuzzy Matching Dependency:

npm install string-similarity
(necessary for the suggestion system to work)

(e) 🍽️ Ingredient Validation:

We need to validate ingredients before sending the API request.

(f) 🔐 API Security:

It's a secure practice to store API keys in the .env file to avoid exposure.

Install dotenv for environment variables:

npm install dotenv
📝 Create .env file in the server/ directory

Add the following:
OPENAI_API_KEY=your_api_key_here

🛠️ Update server.js file:

require("dotenv").config(); // ✅ Add at the very top

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Use env variable
});

(g) 🚀 Run Command:

node server.js

---------------------------

## 📡️ Deployment

### 🚀 Frontend on Netlify
1. Push code to GitHub (done ✅)
2. Go to [Netlify](https://www.netlify.com/) → “Add New Site from GitHub”
3. Connect your repo and deploy the `client/` folder  
4. Set the build command to `npm run build` and publish directory to `dist/`

> 📌 Add environment variables in Netlify if needed

---

### 🔧 Backend on Render / Railway (optional)
1. Push `server/` to a separate repo (or use monorepo config)
2. Deploy on [Render](https://render.com) or [Railway](https://railway.app)
3. Set environment variables (OpenAI API Key)

-------------------------

## ✨ App Showcase

### 📸 Screenshots  
_Add UI preview screenshots here (Home, Recipe Streaming, Error Handling UI)_

### 🎥 Demo Video  
_Link to a short walkthrough video or a feature tour_

--------------------------

## 👌 Credits

Made with ❤️ by [Aditya Nautiyal](https://github.com/Nautiyaladitya) 🧑‍💻✨  
Design inspired by clean UX and modern AI projects.  
OpenAI GPT API used under standard usage limits.

--------------------------

## 🧠 Fun Tip  
Try random ingredient combos like:
- `oats + banana + milk`
- `potato + garlic + cheese`

Let AI chef surprise you! 🧑‍🍳✨

-------------------------

## 🌟 Show Some Love  
If you liked this project, feel free to ⭐ star the repo and share it with foodies & devs alike!

------------------------

## 📖 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

---

© Copyright reserved to **Aditya Nautiyal**



