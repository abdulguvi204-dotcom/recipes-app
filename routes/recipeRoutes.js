const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

/**
 * @route   /api/recipes
 * @desc    Recipe CRUD routes
 */

// GET all recipes | POST create a recipe
router.route("/").get(getAllRecipes).post(createRecipe);

// GET single recipe | PUT update recipe | DELETE recipe
router.route("/:id").get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
