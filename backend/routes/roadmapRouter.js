const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const authenticate = require('../authenticate');
const Road = require('../controllers/roadmapCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* create new road  */
router.post('/create-roadmap', cors.corsWithOptions, authenticate.verifyUser, Road.createRoadmap);
router.get('/find-roadmap', cors.corsWithOptions, authenticate.verifyUser, Road.findAllRoadmap);
router.post('/get-roadmap-by-id/:roadmapId', cors.corsWithOptions, authenticate.verifyUser, Road.getRoadmapById);
router.post('/update-roadmap-name', cors.corsWithOptions, authenticate.verifyUser, Road.updateRoadmapName);
router.post('/update-roadmap-view-type', cors.corsWithOptions, authenticate.verifyUser, Road.updateRoadmapViewTypeById);
router.get('/get-field-type', cors.corsWithOptions, authenticate.verifyUser, Road.getFieldTypes);
router.put('/add-field', cors.corsWithOptions, authenticate.verifyUser, Road.addField);
router.put('/edit-field', cors.corsWithOptions, authenticate.verifyUser, Road.editField);
router.delete('/delete-field/:roadmapId', cors.corsWithOptions, authenticate.verifyUser, Road.deleteRoadmapField);
router.delete('/find-delete-roadmap/:roadmapId', cors.corsWithOptions, authenticate.verifyUser, Road.deleteRoadmap);
router.put('/add-roadmap-view', cors.corsWithOptions, authenticate.verifyUser, Road.addRoadmapView);
router.put('/edit-roadmap-view/:roadmapViewId', cors.corsWithOptions, authenticate.verifyUser, Road.editRoadmapView);
router.delete('/delete-roadmap-view/:roadmapViewId', cors.corsWithOptions, authenticate.verifyUser, Road.deleteRoadmapView);

router.post('/add-roadmap-configuration', cors.corsWithOptions, authenticate.verifyUser, Road.addRoadmapConfigurationById);
router.post('/get-roadmap-configuration/:roadmapId', cors.corsWithOptions, authenticate.verifyUser, Road.getRoadmapConfigurationById);

router.post('/create-duplicate-roadmap', cors.corsWithOptions, authenticate.verifyUser, Road.createDuplicateRoadmap);
router.post('/create-roadmap-csvfile', cors.corsWithOptions, authenticate.verifyUser, Road.createRoadmapByCsvFile);
router.get('/get-activity-roadmap/:roadmapId', cors.corsWithOptions, authenticate.verifyUser, Road.getAllActivityRoadmap);
router.get('/find-all-roadmap', cors.corsWithOptions, Road.findAllRoadmapCalculation);
module.exports = router;
