const Participation = require("../models/participation");
const Transaction = require("../models/transaction");
const Room = require("../models/auction");
const participation = require("../templates/participation");
const nodemailer = require("nodemailer");
const addParticipation = async (req, res) => {
  try {
    const {
      type,
      user,
      email,
      service,
      montant,
      status,
      ref,
      room,
      name,
      prix,
      image,
      category,
      username,
    } = req.body;
    const roomExist = await Room.findById(room);

    // Check if roomExist is valid and get the roomCategory from it
    const roomCategory = roomExist ? roomExist.roomCategory : null;

    // Determine the freeCredit based on the room category
    let freeCredit;
    if (roomCategory === "premium") {
      freeCredit = 30;
    } else {
      freeCredit = 15;
    }

    const number = await Participation.countDocuments({ room });
    if (roomExist && Math.round(number / roomExist.capacity) < 100) {
      const newTransaction = await Transaction.create({
        type,
        user,
        service,
        montant,
        status,
        ref,
      });

      if (newTransaction) {
        const newParticipation = await Participation.create({
          transaction: newTransaction._id,
          user: newTransaction.user,
          room,
          // Set the freeCredit dynamically based on the room category
          freeCredit,
        });
        const participationMail = participation(
          username,
          name,
          montant,
          prix,
          category,
          room
        );
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "enchere.soomy@gmail.com",
            pass: process.env.EMAILPASS,
          },
        });

        var mailOptions = {
          from: "Soomy enchere.soomy@gmail.com",
          to: email,
          bcc: "contact@soomy.tn",
          subject: "Soomy: Inscription enchère",
          html: participationMail,
          attachments: [
            {
              filename: "Soomy-positive-logo.png",
              path: "../backend/assets/Soomy-positive-logo.png",
              cid: "unique@kreata.ee", //same cid value as in the html img src
            },
            ,
            {
              filename: "product image",
              path: "../backend/" + image,
              cid: "unique2@kreata.ee", //same cid value as in the html img src
            },
          ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
          } else {
          }
        });
        res.send(newParticipation);
      } else {
        return res.status(500).send("échec");
      }
    } else return res.status(400).send("échec");
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const createTransaction = async (req, res) => {
  try {
    const { type, user, service, montant, status, ref, room } = req.body;

    const newTransaction = await Transaction.create({
      type,
      user,
      service,
      montant,
      status,
      ref,
    });
    res.status(200).send(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getTransactions = async (req, res) => {
  try {
    const options = {
      page: req.params.page || 1,
      limit: 10,
      populate: "user",
      sort: { createdAt: -1 },
      collation: {
        locale: "en",
      },
    };
    Transaction.paginate({}, options, function (err, result) {
      res.json({
        transactions: result.docs,
        total: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
      });
      // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      // result.pagingCounter = 1
    });
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getParticipation = async (req, res) => {
  try {
    const Participations = await Participation.find({})
      .populate("user")
      .populate("transaction");
    return res.json(Participations);
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};

const getSingleParticipation = async (req, res) => {
  try {
    const participation = await Participation.findById(req.params.id)
      .populate("user")
      .populate("transaction");

    return res.json(participation);
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};

const getUserAndRoomParticipation = async (req, res) => {
  try {
    const participation = await Participation.findOne({
      $and: [{ user: req.params.id }, { room: req.params.room }],
    })
      .populate("user")
      .populate("transaction");

    return res.json(participation);
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getRoomParticipation = async (req, res) => {
  try {
    const participation = await Participation.find({ room: req.params.id })
      .populate("user")
      .populate("transaction");

    return res.json(participation);
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getTransactionsbyId = async (req, res) => {
  try {
    const options = {
      page: req.body.page || 1,
      limit: 5,
      populate: "user",
      collation: {
        locale: "en",
      },
      sort: { createdAt: -1 }, // sort transactions by date
    };
    Transaction.paginate(
      { user: req.body.id },
      options,
      function (err, result) {
        res.json({
          transactions: result.docs,
          total: result.totalDocs,
          totalPages: result.totalPages,
          page: result.page,
        });
        // result.docs
        // result.totalDocs = 100
        // result.limit = 10
        // result.page = 1
        // result.totalPages = 10
        // result.hasNextPage = true
        // result.nextPage = 2
        // result.hasPrevPage = false
        // result.prevPage = null
        // result.pagingCounter = 1
      }
    );
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getParticipationUserPending = async (req, res) => {
  try {
    const options = {
      page: req.params.page || 1,
      limit: 6,
      populate: {
        path: "room",
        populate: {
          path: "product",

          populate: [
            {
              path: "image",
            },
            {
              path: "image1",
            },
            {
              path: "image2",
            },
            {
              path: "partner",
              populate: {
                path: "image",
              },
            },
          ],
        },
      },
      collation: {
        locale: "en",
      },
    };
    Participation.paginate(
      { $and: [{ user: req.params.id }, { "room.status": "pending" }] },
      options,
      function (err, result) {
        return res.json({
          rooms: result.docs,
          total: result.totalDocs,
          totalPages: result.totalPages,
          page: result.page,
        });
        // result.docs
        // result.totalDocs = 100
        // result.limit = 10
        // result.page = 1
        // result.totalPages = 10
        // result.hasNextPage = true
        // result.nextPage = 2
        // result.hasPrevPage = false
        // result.prevPage = null
        // result.pagingCounter = 1
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getParticipationUserEnable = async (req, res) => {
  try {
    const options = {
      page: req.params.page || 1,
      limit: 6,
      populate: {
        path: "room",
        populate: {
          path: "product",

          populate: [
            {
              path: "image",
            },
            {
              path: "image1",
            },
            {
              path: "image2",
            },
            {
              path: "partner",
              populate: {
                path: "image",
              },
            },
          ],
        },
      },
      collation: {
        locale: "en",
      },
    };
    Participation.paginate(
      { user: req.params.id },
      options,
      function (err, result) {
        return res.json({
          rooms: result.docs,
          total: result.totalDocs,
          totalPages: result.totalPages,
          page: result.page,
        });
        // result.docs
        // result.totalDocs = 100
        // result.limit = 10
        // result.page = 1
        // result.totalPages = 10
        // result.hasNextPage = true
        // result.nextPage = 2
        // result.hasPrevPage = false
        // result.prevPage = null
        // result.pagingCounter = 1
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};

const getUserParticipation = async (req, res) => {
  try {
    const participation = await Participation.find({ user: req.params.id })
      .populate("user")
      .populate({
        path: "room",
        populate: {
          path: "product",

          populate: [
            {
              path: "image",
            },
            {
              path: "image1",
            },
            {
              path: "image2",
            },
            {
              path: "partner",
              populate: {
                path: "image",
              },
            },
          ],
        },
      })
      .populate("transaction");

    return res.json(participation);
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getNumberOfParticipations = async (req, res) => {
  try {
    const number = await Participation.countDocuments({ room: req.params.id });

    return res.json(number);
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};

const updateParticipation = async (req, res) => {
  try {
    const { user, ban } = req.body;
    const participation = await Participation.findById(req.params.id);
    if (participation) {
      participation.ban = ban === null ? participation.ban : ban;
      participation.user = user || participation.user;

      const updatedParticipation = await Participation.findByIdAndUpdate(
        req.params.id,
        {
          ban: participation.ban,
          user: participation.user,
        }
      );

      return res.json(updatedParticipation);
    } else {
      return res.status(404).send({ message: "Participation introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const deleteParticipation = async (req, res) => {
  try {
    const participation = await Participation.find({
      $and: [{ user: req.params.id }, { room: req.params.room }],
    });
    if (!participation) {
      res.status(404).send({ message: "Participation introuvable" });
    } else {
      const deletedParticipation = await Participation.deleteOne({
        $and: [{ user: req.params.id }, { room: req.params.room }],
      });
      res.json(deletedParticipation);
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getNumberOfDocumentsByMonth = async (req, res) => {
  const numberOfDocs = await Transaction.aggregate([
    // User is the model of userSchema
    {
      $group: {
        _id: { $month: "$createdAt" }, // group by the month *number*, mongodb doesn't have a way to format date as month names
        numberofdocuments: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: false, // remove _id
        month: {
          // set the field month as the month name representing the month number
          $arrayElemAt: [
            [
              "", // month number starts at 1, so the 0th element can be anything
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            "$_id",
          ],
        },
        numberofdocuments: true, // keep the count
      },
    },
  ]);
  res.send(numberOfDocs);
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json({ transactions: transactions });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateParticipation,
  getSingleParticipation,
  getParticipation,
  addParticipation,
  deleteParticipation,
  getUserParticipation,
  getRoomParticipation,
  getUserAndRoomParticipation,
  getParticipationUserPending,
  getParticipationUserEnable,
  getTransactions,
  getTransactionsbyId,
  createTransaction,
  getNumberOfDocumentsByMonth,
  getNumberOfParticipations,
  getAllTransactions,
};
