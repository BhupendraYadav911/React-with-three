const mongoose = require('mongoose');
const Plans = require('../models/plans');
const Status = require('../models/status');
const Response = require('../lib/response');
const nodemailer = require('nodemailer');

module.exports = {
    createPlan: createPlan,
    getAllPlan: getAllPlan,
    getPlan: getPlan,
    editPlan: editPlan,
    deletePlan: deletePlan
};

async function createPlan(req, res) {
    // Validate request
    if (!req.body.name && !req.body.description && !req.body.price && !req.body.type) {
        return res.status(400).send(Response(400, 'Required fields are missing'));
    }
    // Create a share
    const plans = new Plans(req.body);
    // Save share in the database
    await plans.save()
        .then(data => {
            res.status(201).send(Response(200, "Plans add succcessfully!.", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving plans."));
        });
};
async function getAllPlan(req, res) {
    // Save share in the database
    await Plans.find({})
        .then(data => {
            res.status(201).send(Response(200, "Get Plans list!.", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving plans."));
        });
};
async function getPlan(req, res) {
    // Save share in the database
    await Plans.findOne({_id:req.params.planId})
        .then(data => {
            res.status(201).send(Response(200, "Get Plans list!.", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving plans."));
        });
};
async function editPlan(req, res) {
    // Save share in the database
    await Plans.findByIdAndUpdate(req.params.planId, req.body, { new: true })
        .then(plan => {
            if (!plan) {
                return res.status(404).send(Response(404, `Invalid plan ID ${req.params.planId}`));
            }
            res.status(201).send(Response(200, "Update Plan succcessfully!.", plan));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving plans."));
        });
};
async function deletePlan(req, res) {
    // Save share in the database
    await Plans.remove({_id:req.params.planId})
        .then(plan => {
            if (!plan) {
                return res.status(404).send(Response(404, `Invalid plan ID ${req.params.planId}`));
            }
            res.status(201).send(Response(200, "Plan delete succcessfully!..", plan));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving plans."));
        });
};