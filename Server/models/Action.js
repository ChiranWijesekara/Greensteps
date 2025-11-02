const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    title: {type : String, required: true},
    description: String,
    completed: {type: Boolean, default: false}
},{timestamps: true});

module.exports=mongoose.model('Action', ActionSchema);