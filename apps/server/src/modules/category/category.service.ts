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
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    try {
      const tenantId = this.request.tenantId;
      console.log(this.request.tenantId);
      const dataSource = this.connectionService.getDataSource(tenantId);
      dataSource
        .then((data) => {
          this.categoryRepo = data.getRepository(Category);
        })
        .catch((e) => {
          console.log('asds', e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async createCategory(payload: CreateCategory): Promise<boolean> {
    await this.categoryRepo.save(payload);
    return true;
  }

  async updateCategory(payload: UpdateCategory): Promise<boolean> {
    await this.categoryRepo.update(
      {
        id: payload.id,
      },
      {
        name: payload.name,
      },
    );
    return true;
  }

  async getCategory(id: number): Promise<Category> {
    return await this.categoryRepo.findOne({
      where: {
        id,
      },
      relations: ['products'],
    });
  }

  async getCategories(): Promise<Category[]> {
    console.log(this.categoryRepo);
    return await this.categoryRepo.find({
      relations: ['products'],
    });
  }
}
