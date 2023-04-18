const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-JWT");
const validateRoles = require("../middlewares/validateRole");

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
};
