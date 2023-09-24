require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/user");
const Image = require("./models/image");
const purchaseRouter = require("./routes/packPurchaseRoute");
const productRouter = require("./routes/productRoutes");
const packRouter = require("./routes/packRoute");
const packUseRouter = require("./routes/packUseRoute");
const auctionRouter = require("./routes/auctionRoutes");
const brandRouter = require("./routes/brandRoutes");
const partnerRouter = require("./routes/partnerRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const participationRouter = require("./routes/participationRoutes");
const orderRouter = require("./routes/orderRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const server = require("http").createServer(app);

const cors = require("cors");
const port = 5000 || process.env.PORT;
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
const Strategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

/***************************DataBase************************************* */

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
const { delayjob, creditJob, job } = require("./utils/crons");
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000000 }, //in milliseconds
  })
);
app.use(cookieParser("secretcode"));
//Middleware
app.use(flash());
app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

authUser = (userEmailPhone, password, done) => {
  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  // 1. If the user not found, done (null, false)
  // 2. If the password does not match, done (null, false)
  // 3. If user found and password match, done (null, user)

  User.findOne(
    {
      $or: [
        {
          email: userEmailPhone,
        },
        {
          phone: userEmailPhone,
        },
        {
          username: userEmailPhone,
        },
      ],
    },
    async function (err, user) {
      let password_test;
      if (user) {
        if (user.googleId || user.facebookId) {
          return done(null, false);
        }
        password_test = await bcrypt.compare(password, user.password);
      }
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, "mail", {
          type: "login",
          message: "That email is already taken",
        });
      }
      if (!password_test) {
        return done(null, "password", {
          type: "login",
          message: "That email is already taken",
        });
      }
      return done(null, user);
    }
  );
};
passport.use(new LocalStrategy(authUser));

/********************************GOOGLE PASSPORT************************************* */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/users/google/callback`,
      profileFields: ["email", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const existUser = await User.findOne({ googleId: profile.id });

      if (!existUser) {
        // Check if a user with the same Google email already exists
        const existEmail = await User.findOne({ email: profile.emails[0].value });

        if (!existEmail) {
          // Create a new user with Google OAuth
          const newimage = await Image.create({
            imageURL: profile.photos[0].value,
          });

          let username = "G-" + Date.now();

          const user = await User.create({
            googleId: profile.id,
            username: username,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile.emails[0].value,
            profile_img: newimage._id,
          });

          if (user) {
            return done(null, user);
          }
        } else {
          // A user with the same Google email already exists, prevent creation
          return done(null, false, { message: "A user with this email already exists." });
        }
      }

      // If the user exists, log them in
      if (existUser) {
        return done(null, existUser);
      } else {
        return done(null);
      }
    }
  )
);
/*************************FACEBOOK PASSPORT********************************* */
passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/users/facebook/callback`,
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existUser = await User.findOne({ facebookId: profile.id });
      if (!existUser) {
        const existEmail = await User.findOne({
          email: profile?.emails[0]?.value,
        });
        let username = "G-" + Date.now();
        if (!existEmail) {
          const user = await User.create({
            facebookId: profile.id,
            username: username,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile?.emails[0]?.value,
          });
          if (user) {
            return cb(null, user);
          }
        } else return cb(null, false);
      }
      if (existUser) {
        return cb(null, existUser);
      } else {
        return cb(null);
      }
    }
  )
);

/* passport.serializeUser((user, done) => {
  
  
  return done(null, user._id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
}); */

passport.serializeUser((user, done) => {
  try {
    if (!user || !user._id) {
      const error = new Error("Connection impossible");
      console.error(error.message); // Log the error message
      return done(error, null);
    }
    return done(null, user._id);
  } catch (err) {
    console.error(err.message); // Log any unexpected errors
    return done(err, null);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id }).populate([
      {
        path: "bookmarks",
        populate: {
          path: "product",

          populate: [
            {
              path: "image",
            },

            {
              path: "brand",
              populate: {
                path: "logo",
              },
            },
            { path: "category" },
            {
              path: "partner",
              populate: {
                path: "image",
              },
            },
          ],
        },
      },
      {
        path: "profile_img",
      },
    ]);

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(null, err);
  }
  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
});

//Middleware to see how the params are populated by Passport

/************************************************************* */
//Middleware to see how the params are populated by Passport

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/rooms", auctionRouter);
app.use("/brands", brandRouter);
app.use("/partners", partnerRouter);
app.use("/participations", participationRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoryRouter);
app.use("/purchase", purchaseRouter);
app.use("/packs", packRouter);
app.use("/packuse", packUseRouter);
// Making Build Folder as Public
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Middleware to see how the params are populated by Passport
let count = 1;

printData = (req, res, next) => {
  next();
};

app.use(printData); //user printData function as middleware to print populated variables
/***************************Cron Remove Credit******************************************* */

creditJob.start();
delayjob.start();
/***************************Cron send emails reminder******************************************* */
job.start();

var socket = require("./socket/socket.js");
socket.start(server);
server.listen(port, () => {
  console.log("server connected");
});
