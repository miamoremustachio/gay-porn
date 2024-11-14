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

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async updateUser(userId, fieldsToUpdate) {
    const user = await this.userRepository.findByIdAndUpdate(
      userId,
      fieldsToUpdate,
      { runValidators: true },
    );

    if (!user) {
      throw new NotFoundException(`User #${userId} not found.`);
    }

    return this.getUser(userId);
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findByIdAndDelete(userId);

    if (!user) {
      throw new NotFoundException(`User #${userId} not found.`);
    }
  }
}

module.exports = UserService;
