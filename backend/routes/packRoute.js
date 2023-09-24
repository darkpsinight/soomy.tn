const express = require("express");
const packRoutes = express.Router();
const multi_upload = require("../utils/multer");
const {
    addPackType,
    updatePack,
    updatePackImage,
    getPacks,
    getPackById,
    deletePackType
} = require("../controllers/packController");


packRoutes.post("/createpack",multi_upload.single("image"), addPackType);
packRoutes.get("/getPacks", getPacks);
packRoutes.get("/getPackById/:id", getPackById);
packRoutes.put("/updatepack/:id", updatePack);
packRoutes.put("/updatePackimage/:id", multi_upload.single("image"), updatePackImage);
packRoutes.delete("/deletepack/:id", deletePackType);

module.exports = packRoutes