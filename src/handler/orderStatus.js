class orderStatusHandler {
  constructor(orderStatusService) {
    this.orderStatusService = orderStatusService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    // this.login = this.login.bind(this);
  }

  async getAll(_, res) {
    let codeStatus = 200;
    const statuses = await this.orderStatusService.getAll();

    res.status(codeStatus).send({
      status: codeStatus,
      data: statuses
    });
  }

  async create(req, res) {
    let codeStatus = 200;
    const result = await this.orderStatusService.create(req.body);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    });
  }

  async delete(req, res) {
    let codeStatus = 200;
    const result = await this.orderStatusService.delete(req.params.id);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    });
  }

  async update(req, res) {
    let codeStatus = 200;
    const result = await this.orderStatusService.update(req.params.id, req.body.name);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    });
  }
}

module.exports = orderStatusHandler;