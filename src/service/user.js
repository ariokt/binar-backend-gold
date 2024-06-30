class userService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    return await this.userRepository.getAll();
  }
}
module.exports = userService;