// src/common/dto/pagination.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    minimum: 1,
  })
  page?: number = 1;
  @ApiProperty({
    minimum: 1,
  })
  limit?: number = 10;
}

export class PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
