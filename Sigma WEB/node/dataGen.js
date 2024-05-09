const { name } = require('ejs');
const mongoose = require('mongoose');
const express = require('express')
const Employee = require("./models/Employee.js")
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

function getRandomElement(arr) {
  // Generate a random index within the array length
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Return the element at the random index
  return arr[randomIndex];
}

nameList = ["ChronoSK", "RayK", "Susduds","SpyroNK"];
salary = [10000,200000,99999999,7800000];
language = ["Nepali", "Hindi", "Tamil", "Newari"];
city = ["Daman", "Mumbai", "Haryana", "Pondicherry"];
Manager = [true,false];

app.get("/dumiData",async(req,res)=>{
  await mongoose.connect('mongodb://127.0.0.1:27017/dummyData');
  await Employee.deleteMany({});
  let sendthis;
  for(i =1 ; i<11;i++){
    Rname = getRandomElement(nameList);
    Rsalary = getRandomElement(salary);
    Rlanguage = getRandomElement(language);
    Rcity = getRandomElement(city);
    RmanagerState = getRandomElement(Manager);
    let json = await Employee.create({
      name: Rname,
      salary: Rsalary,
      language: Rlanguage,
      city: Rcity,
      isManager: RmanagerState
    })
    console.log(json)
    sendthis = sendthis+json;
  }
  res.send(sendthis);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})