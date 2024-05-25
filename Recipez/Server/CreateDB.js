const fs = require('fs');
const Papa = require('papaparse');
const mongoose = require('mongoose');
const RecipeMod = require("./Models/RecipeSchema");
const IngredientMod = require("./Models/IngSchema");
const NERMod = require("./Models/IngNERSchema");
const DirectionMod = require("./Models/DirSchema");

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'savorySpark';
mongoose.connect(`${mongoURI}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

const processChunk = async (results) => {
    for (const data of results.data) {
        const ingredientPromises = JSON.parse(data.ingredients).map(async (ingredient) => {
            const Ingredient = new IngredientMod({ name: ingredient });
            const savedIngredient = await Ingredient.save();
            return savedIngredient._id;
        });

        const directionPromises = JSON.parse(data.directions).map(async (direction) => {
            const Direction = new DirectionMod({ step: direction });
            const savedDirection = await Direction.save();
            return savedDirection._id;
        });

        const NERPromises = JSON.parse(data.NER).map(async (ner) => {
            const NER = new NERMod({ name: ner });
            const savedNER = await NER.save();
            return savedNER._id;
        });

        const ingredientIDs = await Promise.all(ingredientPromises);
        const directionIDs = await Promise.all(directionPromises);
        const NERIDs = await Promise.all(NERPromises);

        const recipe = new RecipeMod({
            id: data.id,
            title: data.title,
            ingredients: ingredientIDs,
            directions: directionIDs,
            link: data.link,
            source: data.source,
            NER: NERIDs
        });

        await recipe.save();
        console.log(`Saved recipe with ID: ${data.id}`);
    }
};

try {
    const csvFilePath = 'C:/Users/niran/Documents/Assets/JavaScript-Projects/Recipez/Server/Data/RecipeNLG_dataset.csv';
    const fileStream = fs.createReadStream(csvFilePath);

    const parseConfig = {
        header: true,
        dynamicTyping: true,
        chunkSize: 0.1 * 1024 * 1024, // 0.1 MB
        chunk: async (results, parser) => {
            parser.pause(); // Pause the parser to process the current chunk
            await processChunk(results);
            parser.resume(); // Resume the parser after processing the chunk
        },
        complete: () => {
            console.log('CSV data has been successfully parsed.');
        },
        error: (err) => {
            console.error('Parsing error:', err);
        }
    };

    Papa.parse(fileStream, parseConfig);

} catch (error) {
    console.error('MongoDB error:', error);
}
