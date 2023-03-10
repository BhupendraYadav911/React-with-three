var mongoose = require('mongoose');
const TemplatefieldsSchema = require('../models/templatefield');

Schema = mongoose.Schema;

const RoadmapsSchema = mongoose.Schema({
    name: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    metadata: {
        owner: { type: String },
        features: { type: Number },
        fields: { type: Number }
    },
    defaultView: { type: String, default: "swimlane" },
    views: [],
    fields: [TemplatefieldsSchema],
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true
});
module.exports = mongoose.model('Roadmap', RoadmapsSchema);
