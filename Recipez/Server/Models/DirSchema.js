const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
    step: String
});
const Direction = mongoose.model('Direction', directionSchema);

module.exports = Direction;