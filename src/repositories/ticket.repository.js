import TicketDAO from "../dao/ticket.dao.js";

class TicketRepository {
  constructor(){
    this.ticketDao = new TicketDAO();
  }

  async createTicket(ticketData){
    return await this.ticketDao.createTicket(ticketData);
  }

  async getTicketById(ticketId){
    return await this.ticketDao.getTicketById(ticketId);
  }

  async getTicketByCode(code){
    return await this.ticketDao.getTicketByCode(code);
  }

  async getAllTickets(){
    return await this.ticketDao.getAllTickets();
  }

  async deleteTicket(ticketId){
    return await this.ticketDao.deleteTicket(ticketId);
  }
}

export default TicketRepository;  