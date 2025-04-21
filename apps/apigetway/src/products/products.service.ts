import {
  CreateProductDto,
  ListProductsDto,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
  UpdateProductDto,
} from '@app/shared/product-service';
import { status } from '@grpc/grpc-js';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject(PRODUCT_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  create(createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  async findOneProduct(id: string) {
    try {
      return await lastValueFrom(this.productService.getOneProduct({ id }));
    } catch (err) {
      if (err.code === status.NOT_FOUND) {
        throw new NotFoundException('Product Is Not Found');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateProduct(updateProductdto: UpdateProductDto) {
    try {
      return await lastValueFrom(
        this.productService.updateProduct(updateProductdto),
      );
    } catch (err) {
      if (err.code === status.NOT_FOUND) {
        throw new NotFoundException('Product Is Not Found');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async ListAllProduct(query: ListProductsDto) {
    return this.productService.listProducts(query);
  }

  async delete(id: string) {
    try {
      return await lastValueFrom(this.productService.deleteProduct({ id }));
    } catch (err) {
      if (err.code === status.NOT_FOUND) {
        throw new NotFoundException('Product Is Not Found');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
