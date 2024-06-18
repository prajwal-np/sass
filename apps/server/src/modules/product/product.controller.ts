import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProduct, UpdateProduct } from './dto';
import { ProductService } from './product.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  createProduct(@Body() payload: CreateProduct) {
    return this.productService.createProduct(payload);
  }

  @Put('')
  updateCategory(@Body() payload: UpdateProduct) {
    return this.productService.updateProduct(payload);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  getProduct(@Param() params: { id: number }) {
    return this.productService.getProduct(params.id);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }
}
