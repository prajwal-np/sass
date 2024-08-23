import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateProduct, CreateProduct } from './dto';
import { Category } from 'src/entity/category.entity';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';
import { Products } from 'src/entity/product.entity';

@Injectable()
export class ProductService {
  private categoryRepo: Repository<Category>;
  private tenantId: string;
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    try {
      this.tenantId = this.request.tenantId;
    } catch (e) {
      console.log(e);
    }
  }

  async getProduct(id: string): Promise<Products> {
    return await (
      await this.connectionService.getRepository(Products, this.tenantId)
    ).findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async getProducts(): Promise<Products[]> {
    return await (
      await this.connectionService.getRepository(Products, this.tenantId)
    ).find();
  }

  async createProduct(payload: CreateProduct): Promise<boolean> {
    const category = await (
      await this.connectionService.getRepository(Category, this.tenantId)
    ).findOneBy({
      id: payload.category,
    });

    console.log(category);

    await (
      await this.connectionService.getRepository(Products, this.tenantId)
    ).save({
      ...payload,
      category: category,
    });
    return true;
  }

  async updateProduct(payload: UpdateProduct): Promise<boolean> {
    const category = await (
      await this.connectionService.getRepository(Category, this.tenantId)
    ).findOneBy({
      id: payload.category,
    });
    await (
      await this.connectionService.getRepository(Products, this.tenantId)
    ).update(
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
