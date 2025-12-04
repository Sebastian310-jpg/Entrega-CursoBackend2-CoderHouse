import { Router } from 'express';
import passport from 'passport';
import SessionsController from '../controllers/sessions.controller.js';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.get('/error', sessionsController.error);
sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/error', session: false }), sessionsController.login);
sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/error', session: false }), sessionsController.register);
sessionsRouter.post('/logout', sessionsController.logout);
sessionsRouter.get('/current', passport.authenticate('current', { session: false }), sessionsController.current);

sessionsRouter.post('/forgot-password', sessionsController.forgotPassword);
sessionsRouter.post('/reset-password', sessionsController.resetPassword);

export default sessionsRouter;