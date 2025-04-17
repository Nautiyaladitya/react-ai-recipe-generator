import React, { useState } from 'react';
import { GiKnifeFork, GiMeal, GiEarthAsiaOceania, GiCookingPot, GiLevelFour, GiOpenBook } from 'react-icons/gi'; // Importing icons for UI
import { motion } from 'framer-motion'; // Importing animation library

export default function App() {
  // State for storing form data
  const [formData, setFormData] = useState({
    ingredients: '',  // Ingredients entered by user
    mealType: 'Dinner', // Default meal type
    cuisine: '', // Cuisine preference entered by user
    time: '30-60 minutes', // Default cooking time
    complexity: 'Intermediate' // Default complexity level
  });

  // State for storing generated recipe
  const [recipe, setRecipe] = useState('');
  // State for managing loading state
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update the specific field
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submit
    setRecipe('');  // Clear previous recipe
    setLoading(true);  // Set loading state to true

    // Creating query parameters for the API request
    const query = new URLSearchParams({
      ingredients: formData.ingredients,
      mealType: formData.mealType,
      cuisine: formData.cuisine,
      cookingTime: formData.time,
      complexity: formData.complexity
    }).toString();

    // Setting up event source to stream recipe data
    // const eventSource = new EventSource(`http://localhost:3001/recipeStream?${query}`);   // // for local host if not deployed
    const eventSource = new EventSource(`https://react-ai-recipe-generator.vercel.app/api/recipeStream?${query}`);


    // Handling incoming data from the server
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);  // Parse the incoming data

      if (data.action === 'chunk') {
        setRecipe(prev => prev + data.chunk);  // Append chunk of the recipe
      } else if (data.action === 'close') {
        eventSource.close();  // Close the event source when recipe generation is complete
        setLoading(false);  // Set loading state to false
      }
    };

    // Handle errors during event source communication
    eventSource.onerror = (err) => {
      console.error('SSE error:', err);  // Log the error
      eventSource.close();  // Close the event source on error
      setLoading(false);  // Set loading state to false
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-yellow-50 to-white p-8 font-sans">
      {/* Header Section */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4 flex justify-center items-center gap-2">
        <span>
          Culinary<span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">AI</span> Recipe Generator
        </span>
        <span className="text-yellow-500 text-5xl align-middle ml-2">👨‍🍳</span>
      </h1>

      {/* Description Section */}
      <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
        Transform your available ingredients into delicious recipes with our AI-powered recipe generator. Just tell us what you have and your preferences!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-start">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full border border-orange-200">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">🍲 Recipe Generator</h2>

          {/* Mapping over form fields */}
          {[{ label: 'Ingredients', name: 'ingredients', type: 'input', placeholder: 'e.g., chicken, rice, onions, garlic', icon: <GiKnifeFork /> },
            { label: 'Meal Type', name: 'mealType', type: 'select', options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], icon: <GiMeal /> },
            { label: 'Cuisine Preference', name: 'cuisine', type: 'input', placeholder: 'e.g., Italian, Mexican, Thai', icon: <GiEarthAsiaOceania /> },
            { label: 'Cooking Time', name: 'time', type: 'select', options: ['Under 30 minutes', '30-60 minutes', 'Over 1 hour'], icon: <GiCookingPot /> },
            { label: 'Complexity', name: 'complexity', type: 'select', options: ['Easy', 'Intermediate', 'Hard'], icon: <GiLevelFour /> }
          ].map((field, idx) => (
            <motion.div
              key={idx}
              className="mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block mb-1 font-medium text-orange-600 flex items-center gap-2">
                {field.icon} {field.label}
              </label>
              {field.type === 'input' ? (
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full p-3 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50 hover:bg-orange-100 shadow-md transition duration-300"
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <select
                  name={field.name}
                  className="w-full p-3 border border-orange-400 rounded-lg bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-100 shadow-md transition duration-300"
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-xl w-full transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? 'Generating...' : 'Generate Recipe'}
          </motion.button>
        </form>

        {/* Recipe Display Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full border border-yellow-200 text-center"
        >
          <h2 className="text-2xl font-bold text-orange-800 mb-4">📖 Your Recipe</h2>
          <motion.div
            className="text-orange-500 text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
          >
            <GiOpenBook />
          </motion.div>
          {recipe ? (
            <div className="text-left whitespace-pre-line text-orange-800 space-y-4">
              <p className="font-semibold text-xl mt-3">Instructions:</p>
              <p>{recipe}</p>
            </div>
          ) : (
            <>
              <p className="text-orange-700 font-semibold text-lg">No Recipe Generated Yet</p>
              <p className="text-gray-600 mt-2">Fill out the form and click "Generate Recipe" to see your personalized recipe here.</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
