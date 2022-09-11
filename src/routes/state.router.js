const express = require('express');
const { addState, StateList } = require('../controller/state.controller');

const StateRouter = express.Router();

StateRouter.post("/addState", addState);
StateRouter.get("/listOfState", StateList);

module.exports = StateRouter;
