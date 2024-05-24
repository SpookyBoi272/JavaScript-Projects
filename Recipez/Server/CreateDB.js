const fs = require('fs');
const Papa = require('papaparse');
const mongoose = require('mongoose');
const RecipeMod = require("./Models/RecipeSchema");
const IngredientMod = require("./Models/IngSchema");
const NERMod = require("./Models/IngNERSchema");
const DirectionMod = require("./Models/DirSchema");

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'breadLoaf';
mongoose.connect(`${mongoURI}/${dbName}`);



try {
    // Define the path to your CSV file
    // const csvFilePath = 'C:/Users/niran/Documents/Assets/JavaScript-Projects/Recipez/Server/Data/RecipeNLG_dataset.csv';
    const csvFilePath = 'C:/Users/niran/Downloads/eg.csv';

    // Create a read stream for the CSV file
    const fileStream = fs.createReadStream(csvFilePath);

    // Initialize PapaParse with options
    const parseConfig = {
        header: true,
        // Set to true to parse the CSV as a stream
        streaming: true,
        //Auto convert Numeric Values
        dynamicTyping: true
    };

    Papa.parse(fileStream, {
        ...parseConfig,
        step: async (result) => {
            data = result.data;
            ingredientIDs = [];
            directionIDS = [];
            NERIDs = [];

            await JSON.parse(data.ingredients).forEach((ingredient, index) => {
                Ingredient = new IngredientMod({ name: ingredient })
                Ingredient.save().then((doc) => {
                ingredientIDs[index] = doc._id;
                })
            });

            await JSON.parse(data.directions).forEach((direction, index) => {
                Direction = new DirectionMod({ step: direction })
                Direction.save().then((doc) => {
                    directionIDS[index] = doc._id;
                })
            });

            await JSON.parse(data.NER).forEach((ner, index) => {
                NER = new NERMod({ name: ner })
                NER.save().then((doc) => {
                    NERIDs[index] = doc._id;
                })
            });

            recipe = new RecipeMod({
                id: data.id,
                title: data.title,
                ingredients: ingredientIDs,
                directions: directionIDS,
                link: data.link,
                source: data.source,
                NER: NERIDs
            })
            recipe.save();
        },
        complete: () => {
            console.log('CSV data has been successfully Parsed');
        },
        error: (err) => {
            // Handle parsing errors
            console.error('Parsing error:', err);
        }
    });

} catch (error) {
    console.error('MongoDB error:', error);
}
