const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            //Tengo que crearlo

            const data = {
                name,
                email,
                password: "asd",
                img: picture,
                google: true,
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: "Hable con el administrador, usuario bloqueado",
            });
        }

        const token = await generateJWT(user.id);

        // console.log(googleUser);

        res.json({
            user,
            token,
        });
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar",
        });
        console.log(error);
    }
};

module.exports = { logInController, googleSignIn };
