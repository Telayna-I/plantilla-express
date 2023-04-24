const { response } = require("express");
const { Categorie } = require("../models");

const createCategorie = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categorieDB = await Categorie.findOne({ name });

    if (categorieDB) {
        return res.status(400).json({
            msg: `La categoria ${categorieDB.name}, ya existe`,
        });
    }

    const data = {
        name,
        user: req.user._id,
    };

    const categorie = new Categorie(data);

    await categorie.save();

    res.status(201).json(categorie);
};

// Obtener Categorias - paginado - total - populate

const getAllCategories = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
            .populate("user", "name")
            .skip(parseInt(from))
            .limit(parseInt(limit)),
    ]);

    res.json({
        total,
        categories,
    });
};

// Obtener Categoria - populate {}

const getCategorie = async (req, res = response) => {
    const { id } = req.params;
    const categorie = await Categorie.findById(id).populate("user", "name");

    res.json(categorie);

    // console.log(categorie);
};

// Actualizar Categora

const updateCategorie = async (req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const categorie = await Categorie.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(categorie);
};

// Borrar Categoria - estado:false

const deleteCategorie = async (req, res = response) => {
    const { id } = req.params;

    const deletedCategorie = await Categorie.findByIdAndUpdate(
        id,
        {
            status: "false",
        },
        { new: true }
    );
    const authenticatedUser = req.user;

    // await res.json({ user, authenticatedUser });
    res.json({ deletedCategorie, authenticatedUser });
};

module.exports = {
    createCategorie,
    getAllCategories,
    getCategorie,
    updateCategorie,
    deleteCategorie,
};
