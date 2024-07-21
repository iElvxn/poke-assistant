require("dotenv").config();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
const Ingredient = require("../models/ingredient");
const Category = require("../models/category");
let msgs = [];



async function openai_post(req, res, next) {
    const totalIngredients = await Ingredient.countDocuments({});
    const totalCategories = await Category.countDocuments({});

    if (msgs.length == 0) {
        const ingredients = await Ingredient.find({}, "name quantity price").sort({ name: 1 }).exec();
        let ingredientString = "";

        ingredients.map((ingredient) => {
            ingredientString = ingredientString + `${ingredient.name}: Quantity- ${ingredient.quantity} Price: ${ingredient.price}, `
        })
        //the initial system cmd to ai
        msgs.push({ role: "system", content: `You are an assistant, and you will tell me what recipes I can make with the ingredients I have with high level of precise and exact instructions such as measurements, time and temperature. I have ${ingredientString}` });
    }
    msgs.push({ role: "user", content: `${req.body.message}` });
    await chat(msgs);
    res.redirect("/");
    //res.render("index", { totalIngredients: totalIngredients, totalCategories: totalCategories, msgs: msgs });
}

async function chat(msgArray) {
    const completion = await openai.chat.completions.create({
        messages: msgArray, 
        model: "gpt-3.5-turbo",
    });
    msgArray.push(completion.choices[0].message);
}
module.exports = { openai_post, chat, msgs }