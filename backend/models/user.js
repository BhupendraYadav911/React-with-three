var mongoose = require('mongoose');
// var random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const UserProfileSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
    full_name: { type: String },
   // phone_code: { type: String },
   // phone_nymber: { type: String },
    //organization: { type: String },
    // organization_id: { type: Schema.Types.ObjectId, ref: 'Organizations' },
    // job_id: {type : Schema.Types.ObjectId, ref: 'Jobs' },
    user_photo: { type: String, default: "" },
    role: { type: String, default: "" },
    // role: {type : Schema.Types.ObjectId, ref: 'Roles' },
    // status: {type : Schema.Types.ObjectId, ref: 'Status'},
    // token: {type : String},
    // subscription_expiry_date: {type: Date, default: ""},
    password_reset_token:{ type: String, default: "" },
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserProfileSchema);