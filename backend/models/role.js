const mongoose = require('mongoose');
var random = require('mongoose-simple-random');

Schema = mongoose.Schema;
const RolesSchema = mongoose.Schema({
    role_id: { type: Number},
    role_name  : {type : String},
    description : {type : String},
}, {
    timestamps: true
});

mongoose.model('Roles', RolesSchema);