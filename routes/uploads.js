const { Router } = require("express");
const { check } = require("express-validator");
const { chargeFile, updateImageCloudinary, showImage } = require("../controllers/uploads");
const { validateFields, validateUploadFile } = require("../middlewares");
const { allowedCollections } = require("../helpers/DB-validators");

const router = Router();

router.post("/", validateUploadFile, chargeFile);

router.put(
    "/:collection/:id",
    [
        validateUploadFile,
        check("id", "El id debe ser de mongo").isMongoId(),
        check("collection").custom(c => allowedCollections(c, ["users", "products"])),
        validateFields,
    ],
    updateImageCloudinary
);

router.get(
    "/:collection/:id",
    [
        check("id", "El id debe ser de mongo").isMongoId(),
        check("collection").custom(c => allowedCollections(c, ["users", "products"])),
        validateFields,
    ],
    showImage
);

module.exports = router;
