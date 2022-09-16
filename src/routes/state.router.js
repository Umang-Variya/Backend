const express = require('express');
const { addState, StateList } = require('../controller/state.controller');
const authMiddleware = require('../helpers/jwt');

const StateRouter = express.Router();

StateRouter.post("/addState", authMiddleware, addState);
StateRouter.get("/listOfState", authMiddleware, StateList);

module.exports = StateRouter;
