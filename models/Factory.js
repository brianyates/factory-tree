const mongoose = require('mongoose');
const {Schema} = mongoose;

const factorySchema = new Schema({
    name: String,
    lowerBound: Number,
    upperBound: Number,
    numChildren: Number,
    createdAt: Date,
    children: Array
});

mongoose.model('factories', factorySchema);