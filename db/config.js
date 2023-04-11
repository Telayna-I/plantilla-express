const mongoose = require("mongoose");

const dbConecction = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CNN);
        console.log("BASE DE DATOS ONLINE.");
    } catch (error) {
        throw new Error(
            "Error de coneccion de base de datos: " + error.message
        );
    }
};

module.exports = { dbConecction };
