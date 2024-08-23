// src/common/services/pagination.service.ts
import { Injectable } from '@nestjs/common';
import { PaginationDto, PaginationResponse } from '../dto/pagination.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Device } from 'src/entity/device.entity';
import { Devices } from 'src/entity/devices.entity';

@Injectable()
export class PaginationService {
  async paginate<T>(
    query: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<T>> {
    const { page, limit } = paginationDto;
    const offset = (page - 1) * limit;
    const total = await query.getCount();
    return {
      data: await query.offset(offset).limit(limit).getMany(),
      total: Math.ceil(total / limit),
      page,
      limit,
    };
  }

  paginateArray(data: any[], paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return data.slice(startIndex, endIndex);
  }
}
