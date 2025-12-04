import CartService from "../services/cart.services.js";

class CartController {
  constructor(){
    this.cartService = new CartService();
  }

  // POST /api/carts
  createCart = async (req, res) => {
    try {
      const cart = await this.cartService.createCart();

      res.status(201).json({ status: 'success', message: 'Carrito creado correctamente', payload: cart });
      
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al crear el carrito: ' + error.message });
    }
  }

  // GET /api/carts/:cid
  getCartById = async (req, res) => {
    try {
      const { cid: cartId } = req.params;

      const cart = await this.cartService.getCartById(cartId);

      res.status(200).json({ status: 'success', message: 'Carrito obtenido correctamente', payload: cart });
      
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al obtener el carrito: ' + error.message });
    }
  }

  // POST /api/carts/:cid/product/:pid
  addProductToCart = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;
      const { quantity = 1 } = req.body || {};

      const updatedCart = await this.cartService.addProductToCart(cartId, productId, quantity);

      res.status(200).json({ status: 'success', message: 'Producto agregado al carrito correctamente', payload: updatedCart });
      
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al añadir un producto al carrito: ' + error.message });
    }
  }

  // DELETE /api/carts/:cid/product/:pid
  removeProductFromCart = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;

      const updatedCart = await this.cartService.removeProductFromCart(cartId, productId);

      res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito correctamente', payload: updatedCart });

    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al eliminar un producto del carrito: ' + error.message });
    }
  }

  // DELETE /api/carts/:cid
  clearCart = async (req, res) => {
    try {
      const { cid: cartId } = req.params;

      const updatedCart = await this.cartService.clearCart(cartId);

      res.status(200).json({ status: 'success', message: 'Carrito limpiado correctamente', payload: updatedCart });

    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al limpiar el carrito: ' + error.message });
    }
  }

  // PUT /api/carts/:cid/product/:pid
  updateQuantityOfProductInCart = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;
      const quantity = parseInt(req.body.quantity);

      if(isNaN(quantity) || quantity < 1) {
        return res.status(400).json({ status: 'error', message: 'Cantidad invalida' })
      };

      const updatedCart = await this.cartService.updateQuantityOfProductInCart(cartId, productId, quantity);

      res.status(200).json({ status: 'success', message: 'Cantidad del producto actualizada', payload: updatedCart });
      
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad de un producto del carrito: ' + error.message });
    }
  }
}

export default CartController;