import Ticket from "./models/tickets.model.js";

class TicketDAO {
  async createTicket(ticketData){
    return await Ticket.create(ticketData);
  }

  async getTicketById(ticketId){
    return await Ticket.findById(ticketId).populate('products.product').populate('purchaser', 'first_name last_name email');
  }

  async getTicketByCode(code){
    return await Ticket.findOne({ code }).populate('products.product').populate('purchaser', 'first_name last_name email');
  }

  async getAllTickets(){
    return await Ticket.find().populate('products.product').populate('purchaser', 'first_name last_name email');
  }

  async deleteTicket(ticketId){
    return await Ticket.findByIdAndDelete(ticketId);
  }
}

export default TicketDAO;