const { Schema, model } = require("mongoose");

const CategorieSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

CategorieSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = model("Categorie", CategorieSchema);
