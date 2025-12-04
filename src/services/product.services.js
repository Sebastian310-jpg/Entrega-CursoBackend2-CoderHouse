import ProductRepository from "../repositories/product.repository.js";

class ProductService {
  constructor(){
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(filter = {}, options = {}){
    return await this.productRepository.getAllProducts(filter, options);
  }

  async getProductById(productId){
    const product = await this.productRepository.getProductById(productId);

    if(!product) { throw new Error('Producto no encontrado') };

    return product;
  }

  async createProduct(productData){
    if(!productData.title || !productData.code || !productData.price || !productData.category){
      throw new Error('Faltan campos obligatorios');
    }

    return await this.productRepository.createProduct(productData);
  }

  async updateProduct(productId, updates){
    const updatedProduct = await this.productRepository.updateProduct(productId, updates);

    if(!updatedProduct) { throw new Error('Producto no encontrado') };

    return updatedProduct;
  }

  async deleteProduct(productId){
    const deletedProduct = await this.productRepository.deleteProduct(productId);

    if(!deletedProduct) { throw new Error('Producto no encontrado') };

    return deletedProduct;
  }
}

export default ProductService;