const { response } = require("express");
const { User, Categorie, Product } = require("../models");
const { ObjectId } = require("mongoose").Types;

const permitedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({ results: user ? [user] : [] });
    }

    const regex = new RegExp(term, "i");

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }],
    });

    res.json({ results: users });
};

const searchCategories = async (term, res = response) => {
    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const categorie = await Categorie.findById(term);
        return res.json({ results: categorie ? [categorie] : [] });
    }

    const regex = new RegExp(term, "i");

    const categories = await Categorie.find({
        name: regex,
        $and: [{ status: true }],
    });

    res.json({ results: categories });
};
const searchProducts = async (term, res = response) => {
    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const product = await Product.findById(term).populate(
            "categorie",
            "name"
        );
        return res.json({ results: product ? [product] : [] });
    }

    const regex = new RegExp(term, "i");

    const products = await Product.find({
        name: regex,
        $and: [{ status: true }],
    }).populate("categorie", "name");

    res.json({ results: products });
};

const search = (req, res = response) => {
    const { collection, term } = req.params;

    if (!permitedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${permitedCollections}`,
        });
    }

    switch (collection) {
        case "users":
            searchUsers(term, res);
            break;
        case "categories":
            searchCategories(term, res);
            break;
        case "products":
            searchProducts(term, res);
            break;

        default:
            res.status(500).json({
                msg: "Se me olvido hacer esta busqueda",
            });
    }
};

module.exports = { search };
