const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();


router.use(authController.isLoggedIn);
router.get('/', viewsController.headerContent);
router.get('/login', viewsController.getLoginForm);
router.get('/Register', viewsController.getSignupForm);




module.exports = router;