var mongoose = require('mongoose');

Schema = mongoose.Schema;

const SettingSchema = mongoose.Schema({
    name: { type: String },
    banner_type: { type: String },
    banner_url: { type: String },
    created_by: { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Setting', SettingSchema);