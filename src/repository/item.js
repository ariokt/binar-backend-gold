const { Item } = require('../../models');

class itemRepository {
  constructor() { }

  async getAll() {
    const allItem = await Item.findAll({
      attributes: ['id', 'name'],
    });
    return allItem;
  }

  async getById(id) {
    const detailItem = await Item.findByPk(id);
    if (detailItem) {
      return detailItem.dataValues;
    } else {
      return null;
    }
  }

  async insertNewItem(newItem) {
    const result = await Item.create({ image: newItem.image, name: newItem.name, price: newItem.price, desc: newItem.desc });
    if (result) {
      return result.dataValues;
    }
  }

  async deleteItem(ItemId) {
    const result = await Item.destroy({ where: { id: ItemId }});
    return result;
  }

  async updateItem(data) {
    const result = await Item.update(
      {
        image: data.image,
        name: data.name,
        price: data.price,
        desc: data.desc
      },
      { where: { 
        id: data.id 
        }
      });
    return result;
  }
}

module.exports = itemRepository;