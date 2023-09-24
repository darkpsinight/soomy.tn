const express = require("express");
const roomRoutes = express.Router();
const {isAdmin} = require("../utils/middleware")

const {
    addRoom,
    getSoomyAuctions,
    getPremiumAuctions,
    getFinishedAuctions,
    getPrivilegedAuctions,
    getAuctions,
    getAllAuctions,
    getAuctionById,
    updateRoom,
    getroomsPaginationWinner,
    deleteroom,
    getRelevantAuctions,
    getAuctionsSearch,
    getNumberOfDocumentsByMonth,
    getAuctionsByCategory
} = require("../controllers/auctionController");

roomRoutes.put("/updateRoom/:id", updateRoom);
roomRoutes.post("/createRoom",isAdmin,addRoom);
roomRoutes.post("/getAuctions", getAuctions);
roomRoutes.get("/getAllAuctions", getAllAuctions);
roomRoutes.get("/getAuctionsByCategory/:category", getAuctionsByCategory);
roomRoutes.get("/getNumberOfDocumentsByMonth", getNumberOfDocumentsByMonth);
roomRoutes.get("/getAuctionsSearch/:search", getAuctionsSearch);
roomRoutes.get("/getRelevantAuctions/:category", getRelevantAuctions);
roomRoutes.get("/getSoomyAuctions", getSoomyAuctions);
roomRoutes.get("/getPremiumAuctions", getPremiumAuctions);
roomRoutes.get("/getFinishedAuctions/:range", getFinishedAuctions);
roomRoutes.get("/getPrivilegedAuctions/:privilege", getPrivilegedAuctions);
roomRoutes.get("/getAuctionById/:id", getAuctionById);
roomRoutes.get("/roomWinner/:id/:page", getroomsPaginationWinner);
roomRoutes.delete("/deleteRoom/:id",isAdmin,deleteroom);

module.exports = roomRoutes