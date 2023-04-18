const { Router } = require("express");
const { check } = require("express-validator");
const { logInController, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
    "/login",
    [
        check("email", "El correo es obligatorio").isEmail(),
        check("password").not().isEmpty({ min: 6 }),
        validateFields,
    ],
    logInController
);
router.post(
    "/google",
    [
        check("id_token", "El id_token de Google es necesario").not().isEmpty(),
        validateFields,
    ],
    googleSignIn
);

module.exports = router;
