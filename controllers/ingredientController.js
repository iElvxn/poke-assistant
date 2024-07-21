const Ingredient = require("../models/ingredient");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require('multer')
const upload = require("../middleware/multer")
const cloudinary = require("../middleware/cloudinary");

exports.ingredient_list = asyncHandler(async (req, res, next) => {
    const allIngredients = await Ingredient.find({}).sort({ name: 1 }).populate("category").exec();
    res.render("ingredient_list", { ingredients_list: allIngredients, title: "Your Pantry" })
})

exports.ingredient_detail = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const ingredient = await Ingredient.findById(id).populate("category").exec();
    const categories = ingredient.category.map(item => item.name).join(', ');
    res.render("ingredient_detail", { ingredient: ingredient, categoryString: categories });
})

exports.ingredient_create_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).sort({ name: 1 });
    res.render("ingredient_form", { categories: allCategories });
})

exports.ingredient_create_post = [upload.single('uploaded_file'), asyncHandler(async (req, res, next) => {
    let ingredient;
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        ingredient = new Ingredient({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            price: req.body.price,
            img: result.secure_url,
        })
    } else {
        ingredient = new Ingredient({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            price: req.body.price,
        })
    }
    await ingredient.save();
    res.redirect(ingredient.url);
})]

exports.ingredient_delete_get = asyncHandler(async (req, res, next) => {
    const ingredient = await Ingredient.findById(req.params.id);
    res.render("delete", { title: "Ingredient", object: ingredient })
})

exports.ingredient_delete_post = asyncHandler(async (req, res, next) => {
    await Ingredient.findByIdAndDelete(req.body.objectid);
    res.redirect("/ingredient")
})

exports.ingredient_update_get = asyncHandler(async (req, res, next) => {
    const ingredientObj = await Ingredient.findById(req.params.id).populate("category");
    const allCategories = await Category.find({}, "name").sort({ name: 1 });
    res.render("ingredient_form", { ingredient: ingredientObj, categories: allCategories });
})

exports.ingredient_update_post = [upload.single('uploaded_file'), asyncHandler(async (req, res, next) => {
    let ingredient;
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        ingredient = new Ingredient({
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            price: req.body.price,
            img: result.secure_url
        })
    } else {
        ingredient = new Ingredient({
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            price: req.body.price,
        })
    }

    await Ingredient.findByIdAndUpdate(req.params.id, ingredient, {});
    res.redirect(ingredient.url);
})]