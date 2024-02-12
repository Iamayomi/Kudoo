const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();


router.use(authController.isLoggedIn);
router.get('/', viewsController.homeContent);
router.get('/login', viewsController.getLoginForm);
router.get('/register', viewsController.getSignupForm);
router.get('/addEmail', viewsController.getEmailForm);





module.exports = router;