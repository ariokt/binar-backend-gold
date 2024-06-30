const { OrderStatus } = require('../../models');

class orderStatusRepository {
  constructor() { }

  async getAll() {
    const allStatuses = await OrderStatus.findAll();
    return allStatuses;
  }

  async getById(idStatus) {
    const searchedStatus = await OrderStatus.findOne({ where: { id: idStatus }});
    return searchedStatus;
  }

  async insertNewStatus(newStatus) {
    const result = await OrderStatus.create({ name: newStatus.name });
    return result.dataValues;
  }

  async deleteStatus(statusId) {
    const result = await OrderStatus.destroy({ where: { id: statusId }});
    return result;
  }

  async updateStatus(statusId, nameStatus) {
    const result = await OrderStatus.update({ name: nameStatus }, { where: { id: statusId }});
    return result[0];
  }
}

module.exports = orderStatusRepository;