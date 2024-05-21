const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');
const { MongoClient } = require('mongodb');

const app = express();

app.get("/", (req,res)=>{
    res.send("<h1>Hello</h1>");
})

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'project';
const collectionName = 'recipes';

// Connect to MongoDB
async function connectToMongo() {
    const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName).collection(collectionName);
}

// Define the route to parse the CSV file and feed into MongoDB
app.get('/data', async (req, res) => {

    
    try {
        // Define the path to your CSV file
        const csvFilePath = 'C:/Users/niran/Documents/Assets/JavaScript-Projects/Recipez/Server/Data/RecipeNLG_dataset.csv';

        // Connect to MongoDB
        const collection = await connectToMongo();

        // Create a read stream for the CSV file
        const fileStream = fs.createReadStream(csvFilePath);

        // Initialize PapaParse with options
        const parseConfig = {
            // header: true,
            // Set to true to parse the CSV as a stream
            streaming: true,
            //Auto convert Numeric Values
            dynamicTyping: true
        };

        // Inside the route handler for feeding CSV data into MongoDB
        Papa.parse(fileStream, {
            ...parseConfig,
            step: async (result) => {
                // result.data is a parsed CSV row
                // Convert the row into an object with appropriate keys
                const csvRowObject = {};
                // Assuming the first row contains headers, use them as keys for the object
                headers = ["id","title","ingredients","directions","link","source","NER"]
                headers.forEach((header, index) => {
                    csvRowObject[header] = result.data[index];
                });
                // Insert the object into MongoDB
                await collection.insertOne(csvRowObject);
            },
            complete: () => {
                res.send('CSV data has been successfully fed into MongoDB');
            },
            error: (err) => {
                // Handle parsing errors
                console.error('Parsing error:', err);
                res.status(500).send('Error parsing CSV file');
            }
        });

    } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).send('Error feeding CSV data into MongoDB');
    }




});

// Start the Express server
const port = 3000;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
