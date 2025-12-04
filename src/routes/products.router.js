import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import authorization from '../middlewares/authorization.js';
import passport from 'passport';

const productRouter = Router();
const productController = new ProductController();

// Obtener todos los productos
productRouter.get('/', productController.getAllProducts);

// Obtener un producto por su ID
productRouter.get('/:pid', productController.getProductById);

// Crear un producto
productRouter.post('/', passport.authenticate('current', { session: false }), authorization(['admin']), productController.createProduct);

// Actualizar un producto
productRouter.put('/:pid', passport.authenticate('current', { session: false }), authorization(['admin']), productController.updateProduct);

// Eliminar un producto
productRouter.delete('/:pid', passport.authenticate('current', { session: false }), authorization(['admin']), productController.deleteProduct);

export default productRouter;