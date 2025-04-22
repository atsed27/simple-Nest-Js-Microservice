import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ValidatedCreateProductsDto } from '@app/shared/dto/products/createProduct';
import {
  CreateProductDto,
  ListProductsDto,
  UpdateProductDto,
} from '@app/shared/product-service';
import { Public } from '@app/shared/decorators/auth.decorator';
import { ValidatedUpdateProductsDto } from '@app/shared/dto/products/updateProduct';
import { validateOrReject } from 'class-validator';

@ApiTags('products')
@Controller('products')
@Public()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: ValidatedCreateProductsDto })
  async create(@Body() createProductDto: CreateProductDto) {
    const validated = Object.assign(
      new ValidatedCreateProductsDto(),
      createProductDto,
    );
    await validateOrReject(validated);
    return this.productsService.create(createProductDto);
  }
  
  @Get()
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'availability', required: false, type: Boolean })
  async ListAllProduct(@Query() query: ListProductsDto) {
    console.log('query1', query);
     const queryParams={...query,availability:query.availability.toString()==="false"?false:true}
    return this.productsService.ListAllProduct(queryParams);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }
  @Patch()
  @ApiBody({ type: ValidatedUpdateProductsDto })
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    const validated = Object.assign(
      new ValidatedCreateProductsDto(),
      updateProductDto,
    );
    await validateOrReject(validated);
    return this.productsService.updateProduct(updateProductDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
