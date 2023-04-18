const { Router } = require("express");
const { check } = require("express-validator");
const { logInController } = require("../controllers/auth");
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

module.exports = router;
