var mongoose = require('mongoose');

Schema = mongoose.Schema;

const TemplateFieldSchema = mongoose.Schema({
    name: { type: String },
    type: { type: String },
    label: { type: String },
    placeholder: { type: String },
    // options: [{type: String, default: null}],
    options: [
        {
            optionsValue: { type: String }
        }
    ],
    validation: {
        reuired: { type: Boolean }
    }
}, {
    timestamps: true
});

module.exports = TemplateFieldSchema;