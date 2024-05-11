const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/usersController");

// POST /api/users
router.post("/", usersCtrl.create);

module.exports = router;
