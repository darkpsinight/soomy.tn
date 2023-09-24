const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");
const CLIENT_URL = "https://soomy.tn";

const {
  userRegister,
  getUsers,
  sendMessage,
  validate,
  updatePassword,
  updateUser,
  addCredit,
  reduceCredit,
  imageUpload,
  updateBookmarks,
  deleteBookmarks,
  sendResetMail,
  validateMail,
  updatePasswordReset,
  getNumberOfDocumentsByMonth,
  deleteUser,
  getUserDetailsById,
  getAllUsers,
} = require("../controllers/userController");
const { body, param } = require("express-validator");
const User = require("../models/user");

userRouter.post(
  "/register",
  body("username").custom((value) => {
    if (!/^[a-z0-9]+$/i.test(value)) {
      throw new Error(
        "Le pseudo ne peut contenir que des lettres et des chiffres."
      );
    }
    return true;
  }),
  body("email").isEmail().withMessage("Invalid e-mail."),
  body("password")
    .isString()
    .withMessage("Mot de passe doit avoir au moin une lettre.")
    .isLength({ min: 8 })
    .withMessage("Mot de passe doit avoir au moin 8 charactères.")
    .not()
    .isLowercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en majuscule .")
    .not()
    .isUppercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en miniscule.")
    .not()
    .isNumeric()
    .withMessage("Mot de passe doit avoir au moin un chiffre.")
    .not()
    .isAlpha()
    .withMessage("Mot de passe invalide."),
  userRegister
);
userRouter.get("/getUsers/:page", getUsers);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://soomy.tn/signin",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(CLIENT_URL);
  }
);
userRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
userRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "https://soomy.tn/signin",
  }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

userRouter.post("/login", async (req, res, next) => {
  // Check if a user with the same email has OAuth-based credentials
  const hasOAuthAccount = await User.findOne({
    email: req.body.email,
    $or: [{ googleId: { $exists: true } }, { facebookId: { $exists: true } }],
  });

  if (hasOAuthAccount) {
    return res.status(400).send({
      message:
        "Nous avons détecté que vous essayez de vous connecter avec une adresse e-mail déjà enregistrée en utilisant l'authentification Google. Veuillez utiliser Google pour vous connecter.",
    });
  }

  // Proceed with regular email and password authentication
  passport.authenticate("local", { failureFlash: true }, (err, user, info) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send({ message: "Internal Server Error" });
    }

    if (user === false) {
      // Handle the case of incorrect email or password
      return res.status(400).send({
        message: "Utilisateur ou mot de passe incorrect !",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err); // Log the error
        return res
          .status(500)
          .send({ message: "Informations d'identification erronées" });
      }

      return res.status(200).send({
        message: "Authentifié avec succès",
        status: 200,
        user: req.user,
      });
    });
  })(req, res, next);
});

userRouter.get("/user", (req, res) => {
  if (req.user) {
    return res.send({ status: 200, user: req.user, isAuth: true });
  } else
    return res.send({
      status: 401,
      message: "Non authentifié!",
      isAuth: false,
      user: null,
    }); // The req.user stores the entire user that has been authenticated inside of it.
});
userRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.status(200).send({ status: 200, msg: "Utilisateur déconnecté!" });
  });
});
userRouter.post("/sendMessage", sendMessage);
userRouter.post("/validate", validate);
userRouter.put("/update/:id", updateUser);
userRouter.put(
  "/updatePassword/:id",
  body("newPassword")
    .isString()
    .withMessage("Mot de passe doit avoir au moin une lettre.")
    .isLength({ min: 8 })
    .withMessage("Mot de passe doit avoir au moin 8 charactères.")
    .not()
    .isLowercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en majuscule .")
    .not()
    .isUppercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en miniscule.")
    .not()
    .isNumeric()
    .withMessage("Mot de passe doit avoir au moin un chiffre.")
    .not()
    .isAlpha()
    .withMessage("Mot de passe invalide."),
  updatePassword
);
userRouter.put("/image/:id", upload.single("image"), imageUpload);
userRouter.put("/updateBookmarks/:id", updateBookmarks);
userRouter.put("/deleteBookmarks/:id", deleteBookmarks);
userRouter.post("/createCredit", addCredit);
userRouter.post("/reduceCredit", reduceCredit);
userRouter.get("/getNumberOfDocumentsByMonth", getNumberOfDocumentsByMonth);
userRouter.get("/getemail/:email", sendResetMail);
userRouter.get("/validateemail/:code/:id", validateMail);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.get("/getUserDetailsById/:id", getUserDetailsById);
userRouter.get(
  "/updatePasswordReset/:newPassword/:id",
  param("newPassword")
    .isString()
    .withMessage("Mot de passe doit avoir au moin une lettre.")
    .isLength({ min: 8 })
    .withMessage("Mot de passe doit avoir au moin 8 charactères.")
    .not()
    .isLowercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en majuscule .")
    .not()
    .isUppercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en miniscule.")
    .not()
    .isNumeric()
    .withMessage("Mot de passe doit avoir au moin un chiffre.")
    .not()
    .isAlpha()
    .withMessage("Mot de passe invalide."),
  updatePasswordReset
);
userRouter.get("/getAllUsers", getAllUsers);
module.exports = userRouter;
