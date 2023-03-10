const mongoose = require('mongoose');
//var random = require('mongoose-simple-random');

Schema = mongoose.Schema;
const PlansSchema = mongoose.Schema({
    name  : {type : String},
    description : {type : String},
    features : [ { 
    	title: {type : String} 
    }],
    price : {type : String},
    type : {type : String }
}, {
    timestamps: true
});
module.exports = mongoose.model('Plans', PlansSchema);