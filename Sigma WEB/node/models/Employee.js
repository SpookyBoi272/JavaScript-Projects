const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean
});

const employeeModel = mongoose.model('Employee', dataSchema);
module.exports = employeeModel