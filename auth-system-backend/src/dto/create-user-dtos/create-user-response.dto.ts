import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserResponseDto {
  @IsNotEmpty()
  message: string;
  token: string;
}
