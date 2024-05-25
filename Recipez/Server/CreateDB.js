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

const feedData = async (data) => {

    const ingredientPromises = await JSON.parse(data.ingredients).map(async (ingredient, index) => {
        // console.log(ingredient, index);
        Ingredient = new IngredientMod({ name: ingredient })
        await Ingredient.save()
        return Ingredient._id;
    });

    const directionPromises = await JSON.parse(data.directions).map(async (direction, index) => {
        // console.log(direction, index);
        Direction = new DirectionMod({ step: direction })
        await Direction.save();
        return Direction._id;
    });

    const NERPromises = await JSON.parse(data.NER).map(async (ner, index) => {
        // console.log(ner, index);
        NER = new NERMod({ name: ner })
        await NER.save();
        return NER._id;
    });

    ingredientIDs = await Promise.all(ingredientPromises);
    directionIDS = await Promise.all(directionPromises);
    NERIDs = await Promise.all(NERPromises);

    recipe = new RecipeMod({
        id: data.id,
        title: data.title,
        ingredients: ingredientIDs,
        directions: directionIDS,
        link: data.link,
        source: data.source,
        NER: NERIDs
    });
    console.log("saving recipie now")
    await recipe.save();
}



try {
    // Define the path to your CSV file
    const csvFilePath = 'C:/Users/niran/Documents/Assets/JavaScript-Projects/Recipez/Server/Data/RecipeNLG_dataset.csv';

    // Create a read stream for the CSV file
    const fileStream = fs.createReadStream(csvFilePath);

    // Initialize PapaParse with options
    const parseConfig = {
        header: true,
        // Set to true to parse the CSV as a stream
        streaming: true,
        //Auto convert Numeric Values
        dynamicTyping: true,

        chunkSize: 100000
    };

    Papa.parse(fileStream, {
        ...parseConfig,
        step: (result, parser) => {
            parser.pause(); // Pause the parser to handle one row at a time
            feedData(result.data)
                .then(() => {
                    parser.resume(); // Resume the parser after the current row is processed
                })
                .catch((err) => {
                    console.error('Error processing row:', err);
                    parser.resume();
                });
        },
        complete: () => {
            console.log('CSV data has been successfully Parsed');
        },
        error: (err) => {
            console.error('Parsing error:', err);
        }
    });

} catch (error) {
    console.error('MongoDB error:', error);
}
