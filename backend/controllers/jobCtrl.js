const mongoose = require('mongoose');
const Jobs = require('../models/jobs');
const Status = require('../models/status');
const Response = require('../lib/response');
const nodemailer = require('nodemailer');

module.exports = {
    createJob: createJob,
    getAllJob: getAllJob,
    editJob: editJob,
    deleteJob: deleteJob
};

async function createJob(req, res) {
    // Validate request
    if (!req.body.jobTitle && !req.body.description) {
        return res.json(Response(400, 'Required fields are missing!'));
    }
    // Create a job
    const jobs = new Jobs(req.body);
    // Save job in the database
    await jobs.save()
        .then(data => {
            res.status(201).send(Response(200, "Jobs add succcessfully!", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving job."));
        });
};
async function getAllJob(req, res) {
    // Save share in the database
    await Jobs.find({})
        .then(data => {
            res.status(201).send(Response(200, "Get Jobs list!.", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving job."));
        });
};
async function editJob(req, res) {
    // Save share in the database
    await Jobs.findByIdAndUpdate(req.params.jobId, req.body, { new: true })
        .then(job => {
            if (!job) {
                return res.status(404).send(Response(404, `Invalid job ID ${req.params.jobId}`));
            }
            res.status(201).send(Response(200, "edit job succcessfully!.", job));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving job."));
        });
};
async function deleteJob(req, res) {
    // Save share in the database
    await Jobs.remove({ _id: req.params.jobId })
        .then(job => {
            if (!job) {
                return res.status(404).send(Response(404, `Invalid job ID ${req.params.jobId}`));
            }
            res.status(201).send(Response(200, "Job delete succcessfully!.", job));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving job."));
        });
};