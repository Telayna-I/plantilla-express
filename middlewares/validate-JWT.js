const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETOPUBLICKEY);

        //Leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                message: "User not activated - Usuario no existe en DB",
            });
        }
        if (!user.status) {
            return res.status(401).json({
                message: "User not activated - Usuario con estado en falso",
            });
        }

        req.user = user;

        // req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }

    console.log(token);

    // next();
};

module.exports = { validateJWT };
