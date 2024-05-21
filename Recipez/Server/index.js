const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const ver = "v1";

app.get("/",(req,res)=>{
    res.sendFile("C:/Users/niran/Documents/Assets/JavaScript-Projects/Recipiez/Server/Models/apiRef.html");
})

app.get(`/${ver}`, (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

