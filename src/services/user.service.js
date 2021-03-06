import models from '../models';

const { User } = models;
/**
 * different methods on User method
 */
class UserService {
  /**
   * @param {int} user contains model properties
   */
  constructor() {
    this.user = User;
  }

  /**
  * @param {object} options include total pages, total records,etc ... for pagination
  * @return {object} list of all users
  */
  async getAllUsers(options) {
    return this.user.paginate(options);
  }

  /**
  * @param {int} userId add user first name.
  * @return {object} get user with provided Id
  */
  async getUserById(userId) {
    return this.user.findOne({ where: { id: userId } });
  }

  /**
  * @param {string} username add username.
  * @return {object} get user with provided Id
  */
  async getUserByUserName(username) {
    return this.user.findOne({ where: { username } });
  }

  /**
  * @param {string} email add email.
  * @return {object} get user with provided email
  */
  async getUserByEmail(email) {
    return this.user.findOne({ where: { email } });
  }

  /**
   * @param {object} data include different rows properties
   * @param {string} username add username.
   * @return {string} success message
   */
  async updateUserByUsername(data, username) {
    return this.user.update(data, { where: { username } });
  }
}

export default new UserService();
