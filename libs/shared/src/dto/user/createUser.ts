import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto as GrpcCreateUserDto } from '@app/shared/user-service';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatedCreateUserDto implements GrpcCreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;
}
