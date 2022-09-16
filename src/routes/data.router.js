const express = require('express');
const { addData, listOfData } = require('../controller/data.controller');
const authMiddleware = require('../helpers/jwt');

const DataRouter = express.Router();

DataRouter.post("/addData", authMiddleware, addData);
DataRouter.get("/list", authMiddleware, listOfData);

module.exports = DataRouter;
