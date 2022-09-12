const { AppDataSource } = require("../data-source")
const { CreateSuccessResponse, CreateErrorResponse, } = require("../helpers/responseHelper")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const StateRepository = AppDataSource.getRepository("State");

exports.addState = async (req, res) => {
    try {
        const newState = req.body;
        const date = new Date();
        newState.created_at = date
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

exports.StateList = async (req, res) => {
    try {

        const listOfState = await StateRepository.createQueryBuilder("states")
            .select()
            .execute();

        return res
            .status(201)
            .send(
                CreateSuccessResponse(
                    `List of states`,
                    listOfState
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(CreateErrorResponse("listOfUser", `${error}`, "Something Went Wrong!!"));
    }
}


