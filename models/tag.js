'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Article, {through: 'ArticleTags'})
    }
  };
  Tag.init({
    name: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};