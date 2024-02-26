const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");


router.use(authController.protectRoutes);

router.post("/:username", messageController.sendMessage);
router.get("/:username", messageController.getAllMessages);



module.exports = router;