const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-JWT");
const validateRoles = require("../middlewares/validateRole");
const validateUploadFile = require("../middlewares/validate-file");

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateUploadFile,
};
