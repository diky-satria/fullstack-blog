const { body } = require("express-validator");
const { sequelize } = require("../models/index.js");
const { QueryTypes } = require("sequelize");

exports.loginValidation = [
  body("username")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length < 1) {
        throw new Error("Email tidak terdaftar");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
];

exports.forgotPasswordValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length < 1) {
        throw new Error("Email tidak terdaftar");
      }
      return true;
    }),
];

exports.resetPasswordValidation = [
  body("password")
    .notEmpty()
    .withMessage("Password harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("konfirmasi_password")
    .notEmpty()
    .withMessage("Konfirmasi password harus di isi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi password salah");
      }
      return true;
    }),
];

exports.addUserVal = [
  body("name").notEmpty().withMessage("Nama harus di isi"),
  body("email")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Konfirmasi password harus di isi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi password salah");
      }
      return true;
    }),
];

exports.editUserVal = [
  body("name").notEmpty().withMessage("Nama harus di isi"),
  body("email")
    .notEmpty()
    .withMessage("Email harus di isi")
    .isEmail()
    .withMessage("Email tidak valid")
    .custom(async (email, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      if (email !== req.body.emailOld && cek.length > 0) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),
];

exports.addOneVal = [
  body("judul")
    .notEmpty()
    .withMessage("Judul harus di isi")
    .custom(async (judul) => {
      const cek = await sequelize.query(
        `SELECT * FROM posts WHERE judul = '${judul}'`,
        { type: QueryTypes.SELECT }
      );
      if (cek.length > 0) {
        throw new Error("Judul sudah terdaftar");
      }
      return true;
    }),
  body("deskripsi").notEmpty().withMessage("Deskripsi harus di isi"),
];

exports.addTwoVal = [
  body("content").notEmpty().withMessage("Konten harus di isi"),
];

exports.editOneVal = [
  body("judul")
    .notEmpty()
    .withMessage("Judul harus di isi")
    .custom(async (judul, { req }) => {
      const cek = await sequelize.query(
        `SELECT * FROM posts WHERE judul = '${judul}'`,
        { type: QueryTypes.SELECT }
      );
      if (judul !== req.body.judul_lama && cek.length > 0) {
        throw new Error("Judul sudah terdaftar");
      }
      return true;
    }),
  body("deskripsi").notEmpty().withMessage("Deskripsi harus di isi"),
];

exports.editTwoVal = [
  body("content").notEmpty().withMessage("Konten harus di isi"),
];

exports.ubahPasswordVal = [
  body("passwordLama")
    .notEmpty()
    .withMessage("Password lama harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password lama minimal 6 karakter"),
  body("passwordBaru")
    .notEmpty()
    .withMessage("Password baru harus di isi")
    .isLength({ min: 6 })
    .withMessage("Password baru minimal 6 karakter"),
  body("konfirmasiPasswordBaru")
    .notEmpty()
    .withMessage("Konfirmasi password baru harus di isi")
    .custom((value, { req }) => {
      if (value !== req.body.passwordBaru) {
        throw new Error("Konfirmasi password baru salah");
      }
      return true;
    }),
];
