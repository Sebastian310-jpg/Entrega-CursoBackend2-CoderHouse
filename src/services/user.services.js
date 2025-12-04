import UserRepository from '../repositories/user.repository.js';
import crypto from 'crypto';
import { hashPassword, validatePassword } from '../utils/hash.js';

class UserServices {
  constructor(){
    this.userRepository = new UserRepository();
  }

  async getUserByEmail(userEmail){
    const user = await this.userRepository.getUserByEmail(userEmail);
    if(!user) throw new Error('Usuario no encontrado');

    return user;
  }

  async getUserById(userId){
    const user = await this.userRepository.getUserById(userId);
    if(!user) throw new Error('Usuario no encontrado');

    return user;
  }

  async getAllUsers(){
    return await this.userRepository.getAllUsers();
  }

  async deleteUser(userId){
    const user = await this.userRepository.deleteUser(userId);
    if(!user) throw new Error('Usuario no encontrado');

    return user;
  }

  async generateResetToken(userEmail){
    const user = await this.userRepository.getUserByEmail(userEmail);
    if(!user) throw new Error('Usuario no encontrado');

    const token = crypto.randomBytes(32).toString('hex');

    await this.userRepository.updateUser(user._id, {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000
    });

    return token;
  }

  async getUserByResetToken(token){
    const user = await this.userRepository.getUserByResetToken(token);
    if(!user) throw new Error('Usuario no encontrado');

    if(user.resetPasswordExpires < Date.now()){
      throw new Error('El token expiró, solicita uno nuevo');
    }

    return user;
  }

  async resetPassword(token, newPassword){
    const user = await this.getUserByResetToken(token);

    const isSamePassword = validatePassword(newPassword, user.password);
    if(isSamePassword){
      throw new Error('La contraseña no puede ser igual a la anterior');
    }

    const hashedPassword = hashPassword(newPassword);

    await this.userRepository.updateUser(user._id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    return true;
  }
}

export default UserServices;