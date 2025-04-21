import {
  CreateProductDto,
  ListProductsDto,
  UpdateProductDto,
} from '@app/shared/product-service';
import { products } from '@app/shared/schema/prodct.schema';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE } from 'libs/shared/database/database.module';
import { status } from '@grpc/grpc-js';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private db) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.db
      .insert(products)
      .values({
        ...createProductDto,
      })
      .returning();
    return product[0];
  }

  async findOne(id: string) {
    const product = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    if (product.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Product Is Not Found',
      });
    }

    return product[0];
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const findProduct = await this.db
      .select()
      .from(products)
      .where(eq(products.id, updateProductDto.id));
    if (findProduct.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Product Is Not Found',
      });
    }
    const update = await this.db
      .update(products)
      .set({
        ...updateProductDto,
      })
      .where(eq(products.id, updateProductDto.id))
      .returning();

    return update[0];
  }

  async listProducts(query: ListProductsDto) {
    console.log('listPro', query);
    const productQuery = await this.db.select().from(products).where(sql`
    1 = 1
    ${query.category ? sql`AND ${products.category} = ${query.category}` : sql``}
    ${query.minPrice !== undefined ? sql`AND ${products.price} >= ${query.minPrice}` : sql``}
    ${query.maxPrice !== undefined ? sql`AND ${products.price} <= ${query.maxPrice}` : sql``}
    ${query.availability !== undefined ? sql`AND ${products.availability} = ${query.availability}` : sql``}
  `);

    const productsList = productQuery.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      availability: product.availability,
      category: product.category,
    }));

    return {
      products: productsList,
    };
  }

  async delete(id: string) {
    const product = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));

    if (product.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Product Is Not Found',
      });
    }

    await this.db.delete(products).where(eq(products.id, id));

    return {};
  }
}
