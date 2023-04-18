const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../db/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        this.authPath = "/api/auth";

        // Conectar a base de datos.
        this.conectDb();

        //Middlewares
        this.middlewares();

        //Routas de mi app
        this.routes();
    }

    async conectDb() {
        await dbConecction();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        //Parseo y lectura del body

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usuariosPath, require("../routes/user"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto", this.port);
        });
    }
}

module.exports = Server;
