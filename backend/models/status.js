const mongoose = require('mongoose');

Schema = mongoose.Schema;
const StatusSchema = mongoose.Schema({
    status_id: { type: Number},
    status_name  : {type : String},
    description : {type : String},
}, {
    timestamps: true
});

module.exports = mongoose.model('Status', StatusSchema);