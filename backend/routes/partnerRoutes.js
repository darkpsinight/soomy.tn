const express = require("express");
const partnerRoutes = express.Router();
const upload = require("../utils/multer");
const {isAdmin} = require("../utils/middleware")
const {
    addPartner,
   getPartners,
   getTotalPartners,
   updatePartner,
   updatepartnerImage,
   deletePartner
   
} = require("../controllers/partnerController");


partnerRoutes.post("/createpartner",isAdmin,upload.single("image"), addPartner);
partnerRoutes.post("/getPartners",isAdmin, getPartners);
partnerRoutes.get("/getTotalPartners",isAdmin, getTotalPartners);
partnerRoutes.put("/updatepartner/:id",isAdmin, updatePartner);
partnerRoutes.put("/updatepartnerimage/:id",isAdmin,upload.single("image"),updatepartnerImage);
partnerRoutes.delete("/deletepartner/:id",isAdmin,deletePartner);
module.exports = partnerRoutes