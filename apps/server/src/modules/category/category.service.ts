import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from 'src/entity/category.entity';
import { CreateCategory } from './dto/create.dto';
import { UpdateCategory } from './dto/update.dto';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable()
export class CategoryService {
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

  async createCategory(payload: CreateCategory): Promise<boolean> {
    (
      await this.connectionService.getRepository(Category, this.tenantId)
    ).insert(payload);
    return true;
  }

  async updateCategory(payload: UpdateCategory): Promise<boolean> {
    (
      await this.connectionService.getRepository(Category, this.tenantId)
    ).update(
      {
        id: payload.id,
      },
      {
        name: payload.name,
      },
    );
    return true;
  }

  async getCategory(id: string): Promise<Category> {
    return (
      await this.connectionService.getRepository(Category, this.tenantId)
    ).findOne({
      where: {
        id,
      },
      relations: ['products'],
    });
  }

  async getCategories(): Promise<Category[]> {
    return (
      await this.connectionService.getRepository(Category, this.tenantId)
    ).find({
      relations: ['products'],
    });
  }
}
