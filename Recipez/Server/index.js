const express = require("express");
const mongoose = require("mongoose");
const recipeModel = require("./Models/RecipeSchema.js")
const IngredientMod = require("./Models/IngSchema");
const NERMod = require("./Models/IngNERSchema");
const DirectionMod = require("./Models/DirSchema");
const path = require('path')

const app = express();
const port = 3000;
const ver = "v1";
mongoose.connect("mongodb://127.0.0.1:27017/savorySpark");

app.use("/",express.static(path.join(__dirname, 'public')));

app.get(`/${ver}/getPg/:page`, (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  getPage(page).then(result => {
    res.json(result);
  })
})

app.get(`/${ver}/`)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


const getPage = async (pgNo) => {
  const pageSize = 20;
  const skip = (pgNo - 1) * pageSize;
  const result = await recipeModel.find().skip(skip).limit(pageSize)
  .populate('ingredients')
  .populate('directions')
  .populate('NER')
  .exec();
  return result;
}