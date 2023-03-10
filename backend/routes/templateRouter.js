const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Template = require('../controllers/templateCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* Create Template End Point */
router.post('/createTemplate', cors.corsWithOptions, Template.createTemplate);
router.get('/getTemplate', cors.corsWithOptions, authenticate.verifyUser, Template.getTemplate);
router.post('/updateTemplate', cors.corsWithOptions, authenticate.verifyUser, Template.updateTemplate);
router.delete('/deleteTemplate/:templateId', cors.corsWithOptions, authenticate.verifyUser, Template.deleteTemplate);
module.exports = router;
