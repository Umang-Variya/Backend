exports.buildErrorObjectFromJoiValidator = (errors) => {
  const usefulErrors = {};
  errors.forEach((error) => {
    if (!usefulErrors.hasOwnProperty(error.path.join("_"))) {
      usefulErrors[error.path.join("_")] = {
        type: error.type,
        message: error.message,
      };
    }
  });
  return usefulErrors;
};

exports.CreateErrorResponse = (
  field,
  error,
  type
) => {
  return {
    status: "error",
    success: false,
    errors: {
      [field]: {
        type: type,
        message: error,
      },
    },
  };
};

exports.CreateSuccessResponse = (message, data) => {
  return {
    status: "success",
    success: true,
    message: message,
    data: data,
  };
};
