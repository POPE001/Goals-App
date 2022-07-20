const jwt = require("jsonwebtoken");
// const UserModel = require("../models/users");

class Protect {
  static async chkToken(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        //1- get the token from Bearer Header.
        token = req.headers.authorization.split(" ")[1];
        //2- decode the token.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //3- adds user id to req object from decoded token since it has the id as a payload
        req.userId = decoded.id;
        next();
      } catch (err) {
        console.log(err);
        res.status(401).json({ msg: "Not authorized" });
      }
    }
    if (!token) {
      res.status(401).json({ msg: "Not authorized, No Token" });
    }
  }
}

module.exports = Protect;
