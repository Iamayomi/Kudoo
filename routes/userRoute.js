const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");




router.post('/register', authController.register);

router.post('/login', authController.loginUser);
router.get('/logOut', authController.logout);
router.post('/addEmail', authController.addEmail);

router.use(authController.protectRoutes);

router.patch('/setting/updateMe', userController.updateUser);


module.exports = router;