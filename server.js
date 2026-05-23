const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────
app.use(express.json());         // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ─── Health Check Route ───────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🍽️  Recipes API is running!",
    version: "1.0.0",
    endpoints: {
      getAllRecipes:   "GET    /api/recipes",
      createRecipe:   "POST   /api/recipes",
      getRecipeById:  "GET    /api/recipes/:id",
      updateRecipe:   "PUT    /api/recipes/:id",
      deleteRecipe:   "DELETE /api/recipes/:id",
    },
  });
});

// ─── API Routes ───────────────────────────────
app.use("/api/recipes", recipeRoutes);

// ─── Error Handling ───────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
