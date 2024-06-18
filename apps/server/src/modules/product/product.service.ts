import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from 'src/entity/Product.entity';
import { UpdateProduct, CreateProduct } from './dto';
import { Category } from 'src/entity/category.entity';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable()
export class ProductService {
  private productRepo: Repository<Product>;
  private categoryRepo: Repository<Category>;
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    const tenantId = this.request.tenantId;
    const dataSource = this.connectionService.getDataSource(tenantId);
    dataSource.then((data) => {
      this.productRepo = data.getRepository(Product);
      this.categoryRepo = data.getRepository(Category);
    });
  }

  async getProduct(id: number): Promise<Product> {
    return this.productRepo.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async createProduct(payload: CreateProduct): Promise<boolean> {
    const category = await this.categoryRepo.findOneBy({
      id: payload.category,
    });
    await this.productRepo.insert({
      ...payload,
      category: category,
    });
    return true;
  }

  async updateProduct(payload: UpdateProduct): Promise<boolean> {
    const category = await this.categoryRepo.findOneBy({
      id: payload.category,
    });
    await this.productRepo.update(
      {
        id: payload.id,
      },
      {
        ...payload,
        category: category,
      },
    );
    return true;
  }
}
