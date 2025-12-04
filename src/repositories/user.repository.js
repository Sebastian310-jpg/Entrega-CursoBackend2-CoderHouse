import UserDAO from "../dao/user.dao.js";

class UserRepository {
  constructor(){
    this.userDao = new UserDAO();
  }

  getUserByEmail = async (userEmail) => {
    return await this.userDao.getUserByEmail(userEmail);
  }

  getUserById = async (userId) => {
    return await this.userDao.getUserById(userId);
  }

  getAllUsers = async () => {
    return await this.userDao.getAllUsers();
  }

  deleteUser = async (userId) => {
    return await this.userDao.deleteUser(userId);
  }

  updateUser = async (userId, updates) => {
    return await this.userDao.updateUser(userId, updates);
  }

  getUserByResetToken = async (token) => {
    return await this.userDao.getUserByResetToken(token);
  }
}

export default UserRepository;