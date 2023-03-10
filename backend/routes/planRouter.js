const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Plan = require('../controllers/planCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* Create Template End Point */
router.post('/add-plan', cors.corsWithOptions, authenticate.verifyUser, Plan.createPlan);
router.get('/get-all-plans', cors.corsWithOptions, authenticate.verifyUser, Plan.getAllPlan);
router.get('/get-plan/:planId', cors.corsWithOptions, authenticate.verifyUser, Plan.getPlan);
router.put('/edit-plan/:planId', cors.corsWithOptions, authenticate.verifyUser, Plan.editPlan);
router.delete('/delete-plan/:planId', cors.corsWithOptions, authenticate.verifyUser, Plan.deletePlan);
module.exports = router;
