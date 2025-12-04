import Product from "./models/products.model.js";

class ProductDAO {
  async getAll(filter = {}, options= {}){
    return await Product.paginate(filter, options);
  }

  async getById(productId){
    return await Product.findById(productId).lean();
  }

  async createProduct(productData){
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(productId, updates){
    return await Product.findByIdAndUpdate(productId, updates, { new: true });
  }

  async deleteProduct(productId){
    return await Product.findByIdAndDelete(productId);
  }
}

export default ProductDAO;