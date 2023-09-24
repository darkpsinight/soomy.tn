const express = require("express");
const OrderRoutes = express.Router();
const {isAdmin} = require("../utils/middleware")

const {
    updateOrder,
    getSingleOrder,
    getOrder,
    deleteOrder,
    getOrdersbyId,
    addOrder,
    getNumberOfOrders,
    getOrderByRoom ,
    validationMail ,
    getNumberOfDocumentsByMonth,
    getAllOrders,
} = require("../controllers/orderController");


OrderRoutes.post("/createOrder", addOrder);
OrderRoutes.post("/validationMail",validationMail);
OrderRoutes.get("/listOrders/:page",isAdmin, getOrder);
OrderRoutes.get("/getSingleOrder/:id",getSingleOrder);
OrderRoutes.get("/getNumberOfDocumentsByMonth",getNumberOfDocumentsByMonth );
OrderRoutes.get("/getOrderByRoom/:id/:user",getOrderByRoom );
OrderRoutes.get("/getUserOrder/:id/:page", getOrdersbyId);
OrderRoutes.put("/updateOrder/:id", updateOrder);
OrderRoutes.delete("/deleteOrder/:id/", deleteOrder);
OrderRoutes.get("/getNumberOfOrders",getNumberOfOrders);
OrderRoutes.get("/getAllOrders",getAllOrders);

module.exports = OrderRoutes