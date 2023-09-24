const express = require("express");
const ParticipationRoutes = express.Router();
const {isAdmin} = require("../utils/middleware")

const {
    addParticipation,
    getParticipation,
    getSingleParticipation,
    updateParticipation,
    deleteParticipation,
    getUserParticipation,
    getRoomParticipation,
    getUserAndRoomParticipation,
    getParticipationUserPending,
    getParticipationUserEnable,
    getTransactions,
    getTransactionsbyId,
    createTransaction,
    getNumberOfDocumentsByMonth ,
    getNumberOfParticipations,
    getAllTransactions,
   
} = require("../controllers/participationController");


ParticipationRoutes.post("/createParticipation", addParticipation);
ParticipationRoutes.post("/createtransaction", createTransaction );
ParticipationRoutes.get("/listParticipations", getParticipation);
ParticipationRoutes.get("/getNumberOfDocumentsByMonth", getNumberOfDocumentsByMonth );
ParticipationRoutes.get("/participation/:id",getSingleParticipation);
ParticipationRoutes.get("/getUserAndRoomParticipation/:id/:room",getUserAndRoomParticipation);
ParticipationRoutes.get("/getUserParticipation/:id",getUserParticipation);
ParticipationRoutes.post("/getTransactionsbyId",getTransactionsbyId);
ParticipationRoutes.get("/getTransactions/:page",getTransactions);
ParticipationRoutes.get("/getRoomParticipation/:id",getRoomParticipation);
ParticipationRoutes.get("/getParticipationUserPending/:id/:page",getParticipationUserPending);
ParticipationRoutes.get("/getParticipationUserEnable/:id/:page",getParticipationUserEnable);
ParticipationRoutes.get("/getNumberOfParticipations/:id",getNumberOfParticipations);
ParticipationRoutes.put("/updateParticipation/:id",isAdmin, updateParticipation);
ParticipationRoutes.delete("/deleteParticipation/:id/:room", deleteParticipation);
ParticipationRoutes.get("/getAllTransactions",getAllTransactions);

module.exports = ParticipationRoutes