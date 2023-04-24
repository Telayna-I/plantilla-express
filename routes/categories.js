const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT, isAdminRole } = require("../middlewares");
const {
    createCategorie,
    getAllCategories,
    getCategorie,
    updateCategorie,
    deleteCategorie,
} = require("../controllers/categories");

const { existCategorieById } = require("../helpers/DB-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", getAllCategories);

// Obtener categoria por id - publico

router.get(
    "/:id",
    [
        check("id", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existCategorieById),
        validateFields,
    ],
    getCategorie
);

// Crear categoria - privado - cualquier persona con un token valido

router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateFields,
    ],
    createCategorie
);

// Actualizar - privado - cualquiera con token valido.

router.put(
    "/:id",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("id", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existCategorieById),

        validateFields,
    ],
    updateCategorie
);

// Borrar categoria - Admin

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existCategorieById),
        validateFields,
    ],
    deleteCategorie
);

module.exports = router;
