const mongoose = require('mongoose');

Schema = mongoose.Schema;
const InviteteamSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    inviteEmail : {type : String}
}, {
    timestamps: true
});
module.exports = mongoose.model('Inviteteams', InviteteamSchema);