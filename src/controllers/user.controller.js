import UserServices from "../services/user.services.js";

class UserController {
  constructor(){
    this.userService = new UserServices();
  }

  // GET /api/users
  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json({ status: 'success', message: 'Usuarios obtenidos correctamente', payload: users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  // GET /api/users/:uid
  getUserById = async (req, res) => {
    try {
      const { uid: userId } = req.params;

      const user = await this.userService.getUserById(userId);

      res.status(200).json({ status: 'success', message: 'Usuario obtenido correctamente', payload: user });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  // DELETE /api/users/:uid
  deleteUser = async (req, res) => {
    try {
      const { uid: userId } = req.params;

      const user = await this.userService.deleteUser(userId);

      res.status(200).json({ status: 'success', message: 'Usuario eliminado correctamente', payload: user });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
}

export default UserController;