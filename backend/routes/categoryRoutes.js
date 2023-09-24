const express = require("express");
const categoryRoutes = express.Router();
const upload = require("../utils/multer");
const {isAdmin} = require("../utils/middleware")
const {
    addcategory,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName,
    getTotalCategories

   
} = require("../controllers/categoryController");


categoryRoutes.post("/createcategory",isAdmin,upload.single("image"), addcategory);
categoryRoutes.post("/listcategories", getCategories);
categoryRoutes.get("/listTotalcategories", getTotalCategories);
categoryRoutes.get("/category/:id", getSingleCategory);
categoryRoutes.get("/getCategoryByName/:id", getCategoryByName);
categoryRoutes.put("/updatecategory/:id",isAdmin, updateCategory);
categoryRoutes.delete("/deletecategory/:id",isAdmin, deleteCategory);

module.exports = categoryRoutes