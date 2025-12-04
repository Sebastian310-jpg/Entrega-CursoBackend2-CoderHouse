import CartRepository from "../repositories/cart.repository.js";

class CartService {
  constructor(){
    this.cartRepository = new CartRepository();
  }

  async createCart(){
    return await this.cartRepository.createCart();
  }

  async getCartById(cartId){
    const cart = await this.cartRepository.getCartById(cartId);
    if(!cart) throw new Error('Carrito no encontrado');
    return cart;
  }

  async addProductToCart(cartId, productId, quantity = 1){
    const cart = await this.cartRepository.getCartById(cartId);
    if(!cart) throw new Error('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => {
      const id = p.product._id ? p.product._id.toString() : p.product.toString();
      return id === productId;
    });

    if(productIndex > -1){
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await this.cartRepository.updateCart(cartId, { products: cart.products });
  }

  async removeProductFromCart(cartId, productId){
    const cart = await this.cartRepository.getCartById(cartId);
    if(!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => {
      const id = p.product._id ? p.product._id.toString() : p.product.toString();
      return id !== productId;
    });

    return await this.cartRepository.updateCart(cartId, { products: cart.products });
  }

  async clearCart(cartId){
    const cart = await this.cartRepository.getCartById(cartId);
    if(!cart) throw new Error('Carrito no encontrado');

    return await this.cartRepository.updateCart(cartId, { products: [] });
  }

  async updateCart(cartId, newProducts){
    const cart = await this.cartRepository.getCartById(cartId);
    if(!cart) throw new Error('Carrito no encontrado');
    
    return await this.cartRepository.updateCart(cartId, newProducts);
  }

  async updateQuantityOfProductInCart(cartId, productId, newQuantity){
    const cart = await this.cartRepository.getCartById(cartId);
    if(!cart) throw new Error('Carrito no encontrado');

    const productInCart = cart.products.find(p => {
      const id = p.product._id ? p.product._id.toString() : p.product.toString();
      return id === productId;
    });

    if(!productInCart) throw new Error('Producto no encontrado en el carrito');

    productInCart.quantity = newQuantity;

    return await this.cartRepository.updateCart(cartId, { products: cart.products });
  }

  
}

export default CartService;
