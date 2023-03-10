var mongoose = require('mongoose');
const Roadmap = require('../models/roadmap');
const RoadmapView = require('../models/roadmapview');
const Status = require('../models/status');
const Response = require('../lib/response');
const Fields = require('../models/masterfield');
const Template = require('../models/template');
const Feature = require('../models/feature');
const Activity = require('../models/activity');
const Configuration = require('../models/configuration');
const Share = require('../models/share');
const nodemailer = require('nodemailer');
var json2csv = require('json2csv').parse;
//const Email = require('email-templates')
const smtpTransport = require('nodemailer-smtp-transport');
module.exports = {
    createRoadmap: createRoadmap,
    findAllRoadmap: findAllRoadmap,
    getRoadmapById: getRoadmapById,
    updateRoadmapName: updateRoadmapName,
    updateRoadmapViewTypeById: updateRoadmapViewTypeById,
    getFieldTypes: getFieldTypes,
    addField: addField,
    editField: editField,
    deleteRoadmap: deleteRoadmap,
    addRoadmapView: addRoadmapView,
    editRoadmapView: editRoadmapView,
    deleteRoadmapField: deleteRoadmapField,
    deleteRoadmapView: deleteRoadmapView,
    addRoadmapConfigurationById: addRoadmapConfigurationById,
    getRoadmapConfigurationById: getRoadmapConfigurationById,
    createDuplicateRoadmap: createDuplicateRoadmap,
    createRoadmapByCsvFile: createRoadmapByCsvFile,
    getAllActivityRoadmap: getAllActivityRoadmap,
    findAllRoadmapCalculation: findAllRoadmapCalculation
};

async function createRoadmap(req, res) {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send(Response(400, 'Invalid request! Required fields are missing!'));
    }
    const roadmap = new Roadmap({});
    const viewField = [];
    roadmap.name = req.body.name || "Untitled Note",
        roadmap.userId = req.body.user._id
    if (!req.body.template_type) {
        const customTemplateFields = await Template.findOne({ "name": "scratch" });
        if (customTemplateFields) {
            const fields = customTemplateFields.fields;
            roadmap.fields.push({
                $each: fields,
                $position: 0
            });
            for (let i = 0; i < fields.length; i++) {
                viewField.push({
                    "fieldId": fields[i]._id,
                    "order": i
                });
            }
        }
    } else if (req.body.template_type == 'templte') {
        const customTemplateFields = await Template.findOne({ "name": req.body.template_type });
        if (customTemplateFields) {
            const fields = customTemplateFields.fields;
            roadmap.fields.push({
                $each: fields,
                $position: 0
            });
        }
    }
    // Save Roadmap in the database
    await roadmap.save((err, RoadmapSave) => {
        if (err) {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
            return;
        } else {
            //save activity for roadmap
            const newActivity = {
                roadmapId: roadmap._id,
                activities: []
            }
            const activity = new Activity(newActivity);
            activity.save();
            //save roadmap view
            const newObjectField = {
                name: RoadmapSave.name,
                viewType: RoadmapSave.defaultView,
                roadmapId: RoadmapSave._id,
                fields: viewField,
                metadata: {
                    created_by: req.body.user._id
                }
            }
            const roadmapView = new RoadmapView(newObjectField);
            roadmapView.save().then(data => {
                RoadmapSave.views.push(data._id);
                RoadmapSave.save();
                res.status(201).send(Response(200, "Roadmap created Successful!", RoadmapSave));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
            });
        }
    });
};
// Retrieve and return all roadmaps from the database.
async function findAllRoadmap(req, res) {
    // find shared by me Roadmap
    const storeSharedRoadmap = [];
    const shareRoadmapGet = await Share.find(
        { "sharedWith.userId": req.body.user._id }).select('roadmapId');
    for (let i = 0; i < shareRoadmapGet.length; i++) {
        const findRoadmapGet = await Roadmap.findOne({ "_id": mongoose.Types.ObjectId(shareRoadmapGet[i].roadmapId), "deletedAt": null }).select('name');
        storeSharedRoadmap.push(findRoadmapGet);
    }
    // find created by me Roadmap
    await Roadmap.find({ "userId": mongoose.Types.ObjectId(req.body.user._id), "deletedAt": null }).select('name')
        .then(roadmaps => {
            const storeAllRoadmap = roadmaps.concat(storeSharedRoadmap);
            res.status(201).send(Response(200, "Roadmap list data succcessfully!.", storeAllRoadmap));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
};
async function getRoadmapById(req, res) {
    if (!req.params.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    const roadmapView = await RoadmapView.findOne({ "roadmapId": req.params.roadmapId });
    if (!roadmapView) {
        return res.status(404).send(Response(404, `Invalid roadmap ID ${req.params.roadmapId}`));
    }
    const roadmapFeature = await Feature.find({ "roadmapId": mongoose.Types.ObjectId(req.params.roadmapId) });
    if (!roadmapFeature) {
        return res.status(404).send(Response(404, `Invalid roadmap ID ${req.params.roadmapId}`));
    }
    const roadmapShare = await Share.findOne({ "roadmapId": mongoose.Types.ObjectId(req.params.roadmapId) }).populate('sharedWith.userId');
    /*  res.status(201).send(Response(200, "Roadmap list data succcessfully!.", roadmapShare));
     return; */
    await Roadmap.findById(req.params.roadmapId)
        .then(roadmaps => {
            if (!roadmaps) {
                return res.status(404).send(Response(404, `Invalid roadmap ID ${req.params.roadmapId}`));
            }
            /* var viewTypeRoadmap;
            if (req.body.roadmapViewType == "") {
                viewTypeRoadmap = roadmaps.defaultView;
            }
            else {
                viewTypeRoadmap = req.body.roadmapViewType;
            } */
            /* if (req.body.roadmapViewType == "swimlane") {
                const roadMapDataSwim = {
                    "roadmaps": roadmaps,
                    "views": roadmapView,
                    "features": roadmapFeature,
                }
                res.send({ status: 200, data: roadMapDataSwim, message: "Roadmap list data succcessfully!." });
            } */
            if (req.body.roadmapViewType == "list") {
                const viewAllData = roadmapView.fields;
                const fieldsAllData = roadmaps.fields;
                const featuresAllData = roadmapFeature;
                const features = [];
                const storeFields = [];
                for (let i = 0; i < viewAllData.length; i++) {
                    // store field
                    for (let a = 0; a < fieldsAllData.length; a++) {
                        if (viewAllData[i].fieldId == fieldsAllData[a]._id) {
                            storeFields.push(fieldsAllData[a]);
                        }
                    }
                    // store all features of single roadmap
                    const storeFeatures = [];
                    for (let f1 = 0; f1 < featuresAllData.length; f1++) {
                        let fieldFound = false;
                        for (let f2 = 0; f2 < featuresAllData[f1].features.length; f2++) {
                            if (viewAllData[i].fieldId == featuresAllData[f1].features[f2].fieldId) {
                                storeFeatures.push(featuresAllData[f1].features[f2]);
                                fieldFound = true;
                                break;
                            }
                        }
                        if (!fieldFound) {
                            storeFeatures.push({
                                _id: null,
                                fieldId: viewAllData[i].fieldId,
                                fieldValue: '-'
                            })
                        }
                    }
                    features.push(storeFeatures);
                }
                const roadMapDataList = {
                    headers: storeFields,
                    values: features,
                    "shareRoadmap": roadmapShare
                }
                /* res.send({ status: 200, data: roadMapDataList, message: "Roadmap list data succcessfully!." }); */
                res.status(201).send(Response(200, "Roadmap list data succcessfully!.", roadMapDataList));
            }
            else {
                const roadMapDataSwim = {
                    "roadmaps": roadmaps,
                    "views": roadmapView,
                    "features": roadmapFeature,
                    "shareRoadmap": roadmapShare
                }
                /* res.send({ status: 200, data: roadMapDataSwim, message: "Roadmap list data succcessfully!." }); */
                res.status(201).send(Response(200, "Roadmap list data succcessfully!.", roadMapDataSwim));
            }
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
}
async function updateRoadmapName(req, res) {
    if (!req.body.roadmapId || req.body.roadmapId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required roadmap id is missing'));
    }
    if (!req.body.name || req.body.name == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required name is missing'));
    }
    await Roadmap.findOneAndUpdate(
        { _id: req.body.roadmapId },
        { $set: { "name": req.body.name } },
        { new: true }
    ).then(roadmap => {
        if (!roadmap) {
            return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
        }
        res.status(201).send(Response(200, "Roadmap updated successfully!", roadmap));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function updateRoadmapViewTypeById(req, res) {
    if (!req.body.roadmapId || req.body.roadmapId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required roadmap id is missing'));
    }
    if (!req.body.defaultView || req.body.defaultView == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required defaultView is missing'));
    }
    await Roadmap.findOneAndUpdate(
        { _id: req.body.roadmapId },
        { $set: { "defaultView": req.body.defaultView } },
        { new: true }
    ).then(roadmap => {
        if (!roadmap) {
            return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
        }
        res.status(201).send(Response(200, "Roadmap updated successfully!", roadmap));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function getFieldTypes(req, res) {
    res.json({
        status: "true",
        response: "",
        data: await Fields.find({})
    });
}
async function addField(req, res) {
    if (!req.body.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    if (!req.body.field) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field is missing'));
    } /* else if ((req.body.field.type == 'list') && (!req.body.field.options || !Array.isArray(req.body.field.options.length))) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field options is missing'));
    } */
    else if ((req.body.field.type == 'list') && (!req.body.field.options || req.body.field.options.length < 1)) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field options is missing'));
    }
    if (req.body.field.type == 'list') {
        // change option in Array object
        const optionData = [];
        for (let i = 0; i < req.body.field.options.length; i++) {
            optionData.push({
                "optionsValue": req.body.field.options[i]
            });
        }
        req.body.field.options = optionData;
    }
    const result = {};
    await Roadmap.findByIdAndUpdate(req.body.roadmapId, {
        $push: { "fields": req.body.field }
    }, { new: true, select: "fields" }).then(roadmap => {
        if (!roadmap) {
            return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
        }
        result._id = roadmap._id;
        result.fields = [];
        result.fields.push(roadmap.fields[roadmap.fields.length - 1]);
        // console.log('roadmap',roadmap.fields[roadmap.fields.length-1]);
        res.status(201).send(Response(200, "Success! New field added to roadmap.", result));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function editField(req, res) {
    if (!req.body.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    if (!req.body.field) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field is missing'));
    } /* else if ((req.body.field.type == 'list') && (!req.body.field.options || !Array.isArray(req.body.field.options.length))) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field options is missing'));
        } */
    else if ((req.body.field.type == 'list') && (!req.body.field.options || req.body.field.options.length < 1)) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field options is missing'));
    }
    const updatedField = { "fields.$[elem].name": req.body.field.name, "fields.$[elem].label": req.body.field.label, "fields.$[elem].placeholder": req.body.field.placeholder }
    if (req.body.field.type == 'list') {
        updatedField["fields.$[elem].options"] = req.body.field.options
    }
    const result = {};
    await Roadmap.findOneAndUpdate(
        { _id: req.body.roadmapId },
        { $set: updatedField },
        { arrayFilters: [{ "elem._id": { $eq: req.body.field.fieldId } }] }
    ).then(roadmap => {
        if (!roadmap) {
            return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
        }
        result._id = roadmap._id;
        result.fields = [];
        result.fields.push(req.body.field);
        res.status(201).send(Response(200, "Success! field update to roadmap.", result));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function deleteRoadmapField(req, res) {
    if (!req.params.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    if (!req.body.fieldId) {
        return res.status(400).send(Response(400, 'Invalid request! Required Roadmap fieldId is missing'));
    }
    Roadmap.findOneAndUpdate({ _id: req.params.roadmapId, "fields._id": req.body.fieldId }, {
        $pull: { "fields": { _id: req.body.fieldId } }
    }, { new: true }).then(roadfield => {
        if (!roadfield) {
            return res.status(404).send({
                message: "Roadmap field not found with id " + req.body.fieldId
            });
        }
        res.status(201).send(Response(200, "Roadmap field deleted successfully.", roadfield));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function deleteRoadmap(req, res) {
    if (!req.params.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    if (!req.body.action) {
        return res.status(400).send(Response(400, 'Invalid request! Required action is missing'));
    }
    if (req.body.action == "roadmap") {
        let date = new Date();
        Roadmap.findByIdAndUpdate(req.params.roadmapId, {
            $set: { "deletedAt": date }
        }, { new: true }).then(roadmap => {
            if (!roadmap) {
                return res.status(404).send(Response(404, `Roadmap not found with id ${req.params.roadmapId}`));
            }
            res.status(201).send(Response(200, "Roadmap deleted successfully!.", roadmap));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
    }
    else {
        return res.status(400).send(Response(400, 'Invalid request! Required action is missing'));
    }
};
async function addRoadmapView(req, res) {
    if (!req.body.roadmapId || req.body.roadmapId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required roadmap id is missing'));
    }
    if (!req.body.name || req.body.name == "") {
        return res.json(Response(400, 'Required name are missing!'));
    }
    if (!req.body.viewType || req.body.viewType == "") {
        return res.json(Response(400, 'Required viewType are missing!'));
    }
    const newObject = {
        name: req.body.name,
        viewType: req.body.viewType,
        roadmapId: req.body.roadmapId,
        fields: req.body.fields,
        metadata: {
            created_by: req.body.user._id
        }
    }
    const roadmapView = new RoadmapView(newObject);
    await roadmapView.save()
        .then(data => {
            Roadmap.findOne({ _id: req.body.roadmapId }).then(roadmap => {
                roadmap.views.push(data._id);
                roadmap.save();
                res.status(201).send(Response(200, "Roadmap view create succcessfully!.", data));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
            });
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
}
async function editRoadmapView(req, res) {
    if (!req.params.roadmapViewId || req.params.roadmapViewId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required roadmap id is missing'));
    }
    if (!req.body.roadmapId || req.body.roadmapId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required roadmap id is missing'));
    }
    if (!req.body.name || req.body.name == "") {
        return res.json(Response(400, 'Required name are missing!'));
    }
    if (!req.body.viewType || req.body.viewType == "") {
        return res.json(Response(400, 'Required viewType are missing!'));
    }
    RoadmapView.findByIdAndUpdate(req.params.roadmapViewId,
        req.body, { new: true })
        .then(data => {
            res.status(201).send(Response(200, "Roadmap view update succcessfully!.", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
}
async function deleteRoadmapView(req, res) {
    if (!req.params.roadmapViewId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    RoadmapView.findByIdAndRemove(req.params.roadmapViewId)
        .then(roadmapView => {
            if (!roadmapView) {
                return res.status(404).send({
                    message: "Roadmap view not found with id " + req.params.roadmapViewId
                });
            }
            Roadmap.findOne({ _id: roadmapView.roadmapId })
                .then(roadmap => {
                    const valueToRemove = mongoose.Types.ObjectId(req.params.roadmapViewId);
                    roadmap.views = roadmap.views.remove(valueToRemove);
                    roadmap.save();
                    /*  res.send({
                status: 200,
            data: roadmapView,
            message: "Roadmap view deleted successfully!"
        }); */
                    res.status(201).send(Response(200, "Roadmap view deleted successfully!.", roadmapView));
                }).catch(err => {
                    res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
                });
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
}
async function addRoadmapConfigurationById(req, res) {
    if (!req.body.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    if (!req.body.swimlane) {
        return res.status(400).send(Response(400, 'Invalid request! Required param swimlane is missing'));
    }
    if (!req.body.listview) {
        return res.status(400).send(Response(400, 'Invalid request! Required param listview is missing'));
    }
    const roadmapConfig = await Configuration.findOne({ "roadmapId": req.body.roadmapId });
    if (roadmapConfig) {
        await Configuration.findOneAndUpdate(
            { roadmapId: req.body.roadmapId },
            {
                $set: {
                    "swimlane": req.body.swimlane,
                    "listview": req.body.listview
                }
            },
            { new: true }
        ).then(Config => {
            if (!Config) {
                return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
            }
            res.status(201).send(Response(200, "Roadmap configuration updated successfully!", Config));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
    } else {
        const configuration = new Configuration(req.body);
        await configuration.save().then(Config => {
            res.status(201).send(Response(200, "Roadmap configuration create succcessfully!.", Config));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving Configuration."));
        });
    }
}
async function getRoadmapConfigurationById(req, res) {
    if (!req.params.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    await Configuration.findOne({ roadmapId: req.params.roadmapId })
        .then(Config => {
            if (!Config) {
                return res.status(404).send(Response(404, `Invalid roadmap ID ${req.params.roadmapId}`));
            }
            res.status(201).send(Response(200, "configuration details!.", Config));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving configuration."));
        });
}
async function createDuplicateRoadmap(req, res) {
    if (!req.body.roadmapId || req.body.roadmapId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    if (!req.body.name || req.body.name == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required name is missing'));
    }
    if (!req.body.share || req.body.share == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required share is missing'));
    }
    await Roadmap.findById(req.body.roadmapId).then(oldRoadmap => {
        if (!oldRoadmap) {
            return res.status(404).send(Response(404, `Invalid roadmap ID ${req.body.roadmapId}`));
        }
        const duplicateRoadmap = {
            "defaultView": oldRoadmap.defaultView,
            "views": [],
            "fields": oldRoadmap.fields,
            "name": req.body.name,
            "userId": req.body.user._id
        }
        const roadmap = new Roadmap(duplicateRoadmap);
        roadmap.save(async (err, dupliRoadSave) => {
            if (err) {
                res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
                return;
            } else {
                // get old roadmap feature
                const oldRoadmapFeature = await Feature.find({ "roadmapId": mongoose.Types.ObjectId(req.body.roadmapId) });
                if (oldRoadmapFeature) {
                    const preparedFeatures = [];
                    for (let i = 0; i < oldRoadmapFeature.length; i++) {
                        preparedFeatures.push({
                            "roadmapId": dupliRoadSave._id,
                            "order": oldRoadmapFeature[i].order,
                            "features": oldRoadmapFeature[i].features,
                        });
                    }
                    Feature.insertMany(preparedFeatures);
                }
                // get old roadmap view
                const oldRoadmapView = await RoadmapView.findOne({ "roadmapId": req.body.roadmapId });
                const newObjectField = {
                    name: oldRoadmapView.name,
                    viewType: oldRoadmapView.viewType,
                    roadmapId: dupliRoadSave._id,
                    fields: oldRoadmapView.fields,
                    metadata: {
                        created_by: req.body.user._id
                    }
                }
                // save new roadmap view
                const roadmapView = new RoadmapView(newObjectField);
                roadmapView.save().then(roadView => {
                    dupliRoadSave.views.push(roadView._id);
                    dupliRoadSave.save();
                    res.status(201).send(Response(200, "Duplicate roadmap created Successful!", dupliRoadSave));
                }).catch(err => {
                    res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
                });
            }
        });
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function createRoadmapByCsvFile(req, res) {
    if (!req.body.name) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap name is missing!'));
    }
    if (!req.body.features) {
        return res.status(400).send(Response(400, 'Invalid request! Required param features is missing!'));
    }
    if (!req.body.fields) {
        return res.status(400).send(Response(400, 'Invalid request! Required paramfields is missing!'));
    }
    for (let i = 0; i < req.body.fields.length; i++) {
        if (req.body.fields[i].type == 'list') {
            // change option in Array object
            const optionData = [];
            for (let j = 0; j < req.body.fields[i].options.length; j++) {
                optionData.push({
                    "optionsValue": req.body.fields[i].options[j]
                });
            }
            req.body.fields[i].options = optionData;
        }
    }
    const csvRoadmap = {
        "name": req.body.name,
        "views": [],
        "fields": req.body.fields
    }
    const roadmap = new Roadmap(csvRoadmap);
    const featuresMap = req.body.features;
    const fieldsMap = roadmap.fields;
    roadmap.save().then(RoadmapSave => {
        if (!RoadmapSave) {
            return res.status(404).send(Response(404, `Invalid`));
        }
        // map feature and field
        const preparedFeatures = featuresMap.map((feature, index) => {
            const tempFeature = [];
            for (const fn in feature) {
                const field = fieldsMap.filter(f => f.name === fn)[0];
                if (field) {
                    if (field.type.toLowerCase() == 'text') {
                        tempFeature.push({ fieldId: field._id, fieldValue: feature[fn] });
                    } else if (field.type.toLowerCase() == 'list') {
                        const fieldOptions = [...field.options];
                        const option = fieldOptions.filter(opt => opt.optionsValue == feature[fn])[0];
                        if (option) {
                            tempFeature.push({ fieldId: field._id, fieldValue: option._id });
                        }
                    }
                }
            }
            return { roadmapId: RoadmapSave._id, order: index, features: tempFeature };
        });
        // Save Feature in the database
        Feature.insertMany(preparedFeatures).then(res => console.log(res)).catch(err => console.error(err));
        //save roadmap View
        const viewField = [];
        for (let i = 0; i < fieldsMap.length; i++) {
            viewField.push({
                "fieldId": fieldsMap[i]._id,
                "order": i
            });
        }
        const newObjectField = {
            name: RoadmapSave.name,
            viewType: RoadmapSave.defaultView,
            roadmapId: RoadmapSave._id,
            fields: viewField,
            metadata: {
                created_by: req.body.user._id
            }
        }
        const roadmapView = new RoadmapView(newObjectField);
        roadmapView.save().then(data => {
            RoadmapSave.views.push(data._id);
            RoadmapSave.save();
            res.status(201).send(Response(200, "Roadmap created Successful!", RoadmapSave));
        }).catch(err => {
            // console.error(err);
            res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
        });
    }).catch(err => {
        // console.error(err);
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmaps."));
    });
}
async function getAllActivityRoadmap(req, res) {
    if (!req.params.roadmapId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param Roadmap ID is missing'));
    }
    await Activity.findOne({ "roadmapId": mongoose.Types.ObjectId(req.params.roadmapId) })
        .then(activity => {
            res.status(201).send(Response(200, "Activities list data succcessfully!.", activity));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving Activities."));
        });
};
async function findAllRoadmapCalculation(req, res) {
    const roadmapData = await Roadmap.find({ "deletedAt": null });
    /*  const featureRoadmapData = await Feature.find().populate('roadmapId');
     const shareRoadmapData = await Share.find().populate('roadmapId'); */
    //let allRoadmapCalculate = '';
    const allRoadmapCalculate = [];
    let countAllUsers = 0;
    for (let i = 0; i < roadmapData.length; i++) {
        let totalUser = 0;
        // get feature data and calculate
        const featureRoadmapData = await Feature.find({ "roadmapId": mongoose.Types.ObjectId(roadmapData[i]._id) });
        let countFeatures;
        if (featureRoadmapData.length > 0) {
            countFeatures = featureRoadmapData.length;
        }
        else {
            countFeatures = 0;
        }
        // get share data and calculate
        const shareRoadmapData = await Share.findOne({ "roadmapId": mongoose.Types.ObjectId(roadmapData[i]._id) });
        let roadmapEditors = 0;
        let roadmapViewers = 0;
        if (shareRoadmapData) {
            //count total user all roadmap
            totalUser = shareRoadmapData.sharedWith.length;
            countAllUsers = totalUser + countAllUsers;
            //count total editors and viewers in single roadmap
            for (let s = 0; s < shareRoadmapData.sharedWith.length; s++) {
                const userList = shareRoadmapData.sharedWith[s].permission;
                if (userList.edit == true) {
                    roadmapEditors = roadmapEditors + 1;
                }
                if (userList.view == true) {
                    roadmapViewers = roadmapViewers + 1;
                }
                roadmapViewers
            }
        } else {
            roadmapEditors = 0;
            roadmapViewers = 0;
        }
        const roadmapSingleData = roadmapData[i];
        allRoadmapCalculate.push({
            "roadmaps": roadmapSingleData.name,
            "fields": roadmapSingleData.fields.length,
            "features": countFeatures,
            "editors": roadmapEditors,
            "viewers": roadmapViewers
        });
        /*  allRoadmapCalculate += '<tr><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + roadmapSingleData.name + '</td><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + roadmapSingleData.fields.length + '</td><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + countFeatures + '</td><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + roadmapEditors + '</td><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + roadmapViewers + '</td></tr>';
         countAllUsers++; */
    }
    /* const tableOneData = '<h3>Calculated Data of Roadmap</h3><table style="font-family: arial,sans-serif;border-collapse: collapse;width: 100%;"><tr><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Roadmaps</th><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Fields</th><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Features</th><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Editors</th><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Viewers</th></tr>' + allRoadmapCalculate + '</table>';
    const tableTwoData = '<table style="font-family: arial,sans-serif;border-collapse: collapse;width: 100%;"><tr><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Total no. of users</th><th style="border:1px solid #dddddd;text-align:left;padding:8px;">Total no. of roadmaps</th></tr><tr><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + countAllUsers + '</td><td style="border:1px solid #dddddd;text-align:left;padding:8px;">' + roadmapData.length + '</td></tr></table>';*/
    const totalData = {
        "tota_no_of_users": countAllUsers,
        "tota_no_of_roadmaps": roadmapData.length,
    }
    /*  const allTableData = tableOneData + tableTwoData; */
    /* let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '4933545dcb062b',
            pass: '59452c5b5cbe72'
        }
    }); */
    var transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp-relay.gmail.com',
        port: 587
    }));

    const message = {
        from: 'support@2launch.co', // Sender address
        to: 'hi@2launch.co', // List of recipients
        subject: 'Calculated Data of Roadmap', // Subject line
        text: 'Calculated Data of Roadmap', // Plain text body
        html: '<b>Weekly updates</b>',
        attachments: [
            {
                filename: "roadmap.csv",
                content: json2csv(allRoadmapCalculate),
                //path: 'public/images/2Launch_Roadmap.csv'
            }, {
                filename: "totalData.csv",
                content: json2csv(totalData),
                //path: 'public/images/2Launch_Roadmap.csv'
            },
        ],
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log('err', err);
            //res.status(500).send(Response(500, "Some error send mail.",err));
        } else {
            console.log('else', info);
            res.status(201).send(Response(200, "Roadmap list data succcessfully!.", totalData));
        }
    });
}