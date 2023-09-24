const AuctionUser = require("./UserClass");
const Room = require("../models/auction");
const User = require("../models/user");
const Order = require("../models/order");
const Participation = require("../models/participation");
const orderPending = require("../templates/orderPending");
const winning = require("../templates/winning");
const losing = require("../templates/losing");
const nodemailer = require("nodemailer");
var method = AuctionRoom.prototype;

function AuctionRoom(id, mise, price, product, roomCategory, image, duration) {
  
  this._id = id;
  this._counter = 0;
  this._countdown = duration;
  this._users = [];
  this._mise = mise;
  this._price = price;
  this._lastUserId = "";
  this._lastUserSocketId = "";
  this._lastUserName = "";
  this._product = product;
  this._control = false;
  this._category = roomCategory;
  this._purchaseUser = null;
  this._purchaseUserSocket = null;
  this._winner = null;
  this._winnerSocket = null;
  this._finished = false;
  this._image = image;
  this._lastUserPhoto = "";
}

method.getId = function () {
  return this._id;
};
method.setControl = function (control) {
  this._control = control;
  return this._control;
};
method.getCounter = function () {
  return this._name;
};
method.getUsers = function () {
  return this._users;
};
method.addUsers = function (user) {
  return this._users.push(user);
};
method.increment = function () {
  this._counter = this._counter + this._mise;
  return this._counter;
};
method.finished = function () {
  this._finished = true;
  return this._finished;
};
method.tenLastSeconds = function () {
  this._countdown = 6;
  return this._countdown;
};
method.addLastUser = function (userId, userName , photo , socket) {
  this._lastUserId = userId;
  this._lastUserName = userName;
  this._lastUserPhoto = photo
  this._lastUserSocketId = socket
  
  return { lastUserId: this._lastUserId, lastUserName: this._lastUserId , lastUserPhoto : this._lastUserPhoto };
};
method.replaceUser = async function (userId, id, user, montant, freeCredit , photo) {
  const findIdx = this._users?.findIndex((e) => e?._appId == userId);
  const participation = await Participation.findOne({user:userId,room:this._id});
  
  let participated = participation ?true : false ;
  if (findIdx >= 0) {
    this._users?.splice(findIdx, 1)[0];
  }

  let newUser = new AuctionUser(id, user, montant, userId, photo,participation?.freeCredit,participated );

  this._users.push(newUser);
  if(this._lastUserId === userId){
    this._lastUserSocketId= newUser._id ;
   }
  return newUser;
};
method.getCountdown = function () {
  this._countdown = this._countdown - 1;
  return { countdown: this._countdown, finished: this._finished };
};
method.setPurchaseWinner = function (user,socket) {
  this._purchaseUser = user;
  this._purchaseUserSocket = socket;
  return this._purchaseUser;
};
/****************************************************************** */

/*****************************************************************/
method.findUser = function (user) {
  let searchUser = this._users.find((obj) => {
    return obj._id === user;
  });
  return searchUser;
};

/************************Fin Enchère****************************************** */
method.endAuction = async function () {
  console.log('enter RoomClass - endAuction')

  if (this._lastUserId === this._purchaseUser) {
    const room = await Room.findById(this._id);
    this._winner = room?.tenLastMises
      ?.reverse()
      .find((elm) => elm.user !== this._purchaseUser)?.user;
      const findIdx = this._users?.find((e) => e?._appId == this._winner);
      
      this._winnerSocket = findIdx?._id
  } else {
    this._winner = this._lastUserId;
    this._winnerSocket = this._lastUserSocketId;
  }
  
  const updateRoom = await Room.updateOne(
    { _id: this._id },
    {
      winner: this._winner,
      status: "finished",
      prixPromo: this._counter,
      endDate: new Date(),
    }
  );

  const participations = await Participation.find({
    room: this._id,
  }).populate("user");
  const users = participations?.filter(
    (elm) =>
      elm?.user?._id?.toString() !== this._winner?.toString() &&
      elm?.user?._id?.toString() !== this._purchaseUser?.toString()
  );
  const usersEmails = users.map((value) => value.user.email);
  const userWinner = participations?.find(
    (elm) => elm?.user?._id.toString() === this._winner?.toString()
  );

  if (users?.length > 0) {
    const bulkOps = users.map((obj) => {
      return {
        updateOne: {
          filter: {
            _id: obj.user,
          },
          // If you were using the MongoDB driver directly, you'd need to do
          // `update: { $set: { field: ... } }` but mongoose adds $set for you
          update: {
            $inc: {
              "credit.montant": participations.find((elm) => {
                return elm.user?.toString() === obj.user?.toString();
              }).montant,
            },
          },
        },
      };
    });

    User.bulkWrite(bulkOps).then((res) => {
      
    });
  }
  const NumberOfOrders = await Order.countDocuments({});

  const newOrder = await Order.create({
    ref_order: `${NumberOfOrders + 1}${this._product
      .substring(0, 2)
      .toUpperCase()}${("0" + (new Date().getMonth() + 1).toString()).slice(
      -2
    )}${new Date().getFullYear().toString().slice(-2)}`,
    date: new Date(),
    user_id: this._winner,
    room_id: this._id,
    typeWinner: "soomy",
  });
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "enchere.soomy@gmail.com",
      pass: process.env.EMAILPASS,
    },
  });

 
  const losingMail = losing(
    this._product,
    this._price,
    this._category,
    newOrder._id
  );
  var mailOptionsLoser = {
    from: "Soomy enchere.soomy@gmail.com",
    to: usersEmails,
    //bcc: "contact@soomy.tn",
    subject: "Soomy: Vous avez perdu une enchère",
    html: losingMail,
    attachments: [
      {
        filename: "Soomy-positive-logo.png",
        path: "/var/www/soomy/backend/assets/Soomy-positive-logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
      {
        filename: "product image",
        path: "/var/www/soomy/backend" + this._image,
        cid: "unique2@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  const winningMail = winning(
    this._lastUserName,
    this._product,
    this._price,
    this._counter,
    this._category,
    newOrder._id
  );
  var mailOptionsWinner = {
    from: "Soomy enchere.soomy@gmail.com",
    to: userWinner?.user?.email,
    //bcc: "contact@soomy.tn",
    subject: "Soomy: Vous avez gagné une enchère",
    html: winningMail,
    attachments: [
      {
        filename: "Soomy-positive-logo.png",
        path: "/var/www/soomy/backend/assets/Soomy-positive-logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
      {
        filename: "product image",
        path: "/var/www/soomy/backend" + this._image,
        cid: "unique2@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  const orderPendingMail = orderPending(
    userWinner?.user?.lastName,
    userWinner?.user?.firstName,
    this._product,
    this._price,
    this._counter,
    newOrder._id
  );

  var mailOptions = {
    from: "Soomy enchere.soomy@gmail.com",
    to: userWinner?.user?.email,
    bcc: "contact@soomy.tn",
    subject: "Soomy: Commande en attente",
    html: orderPendingMail,
    attachments: [
      {
        filename: "Soomy-positive-logo.png",
        path: "/var/www/soomy/backend/assets/Soomy-positive-logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
      {
        filename: "product image",
        path: "/var/www/soomy/backend" + this._image,
        cid: "unique2@kreata.ee", //same cid value as in the html img src
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    } else {
      
    }
  });
  transporter.sendMail(mailOptionsWinner, function (error, info) {
    if (error) {
    } else {
      
    }
  });
  transporter.sendMail(mailOptionsLoser, function (error, info) {
    if (error) {
    } else {
      
    }
  });
  return this._winner;
};
/********************************************************** */

method.findUserbyId = function (user) {
  let searchUser = this._users.find((obj) => {
    return obj._appId === user;
  });
  return searchUser;
};
method.removeUser = function (user) {
  const findIdx = this._users.findIndex((e) => e._id == user);

  if (findIdx >= 0) {
    return this._users.splice(findIdx, 1)[0];
  }
};

module.exports = AuctionRoom;
