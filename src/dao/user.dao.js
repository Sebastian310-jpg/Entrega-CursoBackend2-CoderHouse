import User from "./models/users.model.js";

class UserDAO {
  async getUserByEmail(userEmail){
    return await User.findOne({ email: userEmail });
  }

  async getUserById(userId){
    return await User.findById(userId);
  }

  async getAllUsers(){
    return await User.find();
  }

  async deleteUser(userId){
    return await User.findByIdAndDelete(userId);
  }

  async updateUser(userId, updates){
    return await User.findByIdAndUpdate(userId, updates, { new: true });
  }

  async getUserByResetToken(token){
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }
}

export default UserDAO;