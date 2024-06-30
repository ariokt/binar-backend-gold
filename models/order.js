'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })

      Order.belongsTo(models.OrderStatus, {
        as: 'status',
        foreignKey: 'status_id'
      })

      Order.hasMany(models.OrderItem, {
        as: 'items',
        foreignKey: 'order_id'
      })
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user_id harus diisi!'
        },
        isExist(value) {
          return sequelize.models.User.findByPk(value).then((data) => {
            if (!data) {
              throw new Error("user tidak ditemukan!");
            }
          })
        }
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'status_id harus diisi!'
        },
        isExist(value) {
          return sequelize.models.OrderStatus.findByPk(value).then((data) => {
            if (!data) {
              throw new Error("status order tidak ditemukan!");
            }
          })
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};