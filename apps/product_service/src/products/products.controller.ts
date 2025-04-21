import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  DeleteProductDto,
  FindOneProductDto,
  ListProductsDto,
  UpdateProductDto,
} from '@app/shared/product-service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  create(createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @GrpcMethod('ProductService', 'GetOneProduct')
  findOne(findOneProductDto: FindOneProductDto) {
    return this.productsService.findOne(findOneProductDto.id);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  updateProduct(updateProduct: UpdateProductDto) {
    return this.productsService.updateProduct(updateProduct);
  }

  @GrpcMethod('ProductService', 'ListProducts')
  listProducts(query: ListProductsDto) {
    return this.productsService.listProducts(query);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  delete(deleteProductDto: DeleteProductDto) {
    return this.productsService.delete(deleteProductDto.id);
  }
}
