const express = require('express');
const { addData, listOfData } = require('../controller/data.controller');

const DataRouter = express.Router();

DataRouter.post("/addData", addData);
DataRouter.get("/list", listOfData);

module.exports = DataRouter;
