import UserServices from "../services/user.services.js";
import sendEmail from "../utils/mail.js";
import jwt from 'jsonwebtoken';
import UserCurrentDTO from '../dto/userCurrent.dto.js';

class SessionsController {
  constructor(){
    this.userServices = new UserServices();
  }

  // GET /api/sessions/error
  error = async (req, res) => {
    res.status(400).json({ status: 'error', message: 'Error en la autenticación' });
  }

  // POST /api/sessions/login
  login = async (req, res) => {
    try {
      const user = req.user;
        
      const payload = {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        }
      };
        
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
      res.status(200).cookie('authToken', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      }).json({ status: 'success', message: 'Login exitoso' });

    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error generando el token' });
    }
  }

  // POST /api/sessions/register
  register = async (req, res) => {
    try {
      const user = req.user;
        
      const payload = {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        }
      };
        
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
      res.status(201).cookie('authToken', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      }).json({ status: 'success', message: 'Registro exitoso' });

    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error generando el token' });
    }
  }

  // POST /api/sessions/logout
  logout = async (req, res) => {
    try {
      res.clearCookie('authToken');

      res.status(200).json({ status: 'success', message: 'Logout exitoso' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al cerrar sesion' });
    }
  }

  // GET /api/sessions/current
  current = async (req, res) => {
    const safeUser = new UserCurrentDTO(req.user);

    res.status(200).json({ status: 'success', payload: safeUser });
  }

  // POST /api/sessions/forgot-password
  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const token = await this.userServices.generateResetToken(email);

      const resetLink = `http://localhost:8080/reset-password?token=${token}`;

      await sendEmail({
        to: email,
        subject: "Recuperación de contraseña",
        html: `
          <p>Haz click para restablecer la contraseña</p>
          <a href="${resetLink}">Restablecer Contraseña</a>
        `
      });

      res.json({ status: 'success', message: 'Correo enviado correctamente' });
      
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error enviando el correo: ' + error.message });
    }
  }

  // POST /api/sessions/reset-password
  resetPassword = async (req, res) => {
    try {
      const { token, password } = req.body;

      await this.userServices.resetPassword(token, password);

      res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
}

export default SessionsController;