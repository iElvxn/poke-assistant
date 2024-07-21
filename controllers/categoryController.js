const Category = require("../models/category")
const Ingredient = require("../models/ingredient")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    allCategories = await Category.find({}, "name").sort({ name: 1 }).exec()
    res.render("category_list", { categoryList: allCategories });
})

exports.category_details = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.findById(id).exec();
    const ingredients = await Ingredient.find({ category: id }).sort({ name: 1 }).exec();

    res.render("category_detail", {
        title: category.name,
        description: category.description,
        ingredients_list: ingredients,
        category: category
    });
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form");
})

exports.category_create_post = asyncHandler(async (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    })

    await category.save();
    res.redirect(category.url);
})

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    const ingredients = await Ingredient.find({category: category}, "name").sort({name: 1})
    res.render("delete", { title: "Category", object: category, ingredients: ingredients})
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    await Category.findByIdAndDelete(req.body.objectid);
    res.redirect("/category");
})

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    res.render("category_form", {category: category})
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    const category = new Category({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description
    })
    await Category.findByIdAndUpdate(req.params.id, category, {});
    res.redirect(category.url);
})

