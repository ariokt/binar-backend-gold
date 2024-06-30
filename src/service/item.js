class itemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async getAll() {
    const result = await this.itemRepository.getAll();
    return result;
  }

  async getById(id) {
    const detailProduct = await this.itemRepository.getById(id);
    if (detailProduct) {
      return detailProduct;
    } else {
      return { errors: "item tidak ditemukan!" };
    }
  }

  async create(newProduct, newProductImage) {
    try {
      const dataProduct = {
        image: newProductImage.originalname,
        name: newProduct.name,
        price: newProduct.price,
        desc: newProduct.desc
      }
      const result = await this.itemRepository.insertNewItem(dataProduct);
      return { data: { message: 'item berhasil tersimpan!', name: result.name } };
    } catch (error) {
      let dataError = { errors: { } };
      for (let i = 0; i < error.errors.length; i++) {
        dataError.errors[error.errors[i].path] = error.errors[i].message;
      }
      return dataError;
    }
  }

  async delete(id) {
    const deletedProduct = await this.itemRepository.deleteItem(id);
    if (deletedProduct) {
      return { message: "data item berhasil dihapus." };
    } else {
      return { errors: "item tidak ditemukan!" };
    }
  }

  async update(data) {
    const dataProduct = {
      id: data.id,
      image: data?.file?.originalname,
      name: data?.body?.name,
      price: data?.body?.price,
      desc: data?.body?.desc
    }
    const updatedProduct = await this.itemRepository.updateItem(dataProduct);
    if (updatedProduct) {
      return { message: "data item berhasil terupdate." };
    } else {
      return { errors: "item tidak ditemukan!" };
    }
  }
}
module.exports = itemService;