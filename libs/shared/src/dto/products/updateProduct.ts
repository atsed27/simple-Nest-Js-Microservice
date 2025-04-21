import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { UpdateProductDto as GrpcUpdateProductDto } from '@app/shared/product-service';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatedUpdateProductsDto implements GrpcUpdateProductDto {
  @ApiProperty({
    description: 'The Id of the product',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

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
