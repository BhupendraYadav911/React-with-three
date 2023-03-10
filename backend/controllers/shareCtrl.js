const mongoose = require('mongoose');
const Share = require('../models/share');
const Roadmapinvitation = require('../models/roadmapinvitation');
const Status = require('../models/status');
const Response = require('../lib/response');
const Sendemail = require('../lib/sendemail');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Roadmap = require('../models/roadmap');
module.exports = {
    createShare: createShare,
    updateUserShareRoadmap: updateUserShareRoadmap,
    deleteShareRoadmap: deleteShareRoadmap
};

async function createShare(req, res) {
    const sideURL = req.headers.origin;
    // https://sidekick.hungryforwings.com
    // Validate request
    if (!req.body.roadmapId && !req.body.userEmail && !req.body.permission) {
        return res.status(400).send(Response(400, 'Invalid request! Required fields are missing'));
    }
    if (req.body.userEmail.length < 1) {
        return res.status(400).send(Response(400, 'Invalid request! Required param field userEmail is missing'));
    }
    const storeSharedUser = [];
    for (let i = 0; i < req.body.userEmail.length; i++) {
        await User.findOne({ email: req.body.userEmail[i] }, async function (err, user) {
            if (user) {
                // find userId and roadmapId in Share
                const findUserRoadmap = await Share.findOne({
                    "roadmapId": mongoose.Types.ObjectId(req.body.roadmapId), "sharedWith.userId": mongoose.Types.ObjectId(user._id)
                });
                if (!findUserRoadmap) {
                    storeSharedUser.push(
                        {
                            "userId": user._id,
                            "permission": {
                                "add": req.body.permission.add,
                                "edit": req.body.permission.edit,
                                "delete": req.body.permission.delete,
                                "view": req.body.permission.view
                            }
                        }
                    );
                    //let textSms = sideURL + '/sign-up/invites/' + req.body.user._id;
                    // send email to invite roadmap email
                    const findRoadmap = await Roadmap.findById(req.body.roadmapId);
                    const textSmsEmail = req.body.user.full_name + ' ' + 'shared' + ' ' + findRoadmap.name + ' ' + 'with you';
                    Sendemail(req.body.userEmail[i], 'Shared roadmap', textSmsEmail);
                }
            }
            else {
                // find user email and roadmapId in Roadmapinvitation
                const invitaEmail = await Roadmapinvitation.find({ "roadmapId": req.body.roadmapId, "email": req.body.userEmail[i] });
                if (invitaEmail.length == 0) {
                    const newUserObject = {
                        "roadmapId": req.body.roadmapId,
                        "email": req.body.userEmail[i],
                        "permission": {
                            "add": req.body.permission.add,
                            "edit": req.body.permission.edit,
                            "delete": req.body.permission.delete,
                            "view": req.body.permission.view
                        },
                        created_by: req.body.user._id
                    }
                    const roadmapinvitation = new Roadmapinvitation(newUserObject);
                    roadmapinvitation.save();
                    let textSms = sideURL + '/sign-up/invites/' + roadmapinvitation._id;
                    // send email to invite roadmap email
                    Sendemail(req.body.userEmail[i], 'Invite roadmap', textSms);
                }
            }
        });
    }
    const newObject = {
        "roadmapId": req.body.roadmapId,
        "sharedWith": storeSharedUser
    }
    const roadmapShare = await Share.findOne({ "roadmapId": req.body.roadmapId });
    if (roadmapShare) {
        // add new users in share roadmap
        let newsharedWith = newObject.sharedWith.concat(roadmapShare.sharedWith);
        roadmapShare.sharedWith = newsharedWith;
        roadmapShare.save().then(data => {
            res.status(201).send(Response(200, "Roadmap share succcessfully!.", data));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while share."));
        });
    }
    else {
        // add new share roadmap
        const share = new Share(newObject);
        // Save share in the database
        await share.save()
            .then(data => {
                res.status(201).send(Response(200, "Roadmap share succcessfully!.", data));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while share."));
            });
    }
};
async function updateUserShareRoadmap(req, res) {
    if (!req.body.roadmapId || req.body.roadmapId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required Roadmap ID is missing'));
    }
    if (!req.body.userId || req.body.userId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required User ID is missing'));
    }
    if (!req.body.permission) {
        return res.status(400).send(Response(400, 'Invalid request! Required Permission is missing'));
    }
    // update user in share roadmap
    Share.findOneAndUpdate(
        { "roadmapId": req.body.roadmapId, "sharedWith.userId": req.body.userId },
        {
            $set: {
                "sharedWith.$.permission.add": req.body.permission.add,
                "sharedWith.$.permission.edit": req.body.permission.edit,
                "sharedWith.$.permission.delete": req.body.permission.delete,
                "sharedWith.$.permission.view": req.body.permission.view
            }
        },
        { new: true }
    ).then(data => {
        if (!data) {
            return res.status(404).send(Response(404, `Invalid user ID ${req.body.userId}`));
        }
        res.status(201).send(Response(200, "Permission updated successfully!", data));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving roadmap share"));
    });
}
async function deleteShareRoadmap(req, res) {
    if (!req.params.shareId) {
        return res.status(400).send(Response(400, 'Invalid request! Required param share ID is missing'));
    }
    if (!req.body.action) {
        return res.status(400).send(Response(400, 'Invalid request! Required action is missing'));
    }
    if (req.body.action == "share") {
        Share.findByIdAndRemove(req.params.shareId)
            .then(shared => {
                if (!shared) {
                    return res.status(404).send(Response(404, `Invalid shareId ID ${req.params.shareId}`));
                }
                res.status(201).send(Response(200, "Share deleted successfully!.", shared));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while share."));
            });
    }
    else if (req.body.action == "shareuser") {
        if (!req.body.userId) {
            return res.status(400).send(Response(400, 'Invalid request! Required share userId is missing'));
        }
        Share.findOneAndUpdate({ _id: req.params.shareId, "sharedWith._id": req.body.userId }, {
            $pull: { "sharedWith": { _id: req.body.userId } }
        }, { new: true }).then(shareRoad => {
            if (!shareRoad) {
                return res.status(404).send(Response(404, `Invalid user ID ${req.body.userId}`));
            }
            /*  res.send({
                 status: 200,
                 data: shareRoad,
                 message: "Share user deleted successfully!"
             }); */
            res.status(201).send(Response(200, "Share user deleted successfully!.", shareRoad));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while share."));
        });
    }
    else {
        return res.status(400).send(Response(400, 'Invalid request! Required action is missing'));
    }
}
