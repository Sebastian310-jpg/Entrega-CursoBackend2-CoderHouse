import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';
import authorization from '../middlewares/authorization.js';
import passport from 'passport';

const cartRouter = Router();
const cartController = new CartController();

// Añadir un carrito
cartRouter.post('/', cartController.createCart);

// Mostrar los productos de un carrito
cartRouter.get('/:cid', cartController.getCartById);

// Añadir un producto a un carrito
cartRouter.post("/:cid/product/:pid", passport.authenticate('current', { session: false }), authorization(['user']), cartController.addProductToCart);

// Eliminar un producto de un carrito
cartRouter.delete("/:cid/product/:pid", passport.authenticate('current', { session: false }), authorization(['user']), cartController.removeProductFromCart);

// Eliminar todos los productos de un carrito
cartRouter.delete("/:cid", passport.authenticate('current', { session: false }), authorization(['user']), cartController.clearCart);

// Actualizar la cantidad de un producto del carrito
cartRouter.put("/:cid/product/:pid", passport.authenticate('current', { session: false }), authorization(['user']), cartController.updateQuantityOfProductInCart);

export default cartRouter;