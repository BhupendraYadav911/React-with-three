const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Setting = require('../controllers/setting');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* SignUp End Point */
router.put('/banner-setting', cors.corsWithOptions, Setting.addBanner);
router.get('/banner', cors.corsWithOptions, Setting.getBanners);
module.exports = router;
