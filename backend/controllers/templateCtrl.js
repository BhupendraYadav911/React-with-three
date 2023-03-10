var mongoose = require('mongoose');
const Template = require('../models/template');
const Response = require('../lib/response');
module.exports = {
    createTemplate: createTemplate,
    getTemplate: getTemplate,
    updateTemplate: updateTemplate,
    deleteTemplate: deleteTemplate
};

async function createTemplate(req, res) {
    if (req && Object.keys(req.body).length > 0) {
        const template = new Template(req.body);
        template.save()
            .then(data => {
                res.status(201).send(Response(200, "Template created succcessfully!.", data));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving template."));
            });
    } else {
        return res.json(Response(402, 'Required fields are missing'));
    }
};
async function getTemplate(req, res) {
    await Template.find({}).then(temp => {
        res.status(201).send(Response(200, "Template list succcessfully!.", temp));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving template."));
    });
}
async function updateTemplate(req, res) {
    Template.update(
        { _id: req.body.templateId },
        { $set: { "fields": req.body.fields } },
        { new: true },
    ).then(temp => {
        if (!temp) {
            return res.status(404).send(Response(404, `Invalid Template ID ${req.body.templateId}`));
        }
        res.status(201).send(Response(200, "Template updated successfully!.", temp));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving template."));
    });
}
async function deleteTemplate(req, res) {
    Template.findByIdAndRemove(req.params.templateId)
        .then(template => {
            if (!template) {
                return res.status(404).send(Response(404, `Invalid Template ID ${req.params.templateId}`));
            }
            res.status(201).send(Response(200, "Template delete succcessfully!.", template));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving template."));
        });
}
