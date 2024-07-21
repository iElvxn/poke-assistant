var express = require('express');
const asyncHandler = require("express-async-handler");
var router = express.Router();
const Ingredient = require("../models/ingredient")
const Category = require("../models/category")
const ingredient_controller = require("../controllers/ingredientController")
const openAI = require("../controllers/openai")

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
    const msgs = openAI.msgs;
    const totalIngredients = await Ingredient.countDocuments({});
    const totalCategories = await Category.countDocuments({});
    res.render("index", {totalIngredients: totalIngredients, totalCategories: totalCategories, msgs: msgs});
}))

router.post('/', openAI.openai_post);

module.exports = router;
