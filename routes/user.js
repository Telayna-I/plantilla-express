const { Router } = require("express");

const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
} = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const {
    isValidRole,
    isValidEmail,
    existId,
} = require("../helpers/DB-validators");

const router = Router();

router.get("/", usersGet);

router.put(
    "/:id",
    [
        check("id", "No es un id valido de Mongo").isMongoId(),
        check("id").custom(existId),
        check("role").custom(isValidRole),
        validateFields,
    ],
    usersPut
);

router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email no es valido").isEmail(),
        check("email").custom(isValidEmail),
        check(
            "password",
            "El password debe contener mas de 6 caracteres"
        ).isLength({ min: 6 }),
        // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("role").custom(isValidRole),
        validateFields,
    ],
    usersPost
);

router.delete(
    "/:id",
    [
        check("id", "No es un id valido de Mongo").isMongoId(),
        check("id").custom(existId),
        validateFields,
    ],
    usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
