const { response } = require("express");

const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(parseInt(from)).limit(parseInt(limit)),
    ]);

    res.json({
        total,
        users,
    });
};

const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        message: "POST API - controlador",
        user,
    });
};

const usersPut = async (req, res) => {
    const id = req.params.id;
    const { password, google, email, ...rest } = req.body;

    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    rest.password = await bcryptjs.hash(password, salt);

    // Actializar BD
    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        message: "PUT API - controlador",
        user,
    });
};

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: "false" });
    const authenticatedUser = req.user;

    // await res.json({ user, authenticatedUser });
    res.json({ user, authenticatedUser });
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
