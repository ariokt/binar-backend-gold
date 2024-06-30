const { User, Order, OrderStatus } = require('../../models');

class userRepository {
  constructor() { }

  async getAll() {
    const allUsers = await User.findAll();
    return allUsers;
  }

  async getByUsername(username) {
    const searchedUser = await User.findOne({
      where: { username: username}
    });
    if (searchedUser) {
      return searchedUser.dataValues;
    }
  }

  async getByEmail(email) {
    const searchedUser = await User.findOne({ where: { email: email}});
    if (searchedUser) {
      return searchedUser.dataValues;
    }
  }

  async insertNewUser(newUser) {
    const result = await User.create({ name: newUser.name, username: newUser.username, password: newUser.password, email: newUser.email });
    return result.dataValues;
  }
}

module.exports = userRepository;