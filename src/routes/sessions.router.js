import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const sessionsRouter = express.Router();

sessionsRouter.get('/error', (req, res) => {
  res.status(400).json({ status: 'error', message: 'Error en la autenticación' });
})

sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/error', session: false }), (req, res) => {
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
  
    res.status(200).json({ status: 'success', message: 'Login exitoso', token });

  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error generando el token' });
  }
})

sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/error', session: false }), (req, res) => {
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
  
    res.status(201).json({ status: 'success', message: 'Registro exitoso', token });

  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error generando el token' });
  }
})

sessionsRouter.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.status(200).json({ status: 'success', payload: req.user });
})

export default sessionsRouter;