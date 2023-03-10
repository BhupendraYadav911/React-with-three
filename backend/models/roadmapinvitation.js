const mongoose = require('mongoose');

Schema = mongoose.Schema;

const RoadmapinvitationSchema = mongoose.Schema({
    roadmapId: { type: Schema.Types.ObjectId, ref: 'Roadmap' },
    email: { type: String },
    permission: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
    },
    revokeDate: { type: Date, default: Date.now },
    invitationDate: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
    timestamps: true
});
module.exports = mongoose.model('Roadmapinvitation', RoadmapinvitationSchema);
