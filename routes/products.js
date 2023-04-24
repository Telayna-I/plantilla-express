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

const {
    existCategorieById,
    existProductById,
} = require("../helpers/DB-validators");
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products");

const router = Router();

// Obtener todos los productos - publico
router.get("/", getAllProducts);

// Obtener Producto por id - publico

router.get(
    "/:id",
    [
        check("id", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existProductById),
        validateFields,
    ],
    getProduct
);

// Crear Producto - privado - cualquier persona con un token valido

router.post(
    "/",
    [
        validateJWT,
        check("categorie", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existCategorieById),
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateFields,
    ],
    createProduct
);

// Actualizar - privado - cualquiera con token valido.

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existProductById),
        check("categorie", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existCategorieById),

        validateFields,
    ],
    updateProduct
);

// Borrar Producto - Admin

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "No es un id valido de Mongo")
            .isMongoId()
            .bail()
            .custom(existProductById),
        validateFields,
    ],
    deleteProduct
);

module.exports = router;
