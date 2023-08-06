const passport = require("passport");
require("../library/passport/passport")(passport);
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models/index.js");
const Models = require("../models/index.js");
const { kirimEmail } = require("../library/nodemailer/nodemailer");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    passport.authenticate("local", (err, user, info) => {
      if (info) return res.status(422).json(info);

      if (err) throw err;
      if (!user)
        return res.status(422).json({
          errors: {
            msg: "Email tidak terdaftar",
            param: "email",
          },
        });
      else {
        return req.logIn(user, (err) => {
          if (err) throw err;

          // remember me
          if (req.body.remember_me === true) {
            var remember_token_data = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
            const remember_token = jwt.sign(
              remember_token_data,
              process.env.REMEMBER_ME_SECRET
            );
            res.cookie("remember_me", remember_token, {
              httpOnly: true,
              maxAge: parseInt(process.env.REMEMBER_ME_EXPIRE),
            });
          }

          res.status(200).json({
            msg: "login berhasil",
            data: user,
          });
        });
      }
    })(req, res, next);
  }
};

exports.me = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized" });
  } else {
    return res.status(200).json(req.user);
  }
};

exports.remember_me_cek = async (req, res) => {
  const token = req.cookies.remember_me;

  jwt.verify(token, process.env.REMEMBER_ME_SECRET, async (err, user) => {
    if (err) {
      return res.json({
        msg: "remember me token salah",
        status: 400,
      });
    } else {
      return req.logIn(user, (err) => {
        if (err) throw err;

        const id = user.id;
        const name = user.name;
        const email = user.email;
        const role = user.role;

        return res.status(200).json({
          msg: "remember me bekerja",
          status: 200,
          data: {
            id: id,
            name: name,
            email: email,
            role: role,
          },
        });
      });
    }
  });
};

exports.forgot_password = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = '${req.body.email}'`,
      { type: QueryTypes.SELECT }
    );

    if (user.length > 0) {
      // buat token
      var token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      // update token
      await Models.users.update(
        {
          forgot_password_token: token,
        },
        {
          where: { id: user[0].id },
        }
      );

      // template email
      const templateEmail = {
        from: `BLOG APP`,
        to: req.body.email,
        subject: `Link Reset Password`,
        html: `
                    <p style="text-align:center;margin-bottom:20px;">---------------------------------------------------------------------------------</p>
                    <p style="text-align:center;margin-bottom:20px;">Silahkan klik <b>tombol</b> dibawah untuk reset password anda</p>
                    <div style="width:100%;text-align:center;">
                        <a href="${process.env.CLIENT_URL}/reset_password/${user[0].email}/${token}" style="background-color:blue;color:white;border:1px solid transparent;border-radius:5px;text-decoration:none;padding:4px;">Halaman Reset Password</a>
                    </div>
                    <p style="text-align:center;margin-top:20px;">Reset password</p>
                    <p style="text-align:center;margin-top:20px;">---------------------------------------------------------------------------------</p>
                `,
      };

      await kirimEmail(templateEmail);

      return res.status(200).json({
        msg: "Link berhasil terkirim, link akan expired dalam 5 menit, silahkan cek email mu segera!",
      });
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

exports.reset_password = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    const { email, token } = req.params;
    const { password } = req.body;

    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    if (user.length <= 0) {
      return res.status(422).json({
        errors: {
          param: "email",
          msg: "Email tidak terdaftar",
        },
      });
    }
    if (token !== user[0].forgot_password_token) {
      return res.status(422).json({
        errors: {
          param: "token",
          msg: "Token salah",
        },
      });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const encrypt_password = await bcrypt.hash(password, 10);

      await Models.users.update(
        {
          password: encrypt_password,
        },
        {
          where: { id: user[0].id },
        }
      );

      return res.status(200).json({
        msg: "Reset password berhasil, silahkan login",
      });
    } catch (error) {
      return res.status(422).json({
        errors: {
          param: "token",
          msg: "token expired, silahkan kirim ulang email di halaman lupa password",
        },
      });
    }
  }
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("remember_me");
    return res.json({
      message: "you have been logged out",
    });
  });
};
