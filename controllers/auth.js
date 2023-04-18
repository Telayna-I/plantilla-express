const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const logInController = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //Verificar que el correo exista en la base de datos
        if (!user) {
            return res.status(400).json({
                message: "Usuario / Password incorrect - email",
            });
        }

        //Verificar que el usuario exista
        if (!user.status) {
            return res.status(400).json({
                message: "Usuario / Password incorrect - status false",
            });
        }

        //Validar el password que nos envian con el de la base de datos
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Usuario / Password incorrect - password",
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);
        res.json({ token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Algo salio mal hable con el administrador",
        });
    }
};

module.exports = { logInController };
