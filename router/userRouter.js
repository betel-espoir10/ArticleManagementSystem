// routes/userRouter.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// REGISTER
router.get("/register", userController.getRegister);
router.post("/register", userController.postRegister);

//LIST USER
router.get("/users", userController.getAllUser);

// LOGIN
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

// LOGOUT
router.get("/logout", userController.logout);

module.exports = router;
