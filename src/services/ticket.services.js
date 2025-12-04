import TicketRepository from "../repositories/ticket.repository.js";
import CartService from "./cart.services.js";
import ProductService from "./product.services.js";
import crypto from 'crypto';

class TicketService {
  constructor(){
    this.ticketRepository = new TicketRepository();
    this.cartService = new CartService();
    this.productService = new ProductService();
  }

  purchase = async (cartId, user) => {
    const cart = await this.cartService.getCartById(cartId);
    if (!cart || cart.products.length === 0) {
      throw new Error('El carrito está vacío o no existe');
    }

    let totalAmount = 0;
    const purchasedProducts = [];
    const remainingProducts = [];

    for (let item of cart.products){
      const product = await this.productService.getProductById(item.product);

      if (product.stock >= item.quantity){
        purchasedProducts.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price
        });

        totalAmount += product.price * item.quantity;
        
        // Actualizar stock
        await this.productService.updateProduct(product._id, { stock: product.stock - item.quantity });
      } else {
        remainingProducts.push(item);
      }
    }

    if(purchasedProducts.length === 0){
      throw new Error('No hay productos disponibles para la compra');
    }

    // Crear el ticket
    const ticketData = {
      code: crypto.randomBytes(8).toString('hex').toUpperCase(),
      amount: totalAmount,
      purchaser: user._id,
      products: purchasedProducts,
    }

    const ticket = await this.ticketRepository.createTicket(ticketData);

    await this.cartService.updateCart(cartId, remainingProducts);

    return ticket;
  }

  getTicketById = async (tikcetId) => {
    return await this.ticketRepository.getTicketById(tikcetId);
  }

  getAllTickets = async () => {
    return await this.ticketRepository.getAllTickets();
  }
}

export default TicketService;