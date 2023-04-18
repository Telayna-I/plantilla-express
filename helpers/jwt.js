const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETOPUBLICKEY,
            {
                expiresIn: "4h",
            },
            (err, token) => {
                if (err) {
                    reject("No se pudo generar el token");
                } else {
                    console.log("resolvi");
                    resolve(token);
                }
            }
        );
    });
};

module.exports = { generateJWT };
