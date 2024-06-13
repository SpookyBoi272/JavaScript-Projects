const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const recipeModel = require("./Models/RecipeSchema.js")
const IngredientMod = require("./Models/IngSchema");
const NERMod = require("./Models/IngNERSchema");
const DirectionMod = require("./Models/DirSchema");
const path = require('path')

const app = express();
const port = 3000;
const ver = "v1";
mongoose.connect("mongodb://127.0.0.1:27017/savorySpark");


app.use("/", express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get(`/${ver}/getPg/:page`, (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  getPage(page).then(result => {
    res.json(result);
  }).catch(() => {
    res.status(500).send('Internal Server Error')
  })
})

app.get(`/${ver}/search/ner/`, async (req, res) => {
  searchTerm = (req.query.q) || "";
  try {
    const results = await searchNER(searchTerm);
    res.json(results);
  } catch (err) {
    console.error('Error searching recipes:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


const getPage = async (pgNo) => {
  const pageSize = 21;
  const skip = (pgNo - 1) * pageSize;
  const result = await recipeModel.find().skip(skip).limit(pageSize)
    .populate('ingredients')
    .populate('directions')
    .populate('NER')
    .exec();
  return result;
}

const searchNER = async (query) => {
  const results = await NERMod.find({ name: { $regex: query } })
    .limit(5)
    .exec();

  const uniqueNERs = results.reduce((acc, current) => {
    if (!acc.some(item => item.name === current.name)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueNERs;
};

