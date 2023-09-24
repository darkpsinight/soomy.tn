const express = require("express");
const usePackRoutes = express.Router();

const {
  createPackUse,
  fetchLastUsedPackUse,
  getPackUseByRoomAndUser,
  getValidPackUseByRoomAndUser,
  getPackUseByRoom,
  getPackUseByUser,
  getValidPackUseByRoom,
  getValidPackUseByUser,
  updatePackUseValidity,
  updatePackUseRemaining,
  deletePackUseById,
} = require("../controllers/packUseController");

usePackRoutes.post("/createPackUse", createPackUse);
usePackRoutes.get("/fetchLastUsedPackUse/:roomId/:userid", fetchLastUsedPackUse);
usePackRoutes.get("/getPackUseByRoom/:room_id", getPackUseByRoom);
usePackRoutes.get("/getValidPackUseByRoom/:room_id", getValidPackUseByRoom);
usePackRoutes.get("/getPackUseByUser/:user_id", getPackUseByUser);
usePackRoutes.get("/getValidPackUseByUser/:user_id", getValidPackUseByUser);
usePackRoutes.get("/getPackUseByRoomAndUser/:room_id/:user_id", getPackUseByRoomAndUser);
usePackRoutes.get("/getValidPackUseByRoomAndUser/:room_id/:user_id", getValidPackUseByRoomAndUser);
usePackRoutes.put("/updatePackUseValidity/:packUse_Id", updatePackUseValidity);
usePackRoutes.put("/updatePackUseRemaining/:packUse_Id", updatePackUseRemaining);
usePackRoutes.delete("/deletePackUse/:packUseId", deletePackUseById);
module.exports = usePackRoutes;
