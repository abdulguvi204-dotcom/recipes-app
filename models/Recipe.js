const mongoose = require("mongoose");

/**
 * @model Recipe
 * @description Mongoose schema for a Recipe document in MongoDB
 */
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Recipe description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    ingredients: {
      type: [String],
      required: [true, "At least one ingredient is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Ingredients array cannot be empty",
      },
    },
    instructions: {
      type: String,
      required: [true, "Cooking instructions are required"],
      trim: true,
    },
    cookingTime: {
      type: Number, // in minutes
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be at least 1 minute"],
    },
    servings: {
      type: Number,
      required: [true, "Number of servings is required"],
      min: [1, "Servings must be at least 1"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Dessert",
          "Snack",
          "Beverage",
          "Other",
        ],
        message:
          "Category must be one of: Breakfast, Lunch, Dinner, Dessert, Snack, Beverage, Other",
      },
    },
    difficulty: {
      type: String,
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be one of: Easy, Medium, Hard",
      },
      default: "Medium",
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
