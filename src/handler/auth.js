class authHandler {
  constructor(authService) {
    this.authService = authService;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    let codeStatus = 200;
    const result = await this.authService.register(req.body);
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    })
  }

  async login(req, res) {
    let codeStatus = 200;
    const result = await this.authService.login(req.body);
    
    if (result.errors) {
      codeStatus = 400;
    }
    res.status(codeStatus).send({
      status: codeStatus,
      data: result
    })
  }
}

module.exports = authHandler;