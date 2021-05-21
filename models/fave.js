'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fave.init({
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookCover: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    bookId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fave',
  });
  return fave;
};