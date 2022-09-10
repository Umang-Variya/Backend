const express = require('express');
const AuthRouter = require('./auth.router');

const mainRouter = express.Router();

mainRouter.use("/api/auth", AuthRouter);

module.exports = mainRouter;
