const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const Models = require("../../models/index.js");
const { sequelize } = require("../../models/index.js");
const { QueryTypes } = require("sequelize");
const helpers = require("../../helpers/index.js");

exports.getAllPost = async (req, res) => {
  try {
    var page = parseInt(req.query.page) || 0;
    var limit = parseInt(req.query.limit) || 10;
    var search = req.query.search || "";
    var offset = page * limit;

    // query custom
    var role_db =
      req.user.role !== "admin" ? `where user_id = ${req.user.id}` : ``;
    var search_db = search
      ? `${
          req.user.role !== "admin" ? `and ` : `where `
        } judul LIKE '%${search}%'`
      : "";

    var total = await sequelize.query(
      `SELECT count(*) as total FROM posts ${role_db} ${search_db}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    var total_page = Math.ceil(total[0].total / limit);

    var data_query = await sequelize.query(
      `SELECT posts.id, user_id, users.name as name, judul, techstack, thumbnail, deskripsi, content, posts.status, dibuat, diperbaharui FROM posts JOIN users ON users.id = posts.user_id ${role_db} ${search_db} order by posts.id desc limit ${offset},${limit}`,
      { type: QueryTypes.SELECT }
    );

    var data = [];
    for (var i = 0; i < data_query.length; i++) {
      data.push({
        id: data_query[i].id,
        name: data_query[i].name,
        user_id: data_query[i].user_id,
        judul: data_query[i].judul,
        techstack: data_query[i].techstack,
        thumbnail: data_query[i].thumbnail,
        deskripsi: data_query[i].deskripsi,
        content: data_query[i].content,
        status: data_query[i].status,
        dibuat: helpers.timeConverter(data_query[i].dibuat),
        diperbaharui: data_query[i].diperbaharui
          ? helpers.timeConverter(data_query[i].diperbaharui)
          : "-",
      });
    }

    return res.status(200).json({
      message: "Semua postingan",
      data: data,
      page: page,
      limit: limit,
      total_rows: total[0].total,
      total_page: total_page,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.detailPost = async (req, res) => {
  try {
    const { id } = req.params;
    var user_log_id =
      req.user.role !== "admin" ? `and user_id = ${req.user.id}` : ``;

    var post = await sequelize.query(
      `SELECT posts.id, user_id, users.name, judul, techstack, thumbnail, deskripsi, content, posts.status, dibuat, diperbaharui FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = ${id} ${user_log_id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    var techstack_sanitation_detail = helpers.techstack_sanitation_detail(
      post[0].techstack
    );

    var data = {
      id: post[0].id,
      user_id: post[0].user_id,
      name: post[0].name,
      judul: post[0].judul,
      techstack: techstack_sanitation_detail,
      techstack_no_sanitation: post[0].techstack,
      thumbnail: post[0].thumbnail,
      deskripsi: post[0].deskripsi,
      content: post[0].content,
      status: post[0].status,
      dibuat: helpers.timeConverter(post[0].dibuat),
      diperbaharui: helpers.timeConverter(post[0].diperbaharui),
    };

    return res.status(200).json({
      message: "Detail postingan",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};

exports.addOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    const { judul, techstack, thumbnail, deskripsi } = req.body;

    // validasi techstack
    if (techstack.length <= 0) {
      return res.status(422).json({
        errors: {
          msg: "Techstack harus di isi",
          param: "techstack",
        },
      });
    }

    // validasi thumbnail
    if (req.files === null) {
      return res.status(422).json({
        errors: {
          value: "",
          msg: "Thumbnail harus di isi",
          param: "thumbnail",
          location: "body",
        },
      });
    }

    var file = req.files.thumbnail;
    var fileSize = file.size;
    var extension = path.extname(file.name);
    var time = new Date().getTime();
    var fileName = time + "-" + file.md5 + extension;
    var allowedType = [".jpg", ".png", ".jpeg", ".JPG", ".PNG", ".JPEG"];

    if (fileSize > 2000000)
      return res.status(422).json({
        errors: {
          value: "",
          msg: "Ukuran thumbnail maksimal 2 MB",
          param: "thumbnail",
          location: "body",
        },
      });

    if (!allowedType.includes(extension))
      return res.status(422).json({
        errors: {
          value: "",
          msg: "Format thumbnail harus .jpg/.jpeg/.png",
          param: "thumbnail",
          location: "body",
        },
      });

    res.status(200).json({
      message: "Add one successfully",
    });
  }
};

exports.addTwo = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    res.status(200).json({
      message: "Add two successfully",
    });
  }
};

exports.addThree = (req, res) => {
  const { judul, techstack, thumbnail, deskripsi, content, status } = req.body;

  // validasi status
  if (status.length <= 0) {
    return res.status(422).json({
      errors: {
        msg: "Status harus dipilih",
        param: "status",
      },
    });
  }

  // handle thumbnail
  var file = req.files.thumbnail;
  var extension = path.extname(file.name);
  var time = new Date().getTime();
  var fileName = time + "-" + file.md5 + extension;

  // upload
  file.mv(`./public/gambar/post/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });

    var time = Math.floor(new Date().getTime() / 1000);
    await Models.posts.create({
      user_id: req.user.id,
      judul: judul,
      techstack: techstack,
      thumbnail: fileName,
      deskripsi: deskripsi,
      content: content,
      status: status.toString(),
      dibuat: time,
      diperbaharui: time,
    });

    return res.status(200).json({
      message: "Postingan berhasil ditambahkan",
    });
  });
};

exports.editOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    const { judul, techstack, thumbnail, deskripsi } = req.body;

    console.log({ judul, techstack, thumbnail, deskripsi });

    // validasi techstack
    if (techstack.length <= 0) {
      return res.status(422).json({
        errors: {
          msg: "Techstack harus di isi",
          param: "techstack",
        },
      });
    }

    // validasi thumbnail
    if (req.files !== null) {
      var file = req.files.thumbnail;
      var fileSize = file.size;
      var extension = path.extname(file.name);
      var time = new Date().getTime();
      var fileName = time + "-" + file.md5 + extension;
      var allowedType = [".jpg", ".png", ".jpeg", ".JPG", ".PNG", ".JPEG"];

      if (fileSize > 2000000)
        return res.status(422).json({
          errors: {
            value: "",
            msg: "Ukuran thumbnail maksimal 2 MB",
            param: "thumbnail",
            location: "body",
          },
        });

      if (!allowedType.includes(extension))
        return res.status(422).json({
          errors: {
            value: "",
            msg: "Format thumbnail harus .jpg/.jpeg/.png",
            param: "thumbnail",
            location: "body",
          },
        });
    }

    res.status(200).json({
      message: "Edit one successfully",
    });
  }
};

exports.editTwo = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    res.status(200).json({
      message: "Edit two successfully",
    });
  }
};

exports.editThree = async (req, res) => {
  const { judul, techstack, thumbnail, deskripsi, content, status } = req.body;
  const { id } = req.params;

  // validasi status
  if (status.length <= 0) {
    return res.status(422).json({
      errors: {
        msg: "Status harus dipilih",
        param: "status",
      },
    });
  }

  if (req.files !== null) {
    // ambil data thumbnail yang akan dihapus
    const postingan = await sequelize.query(
      `SELECT * FROM posts WHERE id = ${id}`,
      { type: QueryTypes.SELECT }
    );

    // handle thumbnail
    var file = req.files.thumbnail;
    var extension = path.extname(file.name);
    var time = new Date().getTime();
    var fileName = time + "-" + file.md5 + extension;

    // hapus dulu thumbnail lama nya
    if (postingan[0].thumbnail !== null) {
      var url_hapus = `./public/gambar/post/${postingan[0].thumbnail}`;
      fs.unlinkSync(url_hapus);
    }

    // upload
    file.mv(`./public/gambar/post/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });

      await Models.posts.update(
        {
          judul: judul,
          techstack: techstack,
          thumbnail: fileName,
          deskripsi: deskripsi,
          content: content,
          status: status.toString(),
          dibuat: Math.floor(new Date().getTime() / 1000),
        },
        {
          where: {
            id: id,
          },
        }
      );
    });
  } else {
    await Models.posts.update(
      {
        judul: judul,
        techstack: techstack,
        deskripsi: deskripsi,
        content: content,
        status: status.toString(),
        diperbaharui: Math.floor(new Date().getTime() / 1000),
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  return res.status(200).json({
    message: "Postingan berhasil diedit",
  });
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // ambil data thumbnail yang akan dihapus
    var role_db =
      req.user.role !== "admin" ? `and user_id = ${req.user.id}` : ``;
    const postingan = await sequelize.query(
      `SELECT * FROM posts WHERE id = ${id} ${role_db}`,
      { type: QueryTypes.SELECT }
    );

    // hapus dulu thumbnail lama nya
    if (postingan[0].thumbnail) {
      var url_hapus = `./public/gambar/post/${postingan[0].thumbnail}`;
      fs.unlinkSync(url_hapus);
    }

    await Models.posts.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      message: "Postingan berhasil dihapus",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.editStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    var status_params = status === "true" ? "publish" : "pending";

    await Models.posts.update(
      {
        status: status_params,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      message: "Status berhasil diedit",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
