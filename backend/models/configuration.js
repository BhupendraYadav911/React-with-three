var mongoose = require('mongoose');

Schema = mongoose.Schema;

const ConfigurationSchema = mongoose.Schema({
    roadmapId: { type: Schema.Types.ObjectId, ref: 'Roadmap' },
    swimlane: { type: JSON },
    listview: { type: JSON },
}, {
    timestamps: true
});
module.exports = mongoose.model('Configurations', ConfigurationSchema);