const Recipe = require("../models/Recipe");

/**
 * @controller RecipeController
 * @description Handles all CRUD operations for recipes
 */

// ─────────────────────────────────────────────
// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public
// ─────────────────────────────────────────────
const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      category,
      difficulty,
      imageUrl,
    } = req.body;

    // Basic manual check before Mongoose validation
    if (
      !title ||
      !description ||
      !ingredients ||
      !instructions ||
      !cookingTime ||
      !servings ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: title, description, ingredients, instructions, cookingTime, servings, category",
      });
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      category,
      difficulty,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: recipe,
    });
  } catch (error) {
    // Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all recipes (with optional filters)
// @route   GET /api/recipes
// @access  Public
// ─────────────────────────────────────────────
const getAllRecipes = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    // Build dynamic filter object
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// @desc    Get a single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
// ─────────────────────────────────────────────
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    // Invalid MongoDB ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid recipe ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
// @access  Public
// ─────────────────────────────────────────────
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid recipe ID format: ${req.params.id}`,
      });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Public
// ─────────────────────────────────────────────
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      data: {},
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid recipe ID format: ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
