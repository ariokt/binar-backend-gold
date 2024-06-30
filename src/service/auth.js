class authService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(newUser) {
    try {
      const result = await this.userRepository.insertNewUser(newUser);
      return result;
    } catch (error) {
      let dataError = { errors: { } };
      for (let i = 0; i < error.errors.length; i++) {
        dataError.errors[error.errors[i].path] = error.errors[i].message;
      }
      return dataError;
    }
  }

  async login(user) {
    let dataError = { errors: { } };

    if (!user.username) {
      dataError.errors.username = 'Username required!';
    }

    if (!user.password) {
      dataError.errors.password = 'Password required!';
    }

    if (dataError.errors.username || dataError.errors.password) {
      return dataError;
    }

    const result = await this.userRepository.getByUsername(user.username);
    if (result && result.password === user.password) {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
      };
    } else if (result && result.password !== user.password) {
      dataError.errors.password = 'Password salah!';
      return dataError;
    } else {
      dataError.errors.username = 'Username tidak ditemukan!';
      return dataError;
    }
  }
}
module.exports = authService;