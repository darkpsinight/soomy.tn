const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: "Token Admin invalid" });
    }
  };
  module.exports = {isAdmin};