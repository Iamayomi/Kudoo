const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();


router.use(authController.isLoggedIn);
router.get('/', viewsController.homeContent);
router.get('/login', viewsController.getLoginForm);
router.get('/register', viewsController.getSignupForm);
router.get('/addEmail', viewsController.getEmailForm);
router.get('/home', viewsController.getHomePage);
router.get('/myMessage', viewsController.getMyMessage);
router.get('/settings', viewsController.getSettingPage);
router.get('/changeEmail', viewsController.getChangeEmailPage);
router.get('/changePassword', viewsController.getChangePasswordPage);
router.get('/changeUsername', viewsController.getChangeUsernamePage);



module.exports = router;