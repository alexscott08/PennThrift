const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require('dotenv').config();

var tempDBAccess = "mongodb+srv://pennthrift:A0NQwsElYopLKt97@pennthriftbackend.stiff.mongodb.net/PennThriftBackend?retryWrites=true&w=majority"

const storage = new GridFsStorage({
    // url: process.env.DATABASE_ACCESS,
    url:tempDBAccess,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = [];

        if (match.indexOf(file.mimetype) != -1) {
            const filename = `${Date.now()}-pennthrift-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-pennthrift-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });