const Joi = require('joi');
const { buildErrorObjectFromJoiValidator } = require("../helpers/responseHelper")

exports.LoginSchemaValidator = async (req, res, next) => {
  const loginData = req.body;
  const { email, password } = loginData;

  const LoginSchema = Joi.object({
    email: Joi.string().required().messages({
      "string.empty": `email cannot be an empty field.`,
      "any.required": `email is a required field.`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `password cannot be an empty field.`,
      "any.required": `password is a required field.`,
    }),
  });

  const validationResult = LoginSchema.validate(loginData, {
    abortEarly: false,
  });

  if (validationResult.error && validationResult.error?.details.length !== 0) {
    return res.status(400).json({
      success: false,
      errors: buildErrorObjectFromJoiValidator(validationResult.error.details),
    });
  }
  next();
};

