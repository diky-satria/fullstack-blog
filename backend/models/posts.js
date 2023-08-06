"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init(
    {
      user_id: DataTypes.INTEGER,
      judul: DataTypes.STRING,
      techstack: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      content: DataTypes.TEXT,
      status: DataTypes.STRING,
      dibuat: DataTypes.BIGINT,
      diperbaharui: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return posts;
};
