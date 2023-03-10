const mongoose = require('mongoose');
//var random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const ShareSchema = mongoose.Schema({
    roadmapId: { type: Schema.Types.ObjectId, ref: 'Roadmap' },
    sharedWith: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'Users' },
            permission: {
                add: { type: Boolean, default: false },
                edit: { type: Boolean, default: false },
                delete: { type: Boolean, default: false },
                view: { type: Boolean, default: false },
            },
        }
    ],
}, {
    timestamps: true
});
module.exports = mongoose.model('Share', ShareSchema);
