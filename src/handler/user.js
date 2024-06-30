class userHandler {
  constructor(userService) {
    this.userService = userService;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_, res) {
    let codeStatus = 200;
    const users = await this.userService.getAll();

    res.status(codeStatus).send({
      status: codeStatus,
      data: users
    });
  }
}

module.exports = userHandler;