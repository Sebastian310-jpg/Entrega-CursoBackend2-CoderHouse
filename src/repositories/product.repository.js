import ProductDAO from "../dao/product.dao.js";

class ProductRepository{
  constructor(){
    this.dao = new ProductDAO();
  }

  async getAllProducts(filter = {}, options = {}){
    return await this.dao.getAll(filter, options);
  }

  async getProductById(productId){
    return await this.dao.getById(productId);
  }

  async createProduct(productData){
    return await this.dao.createProduct(productData);
  }

  async updateProduct(productId, updates){
    return await this.dao.updateProduct(productId, updates);
  }

  async deleteProduct(productId){
    return await this.dao.deleteProduct(productId);
  }
}

export default ProductRepository;