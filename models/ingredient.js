const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: {type: Number, required: true},
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    price: { type: Number, required: true},
    img: { type: String},
});

IngredientSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/ingredient/${this._id}`;
});

module.exports = mongoose.model("Ingredient", IngredientSchema);