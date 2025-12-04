import { Router } from 'express';
import TicketController from "../controllers/ticket.controller.js";
import passport from 'passport';
import authorization from '../middlewares/authorization.js';

const ticketRouter = Router();
const ticketController = new TicketController();

ticketRouter.post('/:cid/purchase', passport.authenticate('current', { session: false }), authorization(['user']), ticketController.purchase);
ticketRouter.get('/:tid', passport.authenticate('current', { session: false }), authorization(['user', 'admin']), ticketController.getTicketById);
ticketRouter.get('/', passport.authenticate('current', { session: false }), authorization(['admin']), ticketController.getAllTickets);

export default ticketRouter;