import Cart from "./models/carts.model.js";

class CartDAO {
  async createCart(){
    return await Cart.create({ products: [] });
  }

  async getCartById(cartId){
    return await Cart.findById(cartId).populate('products.product');
  }

  async updateCart(cartId, newProducts){
    return await Cart.findByIdAndUpdate(cartId, { products: newProducts }, { new: true });
  }

  async deleteCart(cartId){
    return await Cart.findByIdAndDelete(cartId);
  }
}

export default CartDAO;