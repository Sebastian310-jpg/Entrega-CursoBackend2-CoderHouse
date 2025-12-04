import ProductService from "../services/product.services.js";

class ProductController {
  constructor(){
    this.productService = new ProductService();
  }

  // GET /api/products
  getAllProducts = async (req, res) => {
    try {
      const { limit, page, category, status, sort } = req.query;

      const filter = {};
      if (category) filter.category = category;
      if (status) filter.status = status === "true";

      const options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page): 1,
        sort: sort ? { price: sort === 'asc'? 1 : -1 } : {},
      };

      const result = await this.productService.getAllProducts(filter, options);
      const { docs, ...pagination } = result;

      res.status(200).json({ status: 'success', message: 'Productos obtenidos correctamente', payload: docs, ...pagination });

    } catch (error) {
      res.status(500).json({ status: 'error', message: "Error al obtener los productos: " + error.message });
    }
  }

  // GET /api/products/:pid
  getProductById = async (req, res) => {
    try {
      const { pid: productId } = req.params;
      const product = await this.productService.getProductById(productId);

      res.status(200).json({ status: 'success', message: 'Producto obtenido correctamente', payload: product });

    } catch (error) {
      res.status(500).json({ status: 'error', message: "Error al obtener el producto: " + error.message });
    }
  }

  // POST /api/products
  createProduct = async (req, res) => {
    try {
      const data = req.body;

      const newProduct = await this.productService.createProduct(data);

      res.status(201).json({ status: 'success', message: 'Producto creado correctamente', payload: newProduct });

    } catch (error) {
      res.status(500).json({ status: 'error', message: "Error al crear el producto: " + error.message });
    }
  }

  // PUT /api/products/:pid
  updateProduct = async (req, res) => {
    try {
      const { pid: productId } = req.params;
      const updates = req.body;

      const updatedProduct = await this.productService.updateProduct(productId, updates);

      res.status(200).json({ status: 'success', message: 'Producto actualizado correctamente', payload: updatedProduct });
      
    } catch (error) {
      res.status(500).json({ status: 'error', message: "Error al actualizar el producto: " + error.message });
    }
  }

  // DELETE /api/products/:pid
  deleteProduct = async (req, res) => {
    try {
      const { pid: productId } = req.params;

      const deletedProduct = await this.productService.deleteProduct(productId);

      res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente', payload: deletedProduct });
    } catch (error) {
      res.status(500).json({ status: 'error', message: "Error al eliminar el producto: " + error.message });
    }
  }

}

export default ProductController;