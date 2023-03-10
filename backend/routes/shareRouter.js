const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Share = require('../controllers/shareCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* Create Template End Point */
router.post('/roadmap', cors.corsWithOptions, authenticate.verifyUser, Share.createShare);
router.post('/share-update-user', cors.corsWithOptions, authenticate.verifyUser, Share.updateUserShareRoadmap);
router.delete('/share-remove-roadmap/:shareId', cors.corsWithOptions, authenticate.verifyUser, Share.deleteShareRoadmap);
router.delete('/share-delete-roadmap/:shareId', cors.corsWithOptions, authenticate.verifyUser, Share.deleteShareRoadmap);
module.exports = router;
