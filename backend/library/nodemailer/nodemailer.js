const nodemailer = require("nodemailer");
require("dotenv").config();

exports.kirimEmail = async (dataEmail) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  return await transporter
    .sendMail(dataEmail)
    .then(() => {
      console.log(`Email berhasil terkirim`);
    })
    .catch((err) => {
      console.log(err);
    });
};
