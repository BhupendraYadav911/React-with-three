const mongoose = require('mongoose');

Schema = mongoose.Schema;
const ActivitySchema = mongoose.Schema({
    roadmapId: { type: Schema.Types.ObjectId, ref: 'Roadmap' },
    activities: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'Users' },
            title: { type: String },
            description: { type: String },
            meta: {
                object: { type: String },
                operation: { type: String },
            }
        }
    ]
}, {
    timestamps: true
});
module.exports = mongoose.model('Activity', ActivitySchema);