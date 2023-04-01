const mongoose = require('mongoose');
//var random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const OrganizationSchema = mongoose.Schema({
    organization: { type: String }
}, {
    timestamps: true
});
module.exports = mongoose.model('Organizations', OrganizationSchema);
