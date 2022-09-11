const express = require('express');
const AuthRouter = require('./auth.router');
const DataRouter = require('./data.router');
const StateRouter = require('./state.router');

const mainRouter = express.Router();

mainRouter.use("/api/auth", AuthRouter);
mainRouter.use("/api/data", DataRouter);
mainRouter.use("/api/state", StateRouter);

module.exports = mainRouter;
