'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          msg: 'name is required!'
        }, 
        notEmpty: {
          msg: 'name is required!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
    },
    desc: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items'
  });
  return Item;
};