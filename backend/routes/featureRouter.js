const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Feature = require('../controllers/featureCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
/* create new items  */
router.post('/create-feature', cors.corsWithOptions, authenticate.verifyUser, Feature.createFeature);
router.post('/create-multi-feature', cors.corsWithOptions, authenticate.verifyUser, Feature.createMultiFeature);
router.get('/find-feature/:roadmapId', cors.corsWithOptions, authenticate.verifyUser, Feature.findAllFeature);
router.get('/find-one-feature/:featureId', cors.corsWithOptions, authenticate.verifyUser, Feature.findOneFeature);
router.put('/update-feature', cors.corsWithOptions, authenticate.verifyUser, Feature.updateFeature);
router.put('/update-multi-value-feature', cors.corsWithOptions, authenticate.verifyUser, Feature.updateMultiValueFeature);
router.delete('/delete-feature/:featureId', cors.corsWithOptions, authenticate.verifyUser, Feature.deleteFeature);

module.exports = router;
