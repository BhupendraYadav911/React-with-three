var mongoose = require('mongoose');

Schema = mongoose.Schema;

const MasterfieldSchema = mongoose.Schema({
    title: { type: String },
    type: { type: String },
    active: { type: Number, default:1 },
}, {
    timestamps: true
});
module.exports = mongoose.model('Masterfields', MasterfieldSchema);