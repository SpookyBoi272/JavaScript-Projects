const mongoose = require("mongoose");

const ingNERSchema = new mongoose.Schema({
    name: String
});
const IngredientNER = mongoose.model('IngNER', ingNERSchema);

ingNERSchema.index({name:'text'});

module.exports = IngredientNER;