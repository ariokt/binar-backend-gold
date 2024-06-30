class orderHandler {
  constructor(orderService) {
    this.orderService = orderService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    // this.login = this.login.bind(this);
  }

  async getAll(_, res) {
    let codeStatus = 200;
    const statuses = await this.orderService.getAll();

    res.status(codeStatus).send({
      status: codeStatus,
      data: statuses
    });
  }

  async create(req, res) {
    let codeStatus = 200;
    const result = await this.orderService.create(req.body);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    });
  }

  async updateStatus(req, res) {
    let codeStatus = 200;
    const result = await this.orderService.updateStatus(req.params.id, req.body);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    });
  }
}

module.exports = orderHandler;