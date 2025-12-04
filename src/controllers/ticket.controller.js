import TicketService from "../services/ticket.services.js";

class TicketController {
  constructor(){
    this.ticketService = new TicketService();
  }

  // POST /api/tickets/:cid/purchase
  purchase = async (req, res) => {
    try {
      const { cid: cartId } = req.params;
      const user = req.user;
  
      const ticket = await this.ticketService.purchase(cartId, user);
  
      res.status(201).json({ status: 'success', message: 'Compra realizada correctamente', payload: ticket });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error al comprar el carrito: ' + error.message });
    }
  }

  // GET /api/tickets/:tid
  getTicketById = async (req, res) => {
    try {
      const { tid: ticketId } = req.params;

      const ticket = await this.ticketService.getTicketById(ticketId);

      res.status(200).json({ status: 'success', payload: ticket });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error al obtener el ticket: ' + error.message });
    }
  }

  // GET /api/tickets
  getAllTickets = async (req, res) => {
    try {
      const tickets = await this.ticketService.getAllTickets();

      res.status(200).json({ status: 'success', message: 'Tickets obtenidos correctamente', payload: tickets });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error al obtener los tickets: ' + error.message });
    }
  }
}

export default TicketController;