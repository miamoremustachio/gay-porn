const UserEntity = require('./user.entity');
const { NotFoundException } = require('../../shared/exceptions');

class UserService {
  constructor(userRepository = UserEntity) {
    this.userRepository = userRepository;
  }
  
  async registerUser(userBody) {
    const user = await new this.userRepository(userBody).save();

    return user;
  }

  async getUser(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User #${userId} not found.`);
    }

    return user;
  }
}

module.exports = UserService;
