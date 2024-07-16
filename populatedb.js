#!/usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Ingredient = require("./models/ingredient");

const categoryList = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log('Main Error:', err));

async function main() {
  console.log("Debug: About to connect");
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Debug: Should be connected");
  } catch (err) {
    console.log('Connection Error:', err);
    return;
  }

  try {
    await createCategory();
    await createIngredient();
  } catch (err) {
    console.log('Error creating data:', err);
  }

  console.log("Debug: Closing mongoose");
  try {
    await mongoose.connection.close();
    console.log("Debug: Mongoose connection closed");
  } catch (err) {
    console.log('Error closing connection:', err);
  }
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  try {
    await category.save();
    categoryList[index] = category;
    console.log(`Added Category: ${name}`);
  } catch (err) {
    console.log('Error adding category:', err);
  }
}

async function createCategory() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Protein", "Essential for muscle building. Comes primarily from meat."),
    categoryCreate(1, "Meat", "Good source of protein."),
    categoryCreate(2, "Vegetables", "Good for health and good source of fibers."),
  ]);
}

async function ingredientCreate(name, description, quantity, categories) {
  const ingredient = new Ingredient({ name: name, description: description, quantity: quantity, category: categories });
  try {
    await ingredient.save();
    console.log(`Added ingredient: ${name}`);
  } catch (err) {
    console.log('Error adding ingredient:', err);
  }
}

async function createIngredient() {
  console.log("Adding ingredients");
  await Promise.all([
    ingredientCreate("Steak", "Angus beef", 2, [categoryList[0], categoryList[1]]),
    ingredientCreate("Eggs", "", 3, [categoryList[0]]),
    ingredientCreate("Flour", "", 1, []),
  ]);
}