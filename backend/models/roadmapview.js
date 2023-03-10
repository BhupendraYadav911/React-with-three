var mongoose = require('mongoose');

Schema = mongoose.Schema;

const RoadmapviewsSchema = mongoose.Schema({
    name: { type: String },
    viewType: { type: String },
    roadmapId: { type: String },
    fields: [
        {
            fieldId: { type: String },
            order: { type: Number }
        }
    ],
    metadata: {
        created_at: { type: Date, default: Date.now },
        created_by: { type: Schema.Types.ObjectId, ref: 'Users' }
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Roadmapview', RoadmapviewsSchema);
