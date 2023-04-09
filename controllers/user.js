const { response } = require("express");

const usersGet = (req, res = response) => {
    const { nombre = "No name", apellido, apikey } = req.query;

    res.json({
        message: "GET API - controlador",
        nombre,
        apellido,
        apikey,
    });
};

const usersPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.json({
        message: "POST API - controlador",
        nombre,
        edad,
    });
};

const usersPut = (req, res) => {
    const id = req.params.id;
    res.json({
        message: "PUT API - controlador",
    });
};

const usersDelete = (req, res) => {
    res.json({
        message: "DELETE API - controlador",
    });
};
const usersPatch = (req, res) => {
    res.json({
        message: "PATCH API - controlador",
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
};
