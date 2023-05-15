const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const chargeFile = async (req, res = response) => {
    console.log(req.files.archivo);

    try {
        const name = await uploadFile(req.files, ["txt", "md"]);

        res.json({
            name,
        });
    } catch (msg) {
        res.status(400).json({
            msg,
        });
    }
};

const updateImage = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case "products":
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Limpiar imagenes previas

    if (model.img) {
        const pathImage = path.join(__dirname, "../uploads", collection, model.img);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = await name;

    await model.save();

    res.json({
        model,
    });
};
const updateImageCloudinary = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case "products":
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Limpiar imagenes previas

    if (model.img) {
        const nameArr = model.img.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");

        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();

    res.json({ model });
};

const showImage = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case "users":
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case "products":
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Limpiar imagenes previas

    if (model.img) {
        const pathImage = path.join(__dirname, "../uploads", collection, model.img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const placeHolderPath = path.join(__dirname, "../assets/no-image.jpg");
    res.sendFile(placeHolderPath);
};

module.exports = {
    chargeFile,
    updateImageCloudinary,
    showImage,
};
