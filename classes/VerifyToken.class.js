require("dotenv").config();
const jwt = require("jsonwebtoken");

class TokenVerification {
  static AUTHORIZATION = "authorization";
  static USER = "user";
  static ADMIN = "admin";
  //Verify the token to view ALL the vacations.
  static everyUser = async (req, res, next) => {
    try {
      let token = req.headers[this.AUTHORIZATION];
      jwt.verify(token, process.env.SECRET_CODE, (err, token_data) => {
        if (err) return res.status(401).send({ error: 401, data: null });
        req.token = token;
        req.decoded = token_data;
        next();
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  //Verify user.role  =="user" in order to follow/unfollow vacations.

  static userOnly = (req, res, next) => {
    try {
      let token = req.headers[this.AUTHORIZATION];
      jwt.verify(token, process.env.SECRET_CODE, (error, payload) => {
        if (error) {
          return res.status(401).json({ error: 500, message: error });
        } else if (payload[0].role == this.USER) {
          next();
        }
        res
          .status(405)
          .json({
            error: true,
            message: "You do not have premission to do this action.",
          });
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  //Verify user.role == "admin" in order to remove/add a new vacation.
  static adminOnly = (req, res, next) => {
    try {
      let token = req.headers[this.AUTHORIZATION];
      jwt.verify(token, process.env.SECRET_CODE, (err, payload) => {
        if (err) return res.status(401).json({ error: 500, data: null });
        if (payload[0].role == this.ADMIN) {
          next();
        }
        res
          .status(405)
          .json({
            error: true,
            message: "You do not have premission to do this action.",
          });
      });
    } catch (error) {
      if (error) console.log(error);
    }
  };
}

module.exports = TokenVerification;
