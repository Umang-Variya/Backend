const express = require('express');
const { addState } = require('../controller/state.controller');

const StateRouter = express.Router();

StateRouter.post("/addState", addState);

module.exports = StateRouter;
