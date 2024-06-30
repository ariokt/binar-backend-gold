const { OrderItem } = require('../../models');

class orderStatusRepository {
  constructor() { }

  async insertNew(orderItem, idOrder) {
    await OrderItem.create({ order_id: idOrder, item_id: orderItem.item_id, count: orderItem.count });
  }
}

module.exports = orderStatusRepository;