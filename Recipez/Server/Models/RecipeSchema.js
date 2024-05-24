const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    id : Number,
    title : String,
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    directions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Direction' }],
    link: String,
    source: String,
    NER: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IngNER' }]
})

const recipeModel = mongoose.model("Recipe",recipeSchema);
module.exports = recipeModel;