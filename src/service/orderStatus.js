class orderStatusService {
  constructor(orderStatuRepository) {
    this.orderStatuRepository = orderStatuRepository;
  }

  async getAll() {
    return await this.orderStatuRepository.getAll();
  }

  async create(newStatus) {
    try {
      const result = await this.orderStatuRepository.insertNewStatus(newStatus);
      return { data: result };
    } catch (error) {
      let dataError = { errors: { } };
      for (let i = 0; i < error.errors.length; i++) {
        dataError.errors[error.errors[i].path] = error.errors[i].message;
      }
      return dataError;
    }
  }

  async delete(idStatus) {
    const result =  await this.orderStatuRepository.deleteStatus(idStatus);
    if (result === 1) {
      return { data: "Category berhasil dihapus!" }
    } else {
      return { errors: "id category tidak ditemukan!" }
    }
  }

  async update(idStatus, nameStatus) {
    try {
      const result =  await this.orderStatuRepository.updateStatus(idStatus, nameStatus);
      if (result === 1) {
        return { data: "Category berhasil terupdate!" }
      } else {
        return { errors: "id category tidak ditemukan!" }
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
module.exports = orderStatusService;