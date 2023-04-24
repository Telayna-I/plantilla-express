const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../db/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: "/api/auth",
            categories: "/api/categories",
            products: "/api/products",
            search: "/api/search",
            users: "/api/users",
        };

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
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.categories, require("../routes/categories"));
        this.app.use(this.paths.products, require("../routes/products"));
        this.app.use(this.paths.search, require("../routes/search"));
        this.app.use(this.paths.users, require("../routes/user"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto", this.port);
        });
    }
}

module.exports = Server;
