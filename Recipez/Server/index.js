const express = require("express");
const mongoose = require("mongoose");
const recipeModel = require("./Models/RecipeSchema.js")

const app = express();
const port = 3000;
const ver = "v1";

app.get("/",(req,res)=>{
    res.sendFile("C:/Users/niran/Documents/Assets/JavaScript-Projects/Recipiez/Server/Models/apiRef.html");
});

app.get(`/${ver}`, (req, res) => {
  res.send('Hello World!');
});

app.get(`/${ver}/getPg/1`,(req,res)=>{
  getPage(1).then(result=>{
    console.log(result);
    res.send(result);
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


const getPage = async (pgNo)=>{
  await mongoose.connect("mongodb://127.0.0.1:27017");
  startID = (pgNo-1)*30;
  console.log(startID)
  const result = await recipeModel.find({
    id : {$gte:startID, $lt: startID+30}
  }).exec();
  return result;
}