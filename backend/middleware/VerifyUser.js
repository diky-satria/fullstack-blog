const { sequelize } = require("../models/index.js");
const { QueryTypes } = require("sequelize");

exports.VerifyUser = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  } else {
    next();
  }
};

exports.VerifyRole = async (req, res, next) => {
  const user = await sequelize.query(
    `SELECT * FROM users WHERE id = ${req.user.id}`,
    { type: QueryTypes.SELECT }
  );

  if (user[0].role !== "admin") {
    return res.status(403).json({
      msg: "Admin only",
    });
  } else {
    next();
  }
};
