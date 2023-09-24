const Order = require("../models/order.js");
const nodemailer = require("nodemailer");
const orderPending = require("../templates/orderPending");
const orderValidation = require("../templates/orderValidation");
const addOrder = async (req, res) => {
  try {
    const {
      image,
      date,
      nom,
      prenom,
      Adresse,
      email,
      phone,
      payment_id,
      user_id,
      room_id,
      ville,
      zip,
      method_of_paiement,
      notes,
      status_delivery,
      name,
      prix,
      prixPromo,
      typeWinner,
    } = req.body;
    const NumberOfOrders = await Order.countDocuments({});
    const newOrder = await Order.create({
      ref_order: `${NumberOfOrders + 1}${name.substring(0, 2).toUpperCase()}${(
        "0" + (new Date().getMonth() + 1).toString()
      ).slice(-2)}${new Date().getFullYear().toString().slice(-2)}`,
      date,
      nom,
      prenom,
      Adresse,
      email,
      phone,
      payment_id,
      user_id,
      room_id,
      status_delivery,
      ville,
      zip,
      method_of_paiement,
      notes,
      typeWinner,
    });
    res.send(newOrder);
    const orderMail = orderPending(nom, prenom, name, prix, prixPromo, room_id);
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
      subject: "Soomy: Commande en attente",
      html: orderMail,
      attachments: [
        {
          filename: "Soomy-positive-logo.png",
          path: "../backend/assets/Soomy-positive-logo.png",
          cid: "unique@kreata.ee", //same cid value as in the html img src
        },
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
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getNumberOfOrders = async (req, res) => {
  try {
    const NumberOfOrders = await Order.countDocuments({});
    res.send({ NumberOfOrders: NumberOfOrders });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getOrder = async (req, res) => {
  try {
    const options = {
      page: req.params.page || 1,
      limit: 6,
      sort: { date: -1 },
      populate: [
        "user_id",
        "payment_id",
        {
          path: "room_id",
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
      ],
      collation: {
        locale: "en",
      },
    };
    Order.paginate({}, options, function (err, result) {
      res.json({
        orders: result.docs,
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
    res.status(500).json({ message: "erreur serveur" });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id)
      .populate("user_id")
      .populate({
        path: "room_id",
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
      });

    res.json(singleOrder);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getOrderByRoom = async (req, res) => {
  try {
    const singleOrder = await Order.findOne({
      room_id: req.params.id,
      user_id: req.params.user,
    })
      .populate("user_id")
      .populate({
        path: "room_id",
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
      });

    res.json(singleOrder);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getOrdersbyId = async (req, res) => {
  try {
    const options = {
      page: req.params.page || 1,
      limit: 4,
      sort: { date: -1 },
      populate: [
        "payment_id",
        {
          path: "room_id",
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
      ],
      collation: {
        locale: "en",
      },
    };
    Order.paginate({ user_id: req.params.id }, options, function (err, result) {
      res.json({
        orders: result.docs,
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
    res.status(500).json({ message: "erreur serveur" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const {
      ref_order,
      date,
      nom,
      prenom,
      Adresse,
      email,
      phone,
      payment_id,
      user_id,
      room_id,
      status_delivery,
      ville,
      zip,
      method_of_paiement,
      notes,
      status_payment,
      expiration,
    } = req.body;
    const updatedorder = await Order.findById(req.params.id);
    if (updatedorder) {
      (updatedorder.date = date || updatedorder.date),
        (updatedorder.ref_order = ref_order || updatedorder.ref_order),
        (updatedorder.nom = nom || updatedorder.nom),
        (updatedorder.prenom = prenom || updatedorder.prenom),
        (updatedorder.Adresse = Adresse || updatedorder.Adresse),
        (updatedorder.email = email || updatedorder.email),
        (updatedorder.phone = phone || updatedorder.phone),
        (updatedorder.user_id = user_id || updatedorder.user_id),
        (updatedorder.payment_id = payment_id || updatedorder.payment_id),
        (updatedorder.room_id = room_id || updatedorder.room_id),
        (updatedorder.ville = ville || updatedorder.ville),
        (updatedorder.zip = zip || updatedorder.zip),
        (updatedorder.expiration = expiration || updatedorder.expiration),
        (updatedorder.method_of_paiement =
          method_of_paiement || updatedorder.method_of_paiement),
        (updatedorder.notes = notes || updatedorder.notes),
        (updatedorder.status_delivery =
          status_delivery || updatedorder.status_delivery);
      updatedorder.status_payment =
        status_payment || updatedorder.status_payment;
      const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
        ref_order: updatedorder.ref_order,
        date: updatedorder.date,
        nom: updatedorder.nom,
        prenom: updatedorder.prenom,
        Adresse: updatedorder.Adresse,
        email: updatedorder.email,
        phone: updatedorder.phone,
        user_id: updatedorder.user_id,
        room_id: updatedorder.room_id,
        ville: updatedorder.ville,
        expiration: updatedorder.expiration,
        zip: updatedorder.zip,
        method_of_paiement: updatedorder.method_of_paiement,
        notes: updatedorder.notes,
        status_delivery: updatedorder.status_delivery,
        status_payment: updatedorder.status_payment,
        payment_id: updatedorder.payment_id,
      });

      res.json(updateOrder);
    } else {
      res.status(404).send({ message: "Order introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const validationMail = async (req, res) => {
  const {
    email,
    ref,
    method_of_paiement,
    image,
    status_payment,
    name,
    prix,
    prixPromo,
    order_id,
  } = req.body;
  const validation = orderValidation(
    ref,
    name,
    prixPromo,
    method_of_paiement,
    status_payment,
    order_id
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
    subject: "Soomy: Commande validée",
    html: validation,
    attachments: [
      {
        filename: "Soomy-positive-logo.png",
        path: "../backend/assets/Soomy-positive-logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
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
};
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).send({ message: "Order introuvable" });
    } else {
      const deletedOrder = await Order.deleteOne({
        _id: req.params.id,
      });
      res.json(deletedOrder);
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const getNumberOfDocumentsByMonth = async (req, res) => {
  const numberOfDocs = await Order.aggregate([
    // User is the model of userSchema
    {
      $group: {
        _id: { $month: "$date" }, // group by the month *number*, mongodb doesn't have a way to format date as month names
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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("payment_id")
      .populate({
        path: "room_id",
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
      .populate("user_id");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = {
  updateOrder,
  getSingleOrder,
  getOrder,
  deleteOrder,
  getOrdersbyId,
  addOrder,
  getNumberOfOrders,
  getOrderByRoom,
  validationMail,
  getNumberOfDocumentsByMonth,
  getAllOrders,
};
