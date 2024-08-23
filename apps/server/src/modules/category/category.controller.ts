import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/create.dto';
import { UpdateCategory } from './dto/update.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  createCategory(@Body() payload: CreateCategory) {
    return this.categoryService.createCategory(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Put('')
  updateCategory(@Body() payload: UpdateCategory) {
    return this.categoryService.updateCategory(payload);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  getCategory(@Param() param: { id: string }) {
    return this.categoryService.getCategory(param.id);
  }
}
