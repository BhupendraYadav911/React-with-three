const mongoose = require('mongoose');
var random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const BillingInfoSchema = mongoose.Schema({
    billing_email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    company_name : {type: String},
    billing_address: { type: String, required: true },
    plan: {type: Schema.Types.ObjectId, ref: 'Plans' },
}, {
    timestamps: true
});
mongoose.model('BillingInfo', BillingInfoSchema);
