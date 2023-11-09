import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  token?: string;
}
