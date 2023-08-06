const { sequelize } = require("../../models/index.js");
const { QueryTypes } = require("sequelize");
const Models = require("../../models/index.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res) => {
  try {
    var page = parseInt(req.query.page) || 0;
    var limit = parseInt(req.query.limit) || 10;
    var search = req.query.search || "";
    var search_db = search
      ? `WHERE name LIKE '%${search}%' OR email LIKE '%${search}%' OR role LIKE '%${search}%'`
      : "";
    var offset = page * limit;

    var total = await sequelize.query(
      `SELECT count(*) as total FROM users ${search_db}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    var total_page = Math.ceil(total[0].total / limit);

    var data = await sequelize.query(
      `SELECT id, name, email, role, status FROM users ${search_db}
       order by id desc limit ${offset},${limit}`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      message: "Semua users",
      data: data,
      page: page,
      limit: limit,
      total_rows: total[0].total,
      total_page: total_page,
    });
  } catch (e) {
    console.log(e.response);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    try {
      const { name, email, password, passwordConfirmation } = req.body;

      const encrypt_password = await bcrypt.hash(password, 10);
      await Models.users.create({
        name: name,
        email: email,
        password: encrypt_password,
        role: "user",
        status: 1,
      });

      return res.status(200).json({
        message: "User berhasil ditambahkan",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Server error",
      });
    }
  }
};

exports.editUserById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    try {
      const { name, email, emailOld } = req.body;
      const { id } = req.params;

      await Models.users.update(
        {
          name: name,
          email: email,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({
        message: "User berhasil diedit",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Server error",
      });
    }
  }
};

exports.editUserStatus = async (req, res) => {
  try {
    const { id, status } = req.params;

    var status_db = status === "true" ? 1 : 0;
    await Models.users.update(
      {
        status: status_db,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      message: `Status berhasil ${
        status === "true" ? "diaktifkan" : "dinonaktifkan"
      }`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    await Models.users.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      message: "User berhasil dihapus",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "User ini memiliki postingan! tidak bisa dihapus",
    });
  }
};
