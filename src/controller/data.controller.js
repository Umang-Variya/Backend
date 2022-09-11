const { AppDataSource } = require("../data-source")
const { CreateSuccessResponse, CreateErrorResponse, } = require("../helpers/responseHelper")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const DataRepository = AppDataSource.getRepository("CurrentAffair");

exports.addData = async (req, res) => {
    try {
        const addNewData = req.body;
        addNewData.created_at = Date.now()
        const stateData = await DataRepository.save(addNewData);
        if (stateData) {
            return res
                .status(201)
                .send(
                    CreateSuccessResponse(
                        `Current affair is added successfully`,
                        stateData
                    )
                );
        }

    } catch (error) {
        return res
            .status(500)
            .json(
                CreateErrorResponse("addData", `${error}`, "Something Went Wrong!!")
            );
    }
}

exports.listOfData = async (req, res) => {

    let whereQuery = ""

    const { stateName } = req.query

    if (stateName) {
        whereQuery += ` AND b.name LIKE '%${stateName}%'`
    }

    try {

        const result = await DataRepository.query("SELECT a.id ,a.date_of_current_affair,a.content,b.name,b.image,a.created_at  FROM currentaffair as a join states as b on b.id = a.state_id" + whereQuery)

        return res
            .status(201)
            .send(
                CreateSuccessResponse(
                    `List of Current Affair`,
                    result
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(CreateErrorResponse("listOfUser", `${error}`, "Something Went Wrong!!"));
    }
}
