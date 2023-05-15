const Role = require("../models/role");
const { User, Categorie, Product } = require("../models");

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

const existCategorieById = async (id = "") => {
    const existCategorie = await Categorie.findById(id);
    if (!existCategorie) {
        throw new Error("El Id no existe");
    }
};

const existProductById = async (id = "") => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error("El Id no existe");
    }
};

const hasId = (id = "") => {
    if (!id) {
        throw new Error("Viene sin ID");
    }
};

const allowedCollections = (collection = "", collections = []) => {
    const includes = collections.includes(collection);
    if (!includes) {
        throw new Error(`La coleccion ${collection} no es permitida.
        colleciones permitidas: ${collections}`);
    }

    return true;
};

module.exports = {
    isValidRole,
    isValidEmail,
    existId,
    existCategorieById,
    existProductById,
    hasId,
    allowedCollections,
};
