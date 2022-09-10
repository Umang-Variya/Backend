const express = require('express');
const { login, signUp } = require("../controller/auth.controller");
const { LoginSchemaValidator } = require('../validators/login.validator');

const AuthRouter = express.Router();

AuthRouter.post("/login", LoginSchemaValidator, login);
AuthRouter.post("/signup", signUp);

module.exports = AuthRouter;
