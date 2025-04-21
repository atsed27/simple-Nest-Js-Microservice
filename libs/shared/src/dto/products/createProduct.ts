import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { CreateProductDto as GrpcCreateProductDto } from '@app/shared/product-service';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatedCreateProductsDto implements GrpcCreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A high-performance laptop',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The availability status of the product',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  availability: boolean;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
