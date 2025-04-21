import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderDto as GrpcCreateOrderDto } from '@app/shared/order-service';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatedCreateOrderDto implements GrpcCreateOrderDto {
  @ApiProperty({ example: 'user-uuid-1234' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'product-uuid-5678' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;
}
