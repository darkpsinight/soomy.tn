const express = require("express");
const productRoutes = express.Router();
const multiupload = require("../utils/multer");
const {isAdmin} = require("../utils/middleware")
const {
    addProduct,
    getTotalProducts,
    getProductPagination,
    updateproduct,
    updateproductImage,
    updateproductImage1,
    updateproductImage2,
    deleteProduct
} = require("../controllers/productController");

productRoutes.post("/createproduct",isAdmin,multiupload.array('image', 10), addProduct);
productRoutes.post("/getProductPagination",isAdmin, getProductPagination);
productRoutes.get("/getTotalProducts",isAdmin, getTotalProducts);
productRoutes.put("/updateproduct/:id",isAdmin, updateproduct);
productRoutes.put("/updateproductimage/:id",isAdmin,multiupload.array('image', 10),updateproductImage);
productRoutes.put("/updateproductimage1/:id",isAdmin,multiupload.array('image', 10),updateproductImage1);
productRoutes.put("/updateproductimage2/:id",isAdmin,multiupload.array('image', 10),updateproductImage2);
productRoutes.delete("/deleteproduct/:id",isAdmin,deleteProduct);

module.exports = productRoutes