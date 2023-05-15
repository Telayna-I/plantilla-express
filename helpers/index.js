const dbValidators = require("./DB-validators");
const googleVerify = require("./google-verify");
const generateJWT = require("./jwt");
const uploadFile = require("./upload-file");

module.exports = {
    ...dbValidators,
    ...googleVerify,
    ...generateJWT,
    ...uploadFile,
};
