const { AppDataSource } = require("../data-source")
const { CreateSuccessResponse, CreateErrorResponse, } = require("../helpers/responseHelper")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
var fs = require('fs');

const UserRepository = AppDataSource.getRepository("User");

exports.login = async (req, res) => {
  try {
    const userData = UserRepository.createQueryBuilder("admin");

    userData.where({
      email: req.body.email,
    });
    const adminData = await userData.getOne();

    if (adminData.is_active == false) {
      return res
        .status(401)
        .send(
          CreateErrorResponse(
            "Login",
            "You account is deactive by admin",
            "Blocked User"
          )
        );
    }

    if (adminData == null) {
      return res
        .status(401)
        .send(
          CreateErrorResponse(
            "Login",
            "Invalid email id or password! Please try again.",
            "User not found"
          )
        );
    }
    if (adminData) {
      let validUser = bcrypt.compareSync(req.body.password, adminData.password);
      const token = jwt.sign(
        { id: adminData.id?.toString(), email: adminData.email, roles: adminData.roles },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      adminData["token"] = token;
      delete adminData["password"];
      if (validUser) {
        return res
          .status(200)
          .send(CreateSuccessResponse(`Login successfully`, adminData));
      }
      if (!validUser) {
        return res
          .status(401)
          .send(
            CreateErrorResponse(
              "Login",
              "Invalid email id or password! Please try again.",
              "Invalid Credentials"
            )
          );
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json(CreateErrorResponse("Login", `${error}`, "Something Went Wrong!!"));
  }
};

//-----------------------future signup------------------------------------------------

// exports.signUp = async (req, res) => {
//   try {
//     const newAdminUser = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPwd = bcrypt.hashSync(req.body.password, salt);
//     newAdminUser.password = hashedPwd;
//     const date = new Date();
//     newAdminUser.created_at = date
//     const AdminData = await UserRepository.save(newAdminUser);
//     if (AdminData) {
//       return res
//         .status(201)
//         .send(
//           CreateSuccessResponse(
//             `Admin with email ${newAdminUser.email} is registered successfully`,
//             AdminData
//           )
//         );
//     }

//   } catch (error) {
//     return res
//       .status(500)
//       .json(
//         CreateErrorResponse("SignUp", `${error}`, "Something Went Wrong!!")
//       );
//   }
// };
