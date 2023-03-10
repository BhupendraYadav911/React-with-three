const mongoose = require('mongoose');
const Feature = require('../models/feature');
const Status = require('../models/status');
const Response = require('../lib/response');
const nodemailer = require('nodemailer');
const Activity = require('../models/activity');
const Roadmap = require('../models/roadmap');
const date = require('date-and-time');
const pattern = date.compile('D MMM YYYY');
module.exports = {
    createFeature: createFeature,
    createMultiFeature: createMultiFeature,
    findAllFeature: findAllFeature,
    findOneFeature: findOneFeature,
    updateFeature: updateFeature,
    updateMultiValueFeature: updateMultiValueFeature,
    deleteFeature: deleteFeature
};

async function createFeature(req, res) {
    // Validate request
    if (!req.body.roadmapId && !req.body.order) {
        return res.status(400).send(Response(400, 'Invalid request! Required fields are missing'));
    }
    if (!req.body.features || req.body.features.length < 1) {
        return res.status(400).send(Response(400, 'Invalid request! Required features are missing'));
    }
    const feature = new Feature(req.body);
    feature.created_by = req.body.user._id;
    // Save Feature in the database
    //const roadmapData = await Roadmap.findById(req.body.roadmapId);
    const featuresAllValue = [];
    for (let i = 0; i < req.body.features.length; i++) {
        featuresAllValue.push(req.body.features[i].fieldValue);
    }
    await feature.save().then(featureSave => {
        //upadte activity for roadmap
        let featureTitle = "New feature created by" + " " + req.body.user.full_name + " " + "on" + " " + date.format(new Date(), pattern);
        let featureDesc = "New feature created by" + " " + req.body.user.full_name + " " + "on" + " " + date.format(new Date(), pattern);
        const newActivity = {
            userId: req.body.user._id,
            title: featureTitle,
            description: featureDesc,
            meta: { object: "feature", operation: "add" }
        }
        Activity.update({ "roadmapId": req.body.roadmapId }, {
            $push: { "activities": newActivity }
        }, { new: true }).then(activity => {
            if (!activity) {
                return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
            }
            res.status(201).send(Response(200, "Feature create succcessfully!.", featureSave));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving activity."));
        });
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
    });
};
async function createMultiFeature(req, res) {
    if (!req.body.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required fields are missing'));
    }
    if (!req.body.features || req.body.features.length < 1) {
        return res.status(400).send(Response(400, 'Invalid request! Required fields are missing'));
    }
    const preparedFeatures = [];
    for (let i = 0; i < req.body.features.length; i++) {
        preparedFeatures.push({
            "roadmapId": req.body.roadmapId,
            "order": i,
            "features": req.body.features[i],
            "created_by": req.body.user._id,
        });
    }
    await Feature.insertMany(preparedFeatures).then(multiFeature => {
        if (!multiFeature) {
            return res.status(404).send(Response(404, `Invalid `));
        }
        res.status(201).send(Response(200, "Feature create succcessfully!.", multiFeature));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
    });
}
// Retrieve and return all Features from the database.
async function findAllFeature(req, res) {
    if (!req.params.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    await Feature.find({ roadmapId: req.params.roadmapId })
        .then(features => {
            res.status(201).send(Response(200, "Features list data succcessfully!.", features));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
        });
};

// Find a single Feature with a FeatureId
async function findOneFeature(req, res) {
    await Feature.findById(req.params.featureId)
        .then(features => {
            if (!features) {
                return res.status(404).send(Response(404, `Invalid feature ID ${req.params.featureId}`));
            }
            res.status(201).send(Response(200, "Features details!.", features));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
        });
};

// Update a Feature identified by the FeatureId in the request
async function updateFeature(req, res) {
    // Validate Request
    if (!req.body.featureId || req.body.featureId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required Feature ID is missing'));
    }
    const getFeature = await Feature.findOne({ _id: req.body.featureId });
    if (!getFeature) {
        return res.status(404).send(Response(404, `Invalid feature ID ${req.body.featureId}`));
    }
    if (!req.body.features) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field is missing'));
    }
    const FeatureData = await Feature.findById(req.body.featureId);
    Feature.findOne({ _id: req.body.featureId, "features.fieldId": req.body.features.fieldId }, {
        'features.$': 1
    }, async function (err, item) {
        if (item) {
            // const result = {};
            // Find Feature and update it with the request body
            Feature.findOneAndUpdate(
                { _id: req.body.featureId, "features.fieldId": req.body.features.fieldId },
                { $set: { "features.$.fieldValue": req.body.features.fieldValue, "features.$.fieldId": req.body.features.fieldId } },
                { new: true, upsert: true },
            ).then(data => {
                if (!data) {
                    return res.status(404).send(Response(404, `Invalid feature ID ${req.body.featureId}`));
                }
                //upadte activity for roadmap
                let featureTitle = "Field value changed to" + " " + req.body.features.fieldValue + " " + "by" + " " + req.body.user.full_name + " " + "on" + " " + date.format(new Date(), pattern);
                let featureDesc = "Field value changed to" + " " + req.body.features.fieldValue + " " + "by" + " " + req.body.user.full_name + " " + "on" + " " + date.format(new Date(), pattern);
                const newActivity = {
                    userId: req.body.user._id,
                    title: featureTitle,
                    description: featureDesc,
                    meta: { object: "feature", operation: "update" }
                }
                Activity.update({ "roadmapId": FeatureData.roadmapId }, {
                    $push: { "activities": newActivity }
                }, { new: true }).then(activity => {
                    if (!activity) {
                        return res.status(404).send(Response(404, `Invalid roadmap ID ${FeatureData.roadmapId}`));
                    }
                    /*  result._id = req.body.featureId;
                     result.features = [];
                     result.features.push(req.body.features); */
                    res.status(201).send(Response(200, "Feature updated successfully!.", data));
                }).catch(err => {
                    res.status(500).send(Response(500, "Some error occurred while retrieving activity."));
                });
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
            });
        } else {
            const newFeature = {
                fieldId: mongoose.Types.ObjectId(req.body.features.fieldId),
                fieldValue: req.body.features.fieldValue
            }
            // const result = {};
            await Feature.findByIdAndUpdate(req.body.featureId, {
                $push: { "features": newFeature }
            }, { new: true }).then(data => {
                if (!data) {
                    return res.status(404).send(Response(404, `Invalid features ID ${req.body.featureId}`));
                }
                // Field Title value set to sidekick by ghanshyam on 31 Mar 2020
                //upadte activity for roadmap
                let featureTitle = "Field value set to" + " " + req.body.features.fieldValue + " " + "by" + " " + req.body.user.full_name + " " + "on" + " " + date.format(new Date(), pattern);
                let featureDesc = "Field value set to" + " " + req.body.features.fieldValue + " " + "by" + " " + req.body.user.full_name + " " + "on" + " " + date.format(new Date(), pattern);
                const newActivity = {
                    userId: req.body.user._id,
                    title: featureTitle,
                    description: featureDesc,
                    meta: { object: "feature", operation: "add" }
                }
                Activity.update({ "roadmapId": FeatureData.roadmapId }, {
                    $push: { "activities": newActivity }
                }, { new: true }).then(activity => {
                    if (!activity) {
                        return res.status(404).send(Response(404, `Invalid roadmap ID ${FeatureData.roadmapId}`));
                    }
                    /*  result._id = data._id;
                     result.features = [];
                     result.features.push(data.features[data.features.length - 1]); */
                    res.status(201).send(Response(200, "Success! New field added to features.", data));
                }).catch(err => {
                    res.status(500).send(Response(500, "Some error occurred while retrieving activity."));
                });
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
            });
        }
    });
};
async function updateMultiValueFeature(req, res) {
    if (!req.body.featureId) {
        return res.status(400).send(Response(400, 'Invalid request! Required featureId are missing'));
    }
    if (!req.body.features || req.body.features.length < 1) {
        return res.status(400).send(Response(400, 'Invalid request! Required features are missing'));
    }
    await Feature.findByIdAndUpdate(req.body.featureId, {
        $set: { "features": req.body.features, }
    }, { new: true }
    ).then(feature => {
        if (!feature) {
            return res.status(404).send(Response(404, `Invalid feature ID ${req.body.featureId}`));
        }
        res.status(201).send(Response(200, "Feature updated successfully!.", feature));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving features."));
    });
}
// Delete a Feature with the specified FeatureId in the request
async function deleteFeature(req, res) {
    if (!req.params.featureId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Feature ID is missing'));
    }
    if (!req.body.action || req.body.action == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required action is missing'));
    }
    if (req.body.action == "feature") {
        Feature.findByIdAndRemove(req.params.featureId)
            .then(features => {
                if (!features) {
                    return res.status(404).send(Response(404, `Invalid feature ID ${req.params.featureId}`));
                }
                res.status(201).send(Response(200, "Feature deleted successfully!.", features));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
            });
    } else if (req.body.action == "featurefield") {
        if (!req.body.fieldId || req.body.fieldId == "") {
            return res.status(400).send(Response(400, 'Invalid request! Required Feature fieldId is missing'));
        }
        Feature.findOneAndUpdate({ _id: req.params.featureId, "features._id": req.body.fieldId }, {
            $pull: { "features": { _id: req.body.fieldId } }
        }, { new: true }).then(featurField => {
            if (!featurField) {
                return res.status(404).send(Response(404, `Invalid Feature field ID ${req.body.fieldId}`));
            }
            res.status(201).send(Response(200, "Feature field deleted successfully!.", featurField));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving Features."));
        });
    }
    else {
        return res.status(400).send(Response(400, 'Invalid request! Required action is missing'));
    }
};
