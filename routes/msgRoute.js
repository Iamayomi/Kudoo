const express = require("express");
const router = express.Router();
const msgController = require("../controllers/msgController");


router.post("/:username", msgController.sendMsg);
router.get("/:username", msgController.getAllMessages);



module.exports = router;