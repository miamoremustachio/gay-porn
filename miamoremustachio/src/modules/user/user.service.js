const UserEntity = require('./user.entity');
const UserValidator = require('./user.validator');

class UserService {
  constructor(userRepository = UserEntity) {
    this.userRepository = userRepository;
    this.validator = new UserValidator();
  }
  
  async registerUser(userBody) {
    const user = await new this.userRepository(userBody).save();

    return user;
  }

  async getUser(userId) {
    const user = await this.userRepository.findById(userId);

    this.validator.checkExistence(user, userId);

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async updateUser(userId, fieldsToUpdate) {
    const options = { new: true, runValidators: true };
    const user = await this.userRepository.findByIdAndUpdate(userId, fieldsToUpdate, options);

    this.validator.checkExistence(user, userId);

    return user;
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findByIdAndDelete(userId);

    this.validator.checkExistence(user, userId);
  }
}

module.exports = UserService;
