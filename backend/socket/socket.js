const Room = require("../models/auction");
const User = require("../models/user");
const Order = require("../models/order");
const Participation = require("../models/participation");
const PackUse = require("../models/packUse");

const LIMIT_PERCENTAGE = 0.6;
const PREMIUM_LIMIT_PERCENTAGE = 0.2;
const AUCTION_DURATION_IN_SECONDS = 600;
const { addUser, getRoom, removeRoom } = require("./socketFunctions");

function start(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5000/",
      methods: ["GET", "POST"],
    },
  });

  io.on("connect", (socket) => {
    socket.on(
      "join",
      async ({ user, room, remaining, app_id, photo, isParticipated }) => {
        try {
          const { _id, mise, product, roomCategory } = room; // get room data from user
          const { prix, title, image } = product;

          socket.join(_id); // join room socket

          const { roomInfo, userInfo, control } = await addUser({
            id: socket.id,
            app_id,
            remaining,
            user,
            _id,
            mise,
            prix,
            title,
            roomCategory,
            image: image?.imageURL,
            isParticipated,
            duration: AUCTION_DURATION_IN_SECONDS,
            photo,
          }); // create room and user instances and add them to rooms array

          if (control === true) {
            io.to(socket.id).emit("conflictingConnection", {
              control: true,
              roomID: _id,
            }); // set conflicting connection flag to true
            return;
          }

          io.to(socket.id).emit("userwelcome", {
            user: roomInfo._lastUserName,
            montant: userInfo._montant,
            freeCredit: userInfo._freeCredit,
            counter: roomInfo._counter,
            control: roomInfo._control,
            photo: roomInfo._lastUserPhoto,
          }); // send data to user

          io.to(socket.id).emit("userwelcomeback", {
            room_id: roomInfo._id,
            user: roomInfo._lastUserName,
            montant: userInfo._montant,
            freeCredit: userInfo._freeCredit,
            counter: roomInfo._counter,
            control: roomInfo._control,
            photo: roomInfo._lastUserPhoto,
          }); // send data to user that already was in room

          io.to(userInfo._id).emit("conflictingConnection", {
            control: false,
            roomID: roomInfo._id,
          }); //remove conflicting connection flag
        } catch (error) {}
      }
    );
    /*********************************SOCKET ACTIONS****************************************** */
    socket.once("firstClick", async (data) => {
      try {
        const { room_id } = data; //get room id from user

        let currentRoom = getRoom(room_id); // get room data from rooms array


        if (!currentRoom) {

        } else {

        }

        if (currentRoom._counter === 0) {

          const newTimer = setInterval(Timer, 1000); //start timer

          function Timer() {
            try {
              let { countdown, finished } = currentRoom.getCountdown();


              io.to(room_id).emit("timer", {
                countdown: countdown,
              });

              if (countdown === 0) {
                clearInterval(newTimer); //clear Timer

                currentRoom.endAuction().then(() => {

                  io.to(currentRoom._winnerSocket).emit("winner", {
                    flag: true,
                  }); // send end Modal flag to winner

                  currentRoom._users.map((elm) => {
                    if (
                      elm._participated &&
                      currentRoom._winner !== elm._appId &&
                      currentRoom._purchaseUser !== elm._appId
                    ) {
                      io.to(elm._id).emit("lost", {
                        flag: true,
                      }); // send end Modal flag to the losers
                    } else if (
                      !elm._participated ||
                      currentRoom._purchaseUser === elm._appId
                    ) {
                      io.to(elm._id).emit("neutral", {
                        flag: true,
                      }); // send end Modal flag to the losers
                    }
                  });
                });
                removeRoom(currentRoom._id);
                return;
              }
              if (finished === true) {
                clearInterval(newTimer); //clear Timer

                removeRoom(currentRoom._id);
              }
            } catch (err) {
              console.log("(socket.js) Error in timer function:", err);
            }
          } // define timer function
        }
      } catch (error) {
        console.log("(socket.js) Error catch in time function:", error);
      }
    });

    socket.on("clickButton", async (data) => {
      try {
        const { roomID, userID, timeOfClick, remaining } = data;
        const userMontant = await PackUse.findOne({
          room_id: roomID,
          user_id: userID,
          isEnabled: true,
        }).select("remaining");

        let currentRoom = getRoom(roomID);
        let currentUser = currentRoom.findUserbyId(userID);
        currentUser.setMontant(userMontant.remaining);
        if (
          currentUser._montant - currentRoom._mise >= 0 ||
          currentUser._freeCredit > 0
        ) {
          if (currentRoom._countdown <= 5) {
            currentRoom.tenLastSeconds();
          } // add 5 seconds to countdown if countdown is less than 5 seconds
          currentRoom.increment(); // increment promo price
          currentRoom.addLastUser(
            userID,
            currentUser._name,
            currentUser._photo,
            socket.id
          ); // update last user

          const updateRoom = await Room.updateOne(
            { _id: roomID },
            {
              $push: {
                tenLastMises: {
                  $each: [{ user: userID, date: timeOfClick }],
                  $slice: -10,
                  $sort: { "a.b": 1 },
                },
              },
            }
          ); // update 10 last mises in database
          if (currentUser._freeCredit >= currentRoom._mise) {
            currentUser.setFreeCredit(currentRoom._mise);

            await Participation.updateOne(
              { $and: [{ user: userID }, { room: roomID }] },
              {
                $inc: { freeCredit: -currentRoom._mise },
              }
            ); // update number of clicks in participation document

            io.to(socket.id).emit("updateFreeCredit", {
              freeCredit: currentUser._freeCredit,
            }); // send new credit to user
          } else if (
            currentUser._freeCredit < currentRoom._mise &&
            currentUser._freeCredit > 0
          ) {
            const newCredit = await PackUse.findOneAndUpdate(
              { room_id: roomID, user_id: userID, isEnabled: true },
              {
                $inc: {
                  remaining: -(currentRoom._mise - currentUser._freeCredit),
                },
              },
              { returnOriginal: false }
            ); //update user credit in database => (update remaining in packUse)
            // console.log("(socket.js) newCredit: ", newCredit); // newCredit is packUse now

            currentUser.setMontant(newCredit.remaining);
            currentUser.setFreeCredit(currentUser._freeCredit);

            await Participation.updateOne(
              { $and: [{ user: userID }, { room: roomID }] },
              {
                $inc: { montant: currentRoom._mise - currentUser._freeCredit },
                freeCredit: currentUser._freeCredit,
              }
            ); // update montant in participation document
            await Participation.updateOne(
              { $and: [{ user: userID }, { room: roomID }] },
              {
                $inc: { freeCredit: -currentUser._freeCredit },
              }
            ); // update 'free credit' in participation document
            io.to(socket.id).emit("updatecounter", {
              montant: newCredit?.remaining,
            }); // send new credit to user
            io.to(socket.id).emit("updateFreeCredit", {
              freeCredit: currentUser._freeCredit,
            }); // send new credit to user
          } else {
            const newCredit = await PackUse.findOneAndUpdate(
              { room_id: roomID, user_id: userID, isEnabled: true },
              {
                $inc: {
                  remaining: -currentRoom._mise,
                },
              },
              { returnOriginal: false }
            ); //update user credit in database <=> (update packUse's remaining)

            currentUser.setMontant(newCredit.remaining);

            await Participation.updateOne(
              { $and: [{ user: userID }, { room: roomID }] },
              {
                $inc: { montant: currentRoom._mise },
              }
            ); // update number of clicks in participation document

            io.to(socket.id).emit("updatecounter", {
              montant: newCredit?.remaining,
            }); // send new credit to user <=> (set new packUse remaining value)
          }
          await Participation.updateOne(
            { $and: [{ user: userID }, { room: roomID }] },
            {
              $inc: { NumberOfClicks: 1 },
            }
          ); // update number of clicks in participation document

          if (currentRoom._price * LIMIT_PERCENTAGE <= currentRoom._counter) {
            currentRoom.endAuction();
            currentRoom.finished();
            {
              io.to(currentRoom._winnerSocket).emit("winner", {
                flag: true,
              }); // send end Modal flag to winner
              currentRoom._users.map((elm) => {
                if (elm._participated && elm._winnerSocket !== elm._id) {
                  io.to(elm._id).emit("lost", {
                    flag: true,
                  }); // send end Modal flag to the losers
                } else if (
                  !elm._participated ||
                  elm._purchaseUserSocket === elm._id
                ) {
                  io.to(elm._id).emit("neutral", {
                    flag: true,
                  }); // send end Modal flag to the losers
                }
              });
            }
          }

          if (
            currentRoom._category === "premium" &&
            Math.floor(
              PREMIUM_LIMIT_PERCENTAGE * currentRoom._price -
                ((PREMIUM_LIMIT_PERCENTAGE * currentRoom._price) %
                  currentRoom._mise)
            ) +
              currentRoom._mise ===
              currentRoom._counter
          ) {
            currentRoom.setControl(true);
            io.to(currentRoom._id).emit("buyProduct", {
              control: true,
              roomID: currentRoom._control,
            }); // set direct purchase flag to true
          }

          io.to(currentRoom._id).emit("click", {
            user: currentRoom._lastUserName,
            counter: currentRoom._counter,
            userId: currentRoom._lastUserId,
            photo: currentRoom._lastUserPhoto,
          }); // send updated data to room
        }
      } catch (error) {}
    });

    socket.on(
      "priseEnMain",
      async ({ user, room, montant, app_id, freeCredit, photo }) => {
        try {
          let currentRoom = getRoom(room); // get room data
          let pastUser = currentRoom.findUserbyId(app_id); // get user data
          io.to(pastUser._id).emit("leaveConnection", {
            control: true,
            roomID: currentRoom._id,
          }); //set confliction flag to true in old connection
          let newUser = currentRoom.replaceUser(
            app_id,
            socket.id,
            user,
            montant,
            freeCredit,
            photo
          ); //call replace user method

          socket.join(currentRoom._id); //join room socket
          io.to(socket.id).emit("userwelcome", {
            user: currentRoom._lastUserName,
            montant: pastUser._montant,
            counter: currentRoom._counter,
            photo: currentRoom._lastUserPhoto,
            freeCredit: pastUser._freeCredit,
          }); //send room data to new connection
          io.to(socket.id).emit("conflictingConnection", {
            control: false,
            roomID: currentRoom._id,
          }); //remove confliction flag
        } catch (error) {}
      }
    );
    socket.on("buyProduct", (data) => {
      const { roomID, triggerBuy, userID } = data;
      let currentRoom = getRoom(roomID);
      if (currentRoom._finished === false && triggerBuy === true) {
        currentRoom.setControl(false);
        io.to(roomID).emit("buyProduct", {
          winner: userID,
          roomID: currentRoom._id,
          directBuyTrigger: true,
          control: currentRoom._control,
        });
      }
    });
    socket.on("rejectPurchase", (data) => {
      const { roomID } = data;
      let currentRoom = getRoom(roomID);
      currentRoom.setControl(true);
      io.to(currentRoom._id).emit("buyProduct", {
        control: currentRoom._control,
        roomID: currentRoom._id,
      }); // set direct purchase flag to true
    });
    socket.on("validatePurchase", (data) => {
      let current_Room = getRoom(data.roomID);
      current_Room.setPurchaseWinner(data.userID, socket.id);
      io.to(data.roomID).emit("updateRoom", {
        roomID: data.roomID,
      });
    });
    socket.on("leave", (data) => {
      let current_Room = getRoom(data.roomID);
      current_Room?.removeUser(socket.id);
    });
    socket.on("disconnecting", (data) => {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          let current_Room = getRoom(room);
          current_Room?.removeUser(socket.id);
        }
      } // look for room and delete user
    });
    socket.on("disconnect", (data) => {
      try {
      } catch (error) {}
    });
  });
}
module.exports = { start };
