// imported
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const sharp = require("sharp");

require("dotenv").config();
// end imported;

// instance
const app = express();
// end instance

// middlewere
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3011", "https://blog.dikysatria.net"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
      maxAge: parseInt(process.env.SESSION_EXPIRE),
    },
  })
);
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
// end middlewere

// route
const authRouter = require("./routes/AuthRoutes.js");
const userRouter = require("./routes/admin/UserRoutes.js");
const postRouter = require("./routes/user/PostRoutes.js");
const berandaRouter = require("./routes/user/BerandaRoutes.js");
const settingRouter = require("./routes/user/SettingRoutes.js");
app.get("/", (req, res) => {
  res.json({ message: "welcome to app" });
});
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(berandaRouter);
app.use(settingRouter);
app.post("/upload", (req, res) => {
  var file = req.files.upload;
  var extension = path.extname(file.name);
  var time = new Date().getTime();
  var fileName = time + "-" + file.md5 + extension;

  // upload
  file.mv(`./public/gambar/content/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({
      uploaded: true,
      url: `${process.env.SERVER_URL}/gambar/content/${fileName}`,
    });
  });
});
app.post("/upload_resize", (req, res) => {
  var file = req.files.upload;
  var extension = path.extname(file.name);
  var time = new Date().getTime();
  var fileName = time + "-" + file.md5 + extension;

  sharp(file.data)
    .resize(500)
    .toFile(`./public/gambar/content/${fileName}`, (err, info) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({
        uploaded: true,
        url: `${process.env.SERVER_URL}/gambar/content/${fileName}`,
      });
    });
});
// end route

// listener
const PORT = parseInt(process.env.PORT) || 3098;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// end listener
