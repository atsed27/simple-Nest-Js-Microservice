import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto as GrpcCreateUserDto } from '@app/shared/user-service';

export class ValidatedCreateUserDto implements GrpcCreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
