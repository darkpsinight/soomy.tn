const express = require("express");
const brandRoutes = express.Router();
const upload = require("../utils/multer");
const {isAdmin} = require("../utils/middleware")

const {
    addBrand,
    getTotalBrands,
    getBrands,
    updateBrand,
    updatebrandImage,
    deleteBrand
   
} = require("../controllers/brandController");


brandRoutes.post("/createbrand",upload.single("image"), addBrand);
brandRoutes.post("/getBrands", getBrands);
brandRoutes.get("/getTotalBrands", getTotalBrands);
brandRoutes.put("/updatebrand/:id", updateBrand);
brandRoutes.put("/updatebrandimage/:id",upload.single("image"),updatebrandImage);
brandRoutes.delete("/deletebrand/:id",deleteBrand);
module.exports = brandRoutes