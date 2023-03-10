const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const User = require('../controllers/userCtrl');
const router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

/* SignUp End Point */
router.post('/status-add', cors.corsWithOptions, User.statusAdd);
router.post('/signup-token', cors.corsWithOptions, User.signupEmail);
router.post('/signup', cors.corsWithOptions, User.signup);
router.post('/signup-invite', cors.corsWithOptions, User.signupInvite);
router.post('/login', cors.corsWithOptions, User.login);
router.post('/change-password', cors.corsWithOptions, authenticate.verifyUser, User.changePassword);
router.post('/forgot-password', cors.corsWithOptions, User.forgotPassword);
router.post('/logout-user', cors.corsWithOptions, authenticate.verifyUser, User.logoutUser);
router.post('/update-user-profile', cors.corsWithOptions, authenticate.verifyUser, User.updateUserProfile);
router.post('/update-user-photo', cors.corsWithOptions, authenticate.verifyUser, User.updateUserPhoto);
router.post('/update-user-photo-test', cors.corsWithOptions, authenticate.verifyUser, User.updateUserPhotoTest);
router.get('/get-all-users', cors.corsWithOptions, authenticate.verifyUser, User.getAllUsers);
router.post('/delete-user', cors.corsWithOptions, authenticate.verifyUser, User.deleteUser);
router.post('/invite-team-member', cors.corsWithOptions, authenticate.verifyUser, User.inviteTeamMember);
module.exports = router;
