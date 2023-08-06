const Models = require("../../models/index.js");
const { sequelize } = require("../../models/index.js");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs"); // gunakan bcryptjs jika ingin membandingkan password encrypt dari php/laravel/ci (jika menggunakan "bcrypt" saja maka tidak berfungsi)
const { validationResult } = require("express-validator");
require("dotenv").config();

exports.ubahPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    // cek user berdasarkan email yang di input
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = "${req.user.email}"`,
      { type: QueryTypes.SELECT }
    );

    if (user.length > 0) {
      const password = await bcrypt.compare(
        req.body.passwordLama,
        user[0].password
      );

      if (password) {
        const cekPasswordBaru = await bcrypt.compare(
          req.body.passwordBaru,
          user[0].password
        );

        if (cekPasswordBaru) {
          return res.status(422).json({
            errors: {
              msg: "Password baru tidak boleh sama dengan password lama",
              param: "passwordBaru",
            },
          });
        }

        const encrypt_password = await bcrypt.hash(req.body.passwordBaru, 10);
        await Models.users.update(
          {
            password: encrypt_password,
          },
          {
            where: {
              email: req.user.email,
            },
          }
        );

        return res.status(200).json({
          msg: "Password berhasil diubah",
        });
      } else {
        return res.status(422).json({
          errors: {
            msg: "Password lama salah",
            param: "passwordLama",
          },
        });
      }
    } else {
      return res.status(422).json({
        errors: {
          msg: "Email tidak terdaftar",
          param: "email",
        },
      });
    }
  }
};
