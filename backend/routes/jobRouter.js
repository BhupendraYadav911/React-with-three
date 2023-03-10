const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Job = require('../controllers/jobCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* Create Template End Point */
router.post('/add-job', cors.corsWithOptions, Job.createJob);
router.get('/get-all-jobs', cors.corsWithOptions, Job.getAllJob);
router.put('/edit-job/:jobId', cors.corsWithOptions, Job.editJob);
router.delete('/delete-job/:jobId', cors.corsWithOptions, Job.deleteJob);
module.exports = router;
