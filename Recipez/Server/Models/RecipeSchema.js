const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    id : Number,
    title : String,
    ingredients: [String],
    directions: [String],
    link: String,
    source: String,
    NER: [String]
})

const recipeModel = mongoose.model("Recipe",recipeSchema);
module.exports = recipeModel;