'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'order_id'
      })

      OrderItem.belongsTo(models.Item, {
        as: 'item',
        foreignKey: 'item_id'
      })
    }
  }
  OrderItem.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'order_id harus diisi!'
        },
        isExist(value) {
          return sequelize.models.Order.findByPk(value).then((data) => {
            if (!data) {
              throw new Error("order tidak ditemukan!");
            }
          })
        }
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'item_id harus diisi!'
        },
        isExist(value) {
          return sequelize.models.Item.findByPk(value).then((data) => {
            if (!data) {
              throw new Error("item tidak ditemukan!");
            }
          })
        }
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'count harus diisi!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items'
  });
  return OrderItem;
};