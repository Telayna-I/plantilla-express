const { response } = require("express");
const { Product } = require("../models");

const createProduct = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name });

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`,
        });
    }

    const data = {
        ...body,
        name,
        user: req.user._id,
    };

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);
};

// Obtener Products - paginado - total - populate

const getAllProducts = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate("user", "name")
            .populate("categorie", "name")
            .skip(parseInt(from))
            .limit(parseInt(limit)),
    ]);

    res.json({
        total,
        products,
    });
};

// Obtener Product - populate {}

const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate("user", "name")
        .populate("categorie", "name");

    res.json(product);
};

// Actualizar Product

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    console.log(id);
    const { status, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(product);
};

// Borrar Product - estado:false

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndUpdate(
        id,
        {
            status: "false",
        },
        { new: true }
    );
    const authenticatedUser = req.user;

    // await res.json({ user, authenticatedUser });
    res.json({ deletedProduct, authenticatedUser });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
