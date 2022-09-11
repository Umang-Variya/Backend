const { AppDataSource } = require("../data-source")
const { CreateSuccessResponse, CreateErrorResponse, } = require("../helpers/responseHelper")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const StateRepository = AppDataSource.getRepository("State");

exports.addState = async (req, res) => {
    try {
        const newState = req.body;
        newState.created_at = Date.now()
        const stateData = await StateRepository.save(newState);
        if (stateData) {
            return res
                .status(201)
                .send(
                    CreateSuccessResponse(
                        `State ${newState.name} is added successfully`,
                        stateData
                    )
                );
        }

    } catch (error) {
        return res
            .status(500)
            .json(
                CreateErrorResponse("addState", `${error}`, "Something Went Wrong!!")
            );
    }
}