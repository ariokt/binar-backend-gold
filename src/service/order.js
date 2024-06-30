class orderService {
  constructor(orderRepository, orderItemRepository) {
    this.orderRepository = orderRepository;
    this.orderItemRepository = orderItemRepository;
  }

  async getAll() {
    return await this.orderRepository.getAll();
  }

  async create(order) {
    try {
      const result = await this.orderRepository.insertNew(order);
      if (result) {
        for (let i = 0; i < order.items.length; i++) {
          await this.orderItemRepository.insertNew(order.items[i], result);
        }
      }
      return { message: 'Order berhasil dibuat.' };
    } catch (error) {
      let dataError = { errors: { } };
      for (let i = 0; i < error.errors.length; i++) {
        dataError.errors[error.errors[i].path] = error.errors[i].message;
      }
      return dataError;
    }
  }

  async updateStatus(idOrder, body) {
    try {
      const result =  await this.orderRepository.updateStatus(idOrder, body.status_id);
      if (result === 1) {
        return { data: "Status berhasil terupdate!" }
      } else {
        return { errors: "Id order tidak ditemukan!" }
      }
    } catch (error) {
      let dataError = { errors: { } };
      for (let i = 0; i < error.errors.length; i++) {
        dataError.errors[error.errors[i].path] = error.errors[i].message;
      }
      return dataError;
    }
  }
}
module.exports = orderService;