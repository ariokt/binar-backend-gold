class itemHandler {
  constructor(itemService) {
    this.itemService = itemService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(_, res) {
    let codeStatus = 200;
    const products = await this.itemService.getAll();

    res.status(codeStatus).send({
      status: codeStatus,
      data: products
    });
  }

  async getById(req, res) {
    let codeStatus = 200;
    const detailProduct = await this.itemService.getById(req.params.id);
    if (detailProduct.errors) {
      codeStatus = 400;
    }

    res.status(codeStatus).send({
      status: codeStatus,
      data: detailProduct
    });
  }

  async create(req, res) {
    let codeStatus = 200;
    const result = await this.itemService.create(req.body, req.file);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      ...result
    })
  }

  async delete(req, res) {
    let codeStatus = 200;
    const deletedProduct = await this.itemService.delete(req.params.id);
    if (deletedProduct.errors) {
      codeStatus = 400;
    }

    res.status(codeStatus).send({
      status: codeStatus,
      data: deletedProduct
    });
  }

  async update(req, res) {
    let codeStatus = 200;
    const dataUpdate = { id: req.params.id, file: req.file, body: req.body }
    const deletedProduct = await this.itemService.update(dataUpdate);
    if (deletedProduct.errors) {
      codeStatus = 400;
    }

    res.status(codeStatus).send({
      status: codeStatus,
      data: deletedProduct
    });
  }
}

module.exports = itemHandler;