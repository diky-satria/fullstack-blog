const Models = require("../../models/index.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = async function (passport) {
  passport.use(
    new localStrategy(async (email, password, done) => {
      await Models.users
        .findOne({
          where: {
            email: email,
          },
        })
        .then(async (user, err) => {
          if (err) throw err;
          if (!user) {
            return done(null, false, {
              errors: { msg: `Email tidak terdaftar`, param: `username` },
            });
          } else {
            if (!user.status) {
              return done(null, false, {
                errors: {
                  msg: `Email tidak aktif, Silahkan hubungi admin`,
                  param: `username`,
                },
              });
            } else {
              await bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                  return done(null, {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  });
                } else {
                  return done(null, false, {
                    errors: { msg: `Password salah`, param: `password` },
                  });
                }
              });
            }
          }
        });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    await Models.users
      .findOne({
        where: {
          id: id,
        },
      })
      .then((user, err) => {
        if (user.status) {
          cb(err, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          });
        } else {
          cb(err, {});
        }
      });
  });
};
