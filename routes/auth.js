const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const login = require("../controllers/Users/logIn");
const testToken = require("../controllers/Users/testToken");
const updatePassword = require("../controllers/Users/updatePassword");

router.post("/signin", createUser);
router.post("/login", login);
router.post("/test-token", testToken);

router.put("/update-password", updatePassword);

module.exports = router;
