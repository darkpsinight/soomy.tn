const express = require("express");
const purchaseRouter = express.Router();

const {
  addPackPurchase,
  updatePackPurchase,
  getPackPurchase,
  deletePackPurchase
} = require("../controllers/packPurchaseController");

purchaseRouter.post("/createPurchase", addPackPurchase);
purchaseRouter.put("/updatePurchase/:selectedPurchasedPack_Id", updatePackPurchase);
purchaseRouter.get("/getPurchase/:user_id", getPackPurchase);
purchaseRouter.delete("/deletePurchase/:id", deletePackPurchase);

module.exports = purchaseRouter;
