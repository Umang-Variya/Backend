const express = require('express');
const { AppDataSource } = require("./src/data-source")
const PORT = 3005;
const cors = require('cors')
const mainRouter = require("./src/routes/index")
const path = require('path')
require("dotenv").config();

AppDataSource.initialize()
    .then(async () => {
        console.log("Connected To Postgres");

        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            );
            res.setHeader(
                "Access-Control-Allow-Headers",
                "X-Requested-With,content-type"
            );
            res.setHeader("Access-Control-Allow-Credentials", true);
            next();
        });
        app.use(cors({ origin: true, credentials: true }));

        app.use("/", mainRouter);
        app.set('view engine', 'ejs');

        app.listen(PORT, (error) => {
            if (!error)
                console.log("Server is Successfully Running,and App is listening on port " + PORT)
            else
                console.log("Error occurred, server can't start", error);
        }
        );
    })
    .catch((error) => console.log(error));


