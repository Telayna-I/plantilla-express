const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFile = (files, validExtensions = ["png", "jpg", "jpeg", "gif"], folder = "") => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const cutName = archivo.name.split(".");
        const extension = cutName[cutName.length - 1];

        //Validar la extension

        if (!validExtensions.includes(extension)) {
            return reject(`La extension ${extension} no esta permitida.
            Extensiones validas: ${validExtensions}`);
        }

        const tempName = uuidv4() + "." + extension;

        const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

        archivo.mv(uploadPath, err => {
            if (err) {
                return reject(err);
            }
        });

        resolve(tempName);
    });
};

module.exports = {
    uploadFile,
};
