var mongoose = require('mongoose');
const TemplatefieldsSchema   = require('../models/templatefield');
Schema = mongoose.Schema;

const TemplateSchema = mongoose.Schema({
    name: { type: String },
    userid: { type: String, default: null },
    fields: [TemplatefieldsSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Template', TemplateSchema);