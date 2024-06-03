import { Repository } from "typeorm";
import { Product } from "./Product";

export class ProductService {
  constructor(readonly productRepo: Repository<Product>) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(productData);
    await this.productRepo.save(product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepo.delete(id);
  }
}
