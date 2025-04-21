import { IsString, IsNotEmpty } from 'class-validator';
import { SignInDto as GrpcSignInUserDto } from '@app/shared/user-service';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatedSignIn implements GrpcSignInUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
