import CartDAO from "../dao/cart.dao.js";

class CartRepository {
  constructor(){
    this.cartDao = new CartDAO();
  }

  createCart = async () => {
    return await this.cartDao.createCart();
  }

  getCartById = async (cartId) => {
    return await this.cartDao.getCartById(cartId);
  }

  updateCart = async (cartId, newProducts) => {
    return await this.cartDao.updateCart(cartId, newProducts);
  }

  deleteCart = async (cartId) => {
    return await this.cartDao.deleteCart(cartId);
  }
}

export default CartRepository;