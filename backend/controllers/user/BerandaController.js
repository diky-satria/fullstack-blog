const { sequelize } = require("../../models/index.js");
const { QueryTypes } = require("sequelize");
const helpers = require("../../helpers/index.js");

exports.getLatestPosts = async (req, res) => {
  try {
    var data = await sequelize.query(
      `SELECT posts.id as id, users.name as name, judul, techstack, thumbnail FROM posts JOIN users ON users.id = posts.user_id where posts.status = 'publish' order by diperbaharui desc limit 6`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      message: "Posts terbaru",
      data: data,
    });
  } catch (e) {
    console.log(e.response);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getAllTopic = async (req, res) => {
  try {
    var page = parseInt(req.query.page) || 0;
    var limit = parseInt(req.query.limit) || 6;
    var offset = page * limit;

    var total = await sequelize.query(
      `SELECT count(*) as total FROM posts where status = 'publish'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    var total_page = Math.ceil(total[0].total / limit);

    var data = await sequelize.query(
      `SELECT posts.id as id, users.name as name, judul, techstack, thumbnail FROM posts JOIN users ON users.id = posts.user_id where posts.status = 'publish' order by diperbaharui desc limit ${offset},${limit}`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      message: "Semua postingan",
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

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    var post = await sequelize.query(
      `SELECT posts.id, user_id, users.name, judul, techstack, thumbnail, deskripsi, content, posts.status, dibuat, diperbaharui FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = ${id} and posts.status = 'publish'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    var data = {
      id: post[0].id,
      user_id: post[0].user_id,
      name: post[0].name,
      judul: post[0].judul,
      techstack: post[0].techstack,
      thumbnail: post[0].thumbnail,
      deskripsi: post[0].deskripsi,
      content: post[0].content,
      status: post[0].status,
      dibuat: helpers.timeConverter(post[0].dibuat),
      diperbaharui: post[0].diperbaharui
        ? helpers.timeConverter(post[0].diperbaharui)
        : "-",
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

exports.getAllTopicForSelect = async (req, res) => {
  try {
    var data_query = await sequelize.query(
      `SELECT id, judul, status FROM posts WHERE status = 'publish' order by judul ASC`,
      { type: QueryTypes.SELECT }
    );

    var data = [];
    for (var i = 0; i < data_query.length; i++) {
      data.push({
        value: data_query[i].id,
        label: data_query[i].judul,
      });
    }

    return res.status(200).json({
      message: "Semua topik",
      data: data,
    });
  } catch (e) {
    console.log(e.response);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
