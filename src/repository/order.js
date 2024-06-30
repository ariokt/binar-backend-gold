const { Order, User, OrderStatus, OrderItem, Item } = require('../../models');

class orderRepository {
  constructor() { }

  async getAll() {
    const allOrder = await Order.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name']
        },
        {
          model: OrderStatus,
          as: 'status',
          attributes: ['name']
        },
        {
          model: OrderItem,
          as: 'items',
          attributes: ['count'],
          include: [
            {
              model: Item,
              as: 'item',
              attributes: ['name']
            }
          ]
        }
      ]
    });
    return allOrder;
  }

  async insertNew(order) {
    const createdOrder = await Order.create({ user_id: order.user_id, status_id: 1 })
    return createdOrder.id;
  }
  
  async updateStatus(idOrder, statusId) {
    const res = await Order.update(
      { status_id: statusId },
      {
        where: {
          id: idOrder,
        }
      }
    );
    return res[0];
  }
}

module.exports = orderRepository;