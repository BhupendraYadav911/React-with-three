const mongoose = require('mongoose');
//var random = require('mongoose-simple-random');

Schema = mongoose.Schema;
const JobsSchema = mongoose.Schema({
    jobTitle  : {type : String},
    description : {type : String}
}, {
    timestamps: true
});
module.exports = mongoose.model('Jobs', JobsSchema);