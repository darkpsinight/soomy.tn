const User = require("../models/user");
const Image = require("../models/image");
const Transaction = require("../models/transaction");
const Participation = require("../models/participation");
const PackPurchase = require("../models/packPurchase");
const registration = require("../templates/registration");
const reset = require("../templates/reset");
const credit = require("../templates/credit");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
function RemoveLastDirectoryPartOf(the_url) {
  var the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
}
const client = require("twilio")(accountSid, authToken);
const userRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      adresse,
      password,
      isAdmin,
      genre,
    } = req.body;

    const existUser = await User.findOne({ username });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "Le nom d'utilisateur est déjà existant" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Le Email est déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      phone,
      adresse,
      isAdmin,
      genre,
      profile_img: "64edf94e4b713367f714b4bd",
      password: hashedPassword,
    });
    const mail = registration(newUser.username);
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
      to: newUser.email,
      bcc: "contact@soomy.tn",
      subject: "Soomy: Inscription",
      html: mail,
      attachments: [
        {
          filename: "Soomy-positive-logo.png",
          path: "../backend/assets/Soomy-positive-logo.png",
          cid: "unique@kreata.ee", //same cid value as in the html img src
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
      } else {
      }
    });
    res.redirect(307, "/users/login");
    return;
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const sendResetMail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (user) {
      await Token.deleteOne({ userId: user._id });
      const token = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      let hashedToken = await bcrypt.hash(token.toString(), 10);
      hashedToken = hashedToken.replace(/\//g, "slash");

      const code = await Token.create({
        userId: user._id,
        token: hashedToken,
      });
      const resetMail = reset(
        user.firstName,
        user.lastName,
        code.token,
        user._id
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
        to: req.params.email,
        bcc: "contact@soomy.tn",
        subject: "Soomy: Reset",
        html: resetMail,
        attachments: [
          {
            filename: "Soomy-positive-logo.png",
            path: "../backend/assets/Soomy-positive-logo.png",
            cid: "unique@kreata.ee", //same cid value as in the html img src
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).send({ msg: "erreur serveur" });
        } else {
          return res.status(200).send({ id: user._id, token: hashedToken });
        }
      });
    } else return res.status(404).send({ msg: "email n'existe pas" });
  } catch (error) {
    return res.status(500).send({ msg: "erreur serveur" });
  }
};
const validateMail = async (req, res) => {
  try {
    const token = await Token.findOne({ userId: req.params.id });
    const replaceToken = token.token.replace(/slash/g, "/");
    const validate = await bcrypt.compare(req.params.code, replaceToken);
    if (validate) {
      return res.status(200).send({ msg: "success" });
    } else {
      return res.status(401).send({ msg: "wrong code" });
    }
  } catch (error) {
    res.status(500).send({ msg: "erreur serveur" });
  }
};
const getUsers = async (req, res) => {
  try {
    const options = {
      page: req.params.page || 1,
      limit: 10,
      sort: { joinDate: -1 },
      populate: [
        { path: "profile_img" },
        {
          path: "bookmarks",
          populate: {
            path: "product",
            populate: {
              path: "image",
            },
          },
        },
      ],
      collation: {
        locale: "en",
      },
    };
    User.paginate({}, options, function (err, result) {
      res.json({
        users: result.docs,
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
  } catch (err) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
const sendMessage = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      req.session.tokenTwilio = await client.messages.create({
        body: `${Math.floor(
          Math.random() * (9999 - 1000 + 1) + 1000
        )} est votre code de verification\n(message valable pour 10 minutes)`,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: `+216${req.body.phone}`,
      });
      req.session.phone = req.body.phone;
      res.send({ msg: "message sent!" });

      req.session.save();
    } else res.status(401).send({ msg: "Numéro existant" });
  } catch (error) {
    res.status(500).send({ msg: "erreur serveur" });
  }
};

/***********************************VALIDATE SMS************************************** */
const validate = async (req, res) => {
  try {
    if (req.session.tokenTwilio) {
      const { status, dateCreated, body, to } = req.session.tokenTwilio;
      const currentDate = new Date().getTime();
      const creationDate = new Date(dateCreated).getTime();
      const diffTime = Math.abs(currentDate - creationDate);
      const diffminutes = Math.floor(diffTime / (10 * 60 * 60));

      req.body.validation,
        body.split(" ")[0],
        req.body.validation === body.split(" ")[0];

      if (
        status === "accepted" &&
        diffminutes < 10 &&
        req.body.validation === body.split(" ")[0]
      ) {
        const userupdate = await User.findOneAndUpdate(
          { _id: req.user },
          { phone: req.session.phone, approved: true }
        );

        res.status(200).json({ msg: "done!" });
      } else if (diffminutes > 600) {
        return res.status(500).json({ msg: "time ran out" });
      } else if (req.body.validation !== body.split(" ")[0]) {
        return res.status(500).json({ msg: "wrong code" });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "erreur serveur" });
  }
};
/****************************UPDATE USER************************************* */
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.adresse = req.body.Adresse || user.adresse;
      user.phone = req.body.phone || user.phone;

      const updatedUser = await User.updateOne(
        { _id: req.params.id },
        {
          firstName: user.firstName,
          lastName: user.lastName,
          adresse: user.adresse,
          email: user.email,
          phone: user.phone,
        }
      );
      const newUser = await User.findById(req.params.id);
      return res.send({
        msg: "done!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};

/***************************************IMAGE UPLOAD********************************************** */
const imageUpload = async (req, res) => {
  try {
    const existuser = await User.findById(req.params.id).populate(
      "profile_img"
    );

    const newimage = await Image.create({
      imageURL: "/uploads/" + req.file.path.split("/").pop(),
      // imageURL: path.join("/uploads", req.file.filename)
    });
    if (existuser) {
      if (
        existuser?.profile_img?.imageURL &&
        existuser?.profile_img?._id?.toString() !== "6399d83e4207c44236f99ae1"
      ) {
        const deletedImage = await Image.deleteOne({
          _id: existuser.profile_img._id,
        });
      }
      if (newimage) {
        const updateduser = await User.findByIdAndUpdate(existuser._id, {
          profile_img: newimage._id,
        });
        res.json(updateduser);
      } else return res.status(500).send({ message: "echec" });
    } else {
      return res.status(404).json({ message: "utilisateur introuvable" });
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors?.mapped()?.newPassword?.msg });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Veuillez vérifier le mot de passe de confirmation" });
    }
    if (!req.body.oldPassword) {
      return res
        .status(400)
        .json({ msg: "Veuillez saisir le most de passe ancient" });
    }
    if (req.body.oldPassword && user) {
      const validatePassword = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!validatePassword) {
        return res.status(401).send({ msg: "mot de passe non valide" });
      } else if (validatePassword && req.body.newPassword) {
        user.password = await bcrypt.hash(req.body.newPassword, 10);
      }
      const updatedUser = await User.updateOne(
        { _id: req.params.id },
        {
          password: user.password,
        }
      );
      const newUser = await User.findById(req.params.id);
      return res.send({
        msg: "success",
      });
    }
  } catch (error) {
    return res.status(500).send({ msg: "erreur serveur" });
  }
};
const updatePasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors?.mapped()?.newPassword?.msg });
    }
    if (!user) {
      return res.status(401).send({ msg: "user non validated" });
    } else if (req.params.newPassword) {
      const newpassword = req.params.newPassword;
      user.password = await bcrypt.hash(newpassword, 10);

      const updatedUser = await User.updateOne(
        { _id: user._id },
        {
          password: user.password,
        }
      );
      await Token.deleteOne({ userId: user._id });
      res.status(200).send({ msg: "succés" });
    }
  } catch (error) {
    return res.status(500).send({ msg: "erreur serveur" });
  }
};

const addCredit = async (req, res) => {
  try {
    const { type, user, service, montant, status, ref } = req.body;

    const newTransaction = await Transaction.create({
      type,
      user,
      service,
      montant,
      status,
      ref,
    });
    if (newTransaction) {
      const newCredit = await User.findByIdAndUpdate(
        newTransaction.user,
        {
          $inc: { "credit.montant": newTransaction.montant },
          "credit.updatedAt": new Date(),
        },
        { returnOriginal: false }
      );
      // response sent to UI (front) to handle completed payment and check if "COMPLETED"
      res.send({
        status: "COMPLETED",
        message: "Paiment effectué avec succès !",
        severity: "success",
        montant: newCredit.credit.montant,
        transaction_id: newTransaction.id,
      });
      const userInfo = await User.findById(user);
      const creditMail = credit(
        newCredit?.username,
        montant,
        newCredit?.credit?.updatedAt
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
        to: userInfo.email,
        bcc: "contact@soomy.tn",
        subject: "Soomy: Achat Pack",
        html: creditMail,
        attachments: [
          {
            filename: "Soomy-positive-logo.png",
            path: "../backend/assets/Soomy-positive-logo.png",
            cid: "unique@kreata.ee", //same cid value as in the html img src
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        } else {
        }
      });
    } else {
      res.status(500).send("échec");
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const reduceCredit = async (req, res) => {
  try {
    const { type, user, service, montant, status, ref } = req.body;

    const newTransaction = await Transaction.create({
      type,
      user,
      service,
      montant,
      status,
      ref,
    });
    if (newTransaction) {
      const newCredit = await User.findByIdAndUpdate(
        newTransaction.user,
        {
          $inc: { "credit.montant": -newTransaction.montant },
          "credit.updatedAt": new Date(),
        },
        { returnOriginal: false }
      );

      // ensure the montant is not negative
      const updatedMontant = Math.max(newCredit.credit.montant, 0);

      // update the user's credit with the non-negative montant value
      const updatedUser = await User.findByIdAndUpdate(
        newTransaction.user,
        {
          "credit.montant": updatedMontant,
          "credit.updatedAt": new Date(),
        },
        { returnOriginal: false }
      );

      // response sent to UI MUI Alert (front) to handle completed payment and check if "COMPLETED"
      res.send({
        status: "COMPLETED",
        message: "Pack supprimé avec succès !",
        severity: "success",
        montant: updatedMontant,
      });

      const userInfo = await User.findById(user);
      const creditMail = credit(
        updatedUser?.username,
        montant,
        updatedUser?.credit?.updatedAt
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
        to: userInfo.email,
        bcc: "contact@soomy.tn",
        subject: "Soomy: Achat Pack",
        html: creditMail,
        attachments: [
          {
            filename: "Soomy-positive-logo.png",
            path: "../backend/assets/Soomy-positive-logo.png",
            cid: "unique@kreata.ee", //same cid value as in the html img src
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        } else {
        }
      });
    } else {
      res.status(500).send("échec");
    }
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};

const updateBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { bookmark } = req.body;
    const validate = user.bookmarks.some((e) => e._id === bookmark);

    if (!validate) {
      user.bookmarks = [...user.bookmarks, bookmark];

      const updateduser = await User.findByIdAndUpdate(req.params.id, {
        bookmarks: user.bookmarks,
      });

      return res.status(200).json({ msg: "success" });
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const deleteBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { bookmark } = req.body;

    if (user) {
      user.bookmarks = user.bookmarks.filter(
        (elm) => elm.toString() !== bookmark.toString()
      );

      const updateduser = await User.findByIdAndUpdate(req.params.id, {
        bookmarks: user.bookmarks,
      });

      return res.json(updateduser);
    } else {
      return res.status(404).send({ message: "utilisateur introuvable" });
    }
  } catch (error) {
    return res.status(500).json({ message: "erreur serveur" });
  }
};
const getNumberOfDocumentsByMonth = async (req, res) => {
  const numberOfDocs = await User.aggregate([
    // User is the model of userSchema
    {
      $group: {
        _id: { $month: "$joinDate" }, // group by the month *number*, mongodb doesn't have a way to format date as month names
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

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("profile_img");

    if (!user) {
      return res.status(404).send({ message: "Utilisateur introuvable" });
    }

    // Check if the user has any participations in ongoing auctions (rooms with status "enable")
    const ongoingParticipations = await Participation.findOne({
      user: req.params.id,
    }).populate({
      path: "room",
      match: { status: "enable" },
    });

    if (ongoingParticipations) {
      if (ongoingParticipations.room === null) {
        console.log("room: null");
      } else if (ongoingParticipations.room.status === "enable") {
        return res.status(400).json({
          message:
            "L'utilisateur a des enchères en cours. Suppression impossible.",
        });
      }
    }

    // Delete associated participations of the user to prevent bugs
    await Participation.deleteMany({ user_id: req.params.id });

    // Delete purchased packs associated with the user
    await PackPurchase.deleteMany({ user_id: req.params.id });

    if (
      user?.profile_img?._id?.toString() !== "64edf94e4b713367f714b4bd"
    ) {
      if (user?.profile_img?.imageURL) {
        const deletedImage = await Image.deleteOne({
          _id: user.profile_img._id,
        });

        // Now, delete the actual image file if it exists
        await unlinkAsync("backend" + user.profile_img.imageURL, function (err) {
          if (err) {
            // Handle unlink error
          }
        });
      }
    }

    const deletedUser = await User.deleteOne({ _id: req.params.id });

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getUserDetailsById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("profile_img");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur pas trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegister,
  getUsers,
  sendMessage,
  validate,
  updateUser,
  updatePassword,
  imageUpload,
  addCredit,
  reduceCredit,
  updateBookmarks,
  deleteBookmarks,
  sendResetMail,
  validateMail,
  updatePasswordReset,
  getNumberOfDocumentsByMonth,
  deleteUser,
  getUserDetailsById,
  getAllUsers,
};
