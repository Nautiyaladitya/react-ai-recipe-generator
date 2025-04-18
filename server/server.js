// updated code with providing suggestions if get wrong input , Handled the problem of [  , & whiteSpaces and input workimg intelligently     ] code below
// Also secured the API key if deployment is made.

const express = require("express");
const cors = require("cors");
const similarity = require("string-similarity");
const OpenAI = require("openai"); // for openai@4.x
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001; // Use process.env.PORT for Vercel

// CORS setup to allow multiple origins (localhost and deployed frontend)
const corsOptions = {
  origin: ['react-ai-recipe-generator-x3je.vercel.app', 'http://localhost:3000'], // Vercel first, then local, // Added both URLs for local and deployed
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Apply this corsOptions to the server

// OpenAI initialization for v4+
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key in .env file 
});

// Sample ingredient list
const validIngredientsList = [
  "chicken", "mutton", "egg", "milk", "cheese", "butter", "yogurt", "cream",
  "bread", "flour", "rice", "basmati rice", "brown rice", "oil", "salt", "sugar",
  "onion", "garlic", "ginger", "green chili", "red chili", "black pepper", "turmeric",
  "coriander", "cumin", "mustard seeds", "curry leaves", "asafoetida", "clove", "cardamom",
  "cinnamon", "bay leaf", "nutmeg", "fenugreek", "tamarind", "lemon", "vinegar",
  "moong dal", "toor dal", "masoor dal", "chana dal", "urad dal", "rajma", "chickpeas",
  "black gram", "green gram", "horse gram", "yellow split peas", "kabuli chana",
  "potato", "tomato", "carrot", "peas", "cabbage", "cauliflower", "brinjal", "lady finger",
  "bottle gourd", "ridge gourd", "bitter gourd", "spinach", "fenugreek leaves", "amaranth leaves",
  "drumstick", "beetroot", "mushroom", "pumpkin", "cucumber", "lettuce", "broccoli", "sweet corn",
  "idli rice", "urad dal", "poha", "semolina", "curd", "coconut", "jaggery", "sambar powder",
  "rasam powder", "gunpowder", "dosa batter", "idli batter", "rice flour",
  "pizza base", "burger bun", "sandwich bread", "mayonnaise", "ketchup", "schezwan sauce",
  "mozzarella cheese", "paneer", "french fries", "tortilla", "nachos", "sausages", "ham",
  "salami", "pepperoni", "olives", "jalapenos", "oregano", "chili flakes",
  "soy sauce", "ginger garlic paste", "sesame oil", "bamboo shoots", "water chestnuts",
  "chili oil", "five spice powder", "hoisin sauce", "chili paste", "fish sauce", "rice noodles",
  "spring onions", "bok choy", "shiitake mushrooms", "tofu", "wasabi", "seaweed",
  "pasta", "spaghetti", "penne", "mozzarella", "parmesan", "basil", "oregano", "olive oil",
  "tomato paste", "garlic", "parmesan", "ricotta", "tomatoes", "zucchini", "eggplant", "mushrooms",
  "pita bread", "hummus", "feta cheese", "olives", "tahini", "couscous", "falafel", "labneh",
  "sumac", "cumin", "oregano", "eggplant", "zucchini", "grilled vegetables",
  "tortilla", "avocado", "guacamole", "salsa", "chili con carne", "corn", "lime", "cheddar cheese",
  "jalapeno", "black beans", "tomato", "coriander", "cumin", "enchilada sauce",
  "ghee", "garam masala", "amchur powder", "methi leaves", "chili powder", "turmeric", "cumin seeds",
  "coriander powder", "fennel seeds", "mustard seeds", "asafoetida", "curry leaves",
  "za'atar", "sumac", "pomegranate molasses", "pita", "lamb", "eggplant", "yogurt", "spices",
  "flour", "sugar", "butter", "baking soda", "baking powder", "vanilla extract", "chocolate chips",
  "almonds", "cashews", "walnuts", "pecans", "pistachios", "hazelnuts", "raisins", "dates", "figs",
  "truffle", "saffron", "kale", "quinoa", "goji berries", "acai", "chia seeds", "dragon fruit",
  "apple", "banana", "strawberry", "blueberry", "blackberry", "pineapple", "watermelon", "kiwi",
  "orange", "mango", "papaya", "pomegranate", "pear", "peach", "grapes", "plum",
  "coconut milk", "avocado", "almond milk", "coconut water", "pomegranate juice", "orange juice",
  "apple cider vinegar", "tomato ketchup", "honey", "maple syrup", "peanut butter", "jam", "mustard",
  "hot sauce", "vinegar", "sesame seeds", "chia seeds", "flax seeds",
  "turmeric powder", "cinnamon stick", "cloves", "cardamom pods", "saffron threads", "dried chili flakes",
  "bay leaf", "curry powder", "black cardamom", "rose water", "vanilla beans", "tamarind paste", "garlic powder",
  "onion powder", "white pepper", "celery salt", "nutmeg powder", "cayenne pepper", "lemon zest",
  "heavy cream", "sour cream", "cream cheese", "ricotta cheese", "cheddar cheese", "blue cheese", "goat cheese",
  "paneer", "milk powder", "condensed milk", "evaporated milk", "mozzarella", "buttermilk", "cottage cheese",
  "whole wheat flour", "self-raising flour", "semolina flour", "buckwheat flour", "chickpea flour", "cornmeal",
  "bread crumbs", "polenta", "bulgur wheat", "amaranth", "spelt flour", "teff flour", "sorghum flour", "rice noodles",
  "shiitake mushrooms", "portobello mushrooms", "button mushrooms", "oyster mushrooms", "cremini mushrooms",
  "salmon", "tuna", "shrimp", "prawns", "lobster", "mussels", "squid", "clams", "cod", "tilapia", "octopus",
  "pork", "lamb", "duck", "goose", "turkey", "venison", "rabbit", "bacon", "sausage",
  "parsley", "basil", "mint", "thyme", "rosemary", "oregano", "dill", "tarragon", "chives", "sage", "bay leaves",
  "nori", "sesame oil", "mirin", "sake", "dashi", "matcha powder", "miso paste", "edamame", "rice vinegar",
  "wasabi", "tofu skin", "tamari", "shoyu", "matcha", "miso soup",
  "croissant", "baguette", "focaccia", "ciabatta", "brioche", "naan", "pita bread", "ciabatta bread", "tortillas",
  "agave syrup", "stevia", "brown sugar", "molasses", "corn syrup", "coconut sugar", "golden syrup",
  "dragon fruit", "passion fruit", "star fruit", "lychee", "papaya", "pomegranate", "jackfruit", "rambutan",
  "quinoa", "amaranth", "teff", "millet", "farro", "spelt", "buckwheat", "chia seeds", "flaxseeds",
  "coffee", "green tea", "black tea", "herbal tea", "matcha", "chai", "fruit juice", "coconut water",
  "pickled onions", "pickled cucumbers", "sweet chili sauce", "BBQ sauce", "teriyaki sauce", "pesto",
  "peanut butter", "almond butter", "hazelnut butter", "sunflower seed butter", "macadamia nuts", "pistachios",
  "frozen peas", "frozen corn", "frozen spinach", "frozen berries", "frozen mango", "frozen edamame",
  "lentils", "black beans", "pinto beans", "kidney beans", "fava beans", "soybeans",
  "pita chips", "popcorn", "rice cakes", "nachos", "samosas", "empanadas", "spring rolls", "egg rolls",
  "canned tomatoes", "canned beans", "canned corn", "canned tuna", "canned coconut milk", "instant noodles",
  "oats", "granola", "muesli", "pancake mix", "waffle mix", "bagels", "croissants", "breakfast sausage",
  "chocolate bars", "candy", "licorice", "marshmallows", "gummy bears", "caramel", "fondant", "toffee",
  "pho", "sushi rice", "kimchi", "tabbouleh", "moussaka", "falafel", "shawarma", "satay", "tempura",
  "coconut yogurt", "almond milk", "oat milk", "rice milk", "cashew milk", "hemp milk", "soy yogurt",
  "apricot jam", "blueberry jam", "strawberry jam", "peach preserve", "orange marmalade",
  "white wine", "red wine", "rum", "vodka", "tequila", "whiskey", "beer", "champagne",
  "herbes de Provence", "Italian seasoning", "cajun seasoning", "Chinese five-spice", "garam masala",
  "caramelized onions", "pickled jalapenos", "kimchi", "sriracha sauce", "mole", "tapenade", "bechamel sauce"
  
];

// Function to suggest similar ingredients in case of incorrect input
const suggestIngredients = (input) => {
  return input.map(ing => {
    const cleaned = ing.toLowerCase().trim(); // Clean and normalize the input
    const match = similarity.findBestMatch(cleaned, validIngredientsList);  // Use string similarity to find the closest match

    return {
      original: ing, // Original ingredient
      suggestion: match.bestMatch.target, // Closest matching valid ingredient
      rating: match.bestMatch.rating, // Similarity rating
      isCloseMatch: match.bestMatch.rating > 0.6, // Check if the match is strong enough (rating > 0.6)
    };
  });
};

// Function to validate ingredients: checks if input is valid, else suggests corrections
function validateIngredients(input) {
  const inputIngredients = input.toLowerCase().split(',').map(i => i.trim()); // Clean and separate input ingredients
  const suggestions = suggestIngredients(inputIngredients); // Get suggestions for incorrect inputs
  const invalid = suggestions.filter(s => !validIngredientsList.includes(s.original.toLowerCase().trim()) && !s.isCloseMatch); // Filter invalid ingredients

  return {
    invalid: invalid.map(i => i.original), // Return a list of invalid ingredients
    suggestions: invalid, // Include suggested corrections for invalid ingredients
  };
}

// Root route to check server status
app.get("/", (req, res) => {
  res.send("🍲 Recipe Generator API is running.");
});

// Recipe generation route: Handles ingredient validation, generates recipe using OpenAI
app.get("/recipeStream", async (req, res) => {
  const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query; // Extract query parameters
  console.log(req.query);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Check for empty input
  if (!ingredients || ingredients.trim() === "") {
    res.write(`data: ${JSON.stringify({ action: "chunk", chunk: "⚠️ No ingredients provided. Please enter at least one." })}\n\n`);
    res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    return;
  }

  // Validate the ingredients in the request
  const { invalid, suggestions } = validateIngredients(ingredients);

  // If there are invalid ingredients, send a warning and suggested corrections
  if (invalid.length > 0) {
    const suggestionMessage = suggestions
      .map(s => `\n• "${s.original}" → Did you mean "${s.suggestion}"?`) // Generate message for suggestions
      .join("");
    const warningMessage = `⚠️ Invalid ingredients detected: ${invalid.join(", ")}.${suggestionMessage}`; // Create warning message
    res.write(`data: ${JSON.stringify({ action: "chunk", chunk: warningMessage })}\n\n`); // Send warning as a chunk
    res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`); // Close the response after sending the warning
    return; // End execution if invalid ingredients are detected
  }

  // Prompt to generate a recipe using OpenAI API
  const prompt = `
Generate a recipe with these details:
- Ingredients: ${ingredients}
- Meal Type: ${mealType}
- Cuisine Preference: ${cuisine}
- Cooking Time: ${cookingTime}
- Complexity: ${complexity}
Give a local name based on cuisine and explain steps clearly. Only use given ingredients.
`;

  try {
    // Make an API request to OpenAI to generate the recipe
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }], 
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ action: "chunk", chunk: content })}\n\n`);
      }
    }
    res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.write(`data: ${JSON.stringify({ action: "chunk", chunk: "❌ Failed to generate recipe." })}\n\n`);
    res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    res.end();
  }
});

// Listen on PORT (use the process.env.PORT for deployment environments like Vercel)
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
