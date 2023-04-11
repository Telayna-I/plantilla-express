const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error("No es un rol validoo");
    }
};

const isValidEmail = async (email = "") => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error("El email ya se encuentra en uso");
    }
};

const existId = async (id = "") => {
    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error("El Id no existe");
    }
};

module.exports = {
    isValidRole,
    isValidEmail,
    existId,
};
