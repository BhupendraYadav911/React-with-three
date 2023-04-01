const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Setting = require('../controllers/setting');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* SignUp End Point */
router.post('/add-banner', Setting.addBanner);
router.put('/upadte-banner', cors.corsWithOptions, authenticate.verifyUser, Setting.upadteBanner);

// router.put('/banner-setting', cors.corsWithOptions, authenticate.verifyUser, Setting.addBanner);
router.get('/banner',  Setting.getBanners);
module.exports = router;
