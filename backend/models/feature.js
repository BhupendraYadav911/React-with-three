var mongoose = require('mongoose');
// var random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const FeaturesSchema = mongoose.Schema({
    roadmapId: { type: Schema.Types.ObjectId, ref: 'Roadmap' },
    order: { type: Number },
    features: [
        {
            fieldId: { type: Schema.Types.ObjectId, ref: 'TemplateFieldSchema' },
            fieldValue: { type: String }
        }
    ],
    created_at: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Features', FeaturesSchema);